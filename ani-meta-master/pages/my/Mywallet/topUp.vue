<template>
	<view>
		<Head :title="$t('充值')" />
		<view class="content">
			<view class="imgBox">
				<tki-qrcode ref="qrcode" :val="rue" :size="size" :unit="unit"
											:background="background" :foreground="foreground" :pdground="pdground" :lv="lv"
											:onval="onval" :loadMake="loadMake" @result="qrR" />
				<!-- <vue-qr :text="rue" :size="150"></vue-qr> -->
			</view>
			<view class="lis_boxcontent" @click="show=true">
				<text class="fontS32">{{$t('充值网络')}}</text>
				<view class="white_box flexJBC">
					<text class="fontS28">{{active.name}}</text>
					<u-icon name="arrow-down"></u-icon>
				</view>
			</view>
			<view>
				<view class="fontS32">
					USDT{{$t('充值地址')}}
				</view>
				<view class="address fontS28 elipes2 flex" @click="$my.copy()">
					<text style="font-size: 26rpx;">{{rue}}</text>
					<image src="/static/img/my_copy.png" mode=""></image>
				</view>
			</view>
			<view class="lis flexJBC fontS28">
				<text class=" font99">{{$t('最小充值数')}}</text>
				<text>0.00000001 USDT</text>
			</view>
			<view class="lis flexJBC fontS28">
				<text class=" font99">{{$t('服务费')}}</text>
				<text>10 USDT</text>
			</view>
			<!-- <view class="btn00 btn fontS32">
				转移
			</view> -->
			<u-button @click='btnClick'
				style='margin:72rpx auto 0rpx;width:100%;height: 115rpx;background: #0F172C;opacity: 1;border-radius: 20rpx;color: #FFFFFF;font-size: 32rpx;'
				:text="$t('转移')" :loading='loading'></u-button>
		</view>
		<!-- 报价弹窗 -->
		<u-overlay :show="show" @click="show = false">
			<view class="warp" @tap.stop>
				<view class="fontS36 textAc">
					{{$t('选择充值主网')}}
				</view>
				<view class="fontS24 font99 introduce">
					{{$t('请确保你选择的充值主网和您在提币时选择的主网一致，否则可能造成资产丢失。')}}
				</view>
				<view class="">
					<view class="lis  fontS28 " v-for="(item,index) in network" :key="index"
						:class="active.id==item.id?'active':''" @click="activeClick(item)">
						<text>{{item.name}}</text>
					</view>
				</view>

			</view>
		</u-overlay>
	</view>
</template>

<script>
	// import vueQr from 'vue-qr';
	import tkiQrcode from "tki-qrcode"
	export default {
		// components: {
		// 	vueQr
		// },
		components: {
					tkiQrcode
				},
		onLoad() {
			this.$my.get('/index/wallet/get_user_wallet').then(res => {
				console.log(res, '-----');
				this.rue = res.data.address;
			})
		},
		methods: {
			qrR() {
							// console.log("二维码生成")
						},
			btnClick() {
				this.loading = true
			},
			activeClick(item) {
				this.active = item;
				this.show = false
			}
		},
		data() {
			return {
				val: '生成二维码内容', //要生成二维码的值
								size: 300, // 二维码的大小 单位为rpx
								background: '#ffffff', //背景色
								foreground: '#000000',
								pdground: '#000000', //角标色
								icon: '', //二维码图标
								iconsize: 30, //二维码图标大小
								lv: 2, //二维码容错级别
								onval: true, //val值变化时自动重新生成二维码
								unit: 'upx',
								loadMake: true, //组件加载完成后自动生成二维码
								src: '',
								showLoading: false, //loading
								loadingText: '', //loading内容
								title: 'Hello',
				rue: "",
				loading: false,
				show: false,
				active: {
					name: "Ethereum(ERC20)",
					id: "01"
				},
				network: [{
						name: "Ethereum(ERC20)",
						id: "88"
					},
					{
						name: "BNB Beacon Chain(BEP2)",
						id: "89"
					},
					{
						name: "BNB Smart Chain(BEP20)",
						id: "84"
					},
					{
						name: "solana",
						id: "82"
					},
					{
						name: "tron(TRC20)",
						id: "83"
					},
				],
			}
		}
	}
</script>

<style lang="scss" scoped>
	.warp {
		width: 100%;
		/* height: 466rpx; */
		position: fixed;
		bottom: 0;
		padding: 40rpx 40rpx 0rpx;
		box-sizing: border-box;
		background: #FFFFFF;
		border-radius: 40rpx 40rpx 0px 0px;

		.introduce {
			line-height: 60rpx;
			margin: 40rpx auto 62rpx;
		}

		.lis {
			margin-bottom: 72rpx;

			image {
				width: 48rpx;
				height: 48rpx;
				background-color: #fff;
				border: 1rpx solid #707070;
				margin-right: 30rpx;
			}
		}

		// .active {
		// 	background-color: #0F172C;
		// 	color: #fff;
		// }
	}

	.content {
		padding: 0 40rpx;
		box-sizing: border-box;

		.btn {
			height: 115rpx;
			line-height: 115rpx;
			margin-top: 72rpx;
		}

		.lis {
			margin-bottom: 40rpx;
		}

		.address {
			display: flex;
			flex-direction: row;
			align-items: center;
			margin: 45rpx auto 72rpx;
			line-height: 48rpx;

			text {
				word-wrap: break-word;
			}

			image {
				width: 20rpx;
				height: 20rpx;
				display: inline-block;
				margin-left: 20rpx;
			}
		}
	}

	.lis_boxcontent {
		.white_box {
			width: 100%;
			height: 106rpx;
			background: #FFFFFF;
			border-radius: 32rpx;
			margin: 40rpx auto 72rpx;
			text-align: center;
			line-height: 106rpx;
			padding: 0 40rpx;
			box-sizing: border-box;
		}
	}

	.imgBox {
		width: 300rpx;
		height: 300rpx;
		background: #D4D4D4;
		border-radius: 12rpx;
		margin: 72rpx auto 81rpx;
	}
</style>
