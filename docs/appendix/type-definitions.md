# Type Definitions

## PhotoAlbumProps

```ts
type PhotoAlbumProps<T extends Photo = Photo> = {
  // An array of photos to display in the photo album.
  photos: T[]

  // Photo album layout type.
  layout: LayoutType

  // Spacing between images.
  spacing?: ResponsiveParameter

  // Padding around each image in the photo album.
  padding?: ResponsiveParameter

  // Target row height in the 'rows' layout.
  targetRowHeight?: ResponsiveParameter

  // Additional row constraints in the `rows` layout.
  rowConstraints?: ResponsiveParameter<RowConstraints>

  // A number of columns in the `columns` or `masonry` layout.
  columns?: ResponsiveParameter

  // Photo album container width at various viewport sizes.
  sizes?: ResponsiveSizes

  // Responsive breakpoints.
  breakpoints?: number[]

  // Default container width for SSR stage.
  defaultContainerWidth?: number

  // Allows providing a custom single root component to render the container.
  // The component should define `defineProps<ContainerRendererMetadata>()` and
  // contain a `default <slot />` for rendering the descendant content.
  containerRenderer?: Component<ContainerRendererMetadata>

  // Allows providing a custom single root component to render each row.
  // The component should define defineProps<RowRendererMetadata>() and
  // contain a default <slot /> for rendering the descendant content.
  rowRenderer?: Component<RowRendererMetadata>

  // Allows providing a custom single root component to render each column.
  // The component should define defineProps<ColumnRendererMetadata>() and
  // contain a default <slot /> for rendering the descendant content.
  columnRenderer?: Component<ColumnRendererMetadata>

  // A custom single root component to render each `photo`.
  // The component should define `defineProps<PhotoRendererMetadata>()` and
  // optionally contain a default <slot /> for rendering the \<img\> tag.
  photoRenderer?: Component<PhotoRendererMetadata>
}
```

## PhotoAlbumEmits

```ts
type PhotoAlbumEmits<T extends Photo = Photo> = {
  click: [PhotoClickPayload<T>]
}
```

## PhotoClickHandler

```ts
type PhotoClickHandler<T extends Photo = Photo> = (
  payload: PhotoClickPayload<T>
) => void
```

## PhotoClickPayload

```ts
type PhotoClickPayload<T extends Photo = Photo> = {
  event: MouseEvent
  photo: T
  index: number
}
```

## LayoutType

```ts
type LayoutType = 'rows' | 'columns' | 'masonry'
```

## Photo

```ts
type Image = {
  src: string
  width: number
  height: number
}

type Photo = Image & {
  // optional `key` property for photo rendering
  key?: string
  // optional image `alt` attribute
  alt?: string
  // optional image `title` attribute
  title?: string
  // optional image `srcset` attribute
  srcSet?: Image[]
}
```

## ResponsiveParameter

```ts
type ResponsiveParameter<T = number> =
  | T
  | (containerWidth: number) => T
```

## ResponsiveSizes

```ts
type ResponsiveSizes = {
  size: string
  sizes?: Array<{
    viewport: string
    size: string
  }>
}
```

## RowConstraints

```ts
type RowConstraints = {
  // Minimum number of photos per row
  minPhotos?: number
  // Maximum number of photos per row
  maxPhotos?: number
  // Maximum row height when there is not
  // enough photos to fill more than one row
  singleRowMaxHeight?: number
}
```

## PhotoLayout

```ts
type PhotoLayout = {
  width: number
  height: number
  index: number
  photoIndex: number
  photosCount: number
}
```

## LayoutOptions

```ts
type LayoutOptions = RowsLayoutOptions | ColumnsLayoutOptions

type RowsLayoutOptions = CommonLayoutOptions & {
  layout: Extract<LayoutType, 'rows'>
  targetRowHeight: number
  rowConstraints?: RowConstraints
}

type ColumnsLayoutOptions = CommonLayoutOptions & {
  layout: Extract<LayoutType, 'columns' | 'masonry'>
  columns: number
}

type CommonLayoutOptions = {
  spacing: number
  padding: number
  containerWidth: number
  sizes?: ResponsiveSizes
}
```

## ContainerRendererMetadata

```ts
export type ContainerRendererMetadata<T extends Photo = Photo> = {
  photos: T[]
  layoutOptions: LayoutOptions
}
```

## RowRendererMetadata

```ts
type RowRendererMetadata<T extends Photo = Photo> = {
  layoutOptions: RowsLayoutOptions
  rowData: { photo: T; layout: PhotoLayout }[]
  rowIndex: number
  rowsCount: number
  renderer?: Component<RowRendererMetadata>
}
```

## ColumnRendererMetadata

```ts
type ColumnRendererMetadata<T extends Photo = Photo> = {
  layoutOptions: ColumnsLayoutOptions
  columnData: { photo: T; layout: PhotoLayout }[]
  columnIndex: number
  columnsCount: number
  columnsGaps?: number[]
  columnsRatios?: number[]
  renderer?: Component<ColumnRendererMetadata>
}
```

## PhotoRendererMetadata

```ts
type PhotoRendererMetadata<T extends Photo = Photo> = {
  imageProps: ImgHTMLAttributes
  photo: T
  layout: PhotoLayout
  layoutOptions: LayoutOptions
  clickable?: boolean
}
```
