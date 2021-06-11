<template>
  <div id="detail">
    <detail-nav-bar
      class="detail-nav"
      ref="navBar"
      @titleClick="titleClick"
    ></detail-nav-bar>
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scroll="contentScroll"
    >
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goodsInfo"></detail-base-info>
      <detail-shop-info :shop="shopInfo"></detail-shop-info>
      <detail-goods-info
        :detail-info="detailInfo"
        @imageload="imageLoad"
      ></detail-goods-info>
      <detail-param-info
        ref="params"
        :param-info="paramInfo"
      ></detail-param-info>
      <detail-comment-info
        ref="comment"
        :comment-info="commentInfo"
      ></detail-comment-info>
      <goods-list ref="recomment" :goods="recommends" />
    </scroll>
    <detail-bottom-bar @addToCart="addToCart"></detail-bottom-bar>
    <back-top @click.native="backTopClick" v-show="isShowBackTop" />
  </div>
</template>

<script>
import { mapActions } from "vuex";
import DetailNavBar from "./childComps/DetailNavBar";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
import DetailParamInfo from "./childComps/DetailParamInfo";
import DetailCommentInfo from "./childComps/DetailCommentInfo";
import DetailBottomBar from "./childComps/DetailBottomBar";

import Scroll from "components/common/scroll/Scroll";
import GoodsList from "components/content/goods/GoodsList";

import {
  getDetail,
  Goods,
  Shop,
  GoodsParam,
  getRecommend,
} from "network/detail";
import { debounce } from "common/utils";
import { itemListennerMixin, backTopMixin } from "common/mixin";

export default {
  name: "Detail",
  data() {
    return {
      iid: null,
      topImages: [],
      goodsInfo: {},
      shopInfo: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      themeTopYs: [],
      currentIndex: null,
      getThemeTopY: null,
    };
  },
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomBar,
    Scroll,
    GoodsList,
  },
  created() {
    // 1.保存传入的iid
    this.iid = this.$route.params.iid;

    // 2.根据iid请求详情页数据
    getDetail(this.iid).then((res) => {
      // 1.获取整体数据
      let data = res.result;
      // 2.获取顶部轮播图数据
      this.topImages = data.itemInfo.topImages;
      // 3.获取商品基本信息
      this.goodsInfo = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );
      // 4.创建店铺信息的对象
      this.shopInfo = new Shop(data.shopInfo);

      // 5.保存商品的详情数据
      this.detailInfo = data.detailInfo;

      // 6.获取参数的信息
      this.paramInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );

      // 7.获取评论信息
      if (data.rate.cRate !== 0) {
        // 取出一条
        this.commentInfo = data.rate.list[0];
      }
    }),
      // 3.请求推荐数据
      getRecommend().then((res) => {
        this.recommends = res.data.list;
      });
    this.getThemeTopY = debounce(() => {
      this.themeTopYs = [];
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.params.$el.offsetTop);
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      this.themeTopYs.push(this.$refs.recomment.$el.offsetTop);
      this.themeTopYs.push(Number.MAX_VALUE);
    });
  },
  mounted() {},
  mixins: [itemListennerMixin, backTopMixin],
  methods: {
    ...mapActions(["addCart"]),
    imageLoad() {
      // this.$refs.scroll.refresh();
      // 直接使用混入中的属性
      this.newRefresh();
      this.getThemeTopY();
    },
    titleClick(index) {
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 100);
    },
    addToCart() {
      // 1.获取购物车需要展示的信息
      const product = {};
      product.iid = this.iid;
      product.imgURL = this.topImages[0];
      product.title = this.goodsInfo.title;
      product.desc = this.goodsInfo.desc;
      product.newPrice = this.goodsInfo.realPrice;

      // 2.将商品添加到购物车中（）
      //添加到Store当中
      // this.$store.dispatch('addCart',product).then(res=>{
      //   console.log(res);
      // });
      // this.$store.commit('addCart',product);
      //将actions中的函数 映射到组件中
      this.addCart(product).then((res) => {
        // console.log(this.$toast);
        this.$toast.show(res);
      });
    },
    contentScroll(position) {
      //1.获取Y值
      const positionY = -position.y;
      // 2.判断BackTop是否显示
      this.listenShowBackTop(position);
      //2.positionY和主题中的值进行对比
      let length = this.themeTopYs.length;
      for (let i = 0; i < length - 1; i++) {
        //1.普通方法：
        // if (
        //   this.currentIndex !== i &&
        //   ((i < length - 1 &&
        //     positionY >= this.themeTopYs[i] &&
        //     positionY < this.themeTopYs[i + 1]) ||
        //     (i === length - 1 && positionY >= this.themeTopYs[i]))
        // ) {
        //   this.currentIndex = i;
        //   this.$refs.navBar.currentIndex = this.currentIndex;
        // }
        //     //2.hack方法
        if (
          this.currentIndex !== i &&
          positionY >= this.themeTopYs[i] &&
          positionY < this.themeTopYs[i + 1]
        ) {
          this.currentIndex = i;
          this.$refs.navBar.currentIndex = this.currentIndex;
        }
      }
    },
  },
};
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 10;
  background-color: #fff;
  height: 100vh;
  overflow: hidden;
}

.detail-nav {
  position: relative;
  z-index: 10;
  background-color: #fff;
}

.content {
  height: calc(100% - 44px - 49px);
}
</style>