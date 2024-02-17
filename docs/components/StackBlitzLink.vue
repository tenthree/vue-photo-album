<script setup lang="ts">
defineProps<{
  url: string
}>()
</script>

<template>
  <a
    class="stackblitz-link"
    :href="url"
    target="_blank"
    rel="noopener noreferrer"
  >
    <svg
      viewBox="0 0 28 28"
      aria-hidden="true"
      class="_boltIcon_yct9u_9 _boltIcon_blue_yct9u_14"
      height="24"
      width="24"
      style="fill: currentColor"
    >
      <path
        d="M12.747 16.273h-7.46L18.925 1.5l-3.671 10.227h7.46L9.075 26.5l3.671-10.227z"
      ></path>
    </svg>
    <span>StackBlitz</span>
  </a>
</template>

<style>
.vp-doc .stackblitz-link {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  margin: 1.5rem 0 1.5rem auto;
  padding: 0.6rem 1rem;
  width: 130px;
  color: white;
  text-decoration: none;
  background: #1389fd;
  border-radius: 4px;
}

.vp-doc .stackblitz-link:hover {
  color: white;
}
</style>
