<template>
	<view class="flexW flexJB mode1_box relative" >
		<view class="libox br40  " v-for="(item,index) in list" :key="index" @click="go(item)" v-if="(item.time_sub && isShowTime) || !isShowTime">
			<view class="imag_box relative">
				<image :src="$my.imgurl+item.attachment_text" >
				<view class="date_box absolute fontS18 fontc08 textAc" v-if="isShowTime && item.time_sub ">
					{{item.time_sub}}
				</view>
			</view> 
			<view class="bottom_box">
				<view class="minititle fontS18" v-if="isshow"> 
					{{item.collection_name?item.collection_name:item.collection.name}}
				</view>
				<view class="title fontS26 font33 fw6 flexJBC">
					<text>{{item.nft_name?item.nft_name:item.name}}</text>
					<view class="right flex flexic" v-if="showbtottom">
						<u-icon name="heart" size='30rpx'></u-icon>
						<view class="fontS22" style="margin-left: 10rpx;">{{item.enshrine_count}}</view>
					</view>
				</view>
				<view class="flexJBC b" v-if="isBottom">
					 <view class="font33">
					 	<text class="fontS30 fw6">{{item.coin}}</text><text class="fontS18">{{item.coin_type}}</text>
					 </view>
					 <view class="right flex flexic">  
					 	<u-icon name="heart" size='30rpx'></u-icon>
						<view class="fontS22" style="margin-left: 10rpx;">{{item.enshrine_count}}</view>
					 </view>
				</view>
				<slot :data='item'></slot>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		props:{
			// 合集进入只展示收入
			showbtottom:{
				default:false, 
			},
			routeType:{
				default:1,
			},
			isshow:{  //显示底部这一块
				default:true
			},
			list:{
				default:"[]",
			},
			isBottom:{
				type:Boolean,
				default:true,
			},
			isShowTime:{ //是否显示时间
				default:false
			},
		},
		methods:{
			go(item){
				// 普通购买
				if(this.routeType==1){
					
					if(item.order_id){
							this.$my.go(`/pages/goodsDetail/goodsDetaill?sell_id=${item.order_id}&routeType=${this.routeType}&nft_id=${item.nft_id}`)
						
					}else{
						this.$my.go(`/pages/goodsDetail/goodsDetaill?routeType=${this.routeType}&nft_id=${item.nft_id}`)
					}
				}else{
					// 拍卖
					this.$my.go(`/pages/goodsDetail/goodsDetaill?auction_id=${item.auction_id}&routeType=${this.routeType}&nft_id=${item.nft_id}`)
				}
			}
		} 
	}
</script>

<style lang="scss" scoped>
	.libox{
		width: 319rpx;
		margin-top:44rpx ;
		background-color: #fff;
		padding: 20rpx;
		box-sizing: border-box;  
		.imag_box{
			width: 271rpx;
			height: 284rpx;
			border-radius: 28rpx;
			overflow: hidden;
			image{
				width: 100%;
				height: 284rpx;
			}
			.date_box{
				width: 132rpx;
				height: 48rpx;
				line-height: 48rpx;
				background: #000000;
				opacity: 0.4;
				border-radius: 12rpx;
				top: 14rpx;
				right:14rpx ;
			}
		}
		
		.bottom_box{
			margin-top: 24rpx;
			.minititle{
				color: #999999;
				margin-bottom: 12rpx;
			}
			.title{
				margin-bottom: 30rpx;
			}
			.b{
				.num{}
			}
			
		}
	
		
	}
</style>