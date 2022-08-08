<template>
	<view>
		<Head :tab="true" :title="$t('卖出')" />
		<view class="box">
			<view class="classification fontS32 flexJBC fw6">
				<view class="l " :class="type==1?'active':''" @click="type=1;get_sell_pre()">{{$t('定价出售')}}</view>
				<view class="r" :class="type==2?'active':''" @click="type=2;get_sell_pre()">{{$t('拍卖')}}</view>
			</view>
		</view>
		<u-calendar :show="timeshow" mode="range" @confirm="dateconfirm" @close='timeshow=false'></u-calendar>
		<u-picker :show="showpicker" :columns="coin_type" keyName="name" @confirm='pickerConfirm' @cancel='showpicker=false' @close='showpicker=false'></u-picker>
		  </u-datetime-picker>
		<view class="content">
			<view class="relative">
				<view class="white_box">
					<image :src="info.attachment_text?info.attachment_text:img" mode=""></image>
					<view class="pir_box" v-if="type==2">
						<view class="title" style="margin-bottom:40rpx">
							{{$t('方式')}}
						</view>
						<input  v-model="emthods"   style="width: 100%;margin-bottom:40rpx" disabled="true">
					</view> 
					<view class="title" style="margin-bottom:40rpx">
						{{type==1?$t('价格'):$t('起拍价格')}} 
					</view> 
					<view class="flex pir_box">
						<input  v-model="price" :placeholder="$t('请输入')" type='number'>
						<view class="rili">
							<view class="left flexic flex">
								<image src="/static/img/UTSD.png" alt="" style="margin-top: 25rpx;">
								<text>USDT</text>
							</view>
							<view class="right">
								<!-- <u-icon name="arrow-down" size="28rpx"></u-icon> -->
							</view>
						</view>
					</view>
					
					<view class="pir_box"> 
						<view class="title" style="margin-bottom:40rpx">
							{{$t('数量')}}
						</view>  
						<input  v-model="num" :placeholder="$t('请输入')" type='number' style="width: 100%;">
					</view>
					<view class="title" style="margin-bottom:40rpx;margin-top: 40rpx;">
							{{type==1?$t('售卖周期'):$t('拍卖周期')}}
					</view>
					<view class="timepiker flexJBC" @click.stop="timeshow=true">
						<view v-if="date[0]">
							<text >{{date[0]}}</text> <text style="margin-left: 23rpx;margin-right: 20rpx;">—</text> <text
								style="margin-right: 80rpx;">{{date[1]}}</text>  
						</view>
						<view v-else class="font99"  >
							{{$t('请选择周期')}}
						</view>
							<!-- <text style="margin-right: 20rpx;">共10天</text> -->
						<u-icon name="arrow-down" size="28rpx"></u-icon>
					</view>

					<!-- <view v-if="type==1">
						<view class="flexJBC">
							<view class="title" style="margin-top: 40rpx;">
								{{$t('为特定卖家预留')}}
							</view>
							<u-switch v-model="swtichvalue" @change="change"></u-switch>
						</view>
						<view class="reserveipt" v-if="swtichvalue" >
							<input type="text" :placeholder="$t('请输入地址')" v-model="address"> 
						</view>
					</view> -->
					<!-- 拍卖 -->
					<view v-if="type!=1">
						<view class="flexJBC">
							<view class="title" style="margin-top: 40rpx;">
								{{$t('设置底价')}}
							</view>
							<u-switch v-model="swtichvalue" @change="change"></u-switch>
						</view>
						<view class="reserveipt" v-if="swtichvalue" >
							<view class="flex pir_box" style="margin-top:-10rpx;"> 
							<input  v-model="floorprice" :placeholder="$t('请输入')" type='number'>
							<!-- 可选 -->
							<!-- <view class="rili"  @click="showpicker=true">
								<view class="left" >
									<text>{{coinType}}</text>
								</view>
								<view class="right">
									<u-icon name="arrow-down" size="28rpx"></u-icon>
								</view>
							</view> -->
							<!-- 不可选 -->
							<view class="rili" >
								<view class="left" >
									<text class="">
										USDT
									</text>
								</view>
							</view>
							</view> 
						</view>
					</view>
					<!-- 出价 -->
					<view class="offer_box">
						<view class="relative lisb  lis offerlib">
							<view class="yuan"></view>
							<view class="yuan"></view>
							<view class="flexJBC marTB40">
								<text class="font99">{{$t('服务费')}}</text>
								<text class="font99 ">{{info.service_charge_rate}}%</text>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="btn_box" @click="curse">
				<u-button :text="$t('确定')"   class="btn00" :loading='loading'>
				</u-button> 
			</view>
		</view>
		<Password :show='show' @finish='finish' @isShow='isShow'/>
	</view>
</template>

<script>
	import Password from '@/componentes/payPassWord.vue'
	export default {
		data() {
			return {
				show:false, //支付密码弹窗
				loading:false,
				info:"",
				num:1,//数量
				showpicker:false,//显示币类型
				coin_type:[],//币类型列表
				coinType:"",//币类型
				floorprice:"", //底价
				emthods:"竞价拍卖",
				swtichvalue:false,
				date:[],//时间
				address:"",//地址
				timeshow:false,
				id:'', //nft的id
				pir: 1, 
				type: 1, //出售还是拍卖
				price: '', //价格
				img:"",
				offer: true, //false表示此页面是支付,为true表示出价页面;
			}
		}, 
		components:{
			Password
		},
		onLoad(option) {
			this.id=option.id?option.id:1;
			this.img=option.img; 
			this.emthods=this.$t(this.emthods);
			this.$my.get("/index/com/get_coin_type").then(res=>{
				if(res.code==200){
					this.coin_type=[res.data];
					this.coinType=this.coin_type[0][0].id;
				}
			})
			this.get_sell_pre()
			
		},
		methods: {
			// 是否显示支付密码框
			isShow(e){
				this.show=e
				console.log(e)
			},
			// 得到支付密码后发送请求
			finish(e){
				if(this.type==1){
					this.loading=true;
					// 如果有支付密码
						let data={
							pay_password:e,
							id:this.id,
							coin:this.price,
							start_time:this.date[0],
							end_time:this.date[1],
							coin_type:"USDT",
							num:this.num
						}
						this.$my.post('/index/sell/initiate_sell',data).then(res=>{
						this.loading=false;
						 this.$my.toast(res.message)
						 if(res.code==200){
							this.$my.toast(res.message)
							setTimeout(()=>{
								this.$my.go()
							},500)
						 }
						}) 
					
				}else{
					// 拍卖
						let data={
							pay_password:e,
							nft_id:this.id,
							start_price:this.price,
							low_price:this.floorprice,
							start_time:this.date[0],
							end_time:this.date[1],
							num:this.num,
							coin_type:"usdt"
						}
						if(!this.price){
							this.$my.toast('请输入起拍价格')
							return
						}
						if(!this.date[0]){
							this.$my.toast('请选择售卖周期')
							return
						}
						this.loading=true;
						this.$my.post('/index/auction/initiate_auction',data).then(res=>{
							this.loading=false;
							this.$my.toast(res.message)
							if(res.code==200){
								this.$my.toast(res.message)
								setTimeout(()=>{
									this.$my.go()
								},500)
							}
						})
					
				}
			},
			get_sell_pre(){
				this.$my.post("/index/trade/get_sell_pre",{type:this.type==1?"sell":"auction",id:this.id}).then(res=>{
					if(res.code==200){
						this.info=res.data
					}
				})
			},
			pickerConfirm(e){
				this.coinType=e.value[0].id;
				this.showpicker=false; 
			},
			curseClick(){},
			curse(){
				if(!this.price){
					this.$my.toast('请输入价格')
					return
				}
				if(!this.date[0]){
					this.$my.toast('请选择售卖周期')
					return
				}
				if(!this.num){
					this.$my.toast('请输入数量')
					return
				}
				// 展示输入密码
				this.show=true
			},
			open() {
			 this.$refs.calendar.open();
			},
			dateconfirm(e) {
				this.date=e
				this.timeshow=false
			},
		}
	}
</script>

<style lang='scss' scoped>
	.content {
		padding: 40rpx ; 
		box-sizing: border-box;
		.paynum_box {
			padding: 0 40rpx;
			box-sizing: border-box;
			width: 100%;
			left: 0;
			height: 176rpx;
			background: #EFEFEF;
			padding-top: 90rpx;
			bottom: -140rpx;
			z-index: 1;
			border-radius: 0 0 40rpx 40rpx;
		}

		.btn_box {
			width: 100%;
			padding: 0 40rpx;
			box-sizing: border-box;
			bottom: 50rpx;
			left: 0;
			margin-top: 80rpx;
			.btn00 {
				width: 100%;
				height: 115rpx;
				line-height: 115rpx;
				font-size: 32rpx;
			}
		}

		.offer_box {
			.title1 {
				color: #0F172C;
				margin-bottom: 40rpx;
			}

			/deep/.u-input {
				width: 100%;
				height: 74rpx;
				border: 1rpx solid #C2C2C2 !important;
				border-radius: 20rpx;
				padding: 0 30rpx;
				box-sizing: border-box;
				box-sizing: border-box;
			}

			.offerlib {
				height: 190rpx !important;
				line-height: 70rpx !important;
				padding-top: 30rpx !important;
			}
		}

		.white_box {
			position: relative;
			z-index: 8;
			width: 100%;
			background: #FFFFFF;
			border-radius: 40rpx;
			padding: 40rpx 46rpx 200rpx;
			box-sizing: border-box;

			/* box-shadow: inset 0rpx -22rpx 20rpx -20rpx #C2C2C2; */
			image {
				width: 200rpx;
				height: 200rpx;
				background: #C2C2C2;
				border-radius: 32rpx;
				margin: 0 auto 30rpx;
			}

			.title {
				line-height: 50rpx;
				margin-bottom: 60rpx;
			}

			.lis {
				margin-bottom: 40rpx;
			}

			.lisb {
				box-sizing: border-box;
				padding: 0 40rpx;
				margin-top: 6rpx;
				box-sizing: border-box;
				width: 100%;
				position: absolute;
				/* border-top: 6rpx dotted #F4F5F7; */
				margin-bottom: 0;
				bottom: 0rpx;
				left: 0;
				/* height: 108rpx; */
				/* line-height: 108rpx; */

				.yuan {
					width: 60rpx;
					height: 60rpx;
					background: #F4F5F7;
					border-radius: 50%;
					position: absolute;
					top:0rpx;
				}

				.yuan:nth-of-type(1) {
					left: -30rpx;
				}

				.yuan:nth-of-type(2) {
					right: -30rpx;

				}
			}
		}
	}

	.classification {
		border-bottom: 1px solid #D4D4D4;
		margin-bottom: 72rpx;

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

	.box {
		padding: 0 40rpx;
		box-sizing: border-box;
		margin-top: 48rpx;
	}

	.pir_box {
		justify-content: space-between;
		margin-top: 40rpx;
		input {
			width: 328rpx;
			height: 73rpx;
			background: #FFFFFF;
			border: 1rpx solid #C2C2C2;
			border-radius: 20rpx;
			padding-left: 40rpx;
			box-sizing: border-box;
		}
	}

	.rili {
		width: 218rpx;
		height: 73rpx;
		background: #FFFFFF;
		border: 1rpx solid #C2C2C2;
		border-radius: 20rpx;
		padding: 16rpx 20rpx;
		box-sizing: border-box;
		display: flex;
		justify-content: space-between;
		display: flex;
		flex-direction: row;
		align-items: center;

		.left {
			display: flex;
			justify-content: space-between;

			image { 
				width: 40rpx;
				height: 40rpx;
			}

			text {
				font-size: 20rpx;
				font-family: Source Han Sans CN;
				font-weight: 500;
				line-height: 40rpx;
				color: #999999;
				margin-left: 12rpx;
			}

		}

		.right {
			/* text-align: right;
		line-height: 40rpx;
		font-size: 20rpx */
		}
	}

	.timepiker {
		padding: 0 38rpx;
		/* padding-right: 0; */
		box-sizing: border-box;
		height: 73rpx;
		background: #FFFFFF;
		border: 1rpx solid #C2C2C2;
		opacity: 1;
		border-radius: 20rpx;
		font-size: 24rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		line-height: 73rpx;
		color: #999999;
		opacity: 1;
	}
	.reserveipt{
		
		input{
			padding: 0 40rpx;
			height: 73rpx;
			background: #FFFFFF;
			border: 1rpx solid #C2C2C2;
			opacity: 1;
			border-radius: 20rpx;
			line-height: 73rpx;
			box-sizing: border-box;
		}
	}
</style>
