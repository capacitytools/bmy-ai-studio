import "./globals.css";

export const metadata = {
  title: "BMY AI Studio",
  description: "Create Amazing AI Videos for Free",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
