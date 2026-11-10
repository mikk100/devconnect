
import Nav from "@/components/Nav";
import "./globals.css";
import Providers from "@/components/providers";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100">
        <Providers>
          <Nav />
          {children}
        </Providers>
      </body>
    </html>
  );
}