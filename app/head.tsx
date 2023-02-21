export default function Head() {
  const meta = {
    title: "zelzele.vercel.app",
    description: "Zelzele verileri",
    url: "https://zelzele.vercel.app",
  };

  return (
    <>
      <meta charSet="utf-8" />
      <meta name="robots" content="follow, index" />
      <meta httpEquiv="x-ua-compatible" content="ie=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />

      <title>{meta.title}</title>
      <meta name="description" content={meta.description} />
      <link rel="canonical" href={meta.url} />

      <meta property="og:type" content="website" />
      <meta property="og:title" content={meta.title} />
      <meta property="og:description" content={meta.description} />
      <meta property="og:url" content={meta.url} />

      <meta name="twitter:card" content="summary" />
      <meta name="twitter:site" content="@ademilter" />
      <meta name="twitter:title" content={meta.title} />
      <meta name="twitter:description" content={meta.description} />
      <meta name="twitter:url" content={meta.url} />

      <link rel="manifest" href="/manifest.json" />
      <link rel="apple-touch-icon" href="/icons-192.png" />
      <meta name="theme-color" content="#000000" />
    </>
  );
}
