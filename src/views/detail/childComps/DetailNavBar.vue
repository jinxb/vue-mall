<template>
  <div>
    <nav-bar>
      <div slot="left" class="back" @click="backClick">
        <img src="~assets/img/common/back.svg" alt="">
      </div>
      <div slot="center" class="title">
        <div
          class="title-item"
          v-for="(item, index) in titles"
          @click="itemClick(index)"
          :class="{active: index===currentIndex}"
        >
          {{ item }}
        </div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";

export default {
  name: "detailNavBar",
  data() {
    return {
      titles: ["商品", "参数", "评论", "推荐"],
      currentIndex:0
    };
  },
  components: {
    NavBar,
  },
  methods: {
    itemClick(index) {
      this.currentIndex = index;
      this.$emit('titleClick',this.currentIndex);
    },
    backClick(){
      this.$router.back();
    }
  },
};
</script>

<style scoped>
.title {
  display: flex;
  font-size: 14px;
}
.title-item {
  flex: 1;
}
.active{
  color: var(--color-high-text);
}
.back{
  margin-top: 6px;
  
}
</style>