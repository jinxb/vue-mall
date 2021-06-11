<template>
	<div class="cate-goods">
		<goods-list v-for="(item, index) in cateDetail" :cgoods="item" :key="index"/>
	</div>
</template>

<script>
	import GoodsList from 'components/content/goods/GoodsList.vue'
	export default {
		name: 'categoryGoods',
		components: {
			GoodsList
		},
		props: {
			cateDetail: {
				type: Array,
				default() {
					[]
				}
			}
		},
	}
</script>

<style>
</style>
