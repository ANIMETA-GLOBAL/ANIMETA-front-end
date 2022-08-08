<template>
	<view class="">
		<Head :title="$t('充值详情')" />
		<view class="box">
			<view class="content">
				<view class="title">
					100.00 USDT
				</view>
				<view class="type_title">
					{{$t('充值成功')}}
				</view>


				<view class="order_info">
					<view class="">
						{{$t('充值网络')}}
					</view>
					<view class="">
						BNB Smart Chain(BEP20)
					</view>
				</view>


				<view class="order_info">
					<view class="">
						{{$t('充值时间')}}
					</view>
					<view class="">
						2022-07-29 09:00:54
					</view>
				</view>

				<view class="order_info">
					<view class="">
						{{$t('订单编号')}}
					</view>
					
						<!-- <ellipsis style="width: 300rpx;" class="sample-item" position="middle">
							{{address.wallet_address}}
						</ellipsis> -->
					
				</view>


				<view class="order_info">
					<view class="">
						{{$t('来源地址')}}
					</view>
					<view class="Sourceaddress">
						<!-- <ellipsis style="width: 300rpx;" class="sample-item" position="middle">
							{{address.wallet_address}}
						</ellipsis> -->
						<image @click="$my.copy(address)" src="../../../static/wallet/addresscopy.png" alt="">
						</image>
					</view>
				</view>

			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				address: null,//勿动，插件默认必须为空值才能完成数据双向绑定
			}
		},
		created() {
			this.$my.get('/index/user/get_user_msg').then(res => {
				this.address = res.data;
			})
		},
	}
</script>

<style lang="less" scoped>
	.box {
		padding: 72rpx 40rpx 0;
		box-sizing: border-box;

		.content {
			width: 100%;
			height: 496rpx;
			background: #FFFFFF;
			opacity: 1;
			border-radius: 32rpx;
			padding: 48rpx 30rpx;
			box-sizing: border-box;

			.title {
				font-size: 48rpx;
				font-family: Source Han Sans CN;
				font-weight: bold;
				line-height: 48rpx;
				color: #333333;
				text-align: center;
				margin-bottom: 30rpx;
			}

			.type_title {
				font-size: 32rpx;
				font-family: Source Han Sans CN;
				font-weight: 400;
				line-height: 48rpx;
				color: #333333;
				text-align: center;
				margin-bottom: 74rpx;
			}


		}
	}

	.order_info {
		display: flex;
		justify-content: space-between;
		line-height: 28px;

		view:nth-child(1) {
			font-size: 28rpx;
			font-family: Source Han Sans CN;
			font-weight: 400;
			color: #999999;
		}

		view:nth-child(2) {
			font-size: 28rpx;
			font-family: Source Han Sans CN;
			font-weight: 400;
			color: #333333;
		}
	}

	.Sourceaddress {
		display: flex;
		flex-direction: row;
		align-items: center;

		image {
			width: 24rpx;
			height: 24rpx;
			margin-left: 16rpx;
		}
	}
</style>
