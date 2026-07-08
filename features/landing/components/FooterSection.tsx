import Link from "next/link";
import { FOOTER_LINKS } from "../constants/content";

export default function FooterSection() {
  return (
    <footer className="border-t border-border/60 bg-ivory">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 py-12 md:grid-cols-4 md:px-6">
        {/* Brand */}
        <div className="md:col-span-2">
          <p className="flex items-baseline gap-1">
            <span className="font-script text-3xl text-rose-900">Our Forever</span>
            <span className="font-heading text-xl font-semibold text-foreground">
              Journey
            </span>
          </p>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">
            Design stunning digital wedding invitations and share them
            effortlessly with your loved ones.
          </p>
        </div>

        <FooterColumn title="Quick Links" links={FOOTER_LINKS.quick} />
        <FooterColumn title="Company" links={FOOTER_LINKS.company} />
      </div>

      <div className="border-t border-border/60 py-6 text-center text-sm text-muted">
        © {new Date().getFullYear()} Our Forever Journey. All rights reserved.
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: readonly { label: string; href: string }[];
}) {
  return (
    <div>
      <h4 className="font-heading font-semibold text-foreground">{title}</h4>
      <ul className="mt-4 space-y-2 text-sm text-muted">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className="transition-colors hover:text-accent">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
