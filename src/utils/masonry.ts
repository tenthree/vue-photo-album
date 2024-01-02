import { ColumnsLayoutOptions, Photo, PhotoLayout } from '@/types'
import ratio from '@/utils/ratio'

export type MasonryLayoutModel<T extends Photo = Photo> =
  | Array<
      Array<{
        photo: T
        layout: PhotoLayout
      }>
    >
  | undefined

export type ComputeMasonryLayoutProps<T extends Photo = Photo> = {
  photos: T[]
  layoutOptions: ColumnsLayoutOptions
}

export default function computeMasonryLayout<T extends Photo = Photo>(
  props: ComputeMasonryLayoutProps<T>
): MasonryLayoutModel<T> {
  const { photos, layoutOptions } = props
  const { containerWidth, spacing, padding, columns } = layoutOptions

  const columnWidth =
    (containerWidth - spacing * (columns - 1) - 2 * padding * columns) / columns

  if (columnWidth <= 0) {
    return columns > 1
      ? computeMasonryLayout({
          ...props,
          layoutOptions: { ...layoutOptions, columns: columns - 1 }
        })
      : undefined
  }

  const columnsCurrentTopPositions = Array.from({ length: columns }, () => 0)

  const columnsModel = photos.reduce<Array<Array<{ photo: T; index: number }>>>(
    (model, photo, index) => {
      // find the shortest column index
      const shortestColumnIndex = columnsCurrentTopPositions.reduce(
        (currentShortestColumn, item, itemIndex) =>
          item < columnsCurrentTopPositions[currentShortestColumn] - 1
            ? itemIndex
            : currentShortestColumn,
        0
      )
      // update top position by the shortest column index
      columnsCurrentTopPositions[shortestColumnIndex] +=
        columnWidth / ratio(photo) + spacing + 2 * padding
      // place a photo into the shortest column
      model[shortestColumnIndex].push({ photo, index })
      return model
    },
    Array.from({ length: columns }, () => [])
  )

  return columnsModel.map((column) => {
    return column.map(({ photo, index }, photoIndex) => {
      const layout = {
        width: columnWidth,
        height: columnWidth / ratio(photo),
        photosCount: column.length,
        index,
        photoIndex
      }
      return { photo, layout }
    })
  })
}
