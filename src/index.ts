import type { App } from 'vue'
import PhotoAlbum from './components/PhotoAlbum.vue'

export * from '@/types'

export { PhotoAlbum }

export default {
  install(app: App) {
    app.component('PhotoAlbum', PhotoAlbum)
  }
}
