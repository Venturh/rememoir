import { default as opengraph } from 'ts-open-graph-scraper'

export type LinkPreview = {
  ogSiteName: string
  ogTitle: string
  ogDescription: string
  ogImageUrl?: string
  ogVideoUrl?: string
  ogAudioUrl?: string
  embeddedUrl?: string
  type: string
  color?: string
}

export async function generateLinkPreview(url: string) {
  const data = await opengraph({
    url,
  })

  const {
    ogTitle,
    ogDescription,
    ogImage,
    ogVideo,
    ogAudio,
    ogType,
    twitterPlayer,
    ogSiteName,
  } = data
  const preview: LinkPreview = {
    ogSiteName: ogSiteName! as string,
    ogTitle: ogTitle ? ogTitle : 'No title',
    ogDescription: ogDescription ? ogDescription : 'No description',
    ogImageUrl: ogImage ? ogImage[0].url : undefined,
    ogVideoUrl: ogVideo ? ogVideo[0].url : undefined,
    ogAudioUrl: ogAudio ? (ogAudio as string) : undefined,
    embeddedUrl: twitterPlayer ? twitterPlayer[0].url : undefined,
    type: ogType!,
    color: getColor(ogSiteName as string),
  }

  console.log('preview', preview)

  return preview
}

function getColor(name: string) {
  switch (name.toLocaleLowerCase()) {
    case 'spotify':
      return '#1DB954'

    case 'youtube':
      return '#FF0000'

    default:
      return undefined
  }
}
