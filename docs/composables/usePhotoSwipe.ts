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
