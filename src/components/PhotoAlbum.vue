<script setup lang="ts" generic="T extends Photo = Photo">
import type { ComponentPublicInstance } from 'vue'
import { CSSProperties, computed, ref, toRefs, watch } from 'vue'
import {
  PhotoAlbumProps,
  PhotoAlbumEmits,
  Photo,
  LayoutTypes,
  LayoutPhotoSlotContext,
  RowsLayoutOptions,
  ColumnsLayoutOptions
} from '@/types'
import {
  resolveResponsiveParameter,
  unwrapParameter
} from '@/utils/responsives'
import useContainerWidth from '@/composables/useContainerWidth'
import RowsLayout from '@/components/layouts/RowsLayout.vue'
import ColumnsLayout from '@/components/layouts/ColumnsLayout.vue'
import MasonryLayout from '@/components/layouts/MasonryLayout.vue'
import PhotoRenderer from '@/components/renderers/PhotoRenderer.vue'

const props = defineProps<PhotoAlbumProps<T>>()
const {
  photos,
  layout,
  targetRowHeight,
  rowConstraints,
  columns,
  spacing,
  padding,
  sizes,
  breakpoints,
  defaultContainerWidth,
  containerRenderer,
  rowRenderer,
  columnRenderer,
  photoRenderer
} = toRefs(props)

const emit = defineEmits<PhotoAlbumEmits<T>>()

function resolveLayoutOptions<T extends Photo>({
  layout,
  containerWidth,
  targetRowHeight,
  rowConstraints,
  columns,
  spacing,
  padding,
  sizes
}: Omit<PhotoAlbumProps<T>, 'photos'> & {
  containerWidth: number
}) {
  const commonOptions = {
    layout,
    containerWidth,
    spacing: resolveResponsiveParameter(
      spacing,
      containerWidth,
      [20, 15, 10, 5]
    ),
    padding: resolveResponsiveParameter(
      padding,
      containerWidth,
      [0, 0, 0, 0, 0]
    ),
    sizes
  }

  const rowsOptions = {
    targetRowHeight: resolveResponsiveParameter(
      targetRowHeight,
      containerWidth,
      [(w) => w / 5, (w) => w / 4, (w) => w / 3, (w) => w / 2]
    ),
    rowConstraints: unwrapParameter(rowConstraints, containerWidth)
  }

  const columnsOptions = {
    columns: resolveResponsiveParameter(
      columns,
      containerWidth,
      [5, 4, 3, 2],
      1
    )
  }

  switch (layout) {
    case LayoutTypes[0]:
      return Object.assign({}, commonOptions, rowsOptions) as RowsLayoutOptions
    case LayoutTypes[1]:
    case LayoutTypes[2]:
      return Object.assign(
        {},
        commonOptions,
        columnsOptions
      ) as ColumnsLayoutOptions
    default:
      return undefined
  }
}

const containerRef = ref<HTMLElement | ComponentPublicInstance>()

const { containerWidth } = useContainerWidth(
  containerRef,
  breakpoints.value,
  defaultContainerWidth.value
)
const layoutOptions = ref<ReturnType<typeof resolveLayoutOptions<T>>>()

const isUnknownLayout = computed(() => {
  return layout.value === undefined || !LayoutTypes.includes(layout.value)
})

const className = computed(() => [
  'photo-album',
  `photo-album-${isUnknownLayout.value ? 'unknown' : layout.value}`
])

const style = computed<CSSProperties>(() => {
  return {
    display: 'flex',
    flexDirection: layout.value === 'rows' ? 'column' : 'row',
    flexWrap: 'nowrap',
    justifyContent: 'space-between'
  }
})

const containerComponent = computed(() => {
  return {
    is: containerRenderer.value ?? 'div',
    props: {}
  }
})

const layoutComponent = computed(() => {
  if (isUnknownLayout.value) {
    return undefined
  }
  switch (layout.value) {
    case LayoutTypes[0]:
      return {
        is: RowsLayout,
        props: {
          photos: photos.value,
          layoutOptions: layoutOptions.value as RowsLayoutOptions,
          rowRenderer: rowRenderer.value
        }
      }
    case LayoutTypes[1]:
      return {
        is: ColumnsLayout,
        props: {
          photos: photos.value,
          layoutOptions: layoutOptions.value as ColumnsLayoutOptions,
          columnRenderer: columnRenderer.value
        }
      }
    case LayoutTypes[2]:
      return {
        is: MasonryLayout,
        props: {
          photos: photos.value,
          layoutOptions: layoutOptions.value as ColumnsLayoutOptions,
          columnRenderer: columnRenderer.value
        }
      }
    default:
      return undefined
  }
})

const handlePhotoClick = (
  event: MouseEvent,
  ctx: LayoutPhotoSlotContext<T>
) => {
  const photo = ctx.photo
  const index = ctx.layout.index
  emit('click', { event, photo, index })
}

watch(
  [
    containerWidth,
    layout,
    targetRowHeight,
    rowConstraints,
    columns,
    spacing,
    padding,
    sizes,
    containerRenderer,
    rowRenderer,
    columnRenderer,
    photoRenderer
  ],
  ([
    containerWidthValue,
    layoutValue,
    targetRowHeightValue,
    rowConstraintsValue,
    columnsValue,
    spacingValue,
    paddingValue,
    sizesValue
  ]) => {
    layoutOptions.value = resolveLayoutOptions<T>({
      containerWidth: containerWidthValue ?? 0,
      layout: layoutValue,
      targetRowHeight: targetRowHeightValue,
      rowConstraints: rowConstraintsValue,
      columns: columnsValue,
      spacing: spacingValue,
      padding: paddingValue,
      sizes: sizesValue
    })
  },
  {
    immediate: true
  }
)
</script>

<template>
  <component
    :is="containerComponent.is"
    :class="className"
    :style="style"
    ref="containerRef"
  >
    <div v-if="isUnknownLayout">Unknown Layout</div>
    <template v-else>
      <component
        v-if="layoutComponent"
        :is="layoutComponent.is"
        v-bind="layoutComponent.props"
      >
        <template #default="slotContext">
          <PhotoRenderer
            v-bind="slotContext"
            :renderer="photoRenderer"
            :clickable="$props.onClick !== undefined"
            @click="handlePhotoClick($event, slotContext)"
          />
        </template>
      </component>
    </template>
  </component>
</template>
