<template>
  <div>
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4.50516 4C4.52697 4.19631 4.74315 4.3491 4.86475 4.48718C5.51983 5.2311 6.24235 5.88233 6.95848 6.56352C7.55222 7.1283 8.16071 7.6812 8.75062 8.24546C9.71729 9.1701 10.711 10.0551 11.6505 10.9946C12.5649 11.9089 13.5688 12.6829 14.446 13.6277C14.7848 13.9925 15.183 14.292 15.5306 14.6601C15.7425 14.8844 16.2978 15.4836 16.6152 15.4836"
        :stroke="color"
        stroke-width="2"
        stroke-linecap="round"
      />
      <path
        d="M3.98318 16.4232C6.65871 13.7477 9.31309 11.0195 12.1841 8.55864C12.936 7.91418 13.7023 7.29043 14.4229 6.6099C14.7275 6.32221 15.0486 5.80975 15.4668 5.67033"
        :stroke="color"
        stroke-width="2"
        stroke-linecap="round"
      />
    </svg>
  </div>
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      default: '#090909',
    },
  },
}
</script>

<style lang="scss" scoped></style>
