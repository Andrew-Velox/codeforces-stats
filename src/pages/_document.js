import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="title" content="Codeforces Stats" />
        <meta
          name="description"
          content="⚡ Dynamically generated Codeforces stats for your Github profile!"
        />
        <meta
          name="keywords"
          content="codeforces, competitive programming, stats, contest, programming"
        />
        <meta name="subject" content="Codeforces Stats" />
        <meta name="topic" content="Codeforces Stats" />
        <meta
          name="summary"
          content="An API that generates beautiful statistics of your Codeforces profile as an SVG image, perfect for showcasing your competitive programming skills and achievements on Github."
        />
        <meta
          name="url"
          content="https://codeforces-stats.vercel.app/"
        />
        <meta name="category" content="tool" />
        <meta name="author" content="Huzaifa Khilawala" />

        <meta property="og:title" content="Codeforces Stats" />
        <meta
          property="og:description"
          content="⚡ Dynamically generated Codeforces stats for your Github profile!"
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://codeforces-stats.vercel.app/"
        />
        <meta
          property="og:image"
          content="https://codeforces-stats.vercel.app/bg.png"
        />
        <meta property="og:image:alt" content="Codeforces Stats" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:domain"
          content="codeforces-stats.vercel.app"
        />
        <meta
          property="twitter:url"
          content="https://codeforces-stats.vercel.app/"
        />
        <meta name="twitter:title" content="Codeforces Stats" />
        <meta
          name="twitter:description"
          content="⚡ Dynamically generated Codeforces stats for your Github profile!"
        />
        <meta
          name="twitter:image"
          content="https://codeforces-stats.vercel.app/bg.png"
        />
        <meta name="twitter:image:alt" content="Codeforces Stats" />

        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
