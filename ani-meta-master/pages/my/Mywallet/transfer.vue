<template>
	<view>
		<Head :title="$t('站内转移')" />
		<view class="padLR40">
			<view class="classification fontS36 flexJBC fw6">
				<view class="l " :class="current==1?'active':''" @click="current=1">{{$t('转移藏品')}}</view>
				<view class="r" :class="current==2?'active':''" @click="current=2"> {{$t('转移货币')}}</view>
			</view>

			<view class="id" v-if="current == 1">
				<view class="up_img">
					<view class="up_img_div" @click="SelectC" v-if="!list.length">
						<image src="../../../static/wallet/3484.png" alt=""></image>
					</view>
					<view class="up_list" v-else>
						<view class="" v-for="(item,index) in list" :key="item.id">
							<view class="i_bigbox" v-if="index == 8">
								<view class="hhhtt">
								</view>
								<image class="threeD" src="../../../static/wallet/3482.png" mode=""></image>
								<image :src="item.attachment_text" mode=""></image>
							</view>
							<image :src="'http://192.168.1.6' + item.attachment_text" mode="" v-if="index < 7"></image>
						</view>

						<view class="up_img_son" @click="SelectC">
							<image src="../../../static/wallet/3484.png" alt=""></image>
						</view>
					</view>
				</view>
			</view>

			<view class="input_id" style="margin-top: 48rpx;" v-if="current == 2">
				<u--input :placeholder="$t('请输入转移金额')" border="surround" v-model="Transferamount" @change="change">
					<template slot="suffix">
						<text class="suffix_sty">USDT</text>
					</template>
				</u--input> 
			</view>

			<view class="id_inp">
				ID
			</view>

			<view class="input_id">
				<u--input :placeholder="$t('请输入')+'ID'" border="surround" v-model="userid" @change="change"></u--input>
			</view>


			<view class="tips" v-if="current == 1">
				{{$t('您的藏品将转移到此')}}ID
			</view>

			<view class="tips" v-if="current == 2">
				{{$t('您当前账户余额为')}} <text style="color: #6094FF;margin-left: 6rpx;"> 999,990.00 USDT</text>
			</view>

			<view class="Price">
				<view class="">
					{{$t('服务费')}}
				</view>
				<view class="">
					10 USDT
				</view>
			</view>

			<u-button @click='transferFn'
				style='margin: 0 auto;width: calc(100% );height: 115rpx;background: #0F172C;opacity: 1;border-radius: 20rpx;color: #FFFFFF;font-size: 32rpx;'
				:text="$t('转移')" :loading='loading'>
			</u-button>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				loading: false,
				current: 1,
				value: '',
				list: [],
				userid: '',
				Transferamount: '',
			}
		},
		onLoad(e) {
			if(e.uuid){
				this.userid = e.uuid;
			}
			// console.log(e.uuid);
			
			if (e.itemlist) {
				let obj = e.itemlist.replace("\"([^\"]*)\"", "$1");
				this.list = JSON.parse(obj)
			}
		},
		methods: {

			transferFn() {
				if (!this.list.length && this.current == 1) {
					return this.$my.toast(this.$t('请选择') + 'NFT')
				}

				if (!this.Transferamount && this.current == 2) {
					return this.$my.toast(this.$t('请输入转移金额'))
				}
				if (!this.userid) {
					return this.$my.toast(this.$t('请输入') + 'ID')
				}
				return this.$my.toast(this.$t('功能暂未开放'))
				let params = [];
				this.list.forEach(item => {
					params.push([item.ua_id, item.NFTquantity ? item.NFTquantity : 1])
				})
				this.$my.post('/index/user/give_nft', params).then(res => {
					console.log(res);
				})
			},

			change() {

			},
			// 选择藏品入口
			SelectC() {


				if (this.list.length) {
					let items = encodeURIComponent(JSON.stringify(this.list));
					uni.navigateTo({
						url: '/pages/my/Mywallet/Selectcollection?itemlist=' + items,
					})
				} else {
					uni.navigateTo({
						url: '/pages/my/Mywallet/Selectcollection'
					})
				}

			},

		}
	}
</script>

<style lang="scss" scoped>
	.classification {
		border-bottom: 1px solid #D4D4D4;
		margin-top: 48rpx;
		height: 80rpx;

		view {
			width: 50%;
			text-align: center;
			padding-bottom: 32rpx;
			color: #999999;
			position: relative;
		}

		.active {
			color: #0F172C;

			&:before {
				content: '';
				position: absolute;
				bottom: -4rpx;
				width: 100%;
				height: 6rpx;
				background: #0F172C;
				left: 0%;
			}

		}
	}

	.up_img {
		width: 100%;
		min-height: 324rpx;
		// background: #fff;
		position: relative;

		.up_img_div {
			width: 180rpx;
			height: 180rpx;
			background: #CCCCCC;
			margin: 0 auto;
			position: absolute;
			left: 50%;
			top: 50%;
			margin-left: -90rpx;
			margin-top: -90rpx;

			image {
				width: 50rpx;
				height: 50rpx;
				position: absolute;
				left: 50%;
				top: 50%;
				margin-left: -25rpx;
				margin-top: -25rpx;
			}
		}
	}

	.id_inp {
		font-size: 32rpx;
		font-family: Source Han Sans CN;
		font-weight: bold;
		color: #333333;
		margin-bottom: 40rpx;
	}

	.input_id {
		margin-bottom: 28rpx;

		/deep/.u-input {
			padding: 0 40rpx !important;
			box-sizing: border-box;
			width: calc(100%);
			height: 106rpx;
			background: #FFFFFF;
			opacity: 1;
			border-radius: 32rpx;
			margin-right: 0 !important;
		}
	}

	.tips {
		font-size: 20rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #999999;
		margin-bottom: 48rpx;
	}

	.Price {
		width: 100%;
		display: flex;
		justify-content: space-between;
		margin-bottom: 90rpx;

		view:nth-child(1) {
			font-size: 28rpx;
			font-family: Source Han Sans CN;
			font-weight: 400;
			color: #999999;
		}

		view:nth-child(2) {
			font-size: 28rpx;
			font-family: Source Han Sans CN;
			font-weight: 500;
			color: #333333;
		}
	}

	.suffix_sty {
		font-size: 28rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #999999;
		opacity: 0.8;
	}

	.up_list {
		// width: 100%;
		padding: 0 50rpx;
		box-sizing: border-box;
		display: flex;
		// justify-content: space-between;
		margin-top: 48rpx;
		flex-wrap: wrap;

		image {
			width: 180rpx;
			height: 180rpx;
			margin-bottom: 10rpx;
			margin-right: 10rpx;
		}

		.i_bigbox {
			position: relative;
		}

		.hhhtt {
			width: 180rpx;
			height: 180rpx;
			background-color: #000;
			margin-bottom: 10rpx;
			margin-right: 10rpx;
			background-size: 100% 100%;
			position: absolute;
			opacity: 0.6;
			z-index: 1000;

		}

		.threeD {
			width: 50rpx;
			height: 10rpx;
			position: absolute;
			top: 50%;
			left: 50%;
			margin-top: -5rpx;
			margin-left: -25rpx;
			z-index: 10000;
		}

		.up_img_son {
			width: 180rpx;
			height: 180rpx;
			background: #CCCCCC;
			// margin: 0 auto;
			position: relative;

			image {
				width: 50rpx;
				height: 50rpx;
				position: absolute;
				left: 50%;
				top: 50%;
				margin-left: -25rpx;
				margin-top: -25rpx;
			}
		}
	}
</style>
