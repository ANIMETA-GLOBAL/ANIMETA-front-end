<template>
	<view>
		<Head :title="offer==1?$t('出价'):offer==2?$t('报价'):$t('支付')" />
		<view class="content" :style="offer==0?'':'margin-bottom:140rpx;'">
			<view class="relative">
				<view class="white_box" :style="offer==2?'height:1020rpx':'height:860rpx;'">
					<image :src="$my.imgurl+info.attachment_text" mode=""></image>
					<view class="title" :style="offer?'margin-bottom:40rpx':''">
						You are about to purchase a {{info.nft_name}} from {{info.nickname}}
					</view>
					<!-- 支付 -->
					<view class="pay" v-if="offer==0"> 
						<view class="lis flexJBC fontS28">
							<text class="font99">{{$t('价格')}}</text>
							<text class="font33 ">{{info.coin}}USDT</text>
						</view>
						<view class="lis flexJBC fontS28">
							<text class="font99">{{$t('服务费')}}</text>
							<text class="font33 ">{{info.service_charge_rate}}%</text>
						</view>
						<view class="relative lisb flexJBC lis">
							<view class="yuan"></view> 
							<view class="yuan"></view>
							<text class="font99">{{$t('应付款')}}</text>
							<text class="font33 ">{{(inputnum*info.coin + (info.service_charge_rate/100*inputnum)).toFixed(2) }}USDT</text>
						</view>
					</view>
					<!-- 出价 -->
					<view class="offer_box" v-else>
						<view class="title1 fontS28"> 
							{{offer==1?$t('请输入您的出价'):$t('请输入您的报价')}}
						</view>
						<u-input style='padding: 0 30rpx;' :placeholder="offer==1?$t('请输入您的出价'):$t('请输入您的报价')" border="none"
							v-model="inputValue"  placeholderStyle='padding-left:5rpx;font-size:20rpx' type='number'>
							<text slot="suffix">USDT </text>
						</u-input>
						
						<view class="relative lisb  lis offerlib">
							<view class="yuan"></view>
							<view class="yuan"></view>
							<view class="flexJBC">
								<text class="font99">{{$t('总价')}}</text>
								<text class="font33 ">{{inputValue?inputValue:0}}USDT</text>
							</view>
							<view class="flexJBC">
								<text class="font99">{{$t('服务费')}}</text>
								<text class="font33 ">{{info.service_charge_rate}}%</text>
							</view>
						</view>
					</view>
					<view class="offer_box" v-if="offer!=1">
						 <view>
						 
						 		<view class="title1 fontS28 flexJBC" style="margin-top:40rpx">
						 			<text>{{$t('购买数量')}}</text>
									<text class="font99">{{$t('当前可购买')}}{{info.num}}{{$t('个')}}</text>
						 		</view>
						 	 
						 	<u--input style='padding: 0 30rpx;' :placeholder="$t('请输入数量')" border="none"
						 		v-model="inputnum"  placeholderStyle='padding-left:5rpx;font-size:20rpx' type='number'>
						 	</u--input>
						 </view>
					</view>
				</view>
				<view class="absolute paynum_box" v-if="offer!=0">
					<view class="flexJBC paynum">
						<text class="font99">{{$t('应付款')}}</text>
						<text class="font33 fw6">{{(inputValue*inputnum*(info.service_charge_rate/100) + inputValue*inputnum).toFixed(2)}}USDT</text>
					</view>
				</view>
			</view>
		</view>
		<view v-if="offer==2">
			<view class="flex padLR40 flexic agreen" @click="isagreen=!isagreen" >
				<view class="imgbox brYuan" v-if="!isagreen" ></view>
				<image src="/static/img/chosse.png" mode=""  class="img" v-else ></image>
				<text class="fontS24 font99 " >{{$t('当库存不足时接受小于预期数量的成交')}}</text>  
			</view>
		</view> 
		<!-- <view class="btn_box" @click="pay" :style="offer==0?'':'margin-top:200rpx'">
			<view class="btn00"> 
				{{offer!=0?$t('添加资金'):$t('结算')}}
			</view> 
		</view> -->
		<Password :show='show' @finish='finish' @isShow='isShow'/>
		<u-button @click="pay"
		    :style="offer==0?'margin-top:100rpx':'margin-top:100rpx'"
			style='margin:0 auto 0rpx;width:90%;height: 115rpx;background: #0F172C;border-radius: 20rpx;color: #FFFFFF;font-size: 32rpx;'
			:text="offer!=0?$t('添加资金'):$t('结算')" :loading='loading'></u-button> 
	</view>
</template>
<script>
	import Password from '@/componentes/payPassWord.vue'
	export default {
		data() {
			return {
				show:false, //支付密码弹窗
				info:{},
				loading:false,
				isagreen:false,
				inputValue: '',  //价格
				offer:0, //0表示此页面是支付,为1表示出价页面(拍卖) 2是报价页面（竞价;
				inputnum:1,//数量
				offer_id:"",  //为当前商品的id
			}
		},
		components:{
			Password
		},
		onLoad(option) {
				this.offer=option.offer?option.offer:"";
				this.offer_id=option.offer_id?option.offer_id:'' ;
			    this.$my.post('/index/trade/pre',{type:this.offer==0?"sell":this.offer==1?"auction":"bid",order_id:this.offer_id}).then(res=>{
				if(res.code==200){
					this.info=res.data 
				} 
			})
		}, 
		methods: {
			isShow(e){
				this.show=e
				console.log(e)
			},
			finish(e){
				this.loading=true
				let url;
				 let data;
				if(this.offer==0){
					url ='/index/sell/attend_sell';
					data={order_id:this.offer_id,num:this.inputnum,pay_password:e};
					this.$my.post(url,data).then(res=>{ 
						this.loading=false;
						if(res.code==200){ 
							this.$my.toast(res.message)
							setTimeout(()=>{
								 uni.navigateBack()
							},500) 
						}else{
							this.$my.toast(res.message) 
						}
					})
				}else{
					if(this.offer==1){
						url ='/index/auction/attend_auction';
						data={price:this.inputValue,id:this.offer_id,pay_password:e,};
						this.$my.post(url,data).then(res=>{
							this.loading=false;
							if(res.code==200){ 
								this.$my.toast(res.message)
								setTimeout(()=>{
									 uni.navigateBack()
								},500)
							}else{
								this.$my.toast(res.message)
							}
						})
					}else{
						// 这是报价 也是竞价   竞价挂卖单
						this.$my.post('/index/bid/nft_bid_buy',{order_id:this.offer_id,num:this.inputnum,coin:this.inputValue,bid_type:this.isagreen?1:0,pay_password:e}).then(res=>{
							this.loading=false;
							if(res.code==200){
								this.$my.toast(res.message)
								setTimeout(()=>{
									 uni.navigateBack()
								},500)
							}else{
								this.$my.toast(res.message)
							}
						})
					}
				}
			},
			pay() { 
				if(!this.inputnum){
					 this.$my.toast(this.$t('请先完成表单')) 
					 return;
				}
				if(this.offer==1){
					if(!this.inputValue){
						 this.$my.toast(this.$t('请先完成表单')) 
						 return;
					}
				}
				this.show=true
			}
		}
	}
</script>

<style lang='scss' >
	.agreen{
		.imgbox{
			width: 28rpx;
			height: 28rpx;
			border: 2rpx solid #999999;
			margin-right: 16rpx;
		}
		.img{
			width: 32rpx;
			height: 32rpx;
			margin-right: 16rpx;
			
			
		}
	}
	.btn_box {
		width: 100%;
		padding: 0 40rpx;
		box-sizing: border-box;
		/* margin-top: 200rpx; */ 
		/* bottom: 50rpx; */
		left: 0;
		.btn00 {
			width: 100%;
			height: 115rpx;
			line-height: 115rpx;
			font-size: 32rpx;
		} 
	}
	.content {
		padding: 40rpx;
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
			padding: 40rpx 46rpx 0;
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
				padding: 0 46rpx;
				box-sizing: border-box;
				width: 100%;
				position: absolute;
				border-top: 6rpx dotted #F4F5F7;
				margin-bottom: 0;
				bottom: 0rpx;
				left: 0;
				height: 108rpx;
				line-height: 108rpx;

				.yuan {
					width: 60rpx;
					height: 60rpx;
					background: #F4F5F7;
					border-radius: 50%;
					position: absolute;
					top: -30rpx;
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
</style>
