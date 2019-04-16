<template>
<transition name="mf-dialog">
  <div class="dialog" v-show="value">
      <div class="dialog-mask" @click="$emit('input', false)"></div>
      <div class="dialog-body" v-show="value">
        <slot></slot>
      </div>
  </div>
</transition>
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped>
.dialog {
  position: fixed;
  z-index: 1000;
  right: 0;
  bottom: 0;
  left: 0;
  backface-visibility: hidden;
}
.dialog-mask {
  position: fixed;
  z-index: 1000;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(0, 0, 0, .8);
}

.dialog-body {
  position: fixed;
  z-index: 5000;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 80%;
}

.mf-dialog-enter,
.mf-dialog-leave-active {
  opacity: 0;
}
.mf-dialog-leave-active,
.mf-dialog-enter-active {
  transition: opacity 300ms!important;
}
</style>