import { default as opengraph } from 'ts-open-graph-scraper'

export type LinkPreview = {
  ogSiteName?: string
  ogTitle?: string
  ogDescription?: string
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
    ogSiteName: ogSiteName ? ogSiteName.toString() : undefined,
    ogTitle: ogTitle ? ogTitle : undefined,
    ogDescription: ogDescription ? ogDescription : undefined,
    ogImageUrl: ogImage ? ogImage[0].url : url,
    ogVideoUrl: ogVideo ? ogVideo[0].url : undefined,
    ogAudioUrl: ogAudio ? (ogAudio as string) : undefined,
    embeddedUrl: twitterPlayer ? twitterPlayer[0].url : undefined,
    type: ogType ? ogType : 'undefined',
    color: getColor(ogSiteName as string),
  }

  console.log('preview', preview)

  return preview
}

function getColor(name: string) {
  console.log('getColor ~ name', name)
  if (name === undefined) return undefined
  switch (name.toLocaleLowerCase()) {
    case 'spotify':
      return '#1DB954'

    case 'youtube':
      return '#FF0000'

    default:
      return undefined
  }
}
