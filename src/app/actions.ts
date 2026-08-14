"use server";

import { type PostSummary, substack } from "@/lib/substack";

export type SubstackPost = PostSummary;

export async function getArchivePosts(
  offset = 0,
  limit = 20,
  postTagId?: string,
): Promise<PostSummary[]> {
  return substack.getPosts(offset, limit, postTagId);
}
