# Properties

> [!NOTE]
> The `*` symbol indicates a required property.

## photos`*`
> An array of photos to display in the photo album.

### Type

| Type | Default Value | Required |
| ---- | :-----------: | :------: |
| [`Photo[]`](/appendix/type-definitions#photo) | undefined | Yes |

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

## layout`*`
> Photo album layout type

### Type

| Type | Default Value | Required |
| ---- | :-----------: | :------: |
| [`LayoutType`](/appendix/type-definitions#layouttype) | undefined | Yes |

```ts
type LayoutType = 'rows' | 'columns' | 'masonry'
```

## spacing
> Spacing(in px) between images like css gap property.

### Type

| Type | Default Value | Required |
| ---- | :-----------: | :------: |
| [`ResponsiveParameter`](/appendix/type-definitions#responsiveparameter) | see below | No |

```ts
type ResponsiveParameter =
  | number
  | (containerWidth: number) => number
```

### Usage

* Number as value

```vue
<script setup lang="ts">
// A number
const spacing = ref(20)
</script>

<template>
  <PhotoAlbum :spacing="spacing" />
</template>
```

* Getter as value

```vue
<script setup lang="ts">
// A getter, and this is default value for spacing
const spacing = (containerWidth: number) => {
  if (containerWidth >= 1200) {
    return 20
  } else if (containerWidth >= 600 && containerWidth < 1200) {
    return 15
  } else if (containerWidth >= 300 && containerWidth < 600) {
    return 10
  }
  return 5
}
</script>

<template>
  <PhotoAlbum :spacing="spacing" />
</template>
```

## padding
> Padding(in px) around each image in the photo album.

### Type

| Type | Default Value | Required |
| ---- | :-----------: | :------: |
| [`ResponsiveParameter`](/appendix/type-definitions#responsiveparameter) | 0 | No |

```ts
type ResponsiveParameter =
  | number
  | (containerWidth: number) => number
```

## target-row-height
> Set a specified row height(in px) in the `rows` layout.

### Type

| Type | Default Value | Required |
| ---- | :-----------: | :------: |
| `ResponsiveParameter` | see below | No |

```ts
type ResponsiveParameter =
  | number
  | (containerWidth: number) => number
```

### Usage

* Number as value

```vue
<script setup lang="ts">
// A number
const rowHeight = ref(300)
</script>

<template>
  <PhotoAlbum layout="rows" :target-row-height="rowHeight" />
</template>
```

* Getter as value

```vue
<script setup lang="ts">
// A getter, and this is default value for target-row-height
const rowHeight = (containerWidth: number) => {
  if (containerWidth >= 1200) {
    return containerWidth / 5
  } else if (containerWidth >= 600 && containerWidth < 1200) {
    return containerWidth / 4
  } else if (containerWidth >= 300 && containerWidth < 600) {
    return containerWidth / 3
  }
  return containerWidth / 2
}
</script>

<template>
  <PhotoAlbum layout="rows" :target-row-height="rowHeight" />
</template>
```

## row-constraints
> Set additional row constraints in the `rows` layout.

### Type

| Type | Default Value | Required |
| ---- | :-----------: | :------: |
| [`ResponsiveParameter`](/appendix/type-definitions#responsiveparameter) [`<RowConstraints>`](/appendix/type-definitions#rowconstraints) | undefined | No |

```ts
type ResponsiveParameter<RowConstraints> =
  | RowConstraints
  | (containerWidth: number) => RowConstraints

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

## columns
> Set a number of columns in the `columns` or `masonry` layout.

### Type

| Type | Default Value | Required |
| ---- | :-----------: | :------: |
| [`ResponsiveParameter`](/appendix/type-definitions#responsiveparameter) | see below | No |

```ts
type ResponsiveParameter =
  | number
  | (containerWidth: number) => number
```

### Usage

* Number as value

```vue
<script setup lang="ts">
// A number
const columns = ref(5)
</script>

<template>
  <PhotoAlbum layout="columns" :columns="columns" />
</template>
```

* Getter as value

```vue
<script setup lang="ts">
// A getter, and this is default value for columns
const columns = (containerWidth: number) => {
  if (containerWidth >= 1200) {
    return 5
  } else if (containerWidth >= 600 && containerWidth < 1200) {
    return 4
  } else if (containerWidth >= 300 && containerWidth < 600) {
    return 3
  }
  return 2
}
</script>

<template>
  <PhotoAlbum layout="columns" :columns="columns" />
</template>
```

## sizes
> Set the photo album `container width` rules for various viewport sizes.

### Type

| Type | Default Value | Required |
| ---- | :-----------: | :------: |
| [`ResponsiveSizes`](/appendix/type-definitions#responsivesizes) | 100vw | No |

> [!NOTE]
> This is only applicable when you provide multi-resolution image files in the photo's `srcSet` property.<br /><br />
> By default, PhotoAlbum assumes 100vw as its on-screen horizontal dimension. To improve the accuracy of the sizes attribute on individual images, you can describe the photo album dimensions under various media conditions via the `sizes` property.

```ts
type ResponsiveSizes = {
  size: string
  sizes?: {
    viewport: string
    size: string
  }[]
}
```

### Usage

> [!TIP]
> For example, this documentation website uses the following
sizes value to account for content container padding and
photo album width at various breakpoints:

```vue
<script setup lang="ts">
const sizes = ref({
  size: '688px',
  sizes: [
    { viewport: '(max-width: 767px)', size: 'calc(100vw - 48px)' }
  ]
})
</script>

<template>
  <PhotoAlbum :sizes="sizes" />
</template>
```

## breakpoints
> Set responsive breakpoints for the photo album container.

### Type

| Type | Default Value | Required |
| ---- | :-----------: | :------: |
| `number[]` | [300, 600, 1200] | No |

## default-container-width
> Default container width for `SSR` stage to prerender `<img>` tags. e.g. Nuxt.

### Type

| Type | Default Value | Required |
| ---- | :-----------: | :------: |
| `number` | undefined | No |

> [!TIP]
> You may need to set a `default-container-width` when running in an SSR environment.
