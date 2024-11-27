<script lang="ts" setup>
const props = defineProps({
  width: {
    type: String,
    default: '700px'
  },
  height: {
    type: String,
    default: '500px'
  }
})
</script>
<template>
  <transition name="modal-fade">
    <div class="modal-overlay" @click="$emit('close-modal')">
      <div class="modal" :style="{ width: width, height: height }" @click.stop>
        <slot name="content"></slot>
      </div>
    </div>
  </transition>
</template>



  <style scoped>
.modal-overlay {
  position: fixed;
  top: 1px;
  bottom: 1px;
  left: 0;
  z-index: 9999999;
  right: 0;
  display: flex;
  justify-content: center;
  background-color: rgb(66 66 66 / 14%);
}

.modal {
  background-color: white;
  height: 500px;
  width: 700px;
  margin-top: 10%;
  margin-bottom: 10%;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
}

.close {
  margin: 5px 0 0 16px;
  cursor: pointer;
}

.title {
  text-align: start;
  margin: 0 10px;
}

.close-img {
  /* width: 25px; */
  background-color: #ac003e;
  color: white;
  /* border-radius: 100%;
    padding: 1px 2px; */
}

.check {
  width: 150px;
}

h6 {
  font-weight: 500;
  font-size: 28px;
  margin: 20px 0;
}

p {
  /* font-weight: 500; */
  font-size: 16px;
  margin: 20px 0;
}

button {
  background-color: #ac003e;
  width: 150px;
  height: 40px;
  color: white;
  font-size: 14px;
  border-radius: 16px;
  margin-top: 50px;
}

.modal-fade-enter,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.5s ease;
}
</style>
