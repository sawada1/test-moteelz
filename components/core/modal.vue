  <template>
    <transition name="modal-fade">
      <div class="modal-overlay" @click="$emit('close-modal')">

        <div class="modal" :style="{'width':width,'height':height}" @click.stop>
          <div class="close" @click="$emit('close-modal')">
            <div class="flex justify-between">

              <div class="title">
                <slot name="title"></slot>
              </div>

              <Icon name="mdi:window-close"
                    class="text-primary close-img  h-5 w-5 "/>
            </div>


          </div>
          <hr>
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
    top: 0;
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
    height: 500px;
    width: 700px;
    margin-top: 10px;
  /* //margin-bottom: 10px; padding: 10px 0; */
    border-radius: 20px;
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
    width: 25px;
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
