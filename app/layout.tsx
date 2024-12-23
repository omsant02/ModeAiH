import '@/styles/globals.css';
import { CrossmintProvider } from "@crossmint/client-sdk-react-ui";

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>
        <CrossmintProvider 
          apiKey={process.env.NEXT_PUBLIC_CROSSMINT_API_KEY!}
        >
          {children}
        </CrossmintProvider>
      </body>
    </html>
  );
}