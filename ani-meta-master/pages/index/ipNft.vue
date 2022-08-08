<template>
	<view class="">
		<Head :title="$t('动漫IP NFT')" />
		<view class="content_box">
			<view class="classification fontS32 flexJBC fw6">
				<view class="l " :class="willLine=='sell'?'active':''" @click="getList('sell')">{{$t('售卖中')}}</view>
				<view class="r" :class="willLine=='online_soon'?'active':''" @click="getList('online_soon')"> {{$t('即将上线')}}</view>
			</view>
		</view>
		<view class="flexW flexJB mode1_box relative padLR40">
			<view class="libox br40 relative " v-for="(item,index) in list" :key="item.id"  v-if="item.time"
				@click="$my.go($my.go(`/pages/goodsDetail/goodsDetaill?sell_id=${item.order_id}&routeType=1&nft_id=${item.nft_id}`))">
				<image :src="$my.imgurl+item.attachment_text" style="width: 100%;height: auto" mode="widthFix" > 
					<view class="name">
						{{item.name}}
					</view>
					<view class="will_start_box" v-if="willLine=='online_soon'">
						<view class="text" style="font-size: 14rpx;">
							{{$t('即将上线')}}
						</view>
						<view class="date" style="font-size: 16rpx;">
							{{item.time}}
						</view>
					</view>
			</view>
		</view>
		<noDate v-if="list.length==0"/>
		<u-loadmore :status="status"   v-if="list.length>8"/>
		<!-- <water-flow-box ref="wfp" @click="choose" :colunmNumber="colunmNumber" :flowList="list" :columnGap="16" style='padding: 0 20rpx;'></water-flow-box> -->
	</view>
</template>

<script>
	// import waterFlowBox from '@/componentes/hd_list/hd_list.vue'
	const data = require('@/componentes/hd_list//data.json');
	export default {
		data() {
			return {
				status:"",
				willLine: "sell", //是否是售卖中
				colunmNumber: 2, //列
				page: 1,
				start: 0,
				end: 0,
				list: [], // 列表
			}
		},
		// components:{waterFlowBox},
		onLoad() {
			this.getList();
		},
		onReachBottom() {
			this.page++;
			this.status='loading';
			this.getList();
		},
		methods: {
			// 选中
			choose(item) {
				// item 返回选中 JSON 对象
				console.log(item)
			},
			// 模拟加载数据
			getList(val) {
				if(val){
					this.list=[]
					this.willLine=val
				}
				this.$my.get('/index/home/get_nft_sell_list', {
					type: this.willLine,
					page: this.page,
					limit: 10 
				}).then(res => {
					if (res.code == 200) {
						if (res.data.data.length > 0) {
							this.list = this.list.concat(res.data.data)
							this.istcopy=this.list
							this.list.forEach((item,index) => { 
								if(this.willLine=='online_soon'){
									let date = new Date(item.start_time);
									// 获取当前与开始来计算天数
									let timestamp = Date.parse(new Date()) / 1000
									// let timestamp=1658820500
									let starttime = date.getTime() / 1000   
									console.log(timestamp,starttime)
									let num = starttime - timestamp;  
										let timer = setInterval(() => {
											num--
											if (num < 0) { 
												item.time=false
												return 
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
												let dataAndTime = (day?day+ ":":'')   + hr + ":" + min + ":" + sec
												this.$set(item, 'time', dataAndTime)
											}
										}, 1000) 
								}else{
									this.$set(item, 'time', "0:0:0")
								}
							})
						}else{
							console.log(1)
							this.status=this.$t('没有更多了')
						}
					}
				})
				
			}
		}

	}
</script>

<style lang="scss" scoped>
	.libox {
		width: 319rpx;
		background-color: #fff;
		overflow: hidden;
		box-sizing: border-box;
		margin-bottom: 20rpx;
		// height: 374rpx;
		.will_start_box {
			position: absolute;
			top: 20rpx;
			right: 20rpx;
			width: 100rpx;
			height: 100rpx;
			text-align: center;
			background: #000000;
			border-radius: 50%;
			opacity: 0.4;
			font-weight: 400;
			color: #fff;

			.text {
				font-size: 16rpx;
				margin: 15rpx 0 10rpx;
			}

			.date {
				font-size: 18rpx;
			}
		}

		.name {
			position: absolute;
			color: #fff;
			bottom: 0;
			// left: 50%;
			// transform: translateX(-50%);
			font-size: 28rpx;
			width: 100%;
			height: 71rpx;
			line-height: 71rpx;
			text-align: center;
			background: linear-gradient(360deg, rgba(0, 0, 0, 0.69) 0%, rgba(84, 84, 84, 0) 100%);
			border-radius: 0 0 36rpx 36rpx;
		}
	}

	.content_box {
		padding: 30rpx 40rpx 0rpx;
		box-sizing: border-box;
	}

	.classification {
		margin-bottom: 42rpx;
		border-bottom: 1px solid #D4D4D4;

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
</style>
