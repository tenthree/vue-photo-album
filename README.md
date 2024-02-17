# Vue Photo Album

Vue Photo Album is a responsive photo gallery component for `Vue 3`.
It supports rows, columns, and masonry layouts and customizable renderer components.
Inspired by [Igor Danchenko](https://github.com/igordanchenko) / [react-photo-album](https://github.com/igordanchenko/react-photo-album).

## Install

```bash
npm install vue-photo-album
```

## Basic Setup

```vue
<script setup>
import { ref } from 'vue'
import { PhotoAlbum } from 'vue-photo-album'

const photos = ref([
  {
    "src": "https://source.unsplash.com/gKXKBY-C-Dk/1080x743",
    "key": "gKXKBY-C-Dk",
    "width": 1080,
    "height": 743,
    "srcSet": [
      {
        "src": "https://source.unsplash.com/gKXKBY-C-Dk/640x440",
        "width": 640,
        "height": 440
      },
      {
        "src": "https://source.unsplash.com/gKXKBY-C-Dk/256x176",
        "width": 256,
        "height": 176
      }
    ]
  },
  {
    "src": "https://source.unsplash.com/75715CVEJhI/1080x1513",
    "key": "75715CVEJhI",
    "width": 1080,
    "height": 1513
    "srcSet": [
      {
        "src": "https://source.unsplash.com/75715CVEJhI/640x896",
        "width": 640,
        "height": 896
      },
      {
        "src": "https://source.unsplash.com/75715CVEJhI/256x359",
        "width": 256,
        "height": 359
      }
    ]
  }
])
</script>

<template>
  <PhotoAlbum :photos="photos" layout="rows" />
</template>
```

## Documentation

More details here https://tenthree.github.io/vue-photo-album
