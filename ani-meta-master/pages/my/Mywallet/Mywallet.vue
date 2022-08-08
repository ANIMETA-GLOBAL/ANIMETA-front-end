<template>
	<view>
		<view class="box">

			<!-- 导航栏 -->
			<view class="bgc fontS40">
				<view class="status_bar" :style="{'height':tabh+'rpx'}"></view>
				<view class="head flexJBC">
					<view class="leftButton ">
						<!-- <u-icon name="arrow-left" size="28" @click="back(index)" color="#ffffff"
							style='margin-left: -20rpx;'></u-icon> -->
							<image @click="back" style="width: 18rpx;height: 34rpx;margin-right: 59rpx;" src="../../../static/img/04365477d8b4acd23d2bcde6fe30ba0.png" mode=""></image>
						<view class="title fontS40 fw7" style="color: #FFFFFF;">
							{{$t('我的钱包')}}
						</view>
					</view>
					<view class="flex flexic" style="justify-content: flex-end;">
						<!-- <u-icon name="scan" color="#ffffff" size="28" @click='scan'></u-icon> -->
						<image @click='scan' style="width: 36rpx;height: 36rpx;" src="../../../static/img/9a7e629f4c5192701f2470de1cbbf73.png" mode=""></image>
					</view>
				</view>
			</view>
			<!-- 导航栏 end -->
		</view>

		<view class="info">
			<image class="img" src="../../../static/wallet/tether-seeklogo.com.svg" alt=""></image>
			<view class="content">
				<view>USDT</view>
				<view>USDC </view>
			</view>
			<view class="Price">
				<view>{{userInfo.usdt_usable_balance}}<text class="line"></text></view>
				<view>{{userInfo.usdc_usable_balance}}</view>
			</view>

			<view class="Walletaddress">
				<!-- <text>{{$t('钱包地址')}}</text> -->
				<view class="address">
					
					<text class="elipes1">{{userInfo.uuid}}</text>
					<image @click="$my.copy(userInfo.uuid)" src="../../../static/wallet/addresscopy.png"
						alt="">
				</view>
			</view>

			<view class="operation">
				<view class="" @click="in_receive=true">
					<image src="../../../static/wallet/3467.png" alt="">
						<view class="">
							{{$t('站内接收')}}
						</view>
				</view>
				<view class="" @click="$my.go('/pages/my/Mywallet/transfer')">
					<image src="../../../static/wallet/3500.png" alt="">
						<view class="">
							{{$t('站内转移')}}
						</view>
				</view>
				<view class="" @click="$my.go('/pages/my/Mywallet/topUp')">
					<image src="../../../static/wallet/3501.png" alt="">
						<view class="">
							{{$t('充值')}}
						</view>
				</view>
				<view class="">
					<image src="../../../static/wallet/3502.png" alt="">
						<view class="">
							{{$t('提现')}}
						</view>
				</view>
			</view>

		</view>
		<!-- 列表 交易明细 -->
		<view class="lis_boxContent relative" :style="{height:false?'':'400rpx'}">
			<view class="title flexJBC">
				<text class="fontS32">{{$t('交易明细')}}(0)</text>
				<text class="fontS28 font99">{{$t('更多')}}</text>
			</view>
			<!-- 存量数据 -->
			<view class="lis_box  br20" v-for="(item,index) in 3 " :key="index" v-if="false">
				<view class="top flexJBC">
					<view class="l flex flexic">
						<image src="/static/img/2664.png" mode="" class="brYuan" style="margin-right: 20rpx;"></image>
						<view class="">
							<view class="fontS28">
								{{$t('转移')}}-4515...546
							</view>
							<view class="font99 fontS24" style="margin: 16rpx 0;">
								{{$t('货币转移')}}
							</view>
						</view>
					</view>
					<view class="fontS28 fw7">
						-100.00 USDT
					</view>
				</view>
				<view class="flexJBC fontS24">
					<text class="font99" style="margin-left: 100rpx;"> {{$t('今天')}} 09:35</text>
					<text class="" style="margin-top: -40rpx;">{{$t('接收成功')}}</text>
				</view>
			</view>
			<noDate :fixed='false'/> 
		</view>
		
		<!-- <u-empty v-if="true" mode="order">
		</u-empty> -->
		<!-- 列表 充记录C -->
		
		<view class="lis_boxContent" :style="{height:false?'':'400rpx'}">
			<view class="title flexJBC">
				<text class="fontS32">{{$t('充值记录')}}</text>
				<text class="fontS28 font99">{{$t('更多')}}</text>
			</view>
			<view class="lis_box br20" v-for="(item,index) in 2 " :key="index" v-if="false">
				<view class="top flexJBC" style="margin-bottom: 20rpx;">
					<view class="l flex flexic">
						<view class="">
							<view class="fontS28">
								{{$t('提现')}}-MetaMask
							</view>
						</view>
					</view>
					<view class="fontS28 fw7">
						100.00 USDT
					</view>
				</view>
				<view class="flexJBC fontS24">
					<text class="font99"> {{$t('今天')}} 09:35</text>
					<text class="">{{$t('提现成功')}}</text>
				</view>
			</view>
			<noDate :fixed='false'/>
		</view>
		<!-- <u-empty v-if="true" mode="order">
		</u-empty> -->

		<!-- 站内接收弹窗 -->
		<view class="in_receive_box" v-if="in_receive">
			<view class="in_receive" @click="in_receive=false">
			</view>
			<view class="white_box br20">
				<image class="brYuan headIMg" src="../../../static/wallet/tether-seeklogo.com.svg" alt=""></image>
				<!-- <image src="/static/img/2664.png" mode="" ></image> -->
				<view class="name fontS32">
					{{userinfoname}}
				</view>
				<view class="userdescribe fontS24 font99 flex" @click="$my.copy('123')">
					<!-- <ellipsis style="width: 200rpx;display: inline-block;" class="sample-item" position="middle">
						{{userInfo.wallet_address}}
					</ellipsis> -->
					<text style="flex: 1;" class="elipes1">{{userInfo.uuid}}</text>
					<image src="/static/img/my_copy.png" mode=""></image>
				</view>
				<view class="sancode_box br12">
					<view class="qrimg">
						<tki-qrcode ref="qrcode" :val="userInfo.uuid" :size="size" :unit="unit"
							:background="background" :foreground="foreground" :pdground="pdground" :lv="lv"
							:onval="onval" :loadMake="loadMake" @result="qrR" />
					</view>

					<!-- <vue-qr :text="userInfo.wallet_address" :size="250"></vue-qr> -->
				</view>
				<u-icon name="close" @click="in_receive=false" size='37rpx' color='#333'></u-icon>

			</view>
		</view>


	</view>
</template>

<script>
	import tkiQrcode from "tki-qrcode"
	export default {
		components: {
			tkiQrcode
		},
		data() {
			return {
				in_receive: false, //站内接收钱包
				index: 1,
				tabh: '',
				keyword: "",
				userInfo: null,
				userinfoname: '--',
				val: '生成二维码内容', //要生成二维码的值
				size: 484, // 二维码的大小 单位为rpx
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
				title: 'Hello'

			}
		},
		created() {
			uni.getSystemInfo({
				success: (res) => {
					let tabh1 = res.statusBarHeight
					let deviceWidth = uni.getSystemInfoSync().windowWidth;
					this.tabh = (750 / deviceWidth) * Number(tabh1) + 2
				}
			});

			this.$my.get('/index/wallet/get_wallet_info').then(res => {
				console.log(res);
				this.userInfo = res.data;
				console.log(this.userInfo);
				this.$my.get('/index/user/get_user_msg').then(res => {
					// console.log(res.data);
					this.userinfoname = res.data.nickname;
				})
			})

		},
		methods: {
			scan() {
const _this = this;
		uni.scanCode({
			success(res) {
				//这里即拿到了扫描出的数据
				// _this.code = res.result;
				console.log(res.result);
				uni.navigateTo({
					url:'/pages/my/Mywallet/transfer?uuid=' + res.result
				})
				//扫描成功后调用方法跳转到对应的巡检点
				// _this.hasApplication();
			}
		});
			},
			qrR() {
				// console.log("二维码生成")
			},
			back() {
				uni.navigateBack()
				this.$store.commit('changeAddNft', false)
			},
		}
	}
</script>

<style lang="less">
	.box {
		width: 100%;
		height: 402rpx;
		background: url('../../../static/wallet/Mywalletbanner.png');
	}

	.info {
		width: 670rpx;
		height: 465rpx;
		background: #fff;
		opacity: 1;
		border-radius: 20rpx;
		position: relative;
		margin: 0 auto;
		margin-top: -128rpx;
		box-sizing: border-box;
		padding: 40rpx;

		.img {
			width: 140rpx;
			height: 140rpx;
			background: #FFFFFF;
			border-radius: 50%;
			position: absolute;
			border: 1px solid #fff;
			top: -70rpx;
			right: 48rpx;
		}

		.content {
			display: flex;
			justify-content: space-between;

			view {
				flex: 1;
				font-size: 24rpx;
				font-family: Source Han Sans CN;
				font-weight: 500;
				line-height: 48rpx;
				color: #333333;
			}
		}

		.Price {
			display: flex;
			justify-content: space-between;
			margin-bottom: 48rpx;

			view {
				flex: 1;
				font-size: 32rpx;
				font-family: Source Han Sans CN;
				font-weight: bold;
				line-height: 48rpx;
				color: #333333;
			}

			view:nth-child(1) {
				position: relative;
				display: flex;

				.line {
					position: absolute;
					top: 50%;
					margin-top: -16rpx;
					right: 47rpx;
					width: 1rpx !important;
					height: 32rpx;
					border: 1rpx solid rgba(0, 0, 0, 0.1216);
				}
			}


		}

		.Walletaddress {
			margin-bottom: 30rpx;
			font-size: 24rpx;
			font-family: Sourcre Han Sans CN;
			font-weight: 500;
			line-height: 48rpx;
			color: #999999;
			display: flex;
			flex-direction: row;
			align-items: center;

			.address {
				
				font-size: 24rpx;
				font-family: Source Han Sans CN;
				font-weight: 500;
				line-height: 48rpx;
				color: #333333;
				display: flex;
				flex-direction: row;
				align-items: center;
				text{
					width: 70%;
					
				}


				image {
					width: 24rpx;
					height: 24rpx;
					margin-left: 11rpx;
				}
			}
		}

		.operation {
			display: flex;

			view {
				text-align: center;
				flex: 1;

				image {
					display: inline-block;
					width: 80rpx;
					height: 80rpx;
				}

				view {
					font-size: 24rpx;
					font-family: Source Han Sans CN;
					font-weight: 400;
					line-height: 48rpx;
					color: #333333;
					width: 100%;
					text-align: center;
				}
			}
		}

	}
</style>

<!-- 导航栏 -->
<style lang="scss" scoped>
	.lis_boxContent {
		margin-top: 72rpx;
		padding: 0 40rpx;
		box-sizing: border-box;
		.title {
			margin-bottom: 40rpx;
		}

		.lis_box {
			width: 100%;
			background-color: #fff;
			margin-bottom: 32rpx;
			padding: 24rpx 30rpx;
			box-sizing: border-box;

			.top {
				.l {
					image {
						width: 80rpx;
						height: 80rpx;
					}
				}
			}
		}
	}

	.in_receive_box {
		.in_receive {
			width: 100%;
			height: 100vh;
			background: rgba(0, 0, 0, 0.6);
			position: fixed;
			top: 0%;
			left: 0;
			padding: 0 80rpx;
			box-sizing: border-box;
			z-index: 0;
		}

		.white_box {
			/deep/ .u-icon {
				position: absolute;
				left: 50%;
				transform: translateX(-50%);
			}

			position: fixed;
			width: 80%;
			left: 50%;
			// height: 60vh;
			background-color: #fff;
			border: 1px solid #707070;
			top: 50%;
			transform: translateY(-50%) translateX(-50%);
			text-align: center;
			padding: 0 56rpx 72rpx;
			box-sizing: border-box;

			.headIMg {
				position: relative;
				width: 140rpx;
				height: 140rpx;
				z-index: 999;
				// margin-top: -70rpx;
				margin: -70rpx auto 0;
			}

			.name {
				margin: 11rpx 0 4rpx;
			}

			.userdescribe {
				font-family: Source Han Sans CN;
display: flex;flex-direction: row;align-items: center;
				image {
					width: 19rpx;
					height: 19rpx;
					margin-left: 12rpx;
					display: inline-block;
				}
			}

			.sancode_box {
				width: 100%;
				height: 487rpx;
				margin: 40rpx auto 72rpx;
				overflow: hidden;
			}
		}
	}

	.myimg {
		border: 2rpx dotted #676767;
	}
	.bgc {
		background-color: #F4F5F7;
		position: sticky;
		top: 68rpx;
		left: 0;
		// z-index: 99;
		background: url("../../../static/wallet/b03a0924c5e6c5056d19d946335c783.png");
	}

	.head {
		padding: 0rpx 40rpx !important;
		height: 80rpx;
		line-height: 80rpx;
		box-sizing: border-box;
		position: sticky;
		color: #FFFFFF;
		position: absolute;
		width: 100%;
	}

	.leftButton {
		display: flex;
		align-items: center;

		.title {
			margin-left: 14rpx;
		}
	}

	.rightboxsearch {
		width: 494rpx;
		height: 68rpx;
		background: #FFFFFF;
		box-shadow: 0px 6rpx 20rpx 1rpx rgba(0, 0, 0, 0.2);
		border-radius: 49rpx;
		opacity: 1;
	}
</style>
