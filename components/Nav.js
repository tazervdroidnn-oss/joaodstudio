import Link from "next/link";
import WaIcon from "./WaIcon";
import { WA_LINK } from "./config";

export default function Nav() {
  return (
    <nav
      className="fixed inset-x-0 top-0 z-50 border-b backdrop-blur-xl"
      style={{ paddingTop: "calc(12px + env(safe-area-inset-top, 0px))", paddingBottom: 12, background: "color-mix(in srgb, var(--bg) 70%, transparent)" }}
    >
      <div className="wrap flex items-center justify-between">
        <Link href="#top" className="font-display text-lg font-extrabold">
          João D <span className="g">Studio</span>
        </Link>
        <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="btn btn-w !px-4 !py-2.5 text-sm md:!px-6 md:!py-3.5 md:text-base">
          <WaIcon /> WhatsApp
        </a>
      </div>
    </nav>
  );
}
