import { Sora, Inter, Montserrat } from "next/font/google";
import "./globals.css";

const sora = Sora({ subsets: ["latin"], weight: ["400", "600", "800"], variable: "--font-sora" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const montserrat = Montserrat({ subsets: ["latin"], weight: ["500", "700", "800"], variable: "--font-montserrat" });

const TITLE = "João D Studio — Landing Pages, Portfólios e Vitrines";
const DESC =
  "Landing pages, portfólios e vitrines digitais sob medida, com diagnóstico do seu negócio, design cinematográfico e contato direto pelo WhatsApp.";

// Dados estruturados (schema.org): ajudam o Google a entender quem é a empresa e o que ela faz
const SCHEMA = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "João D Studio",
  url: "https://joaodstudio.vercel.app",
  image: "https://joaodstudio.vercel.app/joao-d.jpg",
  description: DESC,
  telephone: "+55 99 99191-9769",
  areaServed: "BR",
  sameAs: ["https://www.instagram.com/joaodstudio/"],
  knowsAbout: ["Landing pages", "Portfólios online", "Vitrines digitais", "SEO", "Design de sites"],
};

export const metadata = {
  metadataBase: new URL("https://joaodstudio.vercel.app"),
  title: TITLE,
  description: DESC,
  keywords: [
    "criação de landing page", "criação de sites", "site para pequenas empresas", "portfólio online",
    "vitrine digital", "catálogo com pedido pelo WhatsApp", "SEO para pequenas empresas", "João D Studio",
  ],
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
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
      <body className="font-sans text-base">
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />
      </body>
    </html>
  );
}
