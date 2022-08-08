<template>
	<view class="content">
		<Head :title="$t('订单详情')" />
		<view class="white_box_content" :style="{paddingTop:$store.state.tabhHeight }">
			<view class="white_box">
				<view class="top flexJBC">
					<view class="flex flexic">
						<text class="fontS32">{{detail.nickname}}</text>
						<image src="/static/img/dunpai.png" style="width: 32rpx;height: 32rpx;margin-left: 10rpx;" v-if="detail.identity==2"></image>
					</view>
					<text class="fontS24 font99">{{detail.pay_time}}</text>
				</view>
				<view class="imgbox flex" >
					<image src="" mode=""></image> 
					<view class="" style="flex: 1;">
						<view class="fontS28 name">
							{{detail.nft_name}}
						</view>
						<view class="fontS99 fontS24 flexJBC" >
							<text>{{detail.collection_name}}</text>
							<text>X{{type==1?detail.buy_num:type==2?detail.sold_num:detail.num}}</text>
						</view> 
					</view> 
				</view>
				<view class="li flexJBC fontS24 font99">
					<text>{{$t('商品价格')}}</text> 
					<text>{{type==1?detail.buy_coin:type==2?detail.sold_coin:type==3?detail.price:detail.max_price}} {{detail.coin_type}}</text>
				</view>
					<view class="li flexJBC fontS24 font99">
					<text>{{$t('服务费')}}</text>
					<text>{{'服务费还没有对接'}}</text>
				</view>
				<view class=" flexJBC fontS28 font99 fw6"> 
					<text class=" font33">{{$t('成交价')}}</text>
					<text class="font60 ">{{(type==1?detail.buy_coin*detail.buy_num:type==2?detail.sold_coin*detail.sold_num:type==3?detail.price*detail.num:detail.max_price*detail.num).toFixed(2)}} {{detail.coin_type}}</text>
				</view> 
			</view>
			<!-- <view class="white_box">
				<text class="fontS32 fw6">{{$t('链上信息')}}</text>
				<view class="line li"></view>
				<view class="flexJBC lianlisbox li">
					<text class="fonts24 font99">{{$t('合约地址')}}</text>
					<view class="els font60">
						0x454sd...sd4z0x454sd...sd4z0x454sd...sd4z0x454sd...sd4z0x454sd...sd4z0x454sd...sd4z0x454sd...sd4z
					</view>
				</view>
				<view class="flexJBC lianlisbox li" @click="copy('123')">
					<text class="fonts24 font99">{{$t('令牌ID')}}</text>
					<view class="els font66">1786465654334...</view>
					<img src="/static/img/my_copy.png" mode="" class='wh20'></img>
				</view>
				<view class="flexJBC lianlisbox li">
					<text class="fonts24 font99">{{$t('代币标准')}}</text> 
					<view class="els font66">ERC-1155</view>
				</view>
				<view class="flexJBC lianlisbox li">
					<text class="fonts24 font99">{{$t('区块链')}}</text>
					<view class="els font66">以太坊</view>
				</view> 
				<view class="flexJBC lianlisbox li">
					<text class="fonts24 font99">{{$t('哈希地址')}}</text>
					<view class="els font60">
						0x454sd...sd4z0x454sd...sd4z0x454sd...sd4z0x454sd...sd4z0x454sd...sd4z0x454sd...sd4z0x454sd...sd4z
					</view>
				</view>
			</view> -->
			<view class="white_box fonts28 ">
				<text class="fontS32 font33 fw6">{{$t('挂卖信息')}}</text>
				<view class="line li"></view>
				<!-- <view class="flexJBC lianlisbox li" @click="copy('123')" v-if="type==2 || type==4">
					<text class="fonts28 font99">{{$t('买家地址')}}</text>
					<view class="els font60">{{detail.wallet_address}}</view>
					<img src="/static/img/my_copy.png" mode="" class='wh20'></img>
				</view> -->
				<view class="flexJBC lianlisbox li">
					<text class="fonts28  font99">{{$t('开始时间')}}</text> 
					<view class="els font66">{{detail.start_time}}</view> 
				</view>
				<view class="flexJBC lianlisbox li "> 
					<text class=" font99">{{$t('结束时间')}}</text>
					<view class="els font66">{{detail.end_time}}</view>
				</view>
			</view>
		</view>
	</view>
</template>


<script>
	export default{
		data(){
			return{
				detail:"",
				order_id:"",//订单id
				trade:'' ,//我的交易是出售sell还是购买buy   我的拍卖  1 参与| 2 发布
				type:3, //1表示当前是我的交易里的购买详情  2我的交易里的出售  3我的拍卖我参与的 4我的拍卖我发布的
			}
		},
		methods:{
			copy(value) {
				this.$my.copy(value)
			},
		},
		onLoad(optione){
			this.order_id=optione.order_id?optione.order_id:2;
			this.trade=optione.trade?optione.trade:2 
			this.type=optione.type?optione.type:3  
			if(this.type==1 || this.type==2){
				this.$my.post('/index/trade/get_order_details',{order_id:this.order_id,trade:this.trade}).then(res=>{
					 if(res.code==200){
						 this.detail=res.data 
					 }
				}) 
			} else{
				this.$my.post('/index/trade/get_auction_order_details',{order_id:this.order_id,auction:this.trade}).then(res=>{
					 if(res.code==200){
						 this.detail=res.data
					 }
				})
			}
			 
			
			
		}
	} 
</script>

<style lang="scss" scoped>
	.white_box_content {
		padding: 0 40rpx;
		box-sizing: border-box;
        .li{
			margin-bottom: 28rpx;
		}
		.white_box {
			.lianlisbox {
				view {
					text-align: right;
					flex: 1;
					margin-left: 10rpx;
				}
			}
			.line{
				width: 100%;
				height: 2rpx;
				background-color:  rgba(0,0,0,0.1216);
				margin-top: 30rpx;
			}
			.imgbox {
				margin-top: 28rpx;
				margin-bottom: 72rpx;

				image {
					width: 112rpx;
					height: 112rpx;
					border-radius: 20rpx;
					background-color: #DFDFDF;
					margin-right: 24rpx;
				}

				.name {
					margin: 10rpx 0 20rpx;
				}
			}

			width: 100%;
			margin-bottom:32rpx ;
			// margin: 0 auto 32rpx;

			border-radius: 32rpx;
			padding:30rpx;
			box-sizing: border-box;
			background-color: #fff;
		}
	}
</style>
