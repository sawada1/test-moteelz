<template>
    <transition name="modal-fade">
      <div class="modal-overlay" :style="{'top':height}" @click="$emit('close-modal')">
  
        <div class="modal" :style="{'width':width}"  @click.stop>
          <!-- <div class="close" @click="$emit('close-modal')">
            <div class="flex justify-between">
              <div class="title">
                <slot name="title"></slot>
              </div>
              <Icon name="mdi:window-close"
                    class="text-primary close-img  h-5 w-5 "/>
            </div>
          </div>
          <hr> -->
          <slot name="content"></slot>
        </div>
  
      </div>
    </transition>
  </template>
  
  <script lang="ts" setup>
  const props = defineProps({
    width: {
      type: String,
      default: "700px"
    },
    height: {
      type: String,
      default: "500px"
    },

  })
  </script>
  
  <style scoped>

  .modal-overlay {
    position: fixed;
    top: 70%;
    bottom: 0;
    left: 0;
    z-index: 9999999;
    right: 0;
    display: flex;
    justify-content: center;
    background-color: rgb(66 66 66 / 14%)
  }
  

  .modal {
    text-align: end;
    background-color: white;
    height: 100%;
    width: 700px;
    margin-top: 10px;
    border-radius: 20px;
  }
  
  .close {
    margin: 5px 0 0 16px;
    cursor: pointer;
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
  