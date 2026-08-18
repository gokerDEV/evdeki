"use client";

import Image from "next/image";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { RecipeCard, type RecipeData } from "@/components/feature/recipe-card";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

interface SubstackContentProps {
  html: string;
}

function RecipePortal({
  target,
  data,
}: {
  target: HTMLElement;
  data: RecipeData;
}) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;
  return createPortal(<RecipeCard data={data} />, target);
}

export default function SubstackContent({ html }: SubstackContentProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest("a.image-link");

      if (anchor) {
        e.preventDefault();
        const href = anchor.getAttribute("href");
        if (href) {
          setSelectedImage(href);
        }
      }
    };

    container.addEventListener("click", handleClick);
    return () => container.removeEventListener("click", handleClick);
  }, []);

  return (
    <>
      <style>{`
        .substack-content .image-link-expand {
          display: none !important;
        }
        .substack-content a.image-link {
          cursor: zoom-in;
        }
      `}</style>
      <div
        ref={containerRef}
        className="prose prose-lg dark:prose-invert max-w-none mt-8 substack-content"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: We render pure HTML from substack API.
        dangerouslySetInnerHTML={{ __html: html }}
      />

      {/* Render Recipe Cards */}
      {typeof window !== "undefined" &&
        Array.from(document.querySelectorAll(".recipe-embed")).map((el, i) => {
          const base64 = el.getAttribute("data-recipe-base64");
          if (!base64) return null;
          try {
            const data = JSON.parse(atob(base64));
            // Render via portal or just append. In a purely React approach we'd use a portal,
            // but since this is injected HTML, let's use a React portal to the element.
            return (
              <RecipePortal
                key={data.recipe?.id ?? i}
                target={el as HTMLElement}
                data={data}
              />
            );
          } catch (_e) {
            return null;
          }
        })}

      <Dialog
        open={!!selectedImage}
        onOpenChange={(open) => !open && setSelectedImage(null)}
      >
        {/* Visually hidden title for accessibility */}
        <DialogTitle className="sr-only">Expand Image</DialogTitle>
        <DialogContent className="max-w-4xl p-1 bg-transparent border-none shadow-none flex justify-center items-center">
          {selectedImage && (
            <div className="relative w-full h-[85vh]">
              <Image
                src={selectedImage}
                alt="Expanded view"
                fill
                className="object-contain rounded-md"
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
