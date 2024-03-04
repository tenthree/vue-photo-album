import { Photo } from '@/index'
import photos from './unsplash-with-author.json'

export type PhotoAuthor = {
  name: string
  link: string
}

export type AlbumPhoto = {
  id: string
  key: string
  slug: string
  width: number
  height: number
  index?: number
  author?: PhotoAuthor
}

export type GetPhotosOptions = ImageUrlOptions & {
  limited?: number
  withSrcset?: boolean
  withAuthor?: boolean
}

export type ImageUrlOptions = {
  withNuxtImage?: boolean
  withIpx?: boolean
  withUnsplashSourceDomain?: boolean
  withFakeImgDomain?: boolean
  fakeImgOptions?: FakeImgOptions
}

export type FakeImgOptions = {
  bgColor?: string
  textColor?: string
  text?: string | ((photo: AlbumPhoto) => string)
}

const defaultPhotos: AlbumPhoto[] = [...photos]

const breakpoints = [1080, 640, 384, 256, 128, 96, 64, 48]

const createImageUrl = (photo: AlbumPhoto, options?: ImageUrlOptions) => {
  const { id, key, width: w, height: h } = photo
  const {
    withNuxtImage = false,
    withIpx = false,
    withUnsplashSourceDomain = false,
    withFakeImgDomain = false,
    fakeImgOptions = {}
  } = options ?? {}
  if (withNuxtImage) {
    return withIpx ? `/${id}.jpeg` : id
  }
  if (withFakeImgDomain) {
    let {
      bgColor = 'cccccc',
      textColor = '909090',
      text = undefined
    } = fakeImgOptions
    bgColor = bgColor.replace(/^#/, '')
    textColor = textColor.replace(/^#/, '')
    text = encodeURIComponent(
      typeof text === 'function' ? text(photo) : text ?? `#${photo.index}`
    )
    return `https://fakeimg.pl/${w}x${h}/${bgColor}/${textColor}/?text=${text}&font=noto`
  }
  return withUnsplashSourceDomain
    ? `https://source.unsplash.com/${key}/${w}x${h}`
    : `https://images.unsplash.com/${id}?w=${w}&h=${h}`
}

export const rand = <T>(source: T[]) => {
  const arr = source.slice()
  for (let i = arr.length - 1; i >= 0; i -= 1) {
    const r = Math.floor(Math.random() * i)
    ;[arr[i], arr[r]] = [arr[r], arr[i]]
  }
  return arr
}

export const getPhotos = (options?: GetPhotosOptions) => {
  const {
    limited,
    withSrcset = false,
    withAuthor = false,
    withFakeImgDomain = false
  } = options ?? {}
  return defaultPhotos
    .slice(0, limited)
    .map<Photo & { id?: string; slug?: string; author?: PhotoAuthor }>(
      (photo, index) => {
        const photoWithIndex = { ...photo, index }
        return {
          src: createImageUrl(photoWithIndex, options),
          key: photo.key,
          width: photo.width,
          height: photo.height,
          srcSet: withSrcset
            ? breakpoints.map((breakpoint) => {
                const width = breakpoint
                const height = Math.round(
                  (photo.height / photo.width) * breakpoint
                )
                const rwdPhoto = { ...photoWithIndex, width, height }
                const src = createImageUrl(rwdPhoto, options)
                return { src, width, height }
              })
            : undefined,
          ...(withAuthor && !withFakeImgDomain
            ? {
                id: photo.id,
                slug: photo.slug,
                author: photo.author
              }
            : undefined)
        }
      }
    )
}

export default getPhotos({ withUnsplashSourceDomain: true })
