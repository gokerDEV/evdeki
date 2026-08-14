import { promises as fs } from "node:fs";
import path from "node:path";
import Image from "next/image";
import type React from "react";

const components = {
  h1: (props: React.ComponentProps<"h1">) => (
    <h2 className="text-3xl font-bold tracking-tight mb-6" {...props} />
  ),
  h2: (props: React.ComponentProps<"h2">) => (
    <h3
      className="text-2xl font-semibold tracking-tight mt-8 mb-4"
      {...props}
    />
  ),
  p: (props: React.ComponentProps<"p">) => (
    <p
      className="leading-7 [&:not(:first-child)]:mt-6 text-muted-foreground"
      {...props}
    />
  ),
  ul: (props: React.ComponentProps<"ul">) => (
    <ul className="my-6 ml-6 list-disc [&>li]:mt-2" {...props} />
  ),
  li: (props: React.ComponentProps<"li">) => (
    <li className="text-muted-foreground" {...props} />
  ),
  strong: (props: React.ComponentProps<"strong">) => (
    <strong className="font-semibold text-foreground" {...props} />
  ),
};

import { compileMDX } from "next-mdx-remote/rsc";

export async function MdxContent({
  filename,
  imagePosition,
}: {
  filename: string;
  imagePosition?: "left" | "right";
}) {
  const filePath = path.join(process.cwd(), "src/content", filename);
  let fileContent = "";

  try {
    fileContent = await fs.readFile(filePath, "utf8");
  } catch (error) {
    console.error(`Failed to read MDX file: ${filename}`, error);
    return null;
  }

  const { content, frontmatter } = await compileMDX<{
    image?: string;
    alt?: string;
    title?: string;
  }>({
    source: fileContent,
    components,
    options: { parseFrontmatter: true },
  });

  if (!imagePosition || !frontmatter?.image) {
    return (
      <div className="max-w-3xl mx-auto prose prose-neutral dark:prose-invert">
        {content}
      </div>
    );
  }

  const imageAlt =
    frontmatter.alt || frontmatter.title || filename.split("-")[0];

  return (
    <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
      {imagePosition === "left" && (
        <div className="relative h-full min-h-[300px]">
          <Image
            src={frontmatter.image}
            alt={imageAlt}
            fill
            className="object-contain"
          />
        </div>
      )}

      <div>
        <div className="prose prose-neutral dark:prose-invert">{content}</div>
      </div>

      {imagePosition === "right" && (
        <div className="relative h-full min-h-[300px]">
          <Image
            src={frontmatter.image}
            alt={imageAlt}
            fill
            className="object-contain"
          />
        </div>
      )}
    </div>
  );
}
