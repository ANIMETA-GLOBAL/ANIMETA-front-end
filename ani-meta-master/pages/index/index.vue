<template>
	<view >
		<view class="content"  :style="{paddingTop:$store.state.tabhHeight }">
			<TabBar selectedIndex='0'/>
			<AddNft />
			<view class="top_box flexJBC">
				<view class="l_box">
					<view class="co0F"><text> {{$t(hoursTip)}}</text><text
							style="color:#556EF7">{{userInfo?','+userInfo.nickname:''}}</text></view>
					<view class="fw8" style="font-size: 52rpx;">ANIMETA</view>
				</view>
				<view class="r_box flex">
					<image src="../../static/img/dateIntr.png" class="wh90" style="margin-right: 48rpx;"
						@click="$my.go('/pages/index/dataAnalysis')"></image>
					<image src="../../static/img/indexSearch.png" class="wh90" @click="Gotosearch"></image>
				</view>
			</view>
			<!-- 动漫IPNFT -->
			<view class="swiper_box" v-if="bannerList.length>0">
				<Title :title="$t('动漫IP NFT')" style='padding: 0 40rpx;' @btnclick="goNTH('/pages/index/ipNft')" />
				<u-swiper height='240rpx' :list="bannerList" showTitle previousMargin="80" nextMargin="80" circular
					keyName="banner_url" :autoplay="false">
				</u-swiper>
			</view>
			<!-- 即将开始   认购暂时不做-->
			<view class="will_start_box" v-if="false">
				<Title :title="$t('即将开始')" :is_show='false' />
				<view> 
					<view class="will_start">
						<view class="white_box br15 ">
							<image :src="$my.imgurl + willStart.image "></image>
							<view class="c_box">
								<view class="title fontS32 fw7">
									{{willStart.title}}
								</view>
								<view class="mb fontS24">
									{{$t('目标')}}：{{willStart.issued_num}} UDT
								</view>
								<u-line-progress height="30rpx" :showText='false' activeColor='#6094FF'
									:percentage='willStart.purchase_speed' inactiveColor='#D4D4D4'></u-line-progress>
							</view>
							<view class="B-box fontS20 flexJBC">
								<view class="l-box">
									<view>{{$t('已达成')}}：{{willStart.purchase_speed}} '%'</view>
									<view style="margin-top: 16rpx;">{{$t('已认购')}}：{{parseInt(willStart.sum_num)}} USDT
									</view>
								</view>
								<view class="date_box br16 textAc" v-if="time"
									@click="$my.go('/myPackageA/subscribe/subscribe_detail')">
									<text class="fontS20">{{$t('距开始')}}</text>
									<view class="fontS24" style="margin-top: 6rpx;">
										{{time}}
									</view>
									<!-- <u-count-down :time="willStart.time" format="HH:mm:ss:SSS" autoStart millisecond></u-count-down> -->
								</view>
								<view class="btn00 rg" v-else @click="$my.go('/myPackageA/subscribe/subscribe_detail')">
									{{$t('立即认购')}}
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<!-- 拍卖 -->
			<view class="pm_box" v-if="nft_auction && nft_auction.length>0">
				<Title :title="$t('拍卖')" :is_show='false' />
				<u-scroll-list :indicator='false'>
					<view class="lis_box whbr " v-for="(item,index) in nft_auction" :key='index'
						v-if="item.time_red"
						style="margin-right: 32rpx;width:510rpx;"
						@click="$my.go(`/pages/goodsDetail/goodsDetaill?auction_id=${item.auction_id}&routeType=2&nft_id=${item.nft_id}`)">
		
						<view style="width:450rpx" class="relative">
							<image :src="$my.imgurl+item.attachment_text" mode="" class="br20"></image>
							<view class="rt_b absolute fontS24 fontfff textAc" v-if="item.time_red">{{item.time_red}}</view>
						</view>
						<text class="fw5 fontS32 name">{{item.name}}</text>
						<view class="b_box flexJBC">
							<view class="l_box">
								<view class="now_price fontS20">{{$t('当前出价')}}</view>
								<view class="price fontS32">{{item.max_price}}<text class="fontS20">USDT</text></view>
							</view>
							<view class="r_box fontS24 fontfff" v-if="item.time_red">
								{{$t('出价')}}
								<!-- {{item.time_red?$t('出价'):$t('已结束')}} -->
							</view>
						</view> 
					</view>
				</u-scroll-list>
			</view>
			<!-- 热门合集 -->
			<view class="rm_box " v-if="hotCollection && hotCollection.length>0">
				<Title :title="$t('热门合集')" :is_show='false' />
				<u-scroll-list :indicator='false'>
					<view class="lis whbr relative" v-for="(item,index) in hotCollection" :key='index'
						@click="$my.go(`/pages/Collectionpage/Collectionpage?id=${item.id}&coll_type=2`)">
						<view class="t_box">
							<image :src="item.cover_url?$my.imgurl+item.cover_url:$my.imgurl+item.logo_url" mode="widthFix" style="margin-top: -50rpx;"></image>
						</view>
						<view class="b_box textAc">
							<view class="font33 fontS28">{{item.name}}</view>
							<view class="font60 fontS24">{{item.creator_name}}</view>
						</view>
						<image :src="item.logo_url" mode="" class="round absolute wh100 abcenter brYuan"></image>
						<!-- <view class="round absolute wh100 abcenter brYuan"></view> -->
					</view>
				</u-scroll-list>
			</view>
			<!-- 热销 -->
			<view class="rx_box padLR40" v-if="hotNft && hotNft.length>0">
				<Title :title="$t('热销NFT')" :is_show="false">
					<!-- <view class="title_r_box bgcf textAc fontS20  flexCenter" style="align-items:baseline">
						<text>7 days</text> <u-icon name="arrow-down" color="#333" size="12" ></u-icon>
					</view> -->
				</Title>
				<view class="lis_box whbr flexJBC" v-for="(item,index) in hotNft "
					@click="$my.go(`/pages/goodsDetail/goodsDetaill?sell_id=${item.order_id}&routeType=1&nft_id=${item.nft_id}`)">
					<view class="flex flexic">
						<view class="l fontS32 fw5" style="margin-right: 40rpx;">
							{{index+1}}
						</view>
						<view class="c flexJBC ">
							<image :src="$my.imgurl+item.attachment_text" mode="" class="brYuan"></image>
							<view class="r flexCl textAl">
								<view class="name fontS32 font33 fw5 elipes1" style="width:350rpx;">
									{{item.name}}
								</view>
								<view style="margin-top: 23rpx;">
									<text class="fontS26">{{item.coin}}</text><text class="fontS22">USDT</text>
								</view>
							</view>
						</view>
					</view>
					<!-- <u-icon name="arrow-rightward" color="#333" size="22" :bold='true'></u-icon> -->
					<image src="../../static/img/right.png" class="r_img"></image>
				</view>
				<u-loadmore :status="status" v-if="hotNft.length>5" />
			</view>
		</view>
	</view>
</template>
<script>
	import Title from './title.vue'
	import AddNft from '../addNft/addNft.vue'
	export default {
		data() { 
			return {
				img: require('../../static/img/Property 1=Chinese.png'),
				Bg: "", //背景颜色
				status: '', //触底状态
				page: '1',
				nft_auction: [], //拍卖
				hotNft: [], //热销NFT 
				hotCollection: [], //热门合集
				bannerList: [], //IPNFT
				willStart: "", //即将开始
				time: "00:00:00:00", //倒计时
				percentage: "", //即将开始进度条
				hoursTip: "", //早上好？
				userInfo: "", //用户信息  
			}
		},
		// 下拉刷新
		onPullDownRefresh(){
			this.hotNft=[];
			this.get_nft_auction();
			this.getBanner();
			this.hot_collection();
			this.hot_nft();
			uni.stopPullDownRefresh()
		},
		onShow() {
			let date = new Date();
			if (date.getHours() >= 0 && date.getHours() < 12) {
				this.hoursTip = "早上好";
			} else if (date.getHours() >= 12 && date.getHours() < 18) {
				this.hoursTip = "下午好";
			} else {
				this.hoursTip = "晚上好";
			} 
			// 获取用户信息
			this.$my.get('/index/user/get_user_msg').then(res => {
				if (res.code == 200) {
					this.userInfo = res.data
				}
			}) 
		},
		onLoad() { 
			this.get_nft_auction();
			// this.get_purchase(); 认购暂时不做
			this.getBanner();
			this.hot_collection();
			this.hot_nft();
		},
		// onReachBottom() {
		// 	this.page++;
		// 	this.status = 'loading';
		// 	this.hot_nft(); 
		// },
		methods: {
			goNTH(url) {
				uni.navigateTo({
					url
				})
			},
			// 拍卖
			get_nft_auction() {
				this.$my.get('/index/auction/get_nft_auction').then(res => {
					if (res.code == 200) {
						this.nft_auction = res.data.data
						this.nft_auction.forEach((item, index) => {
							this.$set(item,"time_red",'0:0:0:0')
							let date = new Date(item.end_time);
							// 获取当前与结束时间戳来计算天数
							let timestamp = Date.parse(new Date()) / 1000
							let endtime = date.getTime() / 1000
							let num = endtime - timestamp;
							let timer = setInterval(() => {
								num-- 
								if (num < 0) {
									if (value) {
									item.time_red=false
									} else {
										timer = false
									}
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
									let dataAndTime = day +':' + hr + ":" + min + ":" + sec
									item.time_red=dataAndTime
								} 
							}, 1000)
						})
					}
				})
			},
			// 热门合集 
			hot_collection() {
				this.$my.get('/index/home/get_hot_collection').then(res => {
					if (res.code == 200) {
						this.hotCollection = res.data
					} 
				})
			},
			// 热销NFT
			hot_nft() {
				this.$my.get('/index/home/get_hot_nft', {
					limit: 10,
					page: this.page
				}).then(res => {
					if (res.code == 200 && res.data) {
						if (res.data.length > 0) {
							this.hotNft = this.hotNft.concat(res.data)
						} else {
							this.status = this.$t('没有更多了')
						}
					}
				})
			},
			// 动漫 IP NFT
			getBanner() {
				this.$my.post('/index/home/get_banner_collection').then(res => {
					if (res.code == 200 && res.data) {
						res.data.forEach(item => {
							item.cover = this.$my.imgurl + item.cover
						})
						this.bannerList = res.data
					}
				})
			},
			// 即将开始
			get_purchase() {
				this.$my.get('/index/purchase/get_purchase').then(res => {
					if (res.code == 200) {
						this.willStart = res.data
						this.getDayAndTime(res.data.start_pay_time)
					}
				})
			},
			// 搜索
			Gotosearch() {
				this.$my.go('/pages/index/search/search')
			}
		},
		components: {
			Title,
			AddNft
		}
	}
</script>

<style lang="scss">
	.isshowStart{
		position: fixed;
		top: 0;
		width: 100%;
		height: 100vh;
		background: #0F172C;
		padding-bottom: 0;
		text-align: center;
		font-size: 40rpx;
		font-family: Source Han Sans CN;
		image{
			width: 223rpx;
			height: 223rpx;
			margin: 407rpx auto 0;
			margin-bottom: 20rpx;
		} 
	} 
	.rx_box {
		box-sizing: border-box;
		margin-top: 79rpx;
		.lis_box {
			width: 100%;
			height: 160rpx;
			padding: 20rpx 40rpx;
			box-sizing: border-box;
			margin-bottom: 32rpx;

			.r_img {
				width: 30rpx;
				height: 33rpx;
			}

			.c {
				image {
					width: 112rpx;
					height: 112rpx;
					background: #B7B7B7;
				}

				.r {
					color: #666;
					margin-left: 24rpx;
				}
			}
		}

		.title_r_box {
			width: 120rpx;
			height: 48rpx;
			line-height: 48rpx;
			background: #FFFFFF;
			border-radius: 24px;
			color: #333333;
			font-weight: 400;
		}
	}

	.rm_box {
		margin-top: 72rpx;
		padding: 0 0 0 40rpx;

		.lis {
			width: 380rpx;
			height: 340rpx;
			margin-right: 30rpx;

			.round {
				background: #CFCFCF;
				border: 4rpx solid #FFFFFF;
			}

			.t_box {
				width: 100%;
				height: 170rpx;
				background: #B1B1B1;
				border-radius: 40rpx 40rpx 0px 0px;
				box-sizing: border-box;
				overflow: hidden;

				image {
					width: 380rpx;
					height: 170rpx;
					border-radius: 40rpx 40rpx 0px 0px;
				}
			}

			.b_box {
				margin-top: 68rpx;

				view:nth-of-type(1) {
					margin-bottom: 18rpx;
				}
			}
		}
	}

	.pm_box {
		box-sizing: border-box;
		margin-top: 72rpx;
		padding-left: 40rpx;

		.lis_box {
			padding: 30rpx;
			box-sizing: border-box;
			width: 510rpx !important;
			height: 684rpx;
			color: #333;

			.rt_b {
				width: 200rpx;
				height: 68rpx;
				line-height: 68rpx;
				background: #000000;
				opacity: 0.4;
				border-radius: 16px;
				top: 30rpx;
				right: 30rpx;
			}

			.b_box {
				margin-top: 30rpx;

				.l_box {
					.now_price {
						color: #999999;
					}

					.price {
						margin-top: 12rpx;
					}
				}

				.r_box {
					width: 218rpx;
					height: 76rpx;
					background: #0F172C;
					border-radius: 16rpx;
					line-height: 76rpx;
					text-align: center;
				}
			}

			image {
				width: 100%;
				height: 446rpx;
				margin-bottom: 30rpx;
			}
		}
	}

	.swiper_box {
		margin-top: 75rpx;
	}

	.will_start_box {
		margin-top: 72rpx;
		padding: 0 40rpx;
		box-sizing: border-box;

		.will_start {
			box-sizing: border-box;
			width: 100%;

			// height:624rpx;
			// border: 2rpx dotted #ccc;
			.white_box {
				.rg {
					width: 248rpx;
					height: 76rpx;
					line-height: 76rpx;
				}

				width: 100%;
				height: 100%;
				border-radius: 40rpx;
				background-color: #fff;
				padding: 30rpx;
				box-sizing: border-box;

				image {
					width: 100%;
					height: 280rpx;
					border-radius: 36rpx;
					display: block;
				}

				.c_box {
					margin: 32rpx 0 32rpx;

					.title {
						color: #333333;
					}

					.mb {
						color: #666666;
						margin: 33rpx 0 24rpx;
					}
				}

				.date_box {
					color: #fff;
					width: 248rpx;
					height: 76rpx;
					background: #666666;
					box-sizing: border-box;
					box-sizing: border-box;
					padding: 10rpx 0;

					/deep/.u-count-down__text {
						// line-height: 76rpx !important;
						color: #fff !important;
						text-align: center !important;
						font-size: 22rpx !important;
						line-height: 30rpx !important;
					}
				}
			}
		}
	}

	.top_box {
		padding: 0rpx 40rpx 0rpx;
		box-sizing: border-box;

		.date_box {
			padding: 10rpx;
			box-sizing: border-box;
			width: 300rpx;
			height: 90rpx;
			background: #DBDFE8;
			border: 4rpx solid #FFFFFF;
			opacity: 1;
			border-radius: 45rpx;
			color: #666666;
		}

		.r_box {
			.img2 {
				margin-left: 40rpx;
			}
		}
	}

	/deep/.u-swiper__wrapper__item__wrapper__image {
		border-radius: 30rpx !important;
	}

	/deep/.u-swiper__wrapper__item__wrapper__title {
		text-align: center;
		border-radius: 0 0 30rpx 30rpx !important;
	}
</style>
