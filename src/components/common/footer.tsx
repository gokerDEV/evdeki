import { Rss } from "lucide-react";
import DevelopedBy from "@/components/common/developed-by";
import { getDictionary } from "@/i18n/get-dictionary";
import { getResolvedSiteConfig } from "@/lib/config/site.resolver";
import type { Locale } from "@/lib/config/site.types";

function TwitterIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <title>Twitter</title>
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  );
}

function LinkedinIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <title>LinkedIn</title>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <title>Instagram</title>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
    </svg>
  );
}

function GithubIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <title>GitHub</title>
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3-.3 6-1.5 6-6.5a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 5 3 6.2 6 6.5a4.8 4.8 0 0 0-1 3.2v4"></path>
    </svg>
  );
}

function getSocialIcon(platform: string) {
  switch (platform.toLowerCase()) {
    case "twitter":
    case "x":
      return <TwitterIcon className="h-5 w-5" />;
    case "linkedin":
      return <LinkedinIcon className="h-5 w-5" />;
    case "instagram":
      return <InstagramIcon className="h-5 w-5" />;
    case "github":
      return <GithubIcon className="h-5 w-5" />;
    case "substack":
      return <Rss className="h-5 w-5" />;
    default:
      return <span className="text-sm font-medium">{platform}</span>;
  }
}

export default async function Footer({ locale }: { locale: Locale }) {
  const currentYear = new Date().getFullYear();
  const config = getResolvedSiteConfig(locale);
  const dict = await getDictionary(locale);

  const socials = Object.entries(config.socials || {})
    .filter(([_, url]) => Boolean(url))
    .map(([platform, url]) => ({ platform, url: url as string }));

  return (
    <footer className="border-t bg-background overflow-hidden relative pt-12 md:pt-16 pb-0 shadow-inner">
      <div className="mx-auto max-w-7xl px-4 flex flex-col justify-between items-center gap-6 relative z-10 mb-12 md:mb-16">
        <div className="w-full flex flex-col md:flex-row justify-between items-center gap-6 md:gap-4 relative">
          <div className="flex justify-center md:flex-1 md:justify-start">
            <p className="text-sm text-muted-foreground font-medium text-center md:text-left">
              &copy; {currentYear} {config.content.siteName}.{" "}
              {dict.footer.allRightsReserved}
            </p>
          </div>

          <div className="flex gap-6 items-center md:flex-1 md:justify-end">
            {socials.map((social) => (
              <a
                key={social.platform}
                href={social.url}
                target="_blank"
                rel="noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label={social.platform}
              >
                {getSocialIcon(social.platform)}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Huge Logo text at the bottom */}
      <div className="relative mx-auto max-w-7xl px-4 flex flex-col items-center select-none overflow-hidden -mb-4">
        <div className="opacity-10 pointer-events-none flex flex-col items-center w-full">
          {/* Main Logo */}
          {/* biome-ignore lint/performance/noImgElement: SVG optimization not needed */}
          <img
            src="/logotype.svg"
            alt={config.content.siteName}
            className="w-full h-auto object-contain"
          />

          {/* Mirror Reflection */}
          {/* biome-ignore lint/performance/noImgElement: SVG optimization not needed */}
          <img
            src="/logotype.svg"
            alt={`${config.content.siteName} reflection`}
            className="w-full h-auto object-contain opacity-50"
            style={{
              transform: "scaleY(-1)",
              maskImage:
                "linear-gradient(to top, rgba(0,0,0,0.6) 40%, transparent 80%)",
              WebkitMaskImage:
                "linear-gradient(to top, rgba(0,0,0,0.6) 40%, transparent 80%)",
            }}
          />
        </div>

        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 w-full flex justify-center">
          <DevelopedBy dict={dict.footer} />
        </div>
      </div>
    </footer>
  );
}
