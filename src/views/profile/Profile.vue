<template>
	<div class="profile">
		<nav-bar class="nav-bar">
			<div slot="center">我的信息</div>
		</nav-bar>
		<scroll class="content" ref="scroll">
			<login />
			<money />
			<profile-list />
		</scroll>
	</div>
</template>

<script>
	import NavBar from 'components/common/navbar/NavBar.vue'
	import scroll from 'components/common/scroll/Scroll.vue'
	import Login from './childComps/Login.vue'
	import Money from './childComps/Money.vue'
	import ProfileList from './childComps/ProfileList.vue'
	export default {
		components: {
			NavBar,
			scroll,
			Login,
			Money,
			ProfileList
		},
		activated() {
			this.$refs.scroll.refresh();
		}
	}
</script>

<style scoped="scoped">
	.profile {
		height: calc(100vh - 44px - 49px);
	}

	.nav-bar {
		background-color: #EE7187;
		color: #fff;
	}

	.content {
		height: 100%;
		overflow: hidden;
	}

	
</style>
