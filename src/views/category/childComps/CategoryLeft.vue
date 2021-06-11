<template>
	<div class="cate-left">
		<ul>
			<li v-for="(item, index) in category[0]" :key="item.maitKey" @click="btnClick(index, item.miniWallkey, item.maitKey)" :class="{current: index === currentIndex}">{{item.title}}</li>
		</ul>
	</div>
</template>

<script>
	export default {
		props: {
			category: {
				type: Array,
				default() {
					return []
				}
			}
		},
		data() {
			return {
				currentIndex: 0
			}
		},
		created() {
		},
		methods: {
			btnClick(index, miniWallkey, maitKey) {
				this.currentIndex = index
				this.$emit('btnClick', index, miniWallkey, maitKey);
			}
		}
	}
</script>

<style scoped="scoped">
	.cate-left {
		width: 105px;
		background-color: #F6F6F6;
	}
	.cate-left ul{
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
	}
	.cate-left ul li {
		text-align: center;
		height: calc(100% / 16);
		padding: calc(100% / 16) 0;
	}
	.current {
		color: #EC658A;
		background-color: #fff;
		border-left: 2px solid #E93063;
	}
</style>
