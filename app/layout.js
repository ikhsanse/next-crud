import { Providers } from "./providers";
import "./globals.css";

export const metadata = {
  title: "CRUD NEXT",
  description: "crud test from imp",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
