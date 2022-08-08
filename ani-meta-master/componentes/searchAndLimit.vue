<template>
	<view class="SearchAndLimit flexJBC" >
		<u-search  v-model="keyword" :clearabled="true" :showAction='false' bgColor='#F4F5F7' placeholder='' @change='searchChange'></u-search>
		<image src="/static/img/limit.png" mode="widthFix" @click="sxClick" v-if="showLimt"></image>
		<image src="/static/img/limit_no.png" mode="widthFix" @click="sxClick" v-else></image>
	</view>
</template>

<script>
	
	
	export default{
		props:{
			showLimt:{
				default:true,
			},
		},
		data(){
			return{
				keyword:"",
				
			}
		},
		methods:{
			// 调用页面拿到搜索关键字
			searchChange(value){
				this.$emit('searchChange',value)
			},
			// 筛选按钮是否可用
			sxClick(){
				this.$emit("closeFn",this.showLimt)
			}
		}
	}
</script>

<style lang="scss" scoped>
	image{
		width: 90rpx;
		height: 90rpx;
		margin-left: 32rpx;
	}
	/deep/.u-search{
		
		height: 88rpx;
		border: 1px solid #C2C2C2;
		opacity: 1;
		border-radius: 45px;
	}
	.SearchAndLimit{
		// padding: 0 40rpx;
		box-sizing: border-box;
		margin-top: 20rpx;
		background-color: #F4F5F7;
		
		
	}
</style>