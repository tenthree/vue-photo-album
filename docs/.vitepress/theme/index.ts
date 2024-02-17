import { type Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import VuePhotoAlbum from '../../../src/index'
import DemoPhotoAlbum from '../../components/DemoPhotoAlbum.vue'
import DemoPhotoSwipeAlbum from '../../components/DemoPhotoSwipeAlbum.vue'
import StackBlitzLink from '../../components/StackBlitzLink.vue'
import './style.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app
      .use(VuePhotoAlbum)
      .component('DemoPhotoAlbum', DemoPhotoAlbum)
      .component('DemoPhotoSwipeAlbum', DemoPhotoSwipeAlbum)
      .component('StackBlitzLink', StackBlitzLink)
  }
} satisfies Theme
