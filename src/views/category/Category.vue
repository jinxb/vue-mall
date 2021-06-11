<template>
	<div class="category">
		<nav-bar class="nav-bar">
			<div slot="center">商品分类</div>
		</nav-bar>
		<div class="cate-loyout">
			<category-left :category="category" @btnClick="maitKeyClick" />
			<scroll class="content" ref="scroll">
				<category-cont :subCategory="subCategory" @imgLoaded="imgLoaded" @detailClock="detailClock" />
				<category-goods :cateDetail="cateDetail" />
			</scroll>
		</div>
	</div>
</template>

<script>
	import Scroll from 'components/common/scroll/Scroll.vue'
	import NavBar from 'components/common/navbar/NavBar.vue'
	import CategoryCont from './childComps/CategoryCont.vue'
	import CategoryLeft from './childComps/CategoryLeft.vue'
	import categoryGoods from './childComps/categoryGoods.vue'
	import {debounce} from 'common/utils'
	import {
		getCategory,
		getSubCategory,
		getCategoryDetail
	} from 'network/getCategory.js'
	export default {
		name: 'Category',
		data() {
			return {
				category: [],
				subCategory: [],
				titles: ['pop', 'sell', 'new'],
				cateDetail: [],
				index: 0,
			}
		},
		components: {
			Scroll,
			NavBar,
			CategoryCont,
			CategoryLeft,
			categoryGoods
		},
		created() {
			this.getCategoryData();
			this.maitKeyClick(0, '10062603', '3627');
		},
		updated() {
			this.$refs.scroll.refresh();
		},
		activated() {
			this.$refs.scroll.refresh();
		},
		mounted() {
			const refresh = debounce(this.$refs.scroll.refresh, 50);
			this.$bus.$on('itemImageLoad', refresh);
		},
		methods: {
			maitKeyClick(index, miniWallkey, maitKey) {
				this.subCategory = [];
				//	console.log(miniWallkey);
				getSubCategory(maitKey).then(res => {
					this.subCategory.push(res.data.list)
				})
				//2
				this.detailGoods(miniWallkey);
			},
			detailGoods(miniWallkey) {
				this.cateDetail = [];
				getCategoryDetail(miniWallkey, this.titles[this.index]).then(res => {
					this.cateDetail.push(res);
					console.log(this.cateDetail);
				})
			},
			getCategoryData() {
				getCategory().then(res => {
					this.category.push(res.data.category.list)
				})
			},
			imgLoaded() {
				debounce(this.$refs.scroll.refresh, 50)
			},
			detailClock() {
				this.$toast.isShow('erro', 1000)
			}
		},
	}
</script>

<style scoped>
	.content {
		flex: 1;
		height: calc(100vh - 44px - 49px);
		overflow: hidden;
	}

	.nav-bar {
		color: #fff;
		background-color: #FF5677;
		font-size: 16px;
	}

	.cate-loyout {
		display: flex;
		height: calc(100vh - 44px - 49px);
	}
</style>
