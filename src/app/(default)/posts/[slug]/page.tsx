import type { Metadata } from "next";
import { PostPage } from "@/components/pages/post";
import {
  defaultLocale,
  getResolvedSiteConfig,
} from "@/lib/config/site.resolver";
import { substack } from "@/lib/substack";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await substack.getPost(slug);
  const config = getResolvedSiteConfig(defaultLocale);

  if (!post) return {};

  const postLang = post.language || defaultLocale;
  const urlPath =
    postLang === defaultLocale
      ? `/posts/${slug}`
      : `/${postLang}/posts/${slug}`;

  return {
    alternates: {
      canonical: `${config.url}${urlPath}`,
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <PostPage locale={defaultLocale} slug={slug} />;
}
