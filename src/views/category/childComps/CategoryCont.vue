<template>
	<div class="cate-cont">
		<ul>
			<li v-for="(item, index) in subCategory[0]" :key="index" @click="detailClick(item)">
				<img :src="item.image" @load="imgLoad"/>
				<span>{{item.title}}</span>
			</li>
		</ul>
	</div>
</template>

<script>
	export default {
		name: 'CategoryCont',
		props: {
			subCategory: {
				type: Array,
				default () {
					return []
				}
			}
		},
		methods: {
			imgLoad() {
				this.$emit('imgLoaded')
			},
			detailClick(item) {
				console.log(item);
				this.$emit('detailClick');
			}
		}
	}
</script>

<style scoped="scoped">
	.cate-cont ul{
		display: flex;
		flex-wrap: wrap;
		text-align: center;
	}

	.cate-cont ul li {
		flex: 1;
		list-style: none;
		font-size: 14px;
		margin: 10px;
		color: #333;
		
		
	}

	.cate-cont img {
		width: 65px;
	}
	.cate-cont span {
		display: block;
	}
</style>
