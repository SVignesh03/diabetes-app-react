import { ScrollViewStyleReset } from "expo-router/html";

// This file is web-only and used to configure the root HTML for every web page during static rendering.
export default function Root({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />

        {/* SEO Meta Tags */}
        <meta name="description" content="Diabetes Management App - Keep track of your health effortlessly" />
        <meta name="keywords" content="Diabetes, Health, Reminders, Logs, Appointments, Management" />
        <meta name="author" content="Your Name or Company" />

        {/* Social Media Preview */}
        <meta property="og:title" content="Diabetes Management App" />
        <meta property="og:description" content="Track your health, set reminders, and log your appointments." />
        <meta property="og:image" content="/meta-image.png" />
        <meta property="og:type" content="website" />

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />

        {/* Google Fonts Example (Optional) */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" />

        {/* 
          Disable body scrolling on web. This makes ScrollView components work closer to how they do on native. 
          However, body scrolling is often nice to have for mobile web. If you want to enable it, remove this line.
        */}
        <ScrollViewStyleReset />

        {/* Global Styles */}
        <style dangerouslySetInnerHTML={{ __html: responsiveBackground }} />
      </head>
      <body>{children}</body>
    </html>
  );
}

const responsiveBackground = `
body {
  background-color: #fff;
  font-family: 'Inter', sans-serif;
  margin: 0;
  padding: 0;
}
@media (prefers-color-scheme: dark) {
  body {
    background-color: #000;
    color: #fff;
  }
}
`;
