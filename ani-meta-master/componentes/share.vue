<template>
	<u-overlay :show="share_show" @click="close" opacity='.4'>
		<view class="share_box">
			<view class="share fontS28 font33 fw6">
				{{$t('分享')}}
			</view>
			<view class="flexJBC">
				<view class="b textAc" @tap.stop>
					<image src="../static/img/fance.png" mode=""></image>
					<view class="fontS24 ">Facebook</view>
				</view>
				<view class="b textAc" @tap.stop>
					<image src="../static/img/2664.png" mode=""></image>
					<view class="fontS24 ">Twitter</view>
				</view>
				<view class="b textAc" @tap.stop>
					<image src="../static/img/3193.png" mode=""></image>
					<view class="fontS24 ">{{$t('复制链接')}}</view>
				</view>
			</view>
					<view class="rect" @tap.stop></view>
		</view>
	</u-overlay>
</template>

<script>
	export default{
		props:{
			share_show:{
				default:false,
			}
		},
		methods:{
			close(){
				this.$emit('confirm')
			}
		}
	}
</script>

<style lang="scss" scoped>
	.share_box{
		width: 100%;
		height:286rpx;
		background-color: #fff;
		position: absolute;
		bottom: 0%;
		border-radius: 40rpx 40rpx 0 0 ;
		padding: 40rpx 100rpx 0;
		box-sizing: border-box;
		color: #666;
		.share{
			text-align: center;
			margin-bottom: 45rpx;
		}
		.b{
			image{
				width: 80rpx;
				height: 80rpx;
				margin: 0 auto;
				// border: 1rpx dotted #666; 
			}
			view{
				margin-top: 18rpx;
			}
		}
	}
</style>