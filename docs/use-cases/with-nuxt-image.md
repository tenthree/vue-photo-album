<script setup lang="ts">
import PhotoSwipeAdapter from '../components/PhotoSwipeAdapter.vue'
</script>

# With NuxtImage
> `NuxtImage` - Plug-and-play image optimization for Nuxt apps. Resize and transform your images using built-in optimizer or your favorite images CDN.
> * [Website](https://image.nuxt.com/)
> * [Github Repo](https://github.com/nuxt/image)

::: tip
The vue-photo-album has built-in responsive image functionality out of the box.
When you use Nuxt, you can still choose to use the responsive image feature from
the NuxtImage module.

To integrate with the NuxtImage module, you could also achieve it by customizing
 the photo renderer with `<NuxtImg />` component and `sizes` property.

https://image.nuxt.com/usage/nuxt-img#sizes

It is worth noting that NuxtImage has its own default `screen` settings for
 breakpoints. You can check the details here:

https://image.nuxt.com/get-started/configuration#screens
:::

## Usage

::: code-group
```ts [nuxt.config.ts]
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxt/image'],
  image: {
    provider: 'unsplash',
    unsplash: {
      baseURL: 'https://images.unsplash.com/',
      modifiers: {
        fm: 'jpg',
        crop: 'entropy',
        fit: 'crop'
      }
    }
  }
})
```

```vue [App.vue]
<script setup lang="ts">
import { PhotoAlbum } from 'vue-photo-album'
import CustomPhotoNuxtImageAdapter from './CustomPhotoNuxtImageAdapter.vue'
import data from './unsplash.json'

const photos = ref(data);
</script>

<template>
  <PhotoAlbum
    layout="rows"
    :photos="photos"
    :default-container-width="1200"
    :photo-renderer="CustomPhotoNuxtImageAdapter"
  />
</template>
```

```vue [CustomPhotoNuxtImageAdaper.vue]
<script setup lang="ts">
import { type PhotoRendererMetadata } from 'vue-photo-album'

const props = defineProps<PhotoRendererMetadata>()

const nuxtImgProps = computed(() => {
  const {
    src,
    width,
    height,
    sizes: imgSize,
    loading,
    decoding,
    title,
    alt,
  } = props.imageProps
  const sizes = 'xs sm md lg xl xxl 2xl'
    .split(' ')
    .map((screen) => `${screen}:${imgSize}`)
    .join(' ')
  return { src, width, height, sizes, loading, decoding, title, alt }
})
</script>

<template>
  <NuxtImg v-bind="nuxtImgProps" />
</template>
```

<<< ../assets/unsplash.json
:::

## Example

<iframe src="https://stackblitz.com/edit/nuxt-starter-so2yws?embed=1&view=preview&file=App.vue" style="width: 100%; height: 700px; border: none;" />

<br />
<StackBlitzLink url="https://stackblitz.com/edit/nuxt-starter-so2yws?file=App.vue" />