<template>
  <div>
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect v-if="selected" width="16" height="16" rx="4" fill="#109CF1" />
      <rect
        x="1"
        y="1"
        width="14"
        height="14"
        rx="3"
        stroke="#D5D5D5"
        stroke-width="2"
      />
    </svg>
  </div>
</template>

<script>
export default {
  props: {
    selected: {
      type: Boolean,
    },
  },
};
</script>

<style lang="scss" scoped>
div {
  display: grid;
  place-items: center;
}
</style>