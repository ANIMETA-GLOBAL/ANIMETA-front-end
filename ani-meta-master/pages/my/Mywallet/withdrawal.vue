<template>
	<view>
		<Head :title="$t('提现')" />
		<view class="padLR40">
			<view class="classification fontS36 flexJBC fw6">
				 <view class="l " :class="current==1?'active':''" @click="current=1">{{$t('提现藏品')}}</view>
				 <view class="r" :class="current==2?'active':''" @click="current=2"> {{$t('提现货币')}}</view>
			</view>
			
			<view class="id" v-if="current == 1">
				<view class="up_img">
					<view class="up_img_div" >
						<image src="../../../static/wallet/3484.png" alt=""></image>
					</view>
				</view>
			</view>
			
			<view class="withdeawal_box" v-if="current==2">
				 <u--input style='padding: 0 30rpx;background-color: #fff;height: 106rpx;border-radius: 20rpx;margin-bottom: 28rpx;' :placeholder="$t('请输入提现金额')" border="none"
				 	v-model="money"  placeholderStyle='padding-left:5rpx;color: #999999;font-size: 28rpx;' type='number'>
				 	<template slot="suffix">
				 		<view class="fontS28 font99">
				 			USDT 
				 		</view>
				 	</template>
				 </u--input>
				 <view class="fontS20">
				 	<text>{{$t('您当前账户余额为')}}</text><text class="font60">999,99USDT</text>
				 </view>
			</view>
			<view class="lis_box">
				<view class="title fontS32">
					{{$t('地址')}}
				</view>
				<u--input style='padding: 0 30rpx;background-color: #fff;height: 106rpx;border-radius: 20rpx;margin-bottom: 28rpx;' :placeholder="$t('请输入地址')" border="none"
					v-model="address"  placeholderStyle='padding-left:5rpx;color: #999999;font-size: 28rpx;' type='number'>
					
				</u--input>
				<view class="fontS20 font99">
					{{current==1?$t('您的藏品将提现到此地址'):$t('您的货币将转移到此地址')}}
				</view>
			</view>
			<view class="lis_box" v-if="current==2">
				<view class="title fontS32" >
					{{$T('提币网络')}}
				</view>
				<view class="white_box flexJBC" @click="show=true">
					 <text class="fontS28">{{active.name}}</text>
					 <u-icon name="arrow-down"></u-icon>
				</view> 
			</view>
			<view class="flexJBC fontS28">
				<text class="font99">{{$t('服务费')}}</text> 
				<text>10 USDT</text>
			</view>
			<u-button @click='btnClick'
				style='margin:72rpx auto 0rpx;width:100%;height: 115rpx;background: #0F172C;opacity: 1;border-radius: 20rpx;color: #FFFFFF;font-size: 32rpx;'
				:text="$t('提现')" :loading='loading'></u-button> 
		</view>
		<!-- 提币网络弹窗 -->
		<u-overlay :show="show" @click="show=false">
			<view class="warp" @tap.stop>
				<view class="fontS36 textAc">
					{{$t('选择提币主网')}} 
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
	export default{
		methods:{
			btnClick(){
				this.loading=true;
			},
			activeClick(item){
				this.active=item;
				this.show=false;
			}
		},
		data(){
			return{
				address:"",//提现地址
				money:'', //提现金额
				current:1,
				loading:false,
				show:false,
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
		.introduce{
			line-height:60rpx;
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
	.lis_box{
		.white_box{
			width:100%;
			height: 106rpx;
			background: #FFFFFF;
			border-radius: 32rpx;
			margin:40rpx auto 72rpx;
			text-align: center;
			line-height: 106rpx;
			padding:0 40rpx;
			box-sizing: border-box;
		}
		.title{
			margin: 72rpx 0 40rpx;
			
		}
		margin-bottom: 72rpx; 
	}
	.withdeawal_box{
		margin: 54rpx 0 0;
	}
	.classification{
		border-bottom: 1px solid #D4D4D4;
		margin-top: 48rpx;
		height: 80rpx;
		view{
			width: 50%;
			text-align: center;
			padding-bottom: 32rpx;
			color: #999999;
			position: relative;
		}
		.active{
			color: #0F172C;
			&:before{
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
	
</style>