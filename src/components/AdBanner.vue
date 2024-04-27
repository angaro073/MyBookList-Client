<style scoped>
.toast img {
  width: 2rem;
  height: 2rem;
}
</style>

<template>
  <div class="toast-container position-fixed bottom-0 end-0 p-3" style="z-index: 1000000">
    <div
      v-for="(ad, index) in [
        { company: 'Company 1', content: 'Shop Now!' },
        { company: 'Company 2', content: 'Discover Our Products!' },
        { company: 'Company 3', content: 'We sell cheaper!' }
      ]"
      :key="index"
      id="liveToast"
      class="toast show"
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
    >
      <div class="toast-header">
        <img src="../assets/icons/ad-icon.svg" class="rounded me-2" alt="..." />
        <strong class="me-auto">{{ ad.company }}</strong>
        <small>{{ new Date().toLocaleTimeString() }}</small>
        <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
      </div>
      <div class="toast-body">
        {{ ad.content }}
      </div>
    </div>
  </div>
</template>
