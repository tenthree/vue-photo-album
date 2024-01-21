import type { Component, ImgHTMLAttributes } from 'vue'

export const LayoutTypes = ['rows', 'columns', 'masonry'] as const
export type LayoutType = (typeof LayoutTypes)[number]

export type PhotoAlbumProps<T extends Photo = Photo> = {
  // An array of photos to display in the photo album.
  photos: T[]
  // Photo album layout type.
  layout: LayoutType
  // A number of columns in the `columns` or `masonry` layout.
  columns?: ResponsiveParameter
  // Spacing between images.
  spacing?: ResponsiveParameter
  // Padding around each image in the photo album.
  padding?: ResponsiveParameter
  // Target row height in the 'rows' layout.
  targetRowHeight?: ResponsiveParameter
  // Additional row constraints in the `rows` layout.
  rowConstraints?: ResponsiveParameter<RowConstraints>
  // Photo album container width at various viewport sizes.
  sizes?: ResponsiveSizes
  // Responsive breakpoints.
  breakpoints?: number[]
  // Default container width for SSR stage.
  defaultContainerWidth?: number
  // The event handler for clicking on a photo item
  onClick?: PhotoClickHandler<T>
  // Give a custom single root component as container renderer component that includes a default <slot />.
  containerRenderer?: Component<ContainerRendererMetadata>
  // Give a custom single root component as row renderer component that includes a default <slot />.
  rowRenderer?: Component<RowRendererMetadata>
  // Give a custom single root component as column renderer component that includes a default <slot />.
  columnRenderer?: Component<ColumnRendererMetadata>
  // Give a custom single root component as photo renderer component that includes defineProps<PhotoRendererMetadata> and an optional default <slot />.
  photoRenderer?: Component<PhotoRendererMetadata>
}

export type PhotoAlbumEmits<T extends Photo = Photo> = {
  // NOTE:
  // There is an issue for missing on[Event] prop with custom event.
  // Add a onClick prop in the PhotoAlbumProps to make it workaround.
  // https://github.com/vuejs/core/issues/5220
  click: [PhotoClickPayload<T>]
}

export type PhotoClickPayload<T extends Photo = Photo> = {
  event: MouseEvent
  photo: T
  index: number
}

export type PhotoClickHandler<T extends Photo = Photo> = (
  payload: PhotoClickPayload<T>
) => void

export type PhotoRendererProps<T extends Photo = Photo> = {
  photo: T
  layout: PhotoLayout
  layoutOptions: LayoutOptions
  clickable?: boolean
  renderer?: Component<PhotoRendererMetadata>
}

export type RowRendererProps<T extends Photo = Photo> = {
  layoutOptions: RowsLayoutOptions
  rowData: { photo: T; layout: PhotoLayout }[]
  rowIndex: number
  rowsCount: number
  renderer?: Component<RowRendererMetadata>
}

export type ColumnRendererProps<T extends Photo = Photo> = {
  layoutOptions: ColumnsLayoutOptions
  columnData: { photo: T; layout: PhotoLayout }[]
  columnIndex: number
  columnsCount: number
  columnsGaps?: number[]
  columnsRatios?: number[]
  renderer?: Component<ColumnRendererMetadata>
}

export type ContainerRendererProps<T extends Photo = Photo> = {
  photos: T[]
  layoutOptions: LayoutOptions
}

export type PhotoRendererMetadata = Omit<PhotoRendererProps, 'renderer'> & {
  imageProps: ImgHTMLAttributes
}

export type RowRendererMetadata = Omit<RowRendererProps, 'renderer'>

export type ColumnRendererMetadata = Omit<ColumnRendererProps, 'renderer'>

export type ContainerRendererMetadata = ContainerRendererProps

export type Image = {
  src: string
  width: number
  height: number
}

export type Photo = Image & {
  key?: string
  alt?: string
  title?: string
  srcSet?: Image[]
}

export type ResponsiveParameterGetter<T = number> = (
  containerWidth: number
) => T

export type ResponsiveParameter<T = number> = T | ResponsiveParameterGetter

export type ResponsiveSizes = {
  size: string
  sizes?: Array<{
    viewport: string
    size: string
  }>
}

export type PhotoLayout = {
  width: number
  height: number
  index: number
  photoIndex: number
  photosCount: number
}

export type CommonLayoutOptions = {
  spacing: number
  padding: number
  containerWidth: number
  sizes?: ResponsiveSizes
}

export type RowsLayoutOptions = CommonLayoutOptions & {
  layout: Extract<LayoutType, 'rows'>
  targetRowHeight: number
  rowConstraints: RowConstraints
}

export type ColumnsLayoutOptions = CommonLayoutOptions & {
  layout: Extract<LayoutType, 'columns' | 'masonry'>
  columns: number
}

export type LayoutOptions = RowsLayoutOptions | ColumnsLayoutOptions

export type RowConstraints = {
  minPhotos?: number
  maxPhotos?: number
  singleRowMaxHeight?: number
}

export type Optional<T, K extends keyof T> = Partial<Pick<T, K>> & Omit<T, K>

export type NonOptional<T, K extends keyof T> = Required<Pick<T, K>> &
  Omit<T, K>

export type LayoutPhotoSlotContext<T> = {
  photo: T
  layout: PhotoLayout
  layoutOptions: LayoutOptions
}
