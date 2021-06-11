<template>
	<div class="money">
		<div>
			<p>
				<span>100</span>万
			</p>
			我的余额
		</div>
		<div>
			<p><span>1000</span>个</p>
			我的优惠券
		</div>
		<div>
			<p><span>100000</span>分</p>
			我的积分
		</div>
	</div>
</template>

<script>
	
</script>

<style scoped="scoped">
	.money {
		display: flex;
		border-bottom: 8px solid #F8F8F8;
		text-align: center;
		height: 120px;
		margin-top: 10px;
	}
	.money>div {
		flex: 1;
		align-self: center;
	}
	.money p {
		margin-bottom: 12px;
	}
	.money span {
		color: #EE7251;
	};
</style>
