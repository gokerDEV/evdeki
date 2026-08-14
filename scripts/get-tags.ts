import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import site from "../src/data/site.json";

async function fetchTags() {
  const baseUrl = site.shared.substack;
  const sid = process.env.SUBSTACK_SID;

  if (!baseUrl || !sid) {
    console.error(
      "Missing substack in site.json or SUBSTACK_SID in environment variables.",
    );
    process.exit(1);
  }

  const cookie = `substack.sid=${sid}`;

  try {
    console.log(`Fetching tags from ${baseUrl}...`);
    const response = await fetch(`${baseUrl}/api/v1/publication/post-tag`, {
      headers: {
        Accept: "application/json",
        Cookie: cookie,
      },
      // Using bun fetch options or standard fetch
      cache: "no-store",
    });

    if (!response.ok) {
      console.error(
        `Failed to fetch tags: ${response.status} ${response.statusText}`,
      );
      const text = await response.text();
      console.error("Response body:", text);
      process.exit(1);
    }

    const data = await response.json();

    // Ensure data directory exists
    const dataDir = join(process.cwd(), "src/data");
    if (!existsSync(dataDir)) {
      mkdirSync(dataDir, { recursive: true });
    }

    const outputPath = join(dataDir, "substack-tags.json");

    const manifest = {
      generatedAt: new Date().toISOString(),
      publicationUrl: baseUrl,
      tags: data,
    };

    writeFileSync(outputPath, JSON.stringify(manifest, null, 2), "utf-8");
    console.log(
      `Successfully saved manifest with ${data.length || Object.keys(data).length} tags to src/data/substack-tags.json`,
    );
  } catch (error) {
    console.error("Error fetching tags:", error);
    process.exit(1);
  }
}

fetchTags();
