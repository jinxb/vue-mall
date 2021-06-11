import { debounce } from "common/utils"
import {BACK_POSTION} from "common/const"

import BackTop from "components/content/backTop/BackTop"

export const itemListennerMixin = {
  data() {
    return {
      itemListenner: null,
      newRefresh: null
    }
  },
  mounted() {
    // 直接使用混入中的属性
    this.newRefresh = debounce(this.$refs.scroll.refresh, 100);
    //主要是利用闭包将timer保存下来 每次请求如果前面一次请求没到时间还没执行，就清除定时器重新设置
    this.itemListenner = () => {
      this.newRefresh()
    }
    this.$bus.$on("itemImageLoad", this.itemListenner);
    // console.log("混入");
  },
}


export const backTopMixin = {
  components: {
    BackTop
  },
  data() {
    return {
      isShowBackTop: false,
    }
  },
  methods: {
    backTopClick() {
      this.$refs.scroll.scrollTo(0, 0, 500);
    },
    listenShowBackTop(position){
      this.isShowBackTop = -position.y > BACK_POSTION;
    }
  }
}