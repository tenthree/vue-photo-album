import { describe, expect, it, vi } from 'vitest'
import { type VueWrapper, mount } from '@vue/test-utils'
import { shallowRef } from 'vue'
import {
  PhotoAlbum,
  type PhotoAlbumProps,
  type PhotoClickPayload
} from '@/index'
import { getPhotos } from './photos'
import CustomContainer from './CustomContainer.vue'
import CustomRow from './CustomRow.vue'
import CustomColumn from './CustomColumn.vue'
import CustomPhoto from './CustomPhoto.vue'

const photos = getPhotos({ withUnsplashSourceDomain: true, withSrcset: true })

const create = (options: Partial<PhotoAlbumProps>): VueWrapper => {
  const props = {
    photos,
    defaultContainerWidth: 800,
    ...options
    // @ts-expect-error
  } satisfies PhotoAlbumProps
  // @ts-ignore
  return mount(PhotoAlbum, { props })
}

const testSanpshot = (options: Partial<PhotoAlbumProps>) => {
  const wrapper = create(options)
  expect(wrapper.element).toMatchSnapshot()
  wrapper.unmount()
}

const treatVueWarnAsError = () => {
  const warn = console.warn
  return vi.spyOn(console, 'warn').mockImplementation((...args) => {
    const [msg, ..._] = args ?? []
    if (typeof msg === 'string' && msg.startsWith('[Vue warn]:')) {
      throw new Error(msg)
    } else {
      warn(...args)
    }
  })
}

describe('PhotoAlbum.vue', () => {
  it('renders with a warning when the required prop "layout" is missing.', () => {
    const warn = treatVueWarnAsError()
    // @ts-expect-error
    const props = { photos: [] } satisfies PhotoAlbumProps
    // @ts-ignore
    expect(() => mount(PhotoAlbum, { props })).toThrowError(
      '[Vue warn]: Missing required prop: "layout"'
    )
    warn.mockRestore()
  })

  it('renders with a warning when the required prop "photos" is missing.', () => {
    const warn = treatVueWarnAsError()
    // @ts-expect-error
    const props = { layout: 'rows' } satisfies PhotoAlbumProps
    let wrapper: VueWrapper | undefined
    expect(() => {
      // @ts-ignore
      wrapper = mount(PhotoAlbum, { props })
    }).toThrowError('[Vue warn]: Missing required prop: "photos"')
    wrapper?.unmount()
    warn.mockRestore()
  })

  it('renders with "Unknown Layout" text with invalid "layout" prop', () => {
    // @ts-expect-error
    const props = { layout: 'cool', photos: [] } satisfies PhotoAlbumProps
    // @ts-ignore
    const wrapper = mount(PhotoAlbum, { props })
    expect(wrapper.html()).toContain('Unknown Layout')
    wrapper.unmount()
  })

  it('renders a rows layout without crashing', () => {
    testSanpshot({ layout: 'rows' })
  })

  it('renders a columns layout without crashing', () => {
    testSanpshot({ layout: 'columns' })
  })

  it('renders a masonry layout without crashing', () => {
    testSanpshot({ layout: 'masonry' })
  })

  it('renders correctly with invalid defaultContainerWidth, defaultContainerWidth = -1', () => {
    const defaultContainerWidth = -1
    testSanpshot({ layout: 'rows', defaultContainerWidth })
  })

  it('renders a rows layout with padding, padding=15', () => {
    const padding = 15
    const props = {
      layout: 'rows',
      photos,
      defaultContainerWidth: 800,
      padding
    } satisfies PhotoAlbumProps
    const wrapper = mount(PhotoAlbum, { props })
    const imgs = wrapper.findAll('.photo-album__row > img')
    imgs.forEach((img) =>
      expect(img.attributes().style).toContain(`padding: ${padding}px`)
    )
    wrapper.unmount()

    testSanpshot(props)
  })

  it('supports minimum photos per row, minPhotos=3', () => {
    const minPhotos = 3
    const props = {
      layout: 'rows',
      photos,
      defaultContainerWidth: 400,
      rowConstraints: { minPhotos }
    } satisfies PhotoAlbumProps
    const wrapper = mount(PhotoAlbum, { props })
    const rows = wrapper.findAll('.photo-album__row')
    const numPhotosInRows = rows.map((row) => row.findAll('img').length)
    expect(numPhotosInRows.every((num) => num >= minPhotos)).toBe(true)
    wrapper.unmount()

    testSanpshot(props)
  })

  it('supports maximum photos per row, maxPhotos=4', () => {
    const maxPhotos = 4
    const props = {
      layout: 'rows',
      photos,
      defaultContainerWidth: 1920,
      rowConstraints: { maxPhotos }
    } satisfies PhotoAlbumProps
    const wrapper = mount(PhotoAlbum, { props })
    const rows = wrapper.findAll('.photo-album__row')
    const numPhotosInRows = rows.map((row) => row.findAll('img').length)
    expect(numPhotosInRows.every((num) => num <= maxPhotos)).toBe(true)
    wrapper.unmount()

    testSanpshot(props)
  })

  it('supports limiting a maximum row height when photos are not sufficient to fill the entire row, singleRowMaxHeight=100', () => {
    const singleRowMaxHeight = 100
    const props = {
      layout: 'rows',
      photos: photos.slice(0, 3),
      defaultContainerWidth: 800,
      rowConstraints: { singleRowMaxHeight }
    } satisfies PhotoAlbumProps
    const wrapper = mount(PhotoAlbum, { props })
    expect(wrapper.find('.photo-album').attributes().style).toContain(
      'max-width:'
    )
    wrapper.unmount()

    testSanpshot(props)
  })

  it('renders the columns layout correctly when there are fewer photos', () => {
    const columns = 5
    const numPhotos = 2
    const props = {
      layout: 'columns',
      photos: photos.slice(0, numPhotos),
      defaultContainerWidth: 800,
      columns
    } satisfies PhotoAlbumProps
    const wrapper = mount(PhotoAlbum, { props })
    const cols = wrapper.findAll('.photo-album__column')
    const imgs = wrapper.findAll('.photo-album__column > img')
    expect(cols.length).toEqual(columns)
    expect(imgs.length).toEqual(numPhotos)
    wrapper.unmount()

    testSanpshot(props)
  })

  it('renders the masonry layout correctly when there are fewer photos', () => {
    const columns = 5
    const numPhotos = 2
    const props = {
      layout: 'masonry',
      photos: photos.slice(0, numPhotos),
      defaultContainerWidth: 800,
      columns
    } satisfies PhotoAlbumProps
    const wrapper = mount(PhotoAlbum, { props })
    const cols = wrapper.findAll('.photo-album__column')
    const imgs = wrapper.findAll('.photo-album__column > img')
    expect(cols.length).toEqual(columns)
    expect(imgs.length).toEqual(numPhotos)
    wrapper.unmount()

    testSanpshot(props)
  })

  it('supports photo alt attribute', () => {
    const photosWithAlt = photos.map((photo) => {
      return { ...photo, alt: photo.src }
    })
    const props = {
      layout: 'rows',
      photos: photosWithAlt,
      defaultContainerWidth: 800
    } satisfies PhotoAlbumProps
    const wrapper = mount(PhotoAlbum, { props })
    const imgs = wrapper.findAll('.photo-album__row > img')
    imgs.forEach((img) => {
      expect(img.attributes('alt')).not.toBeUndefined()
    })
    wrapper.unmount()

    testSanpshot(props)
  })

  it('supports photo srcSet and sizes attributes', () => {
    const props = {
      layout: 'rows',
      photos,
      defaultContainerWidth: 800
    } satisfies PhotoAlbumProps
    const wrapper = mount(PhotoAlbum, { props })
    const imgs = wrapper.findAll('.photo-album__row > img')
    imgs.forEach((img) => {
      expect(img.attributes('sizes')).not.toBeUndefined()
      expect(img.attributes('srcset')).not.toBeUndefined()
    })
    wrapper.unmount()

    testSanpshot(props)
  })

  it('renders custom container renderer', () => {
    const containerRenderer = shallowRef(CustomContainer)
    const props = {
      layout: 'rows',
      photos,
      defaultContainerWidth: 800,
      containerRenderer
    } satisfies PhotoAlbumProps
    const wrapper = mount(PhotoAlbum, { props })
    expect(wrapper.find('.custom-container').exists()).toEqual(true)
  })

  it('renders custom row renderer', () => {
    const rowRenderer = shallowRef(CustomRow)
    const props = {
      layout: 'rows',
      photos,
      defaultContainerWidth: 800,
      rowRenderer
    } satisfies PhotoAlbumProps
    const wrapper = mount(PhotoAlbum, { props })
    const numRows = wrapper.findAll('.custom-row').length
    expect(numRows).toBeGreaterThan(0)

    testSanpshot(props)
  })

  it('renders custom column renderer', () => {
    const columnRenderer = shallowRef(CustomColumn)
    const props = {
      layout: 'columns',
      photos,
      defaultContainerWidth: 800,
      columnRenderer
    } satisfies PhotoAlbumProps
    const wrapper = mount(PhotoAlbum, { props })
    const numColumns = wrapper.findAll('.custom-column').length
    expect(numColumns).toBeGreaterThan(0)

    testSanpshot(props)
  })

  it('renders custom photo renderer', () => {
    const photoRenderer = shallowRef(CustomPhoto)
    const props = {
      layout: 'rows',
      photos,
      defaultContainerWidth: 800,
      photoRenderer
    } satisfies PhotoAlbumProps
    const wrapper = mount(PhotoAlbum, { props })
    const numPhotos = wrapper.findAll('.custom-photo').length
    expect(numPhotos).toEqual(photos.length)

    testSanpshot(props)
  })

  it('works with ResizeObserver', async () => {
    const observe = vi.fn()
    const unobserve = vi.fn()
    const disconnect = vi.fn()
    const ResizeObserverMock = vi.fn(() => ({ observe, unobserve, disconnect }))
    vi.stubGlobal('ResizeObserver', ResizeObserverMock)

    const wrapper = create({ layout: 'rows' })
    await wrapper.vm.$nextTick()
    wrapper.unmount()

    expect(observe).toHaveBeenCalledTimes(1)
    expect(unobserve).toHaveBeenCalledTimes(0)
    expect(disconnect).toHaveBeenCalledTimes(1)

    vi.unstubAllGlobals()
  })

  it('emits a click event with payload when clicked on a photo', () => {
    const wrapper = create({ layout: 'rows' })
    const photoWrappers = wrapper.findAll('.photo-album__photo')
    photoWrappers.at(0)?.trigger('click')
    photoWrappers.at(1)?.trigger('click')
    expect(wrapper.emitted()).toHaveProperty('click')
    expect(wrapper.emitted('click')?.length).toEqual(2)

    const clicks = wrapper.emitted('click')
    const firstClick = clicks?.[0]?.[0] as PhotoClickPayload
    const secondClick = clicks?.[1]?.[0] as PhotoClickPayload
    expect(firstClick).toMatchObject({ index: 0, photo: photos[0] })
    expect(secondClick).toMatchObject({ index: 1, photo: photos[1] })
  })
})
