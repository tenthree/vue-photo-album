<script setup lang="ts">
import { ref } from 'vue'
import type { PhotoClickHandler, PhotoClickPayload  } from '@/src/index'
const clicked = ref<PhotoClickPayload>()
const onClick: PhotoClickHandler = (payload) => {
  clicked.value = payload
}
</script>

# Events

## @click
> The `@click` event is triggered when the user clicks on a photo.

### Type

| Event Name | Handler Type | Payload Type |
| ---------- | :----------: | :----------: |
| `click` | [`PhotoClickHandler`](/appendix/type-definitions#photoclickhandler) | [`PhotoClickPayload`](/appendix/type-definitions#photoclickpayload) |

```ts
type PhotoClickHandler = (payload: PhotoClickPayload) => void

type PhotoClickPayload = {
  event: MouseEvent
  photo: Photo
  index: number
}
```

### Usage

```vue
<script setup lang="ts">
const onClick: PhotoClickHandler = (payload) => {
  console.log(payload)
}
</script>

<template>
  <PhotoAlbum @click="onClick" />
</template>
```
### Example

<div style="margin: 20px 0; padding: 10px 14px; color: var(--vp-c-text-2); border: 1px solid var(--vp-c-divider)">
  <template v-if="clicked" >
    <div>Clicked on photo index = {{ clicked?.index }} 👏👏👏</div>
    <pre style="text-wrap: wrap">{{ JSON.stringify(clicked?.photo, null, 2) }}</pre>
  </template>
  <span v-else>No photo has been clicked yet, try it! 👇</span>
</div>
<DemoPhotoAlbum layout="rows" @click="onClick" />
