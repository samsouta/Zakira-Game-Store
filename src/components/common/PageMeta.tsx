// src/components/PageMeta.tsx
import { Helmet } from "react-helmet-async"

type PageMetaProps = {
  title?: string
  description?: string
  keywords?: string
  image?: string
  url?: string
}

const PageMeta = ({
  title = "Zakari - Game Store",
  description = "Buy game accounts, top-ups, and digital products at Zakari.",
  keywords = "game store, top-up, digital goods, zakari, buy accounts, PUBG top-up, MLBB account, Mobile Legends account buy, Free Fire diamond, Roblox Robux buy, Razer Gold, Steam Wallet, buy UC, game account store, buy game credits, Myanmar game store, PUBG UC မြန်မာ, MLBB Diamond ဝယ်, မိုဘိုင်းလီဂျန်န့်အကောင့် ဝယ်, Free Fire Diamond မြန်မာ, ဂိမ်းအကောင့် ဝယ်, Robux ဝယ်, Steam Wallet Code ဝယ်, Zakari Game Store မြန်မာ, game top-up မြန်မာ",
  image = "https://zakari.site/card.jpg",
  url = "https://zakari.site/",
}: PageMetaProps) => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Zakari",
    url: "https://zakari.site/",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://zakari.site/search?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  }

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={url} />
      <meta name="theme-color" content="#FFD700" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content="Zakari" />
      <meta property="og:locale" content="en_US" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:site" content="@zakari_store" /> {/* Replace with real handle if exists */}

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  )
}

export default PageMeta
