<template>
	<view>
		<view class="search">
			<u-search :placeholder="$t('请输入关键字')" :clearabled="true" height='80rpx' borderColor='#C2C2C2' :showAction="false"
				bgColor='#F4F5F7' v-model="keyword" @change='change'></u-search>
			<view class="search_left">
				<slot></slot>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:'Search',
		data() {
			return {
				keyword:''
			}
		},
		methods:{
			change(e){
				this.$emit('keyWordchange',e)
			}
		}
	}
</script>

<style lang="less" scoped>
	.search {
		display: flex;
		margin-bottom: 48rpx;

		.search_left {
			margin-left: 33rpx;
			line-height: 48px;
		}


	}
</style>
