# Vue Photo Album

Vue Photo Album is a responsive photo gallery component for `Vue 3`.
It supports rows, columns, and masonry layouts and customizable renderer components.
Inspired by [Igor Danchenko](https://github.com/igordanchenko) / [react-photo-album](https://github.com/igordanchenko/react-photo-album).

[![NPM Version](https://img.shields.io/npm/v/vue-photo-album.svg?color=41B883)](https://www.npmjs.com/package/vue-photo-album)
[![Bundle Size](https://img.shields.io/bundlephobia/minzip/vue-photo-album.svg?color=41B883)](https://bundlephobia.com/package/vue-photo-album)
[![License MIT](https://img.shields.io/npm/l/vue-photo-album.svg?color=41B883)](https://github.com/tenthree/vue-photo-album/blob/main/LICENSE)

## Layouts

* Rows

  <img src="https://github.com/tenthree/vue-photo-album/assets/3132794/578b5f5d-0027-42b9-aeb2-58958feceb3b" width="300" alt="rows layout">

* Columns

  <img src="https://github.com/tenthree/vue-photo-album/assets/3132794/9acef743-3741-4261-a2f4-ea166f4d698c" width="300" alt="columns layout">

* Masonry

  <img src="https://github.com/tenthree/vue-photo-album/assets/3132794/59170b1a-cef9-4d41-80c3-4eafe9f6af00" width="300" alt="masonry layout">

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
