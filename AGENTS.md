<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->
<!-- BEGIN:template-agent-rules -->
# Architecture and Guidelines for this Template

When working on this codebase, adhere to the following rules:

1. **Type-Safety**: 
   - Always use TypeScript interfaces and types for all props, API responses, and state.
   - Avoid `any`. If a type is unknown, use `unknown` and properly narrow it down.
   - Ensure all API fetching (especially the Substack API integration) is strongly typed using interfaces.

2. **UI & Styling (shadcn/ui & Tailwind CSS)**:
   - Use `shadcn/ui` components for building blocks whenever possible. Do not invent custom UI components if a `shadcn/ui` component already exists.
   - Use Tailwind CSS for all custom styling. Do not use plain CSS or CSS modules unless absolutely necessary.
   - Keep class strings clean and readable, utilizing the `cn` utility function for conditional classes.

3. **General Architecture (BFF / Hybrid)**:
   - This template uses a BFF (Backend-For-Frontend) approach where possible, fetching data on the server in Server Components (e.g., Substack fetching in `lib/substack.ts`) to ensure SEO-friendly HTML delivery.
   - Use Client Components (`"use client"`) only for interactive elements.
   - Global configuration must be read from `src/data/config.ts` or `src/data/site.json`. Never hardcode site data, contact info, or social links inside individual components.

4. **Scripts & Assets**:
   - **`scripts/generate-assets.ts`**: Automatically copies and sets up the required favicon, apple-icon, and opengraph-image files from `src/assets` into the `public` directory. It uses `fit: "contain"` to prevent distortion. Can be run via `bun run generate-assets`. Always instruct the user to provide source SVG images in `assets/` and run this script when updating logos/icons.
   - **`scripts/get-tags.ts`**: A script to fetch tags. Can be run via `bun run get-tags`.

5. **Contact Form (`Web3Forms`)**:
   - The template includes a passive `web3forms-contact.tsx` component.
   - If a user wants to enable the contact form, ensure they provide their `web3formsAccessKey` in `site.json` under `shared.web3formsAccessKey` and swap/activate the component within `src/components/feature/contact-section.tsx`.

6. **Adding New Languages (i18n)**:
   - To add a language (e.g., `es`), update `src/data/site.json`:
     - Add it to `i18n.locales` (e.g., `"es": { "enabled": true, "label": "Español", "direction": "ltr" }`).
     - Provide localized values in `content` (e.g., `siteName.es`, `navigation.header.es`).
     - Map tags in `sources.substack.tags.es` and static pages in `sources.substack.pages.about.es`.
   - Create the corresponding dictionary file: `src/i18n/dictionaries/es.json`.
   - Create localized MDX files (e.g., `src/content/about-es.mdx`).

7. **Adding New MDX Content**:
   - MDX pages (like `about-[locale].mdx`) must be placed in `src/content/`.
   - Always create localized versions for every supported language defined in `site.json`.
   - To render MDX content on a page (like `home.tsx`), use the `MdxSection` component from `src/components/common/mdx-section.tsx`.

8. **Adding New Substack Tags**:
   - Substack tags must be mapped in `src/data/site.json` under `sources.substack.tags.[locale]` as an array of string slugs (e.g., `["news"]`).
   - If a tag is requested to be added to the header menu, add it to `content.navigation.header.[locale]` in `site.json` with the `href` prefix `tag:` (e.g., `"href": "tag:news"`).
<!-- END:template-agent-rules -->