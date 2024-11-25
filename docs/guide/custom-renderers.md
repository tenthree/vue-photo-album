<script setup lang="ts">
import { type GetPhotosOptions } from '../components/photos.ts'
import CustomContainer from '../components/CustomContainer.vue'
import CustomRow from '../components/CustomRow.vue'
import CustomColumn from '../components/CustomColumn.vue'
import CustomPhoto from '../components/CustomPhoto.vue'

const photosOptions: GetPhotosOptions = {
  withFakeImg: true,
  fakeImgOptions: { bgColor: '#008080', textColor: '#ffffff' }
}
</script>

# Custom Renderers

> [!NOTE]
> The photo album includes several major parts in its component structure. These are: container, row, column, and photo renderers. You can customize each of them with metadata properties to fit your requirements.

## container-renderer
> Allows providing a custom single root component to render the container. The component should define `defineProps<ContainerRendererMetadata>()` and contain a `default <slot />` for rendering the descendant content.

### Type

| Type | Default Value | Required |
| ---- | :-----------: | :------: |
| `Component` [`<ContainerRendererMetadata>`](/appendix/type-definitions#containerrenderermetadata) | undefined | No |

```ts
type PhotoRendererMetadata = {
  photos: Photo[]
  layoutOptions: LayoutOptions
}

type LayoutOptions = RowsLayoutOptions | ColumnsLayoutOptions

type CommonLayoutOptions = {
  spacing: number
  padding: number
  containerWidth: number
  sizes?: ResponsiveSizes
}

type RowsLayoutOptions = CommonLayoutOptions & {
  layout: 'rows'
  targetRowHeight: number
  rowConstraints: RowConstraints
}

type ColumnsLayoutOptions = CommonLayoutOptions & {
  layout: 'columns' | 'masonry'
  columns: number
}
```

### Usage

::: code-group
```vue [App.vue]
<script setup lang="ts">
import CustomContainer from './CustomContainer.vue'
</script>

<template>
  <PhotoAlbum :container-renderer="CustomContainer" />
</template>
```

```vue [CustomContainer.vue]
<script setup lang="ts">
import { type ContainerRendererMetadata } from 'vue-photo-album'

defineProps<ContainerRendererMetadata>()
</script>

<template>
  <div class="custom-container">
    <slot />
  </div>
</template>

<style>
.custom-container {
  position: relative;
  padding: 15px;
  border: 1px solid teal;
  border-radius: 10px;
  overflow: hidden;
}
</style>
```
:::

### Example

<br />
<DemoPhotoAlbum
  v-bind="photosOptions"
  layout="rows"
  :container-renderer="CustomContainer"
  :with-srcset="true"
/>

## row-renderer
> Allows providing a custom single root component to render each row. The component should define `defineProps<RowRendererMetadata>()` and contain a `default <slot />` for rendering the descendant content.

### Type

| Type | Default Value | Required |
| ---- | :-----------: | :------: |
| `Component` [`<RowRendererMetadata>`](/appendix/type-definitions#rowrenderermetadata) | undefined | No |

```ts
type RowRendererProps = {
  layoutOptions: RowsLayoutOptions
  rowData: { photo: Photo; layout: PhotoLayout }[]
  rowIndex: number
  rowsCount: number
}

type PhotoLayout = {
  width: number
  height: number
  index: number
  photoIndex: number
  photosCount: number
}
```

### Usage

::: code-group
```vue [App.vue]
<script setup lang="ts">
import CustomRow from './CustomRow.vue'
</script>

<template>
  <PhotoAlbum
    layout="rows"
    :row-renderer="CustomRow"
  />
</template>
```

```vue [CustomRow.vue]
<script setup lang="ts">
import { type RowRendererMetadata } from 'vue-photo-album'

defineProps<RowRendererMetadata>()
</script>

<template>
  <div class="custom-row">
    <slot />
  </div>
</template>

<style>
.custom-row {
  position: relative;
  padding: 15px;
  border: 1px solid teal;
  border-radius: 10px;
  overflow: hidden;
}
</style>
```
:::

### Example

<br />
<DemoPhotoAlbum
  v-bind="photosOptions"
  layout="rows"
  :row-renderer="CustomRow"
  :with-srcset="true"
/>

## column-renderer
> Allows providing a custom single root component to render each column. The component should define `defineProps<ColumnRendererMetadata>()` and contain a `default <slot />` for rendering the descendant content.

### Type

| Type | Default Value | Required |
| ---- | :-----------: | :------: |
| `Component` [`<ColumnRendererMetadata>`](/appendix/type-definitions#columnrenderermetadata) | undefined | No |

```ts
type ColumnRendererMetadata = {
  layoutOptions: ColumnsLayoutOptions
  columnData: { photo: Photo; layout: PhotoLayout }[]
  columnIndex: number
  columnsCount: number
  columnsGaps?: number[]
  columnsRatios?: number[]
}

type PhotoLayout = {
  width: number
  height: number
  index: number
  photoIndex: number
  photosCount: number
}
```

### Usage

::: code-group
```vue [App.vue]
<script setup lang="ts">
import CustomColumn from './CustomColumn.vue'
</script>

<template>
  <PhotoAlbum
    layout="columns"
    :column-renderer="CustomColumn"
  />
</template>
```

```vue [CustomColumn.vue]
<script setup lang="ts">
import { type ColumnRendererMetadata } from 'vue-photo-album'

defineProps<ColumnRendererMetadata>()
</script>

<template>
  <div class="custom-column">
    <slot />
  </div>
</template>

<style>
.custom-column {
  position: relative;
  padding: 15px;
  border: 1px solid teal;
  border-radius: 10px;
  overflow: hidden;
}
</style>
```
:::

### Example

<br />
<DemoPhotoAlbum
  v-bind="photosOptions"
  layout="columns"
  :column-renderer="CustomColumn"
  :with-srcset="true"
/>

## photo-renderer
> A custom single root component to render each `photo`. The component should define `defineProps<PhotoRendererMetadata>()` and optionally contain a default <slot /> for rendering the \<img\> tag.

### Type

| Type | Default Value | Required |
| ---- | :-----------: | :------: |
| `Component` [`<PhotoRendererMetadata>`](/appendix/type-definitions#photorenderermetadata) | undefined | No |

```ts
type PhotoRendererMetadata = {
  imageProps: ImgHTMLAttributes
  photo: Photo
  layout: PhotoLayout
  layoutOptions: LayoutOptions
  clickable?: boolean
}
```

### Usage

::: code-group
```vue [App.vue]
<script setup lang="ts">
import CustomPhoto from './CustomPhoto.vue'
</script>

<template>
  <PhotoAlbum
    layout="rows"
    :photo-renderer="CustomPhoto"
  />
</template>
```

```vue [CustomPhoto.vue]
<script setup lang="ts">
import { type PhotoRendererMetadata } from 'vue-photo-album'

defineProps<PhotoRendererMetadata>()
</script>

<template>
  <div class="custom-photo">
    <div class="custom-photo__img">
      <slot />
    </div>
  </div>
</template>

<style>
.custom-photo {
  position: relative;
  padding: 15px;
  border: 1px solid teal;
  border-radius: 10px;
  overflow: hidden;
}

.custom-photo__img {
  position: absolute;
  inset: 10px;
  border-radius: 5px;
  overflow: hidden;
}
</style>
```
:::

### Example

<br />
<DemoPhotoAlbum
  v-bind="photosOptions"
  layout="rows"
  :photo-renderer="CustomPhoto"
  :with-srcset="true"
/>
