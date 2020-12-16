import * as ogs from 'open-graph-scraper'

enum LinkType {
  'website',
  'video.other',
}

type LinkPreview = {
  ogTitle: string
  ogDescription: string
  imageUrl: string
  ogUrl: string
  ogImage: LinkType
}

export async function generateLinkPreview(url: string) {
  const data = await ogs({ url })
  const { error, result } = data
  if (!error) {
    //TODO: Typescript Bug, only success exitsts on result
    const preview: LinkPreview = { ...((result as unknown) as LinkPreview) }
    return preview
  } else throw Error('INVALID_URL')
}
