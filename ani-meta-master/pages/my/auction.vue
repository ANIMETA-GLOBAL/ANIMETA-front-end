<template>
	<view>
		<Head :tab="true" :title="$t('我的拍卖')" />
		<view class="top_box" :style="{paddingTop:$store.state.tabhHeight}">
			<view class="classification fontS32 flexJBC fw6">
				<view class="l " :class="current==1?'active':''" @click="getList(1)">{{$t('我参与的')}}</view>
				<view class="r" :class="current==2?'active':''" @click="getList(2)"> {{$t('我发布的')}}</view>
			</view>
		</view>
		<!-- <view class="tabs_box">
			<view :class="[item.chcek ? 'tabs_text tabs_text_c' : 'tabs_text']" v-for="item in tabslist"
				@click="tabsC(item.id)" :key="item.name"> 
				{{item.name}}
				<u-transition :show="item.chcek">
					<view class="tabs_line"></view>
				</u-transition>
			</view>-
		</view>
		<view class="line"></view> -->
		<!---->
		<view class="Collection_list" style="margin-top: 160rpx;">
			<view class="list" v-for="(item,index) in list" :key='index' @click="lisClick(item)">
				<view class="list_title">
					<view class="flex flexic">
						<text>{{current==1?item.sell_nickname:item.buy_nickname}}</text>
						<image src="/static/img/dunpai.png" style="width: 32rpx;height: 32rpx;margin-left: 10rpx;" v-if="item.identity==2"></image>
					</view>
					<text 
						:style="{color:item.timereduc?'#6094FF':'#999'}">{{item.timereduc?'拍卖倒计时 '+ item.timereduc : item.timetype==1?item.start_time +' 未开始': item.end_time+' 结束'}}</text>
					<!-- <text :style="{color:item.typevalue=='进行中'?'#6094FF':'#999'}">{{item.typevalue=='结束'?item.end_time:item.typevalue=='（已开始）'?item.start_time:item.timereduc}}{{item.typevalue}}</text> -->
				</view>
				<view class="content_boxbox">
					<view class="content">
						<image :src="$my.imgurl+item.attachment_text" mode="" class='img'></image>
						<view class="Tradename" style="flex: 1;">
							<view class="name_top flexJBC">
								<view>{{item.nft_name}}</view>
								<view class="fontS20 font99">{{$t('起拍价')}}</view>
							</view>
							<view class="name_bottom flexJBC">
								<text>{{item.collection_name}}</text>
								<text>{{item.start_price}}USDT</text>
							</view>
						</view>
					</view>
					<view class="font99 fontS24 num">
						X{{item.num}}
					</view>
				</view>
				<view class="operation flexJBC">
					<view class="">
						<view class="" v-if="current==1">
							<text>{{$t('我的出价')}}：{{item.price}}USDT</text>
							<text style="margin-top: 20rpx;display: block;" v-if="item.timetype==2">{{$t('当前出价')}}：{{item.max_price}}USDT</text>
							<text style="margin-top: 20rpx;display: block;" v-else>{{$t('最高出价')}}：{{item.max_price}}USDT</text>
						</view>
						<view  v-else>
							<text>{{$t('底价')}}：{{item.low_price}}USDT</text>
							<text style="margin-top: 20rpx;display: block;" >{{$t('当前出价')}}：{{item.max_price}}USDT</text>
						</view>
						
					</view>
					<view class="op_btn">
						<view class="bl_find" v-if="item.timereduc && current==1" @click.stop="$my.go(`/pages/goodsDetail/payAndOffer?type=3&offer_id=${item.id}`)">{{$t('再次出价')}}</view>
						<view class="bl_find" v-else>{{$t('查看藏品')}}</view> 
						<view class="copy" v-if="current==2 && item.timetype==1" @click="cancel(item)"
							style="margin-left: 20rpx;">取消拍卖</view>
					</view>
				</view>
			</view>
			<u-loadmore :status="status" v-if='list.length>3' />
			<noDate v-if='list.length==0' />
		</view>
	</view>
</template>
<script>
	export default {
		// onUnload(){
		// 	 clearInterval(timer)
		// }, 
		data() {
			return {
				status: '',
				current: 1,
				page: 1,
				list: [], //已购买

			};
		}, 
		methods: {
			cancel(item){
				this.$my
				  .post("/index/auction/cancel_auction", {
				    id: item.auction_id,
				  })
				  .then((res) => {
				    this.$my.toast(res.message);
				    if (res.code == 200) {
				      this.getList();
				    }
				  });
			},
			lisClick(item) {
				if (item.timetype == 3) {
					// 已结束的订单才有详情
					this.$my.go(`/myPackageA/orderDetail?order_id=${item.order_id}&trade=${this.current}&type=${this.currenId==1?3:4}`)
				} else {
					this.$my.go(`/pages/goodsDetail/goodsDetaill?auction_id=${item.auction_id}&offer=2`)
				}
			},
			getList(val) {
				if (val) {
					this.current = val;
					this.page = 1;
					this.list = [];
				}
				this.$my.post('/index/trade/get_transaction_action', {
					// trade auction
					auction: this.current,
					limit: 10, 
					page: this.page
				}).then(res => {
					if (res.code == 200) {
						if (res.data.data.length > 0) {
							this.list = this.list.concat(res.data.data)
							this.list.forEach((item, index) => {
								// 获取当前与结束时间戳来计算天数
								let timestamp = Date.parse(new Date()) / 1000
								let endtime = new Date(item.end_time).getTime() / 1000
								let startime = new Date(item.start_time).getTime() / 1000
								if (timestamp > startime && timestamp < endtime) {
									// item.typevalue = '（进行中）'
									let num = endtime - timestamp;
									let timer = setInterval(() => {
										num--
										if (num < 0) {
											this.$set(item, "timereduc", false)
											this.$set(item,"timetype",3)
										} else {
											let second = Math.floor(num);
											// 天数
											let day = Math.floor(second / 3600 / 24);
											// 小时
											let hr = Math.floor(second / 3600 % 24);
											// 分钟
											let min = Math.floor(second / 60 % 60);
											// 秒
											let sec = Math.floor(second % 60);
											let dataAndTime = (day ? day + ":" : '') + hr + ":" +
												min + ":" + sec
											this.$set(item, "timereduc", dataAndTime)
											this.$set(item, "timetype", 2)
										}
									}, 1000)
									// this.getDayAndTime(item.end_time, index)
								} else if (endtime < timestamp) {
									console.log(true)
									this.$set(item, "timereduc", false)
									this.$set(item, "timetype", 3) //结束
								} else if (startime > timestamp) {
									this.$set(item, "timetype", 1) //未开始
								}
								// this.$set(item,"typevalue",'')
								// if(timestamp>startime && timestamp<endtime ){
								// item.typevalue='进行中'
								//  this.getDayAndTime(item.end_time,item,index)
								// }else if(endtime<timestamp){
								//  item.typevalue='结束' 
								// }else if(startime<timestamp){
								//   item.typevalue='未开始'
								// } 
							})
						} else {
							this.status = this.$t('没有更多了')
						}
					}
				})
			},
			tabsC(id) {
				this.page = 1;
				this.list = [];
				this.tabslist.forEach(item => {
					if (item.id == id) {
						item.chcek = true;
						setTimeout(() => {
							this.getList()
						}, 500);
					} else {
						item.chcek = false;
					}
				})
			},
		},
		onReachBottom() {
			this.page++
			this.status = 'loading';
			this.getList()
		},
		onShow() {
			this.list=[];
			this.getList()
		},
	}  
</script>


<style lang="scss" scoped>
	.top_box {
		position: fixed;
		top: 0;
		z-index: 9;
		background: #F4F5F7;
		width: 100%;
		left: 50%;
		transform: translateX(-50%);
		padding: 28rpx 40rpx 0rpx;
		box-sizing: border-box;

		.classification {
			border-bottom: 1px solid #D4D4D4;
			margin-top: 48rpx;

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
	}


	/deep/.head {
		// padding:0rpx 40rpx;
		padding: 0;
		height: 80rpx;
		line-height: 80rpx;
		box-sizing: border-box;
		position: sticky;
		color: #0F172C;
	}

	.tabs_box {
		width: 100%;
		display: flex;
		height: 60rpx;
		margin-top: 48rpx;

		.tabs_text {
			flex: 1;
			font-size: 28rpx;
			font-family: Source Han Sans CN;
			font-weight: 500;
			color: #999999;
			line-height: 0px;
			text-align: center;
			line-height: 10rpx;
			position: relative;

			.tabs_line {
				width: 112rpx;
				height: 4px;
				background: #0F172C;
				opacity: 1;
				border-radius: 3px;
				position: absolute;
				bottom: -8rpx;
				left: calc(50% - 56rpx);
			}
		}

		.tabs_text_c {

			color: #333333;
		}
	}

	.line {
		width: 100%;
		height: 0px;
		border: 1px solid #C2C2C2;
		opacity: 1;
		margin-bottom: 48rpx;
	}

	.Collection_list {
		padding: 0 40rpx;
		box-sizing: border;

		.list {
			width: 670rpx;
			// height: 290rpx;
			background: #FFFFFF;
			opacity: 1;
			border-radius: 32rpx;
			margin-bottom: 32rpx;
			padding: 30rpx;
			box-sizing: border-box;

			.list_title {
				font-size: 28rpx;
				font-family: Source Han Sans CN;
				font-weight: 500;
				color: #333333;
				opacity: 1;
				display: flex;
				justify-content: space-between;

				text:nth-child(2) {
					font-size: 20rpx;
					font-family: Source Han Sans CN;
					font-weight: 400;
					color: #999999;
					opacity: 1;
				}
			}

			.content_boxbox {
				border-bottom: 1rpx solid rgba(51, 51, 51, 0.1216);
				padding-bottom: 30rpx;

				.num {
					text-align: right;
					margin-top: 20rpx;
				}

				.content {
					width: 100%;
					margin-top: 24rpx;
					display: flex;

					.img {
						width: 112rpx;
						height: 112rpx;
						background: #DFDFDF;
						opacity: 1;
						border-radius: 20rpx;
					}

					.Tradename {
						margin-left: 24rpx;

						.name_top {
							font-size: 28rpx;
							font-family: Source Han Sans CN;
							font-weight: 500;
							color: #333333;
							line-height: 28px;
							opacity: 1;
						}

						.name_bottom {
							font-size: 24rpx;
							font-family: Source Han Sans CN;
							font-weight: 400;
							line-height: 28px;
							color: #999999;
							opacity: 1;
						}
					}
				}
			}



			.operation {
				display: flex;
				justify-content: space-between;
				margin-top: 18rpx;

				text {
					font-size: 24rpx;
					font-family: Source Han Sans CN;
					font-weight: 400;
					color: #666666;
					opacity: 1;

				}

				.op_btn {
					display: flex;
					justify-content: space-between;

					.copy {
						width: 123rpx;
						height: 48rpx;
						background: #FFFFFF;
						border: 1rpx solid #707070;
						border-radius: 12rpx;
						font-size: 20rpx;
						font-weight: 400;
						line-height: 48rpx;
						color: #333333;
						text-align: center;
					}

					.bl_find {
						font-size: 20rpx;
						font-family: Source Han Sans CN;
						font-weight: 400;
						line-height: 48rpx;
						color: #FFFFFF;
						width: 123rpx;
						height: 48rpx;
						background: #0F172C;
						border-radius: 12rpx;
						text-align: center;
						margin-left: 32rpx;
					}
				}
			}

		}
	}
</style>
