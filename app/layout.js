import { Sora, Inter, Montserrat } from "next/font/google";
import "./globals.css";

const sora = Sora({ subsets: ["latin"], weight: ["400", "600", "800"], variable: "--font-sora" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const montserrat = Montserrat({ subsets: ["latin"], weight: ["500", "700", "800"], variable: "--font-montserrat" });

export const metadata = {
  title: "João D Studio — Landing Pages que Convertem",
  description:
    "Criador de landing pages com design moderno, animações cinematográficas e foco em conversão. Fale pelo WhatsApp.",
};

export const viewport = { width: "device-width", initialScale: 1, viewportFit: "cover" };

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" className={`${sora.variable} ${inter.variable} ${montserrat.variable}`}>
      <body className="font-sans text-base">{children}</body>
    </html>
  );
}
