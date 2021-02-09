import { unfurl } from 'unfurl.js'

export type LinkPreview = {
  ogSiteName?: string
  ogTitle?: string
  ogDescription?: string
  ogImageUrl?: string
  embeddedUrl?: string
  type: string
  color?: string
}
export async function generateLinkPreview(url: string) {
  try {
    const result = await unfurl(url)
    console.log('generateLinkPreview ~ result', result)
    const openGraph = result.open_graph
    const twitterCard = result.twitter_card
    const oEmbed = result.oEmbed

    const preview: LinkPreview = {
      ogSiteName: openGraph?.title ? twitterCard.site : result.title,
      ogTitle: oEmbed?.author_name ?? openGraph?.title ?? undefined,
      ogDescription:
        oEmbed?.title ?? openGraph?.description ?? result.description,
      ogImageUrl: openGraph?.images ? openGraph?.images[0].url : url,
      embeddedUrl: twitterCard?.players
        ? twitterCard.players[0].url
        : undefined,
      type: openGraph?.type ?? 'website',
    }
    console.log('gen ~ preview', preview)
    return preview
  } catch (error) {
    console.log('generateLinkPreview ~ error', error)
    return { type: 'Error' } as LinkPreview
  }
}
