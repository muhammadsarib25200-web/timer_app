import "./globals.css";

export const metadata = {
  title: "Timer & Stopwatch App",
  description: "Built with React Next.js and Standard CSS",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}