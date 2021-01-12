import * as ogs from 'open-graph-scraper'

export type LinkPreview = {
  ogSiteName: string
  ogTitle: string
  ogDescription: string
  ogImageUrl: string
  ogVideoUrl?: string
  ogAudioUrl?: string
  embeddedUrl?: string
  type: string
  color?: string
  // type: keyof typeof LinkType
}

export async function generateLinkPreview(url: string) {
  const data = await ogs({
    url,
  })
  const { error, result } = data as any
  if (!error) {
    if (result.success) {
      const {
        ogTitle,
        ogDescription,
        ogImage,
        ogVideo,
        ogAudio,
        ogType,
        twitterPlayer,
        ogSiteName,
      } = result
      console.log(result!)
      const preview: LinkPreview = {
        ogSiteName: ogSiteName!,
        ogTitle: ogTitle!,
        ogDescription: ogDescription!,
        ogImageUrl: ogImage!.url,
        ogVideoUrl: ogVideo?.url,
        ogAudioUrl: ogAudio,
        embeddedUrl: twitterPlayer.url,
        type: ogType! as string,
        color: getColor(ogSiteName),
      }

      return preview
    } else throw Error('INVALID_URL')
  } else throw Error('INVALID_URL')
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
