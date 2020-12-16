import * as ogs from 'open-graph-scraper'

export type LinkPreview = {
  ogTitle: string
  ogDescription: string
  ogImageUrl: string
  ogVideoUrl?: string
  ogAudioUrl?: string
  type: string
  // type: keyof typeof LinkType
}

export async function generateLinkPreview(url: string) {
  const data = await ogs({
    url,
  })
  const { error, result } = data
  if (!error) {
    if (result.success) {
      const {
        ogTitle,
        ogDescription,
        ogImage,
        ogVideo,
        ogAudio,
        ogType,
      } = result
      console.log(result!)
      const preview: LinkPreview = {
        ogTitle: ogTitle!,
        ogDescription: ogDescription!,
        ogImageUrl: ogImage!.url,
        ogVideoUrl: ogVideo?.url,
        ogAudioUrl: ogAudio,
        type: ogType! as string,
      }
      console.log('preview', preview)
      return preview
    } else throw Error('INVALID_URL')
  } else throw Error('INVALID_URL')
}
