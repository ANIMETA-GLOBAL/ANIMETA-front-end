<template>
	<view class="flexJBC content_box fw7">
		<view class="l_box co0F flexic flex">
			<view class="line br6 "></view>
			<view class="title fontS40 ">{{title}}</view>
		</view>
		<view class="r_box textAc" v-if="is_show" @click="btnAll">
			{{$t('全部')}}
		</view>
		<slot></slot>
	</view>
</template>

<script>
	export default{
		props:{
			title:'',
			is_show:{
				default:true
			},
			
		},
		methods:{
			btnAll(){
				console.log(5252552)
				this.$emit('btnclick')
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content_box{
		// padding: 0 40rpx;
		box-sizing: border-box;
		// margin:50rpx 0 30rpx;
		margin-bottom: 40rpx;
		.l_box{
			.line{
				width: 10rpx;
				height: 36rpx;
				background: #0F172C;
			}
			.title{
				margin-left: 20rpx;
			}
		}
		.r_box{
			width: 120rpx;
			height: 50rpx;
			font-size: 24rpx;
			line-height: 50rpx;
			color: #333333;
			background-color: #fff;
			border-radius: 25rpx;
		}
	}
</style>