<script setup lang="ts">
import { computed } from 'vue'
import { type Photo, type PhotoRendererMetadata } from '@/index'
import OpenInNewIcon from './OpenInNewIcon.vue'

type PhotoWithAuthor = Photo & {
  id: string
  slug: string
  author: {
    name: string
    link: string
  }
}

const props = defineProps<PhotoRendererMetadata & { photo: PhotoWithAuthor }>()

const photoLink = computed(
  () => `https://unsplash.com/photos/${props.photo.slug}`
)
</script>

<template>
  <div class="custom-photo-with-author">
    <div class="custom-photo-with-author__image">
      <slot />
    </div>
    <div class="custom-photo-with-author__info">
      <a
        class="custom-photo-with-author__profile"
        :href="photo.author.link"
        :title="photo.author.name"
        target="_blank"
        rel="noopener noreferrer"
      >
        by {{ photo.author.name }}
      </a>
      <a
        class="custom-photo-with-author__photo"
        :href="photoLink"
        :title="photo.slug"
        target="_blank"
        rel="noopener noreferrer"
      >
        <OpenInNewIcon />
      </a>
    </div>
  </div>
</template>

<style>
.custom-photo-with-author {
  display: block;
  position: relative;
}

.custom-photo-with-author:hover .custom-photo-with-author__image {
  filter: saturate(100%);
}

.custom-photo-with-author__image {
  display: block;
  filter: saturate(40%);
  transition: filter 0.3s;
}

.custom-photo-with-author__info {
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-end;
  align-items: center;
  gap: 0.5em;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 0.25em 0.4em;
  overflow: hidden;
  mix-blend-mode: difference;
}

.custom-photo-with-author__photo {
  width: 24px;
  color: slategray;
}

.custom-photo-with-author__profile {
  color: slategray;
  text-align: right;
  white-space: nowrap;
  text-decoration: underline;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
