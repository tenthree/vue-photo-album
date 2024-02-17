---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "Vue Photo Album"
  text: "Responsive gallery"
  tagline: A neat and tidy photo layout component.
  image:
    src: /logo.svg
    alt: vue-photo-album
  actions:
    - theme: brand
      text: Get Started
      link: /guide/get-started

features:
  - icon:
      src: ./assets/photo.svg
    title: Responsive image
    details: Automatically generates srcset for the img tag.
  - icon:
      src: ./assets/support.svg
    title: Customizable component
    details: Allows customization of container, row, column, and photo renderers.
  - icon:
      src: ./assets/scroll.svg
    title: SSR friendly
    details: Renders img HTML content on the server side.
---

<script setup lang="ts">
import { ref } from 'vue'
import CustomPhotoWithAuthor from './components/CustomPhotoWithAuthor.vue'

const sizes = ref({})
const rowConstraints = (containerWidth) => {
  if (containerWidth >= 900) {
    return undefined
  } else if (containerWidth >= 600) {
    return { maxPhotos: 3 }
  }
  return { maxPhotos: 2 }
}
</script>

<DemoPhotoAlbum
  layout="rows"
  :with-srcset="true"
  :with-author="true"
  :sizes="sizes"
  :row-constraints="rowConstraints"
  :photo-renderer="CustomPhotoWithAuthor"
  style="margin-top: 4rem"
/>
