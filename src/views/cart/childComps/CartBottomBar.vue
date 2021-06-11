<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button
        class="check-button"
        :isChecked="isSelectAll"
        @click.native="checkClick"
      ></check-button>
      <span>全选</span>
    </div>

    <div class="totalPrice">合计:{{ totalPrice }}</div>

    <div class="calculate" @click="calcClick">去计算({{ checkLength }})</div>
  </div>
</template>

<script>
import CheckButton from "components/common/checkButton/CheckButton";
import { mapGetters } from "vuex";
export default {
  name: "cartBottomBar",
  computed: {
    ...mapGetters(["cartList"]),
    totalPrice() {
      return (
        "￥" +
        this.cartList
          .filter((item) => {
            return item.checked;
          })
          .reduce((preValue, item) => {
            return preValue + item.newPrice * item.count;
          }, 0)
          .toFixed(2)
      );
    },
    checkLength() {
      return this.cartList.filter((item) => item.checked).length;
    },
    isSelectAll() {
      // 1.如果没找到
      if (this.cartList.length === 0) {
        return false;
      } else {
        // return !(this.cartList.filter((item) => !item.checked).length);
        return !this.cartList.find((item) => !item.checked);
      }
    },
  },
  components: {
    CheckButton,
  },
  methods: {
    checkClick() {
      if (this.isSelectAll) {
        //全部选中
        this.cartList.forEach((item) => {
          item.checked = false;
        });
      } else {
        //有部分或者全部不选中
        this.cartList.forEach((item) => {
          item.checked = true;
        });
      }
      // 此处不能简化
      // this.cartList.forEach(item => item.checked = !this.isSelectAll)
    },
    calcClick(){
      if (!this.isSelectAll){
       this.$toast.show("未选择商品")
      }
    }
  },
};
</script>

<style scoped>
.bottom-bar {
  position: relative;
  display: flex;

  height: 40px;
  line-height: 40px;

  background-color: #eee;

  font-size: 14px;
}
.check-button {
  width: 20px;
  height: 20px;
  line-height: 20px;
  margin-right: 10px;
}

.check-content {
  /* width: 20px;
    height: 20px; */
  display: flex;
  align-items: center;
  width: 70px;
}

.totalPrice {
  margin-left: 10px;
  flex: 1;
}

.calculate {
  width: 90px;
  background-color: red;
  color: #fff;
  text-align: center;
}
</style>