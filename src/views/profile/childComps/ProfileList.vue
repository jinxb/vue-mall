<template>
	<div class="profile-list">
		<div><img src="~assets/img/profile/info.svg" alt="">我的消息</div>
		<div><img src="../../../assets/img/profile/interal.svg" alt="">积分商城</div>
		<div><img src="../../../assets/img/profile/member.svg" alt="">会员卡</div>
		<div @click="cartClick"><img src="../../../assets/img/profile/cart.svg" alt="">我的购物车</div>
		<div><img src="../../../assets/img/profile/shoppingCenter.svg" alt="">下载APP</div>
		<div class="hr"></div>

		<div><a href="https://github.com/jinxb/vue-mall"><img src="../../../assets/img/profile/github.svg" alt="">项目地址</a></div>
		<div><a class="demonstrate" href="/"><img src="../../../assets/img/profile/address.svg" alt="" >演示地址</a></div>
	</div>

</template>

<script>
	
	export default {
		methods: {
			cartClick() {
				this.$router.push('/cart').catch(err => err)
			}
		}
	}
</script>

<style>
	.profile-list {
		margin-top: 6px;
	}

	.profile-list>div {
		padding-left: 15px;
		line-height: 42px;
		border-bottom: 1px solid #ECECEC;
		color: #333;
	}

	.profile-list>div img {
		width: 18px;
		vertical-align: middle;
		margin-right: 6px;
		transform: translateY(-1px);
	}

	.profile-list>div:hover {
		color: #E3834B;
	}

	.profile-list .hr {
		border-bottom: 18px solid #F8F8F8;
	}
	.demonstrate::after {
		content: "";
		display: inline-block;
		width: 65px;
		height: 12px;
		background-color: pink;
		background: url(../../../assets/img/profile/advance.svg) no-repeat center;
		background-size: 28px;
		animation: 2s translate steps(6) infinite;
	}
	@keyframes translate{
		from{
		}
		to{
			transform: translate(12px);
		}
	}
</style>
