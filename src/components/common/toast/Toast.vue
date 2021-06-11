<template>
  <div class="toast" v-show="isShow">
    <div>{{ message }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isShow: false,
      message: "",
    };
  },
  methods: {
    show(message = "isOK", delay = 2000) {
      this.isShow = true;
      this.message = message;
      setTimeout(() => {
        this.isShow = false;
        this.message = "";
      }, delay);
    },
  },
};
</script>

<style>
.toast {
  position: fixed;
  top: 50%;
  left: 50%;
  z-index: 99999;
  transform: translate(-50%);
  background-color: rgb(0, 0, 0, 0.6);
  padding: 4px 8px;
  color: #fff;
}
</style>
