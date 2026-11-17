import { Sora, Inter, Montserrat } from "next/font/google";
import "./globals.css";

const sora = Sora({ subsets: ["latin"], weight: ["400", "600", "800"], variable: "--font-sora" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const montserrat = Montserrat({ subsets: ["latin"], weight: ["500", "700", "800"], variable: "--font-montserrat" });

const TITLE = "João D Studio — Landing Pages que Convertem";
const DESC =
  "Criador de landing pages com design moderno, animações cinematográficas e foco em conversão. Fale pelo WhatsApp.";

export const metadata = {
  metadataBase: new URL("https://joaodstudio.vercel.app"),
  title: TITLE,
  description: DESC,
  openGraph: {
    title: TITLE, description: DESC, url: "/", siteName: "João D Studio", locale: "pt_BR", type: "website",
    images: [{ url: "/joao-d.jpg", width: 1080, height: 1080, alt: "João D Studio" }],
  },
  twitter: { card: "summary", title: TITLE, description: DESC, images: ["/joao-d.jpg"] },
};

export const viewport = { width: "device-width", initialScale: 1, viewportFit: "cover", themeColor: "#050a1a" };

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" className={`${sora.variable} ${inter.variable} ${montserrat.variable}`}>
      <body className="font-sans text-base">{children}</body>
    </html>
  );
}
