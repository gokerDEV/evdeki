import fs from "node:fs";
import path from "node:path";
import siteData from "@/data/site.json";

export interface PostSummary {
  id?: number;
  title: string;
  slug: string;
  type: string;
  post_date: string;
  canonical_url: string;
  description: string;
  cover_image: string | null;
  language: string;
  postTags?: { id: string; name: string; slug: string }[];
  wordcount: number;
  subtitle?: string;
}

export interface TagData {
  id: string;
  name: string;
  slug: string;
}

export interface Post extends PostSummary {
  body_html: string;
  social_title: string;
  search_engine_title: string;
  search_engine_description: string;
  videoUpload?: {
    id: string;
    mux_playback_id: string;
    duration: number;
    height: number;
    width: number;
    media_type: string;
  };
}

export interface Section {
  id: string;
  name: string;
  slug: string;
}

export interface SubStack {
  getPosts(
    offset?: number,
    limit?: number,
    postTagId?: string,
  ): Promise<PostSummary[]>;
  getPost(slug: string): Promise<Post | null>;
  getSections(): Promise<Section[]>;
  search(query: string): Promise<PostSummary[]>;
  getTagBySlug(slug: string): TagData | null;
}

class SubstackAPI implements SubStack {
  private get baseUrl() {
    return siteData.shared.substack;
  }

  async getPosts(
    offset = 0,
    limit = 20,
    postTagId?: string,
  ): Promise<PostSummary[]> {
    try {
      const params = new URLSearchParams({
        sort: "new",
        offset: String(offset),
        limit: String(limit),
      });

      if (postTagId) {
        params.append("post_tag_id", postTagId);
      }

      const url = `${this.baseUrl}/api/v1/archive?${params.toString()}`;
      const res = await fetch(url, {
        next: { revalidate: 3600, tags: ["substack-posts"] },
      });

      if (!res.ok) {
        console.error("Failed to fetch posts:", res.statusText);
        return [];
      }

      const data = await res.json();
      return data as PostSummary[];
    } catch (error) {
      console.error("Error fetching posts:", error);
      return [];
    }
  }

  async getPost(slug: string): Promise<Post | null> {
    try {
      const url = `${this.baseUrl}/api/v1/posts/${slug}`;
      const res = await fetch(url, {
        next: { tags: ["substack-posts", "substack"] },
      });

      if (!res.ok) {
        console.error(`Failed to fetch post ${slug}:`, res.statusText);
        return null;
      }

      const data = (await res.json()) as Post;

      // Extract recipes and replace their tags with JSON payload placeholder
      if (data.body_html) {
        const recipeRegex =
          /<div[^>]*class="recipe-embed"[^>]*data-attrs="([^"]+)"[^>]*>.*?<\/div>/g;
        // Collect all replacements to run concurrently
        const replacements: { search: string; replacement: string }[] = [];

        // Note: we can't do async inside replace, so we collect and then replace
        const promises = [];
        const matches = [...data.body_html.matchAll(recipeRegex)];

        for (const m of matches) {
          const matchedStr = m[0];
          const decoded = m[1]
            .replace(/&quot;/g, '"')
            .replace(/&#34;/g, '"')
            .replace(/&amp;/g, "&")
            .replace(/&lt;/g, "<")
            .replace(/&gt;/g, ">");

          try {
            const attrData = JSON.parse(decoded);
            if (attrData?.id) {
              const p = fetch(`${this.baseUrl}/api/v1/recipe/${attrData.id}`)
                .then(async (recipeRes) => {
                  if (recipeRes.ok) {
                    const recipeData = await recipeRes.json();
                    const encodedRecipe = Buffer.from(
                      JSON.stringify(recipeData),
                    ).toString("base64");
                    replacements.push({
                      search: matchedStr,
                      replacement: `<div class="recipe-embed" data-recipe-base64="${encodedRecipe}"></div>`,
                    });
                  }
                })
                .catch((err) => {
                  console.error("Failed to fetch recipe", attrData.id, err);
                });
              promises.push(p);
            }
          } catch (e) {
            console.error("Failed to parse recipe attributes", e);
          }
        }

        await Promise.all(promises);

        for (const rep of replacements) {
          data.body_html = data.body_html.replace(rep.search, rep.replacement);
        }
      }

      return data;
    } catch (error) {
      console.error(`Error fetching post ${slug}:`, error);
      return null;
    }
  }

  async getSections(): Promise<Section[]> {
    return [];
  }

  async search(query: string): Promise<PostSummary[]> {
    try {
      const params = new URLSearchParams({ search: query });
      const url = `${this.baseUrl}/api/v1/archive?${params.toString()}`;

      const res = await fetch(url, {
        next: { revalidate: 3600, tags: ["substack-search", "substack-posts"] },
      });

      if (!res.ok) {
        console.error(`Failed to search for ${query}:`, res.statusText);
        return [];
      }

      const data = await res.json();
      return data as PostSummary[];
    } catch (error) {
      console.error(`Error searching for ${query}:`, error);
      return [];
    }
  }

  getTags(): TagData[] {
    const tagsPath = path.join(process.cwd(), "src/data/substack-tags.json");
    let tags: TagData[] = [];
    try {
      if (fs.existsSync(tagsPath)) {
        const fileContent = fs.readFileSync(tagsPath, "utf-8");
        const parsed = JSON.parse(fileContent);
        if (parsed && Array.isArray(parsed.tags)) {
          tags = parsed.tags;
        }
      }
    } catch (error) {
      console.error("Error reading substack-tags.json:", error);
    }
    return tags;
  }

  getTagBySlug(slug: string): TagData | null {
    const tags = this.getTags();
    return tags.find((t) => t.slug === slug) || null;
  }
}

export const substack = new SubstackAPI();
