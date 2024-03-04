import type { ComponentPublicInstance, Ref } from 'vue'
import { onUnmounted, ref, unref, watch } from 'vue'

function resolveContainerWidth(
  element?: HTMLElement,
  breakpoints?: readonly number[]
) {
  let width = element?.clientWidth
  if (
    width !== undefined &&
    breakpoints !== undefined &&
    breakpoints.length > 0
  ) {
    const sorted = breakpoints.filter((bp) => bp > 0).sort((a, b) => b - a)
    sorted.push(Math.floor(sorted[sorted.length - 1] / 2))
    const threshold = width
    width = sorted.find(
      (breakpoint, index) =>
        breakpoint <= threshold || index === sorted.length - 1
    )
  }
  return width
}

const unwrapRefElement = (
  ref: Ref<HTMLElement | ComponentPublicInstance | undefined>
) => {
  const element = unref(ref)
  return element === undefined || element instanceof HTMLElement
    ? element
    : element.$el
}

export default function useContainerWidth(
  target: Ref<HTMLElement | ComponentPublicInstance | undefined>,
  breakpoints?: readonly number[],
  defaultContainerWidth?: number
) {
  const containerWidth = ref(defaultContainerWidth)
  const element = ref<HTMLElement>()
  let observer: ResizeObserver | undefined

  const updateWidth = () => {
    containerWidth.value = resolveContainerWidth(element.value, breakpoints)
  }

  const disconnect = () => {
    if (observer === undefined) {
      return
    }
    observer.disconnect()
    observer = undefined
  }

  const connect = (element?: HTMLElement) => {
    disconnect()
    if (element === undefined || typeof ResizeObserver === 'undefined') {
      return
    }
    observer = new ResizeObserver(updateWidth)
    observer.observe(element)
  }

  watch(
    target,
    (targetValue) => {
      if (targetValue !== undefined) {
        element.value = unwrapRefElement(target)
        connect(element.value)
      } else {
        disconnect()
      }
    },
    {
      immediate: true,
      flush: 'post'
    }
  )

  onUnmounted(() => {
    disconnect()
  })

  return { containerWidth }
}
