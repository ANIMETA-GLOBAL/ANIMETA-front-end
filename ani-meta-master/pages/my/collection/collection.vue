<template>
	<view>
		<Head :tab="true" :title="$t('我的交易')" />
		<view class="" style="padding: 0 40rpx;box-sizing: border-box;">
			<view class="tabs_box">
				<view :class="[item.chcek ? 'tabs_text tabs_text_c' : 'tabs_text']" v-for="item in tabslist"
					@click="tabsC(item.id)" :key="item.name">
					{{$t(item.name)}}
					<u-transition :show="item.chcek">
						<view class="tabs_line"></view>
					</u-transition>
				</view>
			</view>
			<view class="line"></view>
			<view class="Collection_list">
				<view class="list" v-for="(item,index) in list" :key='index'
					@click="goDetail(item)">
					<view class="list_title">
						<view class="flex flexic" v-if="currenId!=='deal'">
							<text >{{item.nickname}}</text>
							<image src="/static/img/dunpai.png" style="width: 32rpx;height: 32rpx;margin-left: 10rpx;" v-if="item.identity==2"></image>
						</view>
					    <text v-else></text>  	<!-- //不能删 -->
						<text>
							<text v-if="currenId=='deal'" :style="item.timereduc? 'color:#6094FF' :''"> 
							    {{item.typetime==1?item.start_time+'（未开始）':item.typetime==2?item.timereduc:item.end_time+$t('（已结束）')}}
							</text>
							<text v-else>
								{{item.pay_time}} 
							</text> 
						</text>
					</view>
					<view class="content">
						<image :src="$my.imgurl+item.attachment_text" mode="" class='img'></image>
						<view class="Tradename" style="flex: 1;"> 
							<view class="flexJBC" style="width: 100%;">
								<view class="name_top">{{item.nft_name}}</view>
								<view class="fontS24 font99">
									X {{currenId=='deal'?item.sell_num:currenId=='buy'?item. buy_num:item.sold_num}}     
								</view>
							</view>
							<view class="name_bottom">{{item.collection_name}}</view>
						</view>
					</view>
					<view class="operation flexJBC">
						<text>{{currenId=='deal'?$t('价格'):$t('成交价')}}：{{currenId=='deal'?item.sell_coin:currenId=='buy'?item.buy_coin:item.sold_coin }}USDT</text>
						<view class="op_btn">
							<view class="bl_find">{{$t('查看藏品')}}</view>
							<view class="copy" v-if="currenId=='deal' && item.typetime!=3" @click.stop="cancel(item)">取消挂卖</view>
						</view> 
					</view> 
				</view> 
				<u-loadmore :status="status" v-if='list.length>5' />
				<noDate v-if='list.length==0' />
			</view>
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
				timer:"",
				status: '',
				currenId: "deal",
				page: 1,
				list: [], //已购买
				tabslist: [{
					name: '已挂卖',
					chcek: true,
					id: 'deal'
				}, {
					name: '已购买',
					chcek: false,
					id: 'buy'
				}, {
					name: '已出售',
					chcek: false,
					id: 'sell'
				}, ],
			};
		},
		methods: {
			goDetail(item){
				if(item.typetime==3){
					// 已结束 
					this.$my.go(`/myPackageA/orderDetail?order_id=${item.id}&trade=${this.currenId=='sell'?'sell':'buy'}&type=${this.currenId=='buy'?1:2}`)
				}else{
					this.$my.go(`/pages/goodsDetail/goodsDetaill?sell_id=${item.order_id}&routeType=1&nft_id=${item.nft_id}`)
				}
			},
			cancel(item) {
				// 取消挂卖   链上操作
				this.$my.post("/index/trade/cancel_transaction",{id:item.id,order_id:item.order_id}).then(res=>{
					 if(res.code==200){
						 this.$my.toast(res.message);
						 this.list=[]; 
						 this.getList(); 
					 }else{
						 this.$my.toast(res.message);
					 }
				})
			},
			getList() {
				this.$my.post('/index/trade/get_transaction', {
					trade: this.currenId,
					limit: 10,
					page: this.page
				}).then(res => { 
					if (res.code == 200) {
						if (res.data.data) {
							if (res.data.data.length > 0) {
								   this.list = this.list.concat(res.data.data)
								   this.list.forEach((item, index) => {
									// 获取当前与结束时间戳来计算天数
									let timestamp = Date.parse(new Date()) / 1000
									let endtime = new Date(item.end_time).getTime() / 1000
									let startime = new Date(item.start_time).getTime() / 1000
									this.$set(item, "typevalue", '')
									if (timestamp > startime && timestamp < endtime) {
										// item.typevalue = '（进行中）'
										let num = endtime-timestamp;
										let timer = setInterval(()=>{
											  num--
											 if(num<0){
												this.$set(item,"timereduc",false)
												this.$set(item,"typetime",3)  //结束
											 }else{
												 let second = Math.floor(num);
												 // 天数  
												 let day = Math.floor(second / 3600 / 24);
												 // 小时
												 let hr = Math.floor(second / 3600 % 24); 
												 // 分钟
												 let min = Math.floor(second / 60 % 60); 
												 // 秒
												 let sec = Math.floor(second % 60);
												 let dataAndTime= (day?day + ":" :'') + hr + ":" + min + ":" + sec
												 this.$set(item,"timereduc",dataAndTime)
												 this.$set(item,"typetime",2) //进行中
											 }
										},1000) 
										// this.getDayAndTime(item.end_time, index)
									} else if (endtime < timestamp) {
										 this.$set(item,"timereduc",false)
										  this.$set(item,"typetime",3)  //结束
										
									} else if (startime > timestamp) {
										  this.$set(item,"typetime",1) //（未开始） 
									}
								})
							}
						}

					}
				})

			},
			tabsC(id) {
				this.currenId = id;
				this.page = 1;
				this.list = [];
				this.tabslist.forEach(item => {
					if (item.id == id) {
						item.chcek = true;
					} else {
						item.chcek = false;
					}
				})
				this.getList()
			},
		},
		onReachBottom() {
			this.page++;
			this.status = 'loading';
			this.getList() 
		},
		onLoad(option) {
			this.currenId=option.currenId?option.currenId:this.currenId
			if(this.currenId){
				this.tabslist.forEach(item => {
					if (item.id == this.currenId) {
						item.chcek = true;
					} else {
						item.chcek = false;
					}
				})
			}
		},
		onShow() {
			this.list=[];
			this.getList();
		},
	}
</script>


<style lang="less" scoped>
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
					padding: 10rpx 0;
					display: flex;
					justify-content: space-between;
					flex-direction: column;

					.name_top {
						font-size: 28rpx;
						font-family: Source Han Sans CN;
						font-weight: 500;
						color: #333333;
						// line-height: 28px;
						opacity: 1;
					}

					.name_bottom {
						font-size: 24rpx;
						font-family: Source Han Sans CN;
						font-weight: 400;
						// line-height: 28px;
						color: #999999;
						opacity: 1;
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
						margin-left:32rpx;
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
					}
				}
			}

		}
	}
</style>
