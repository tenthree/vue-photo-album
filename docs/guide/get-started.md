---
map:
  path: '/guide/get-started/'
---

<script setup lang="ts">
import TheBasicUsage from '../components/TheBasicUsage.vue'
</script>

# Get Started

> [!info]
> First, this package is not an original creation. While working on a previous Next.js website project, I discovered and utilized the handy 👍 [`react-photo-album`](https://github.com/igordanchenko/react-photo-album) package, which perfectly met my requirements. However, I did not find a corresponding package for Vue.js. Therefore, drawing inspiration from that project, I extensively referenced and adapted it to the Vue.js ecosystem. This adaptation allows me to seamlessly implement similar functionalities in Vue3 projects. Much appreciation to the original author of the package, [`Igor Danchenko`](https://github.com/igordanchenko).

## Installation

```bash
npm install vue-photo-album
```

## Register Component

### Global

```ts
// Global registration
import VuePhotoAlbum from 'vue-photo-album'

createApp()
  .use(VuePhotoAlbum)
  .mount('#app')
```

### Local

```vue
<script setup>
// Local registration
import { PhotoAlbum } from 'vue-photo-album'
</script>
```

## Photos Data

### Type

```ts
type Image = {
  src: string
  width: number
  height: number
}

type Photo = Image & {
  key?: string
  alt?: string
  title?: string
  srcSet?: Image[]
}
```

::: details photos.json
<<< ../assets/photos.json
:::

## Basic Setup

```vue
<script setup>
import { ref } from 'vue'
import { PhotoAlbum } from 'vue-photo-album'
import data from './photos.json'

const photos = ref(data)
</script>

<template>
  <PhotoAlbum :photos="photos" layout="rows" />
</template>
```

<DemoPhotoAlbum layout="rows" :with-srcset="true" />
