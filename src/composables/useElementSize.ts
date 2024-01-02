import type { Ref } from 'vue'
import { ref, watch } from 'vue'

export type ElementSize = {
  width: number
  height: number
}

export default function useElementSize(
  target: Ref<HTMLElement>,
  initialSize: ElementSize = { width: 0, height: 0 }
) {
  const width = ref(initialSize.width)
  const height = ref(initialSize.height)
  let observer: ResizeObserver | undefined

  function disconnect() {
    if (observer !== undefined) {
      observer.disconnect()
      observer = undefined
    }
  }

  function connect(element: HTMLElement) {
    disconnect()
    if (element === undefined) {
      return
    }
    observer = new ResizeObserver((entries) => {
      const rect = entries[0]?.contentRect
      width.value = rect.width
      height.value = rect.height
    })
    observer.observe(element)
  }

  watch(target, (element) => {
    if (element !== undefined) {
      connect(element)
    } else {
      disconnect()
    }
  })

  return { width, height }
}
