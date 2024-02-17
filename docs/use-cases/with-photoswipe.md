<script setup lang="ts">
import PhotoSwipeAdapter from '../components/PhotoSwipeAdapter.vue'
</script>

# With PhotoSwipe
> `PhotoSwipe` - JavaScript image gallery and lightbox
> * [Website](https://photoswipe.com/)
> * [Github Repo](https://github.com/dimsemenov/photoswipe)

## Usage

::: code-group
```vue [App.vue]
<script setup lang="ts">
import { ref } from 'vue'
import { PhotoAlbum } from 'vue-photo-album'
import usePhotoSwipe from './usePhotoSwipe.ts'
import CustomPhotoSwipeAdapter from './CustomPhotoSwipeAdapter.vue'
import data from './photos.json'

const photos = ref(data)
usePhotoSwipe({ gallery: '#demo', children: 'a' })
</script>

<template>
  <div>
    <PhotoAlbum
      id="demo"
      layout="rows"
      :photos="photos"
      :photo-renderer="CustomPhotoSwipeAdapter"
    />
  </div>
</template>
```

```vue [CustomPhotoSwipeAdaper.vue]
<script setup lang="ts">
import { computed } from 'vue'
import { type PhotoRendererMetadata } from 'vue-photo-album'

const props = defineProps<PhotoRendererMetadata>()
const largePhoto = computed(() => props.photo.srcSet?.[0] ?? props.photo)
</script>

<template>
  <a
    :href="largePhoto.src"
    :data-pswp-width="largePhoto.width"
    :data-pswp-height="largePhoto.height"
    :data-pswp-srcset="imageProps.srcset"
    target="_blank"
    rel="noopener noreferrer"
  >
    <slot />
  </a>
</template>

```

```ts [usePhotoSwipe.ts]
import {
  type Ref,
  type MaybeRefOrGetter,
  onMounted,
  onUnmounted,
  ref,
  watch,
  toValue,
  nextTick
} from 'vue'
import PhotoSwipeLightbox, { type PhotoSwipeOptions } from 'photoswipe/lightbox'
import 'photoswipe/style.css'

export type UsePhotoSwipe = {
  lightbox: Ref<PhotoSwipeLightbox | undefined>
}

export const usePhotoSwipe = (
  pswpOptions: MaybeRefOrGetter<PhotoSwipeOptions>
): UsePhotoSwipe => {
  const lightbox = ref<PhotoSwipeLightbox>()

  const init = () => {
    destroy()
    const options = toValue(pswpOptions ?? {})
    lightbox.value = new PhotoSwipeLightbox({
      pswpModule: () => import('photoswipe'),
      ...options
    })
    lightbox.value.init()
  }

  const destroy = () => {
    if (lightbox.value !== undefined) {
      lightbox.value.destroy()
      lightbox.value = undefined
    }
  }

  watch(
    () => toValue(pswpOptions),
    () => nextTick(init)
  )

  onMounted(() => {
    init()
  })

  onUnmounted(() => {
    destroy()
  })

  return { lightbox }
}

export default usePhotoSwipe
```

<<< ../assets/photos.json
:::

## Example

<br />
<DemoPhotoSwipeAlbum />

<StackBlitzLink url="https://stackblitz.com/edit/vitejs-vite-s7zjtd?file=src%2FApp.vue" />