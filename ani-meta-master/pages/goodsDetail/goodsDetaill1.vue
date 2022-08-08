<template>

	<view>
		<view class="content">

			<Share :share_show='share_show' @confirm='shareClcik' />
			<view class="bgc fontS40">
				<view class="head flexJBC" :style="{paddingTop:$store.state.tabh}">
					<view class="leftButton ">
						<u-icon name="arrow-left" size="28" @click="back" color='#0F172C'></u-icon>
					</view>
					<view class="flex flexic">
						<view class="head_img brYuan" @click="enshrine">
							<u-icon :name="goodsDetail_info.is_enshrine?'heart-fill':'heart'" size='38rpx'
								:color="goodsDetail_info.is_enshrine?'red':''"></u-icon>
						</view>
						<view class="head_img brYuan " @click="share_show = true">
							<u-icon name="share-square" size='38rpx'></u-icon>
						</view>
					</view>
				</view>
			</view>
			<view class="content_box">
				<!-- 图片 --> 
				<view class="img_box relative marLR40 ">
					<view class="relative" style="height:628rpx ;">
						<!-- <canvas canvas-id="myCanvas" class="canvas absolute" style="top: 55rpx;"></canvas> -->
						<image :src="$my.imgurl+goodsDetail_info.attachment_text "
							class="relative top_img br40 loadImg " id="loadImg" style="top: 0;"></image>
					<!-- 	<view class="relative brYuan" :style="{backgroundImage:Bg}" style="bottom:100rpx; width:75%;height:200rpx;position: relative;z-index: 0;left: 50%;transform: translateX(-50%);
						">
						</view> -->
					</view>
					<view class="font99 fontS28 flex imgbtext">
						<u-icon name="clock"></u-icon>
						<text>{{$t('此次售卖将于')}} {{goodsDetail_info.end_time}} {{$t('结束')}}</text>
					</view>
					<view class="introduce_box  ">
						<view class="flexJBC fontS28">
							<view class="left  font60  ">
								{{collection.name}}
							</view>
							<view class="flex">
								<view class="r_box flex">
									<u-icon name="heart" color='#c2c2c2'></u-icon>
									<text>{{goodsDetail_info.enshrine_num}}</text>
								</view>
								<!-- 被浏览几次 -->
								<!-- <view class="r_box flex" style="margin-left: 40rpx;">
									<u-icon name="eye" color='#c2c2c2'></u-icon>
									<text>32k</text>
								</view> -->
							</view>
						</view>
						<view class="title fontS40 els fw6">
							{{goodsDetail_info.name}}
						</view>
						<!-- 详情 -->
						<view style="margin-bottom: 72rpx;">
							<u-read-more ref="uReadMore" :toggle="true" showHeight="100" fontSize='24rpx' color='#666'
								closeText='- more' :shadowStyle="shadowStyle">
								<rich-text :nodes="goodsDetail_info.abstract?goodsDetail_info.abstract:''" @load="load"
									style="font-size: 24rpx;line-height: 48rpx;">
								</rich-text>
							</u-read-more>
						</view>
						<!-- 铸造多个 -->
						<view class="flex" style="margin: 40rpx 0 72rpx;" v-if="routeType==1">
							<view class="btnclick_box flex" style="width: 200rpx;height: 40rpx;line-height: 40rpx;"
								v-if="goodsDetail_info.total_num>1">
								<view class="btn_l fontS20" @click="btnClick">
									{{$t(goodsDetail_info.is_launch==1?$t('发行数量'):$t('售卖数量'))}}
								</view>
								<view class="btn_r fontS20" @click="btnClick(1)">
									{{goodsDetail_info.order_msg.num}}
								</view>
							</view>
							<view v-if="goodsDetail_info.inventory>1" class="btnclick_box flex "
								style="width: 200rpx;height: 40rpx;line-height: 40rpx;margin-left: 40rpx;">
								<view class="btn_l fontS20" @click="btnClick">
									{{$t('剩余数量')}}
								</view>
								<view class="btn_r fontS20" @click="btnClick(1)">
									{{goodsDetail_info.inventory}}
								</view>
							</view>
						</view>
						<!-- 创建者 -->
						<view class="lis flex flexic ">
							<image :src="$my.imgurl+creator.avatar_url"
								style="width: 60rpx;height: 60rpx;margin-right: 20rpx;" class="brYuan"></image>
							<view class="fontS28 fw7">
								{{creator.nickname}}
							</view>
							<text class="buy">
								from
							</text>
						</view>
						<!-- 拥有者 -->
						<view class="lis flexJBC">
							<view class=" flex flexic">
								<image :src="user?$my.imgurl+item.avatar_url:''"
									style="width: 60rpx;height: 60rpx;background:#ccc;" class="brYuan"
									v-for="(item,index) in user" :style="{marginLeft:index>0?-30 +'rpx':0}"></image>
								<view class="fontS28 fw7" v-if="user.length==1" style="margin-left: 20rpx;">
									{{user[0].nickname}}
								</view>

								<text class="font60 fontS30 fw7" style="margin-left: 25rpx;" v-else>
									{{user.length}}{{$t('人')}}
								</text>
								<text class="buy">
									buyer
								</text>
							</view>
							<view class="font99 fontS24" @click="$my.go('/myPackageA/moreOwner')" v-if="user.length>1">
								{{$t('查看更多')}}
							</view>
						</view>
					</view>
				</view>
				<!-- 出价详情 -->
				<view class="fontS32 font33 detailPrice marLR40" v-if="auction_id ">
					<text>{{$t('出价详情')}}</text>
					<u-scroll-list :indicator='false'>
						<view v-for="(item, index) in goodsDetail_info.auction_details" :key="index"
							style="margin-top: 40rpx;" class="ch_lis br20">
							<view class="fontS20 font99" style="margin-bottom: 17rpx;">{{item.auction_time}}</view>
							<view class="flexJBC b">
								<view class="flex flexic l">
									<image :src="$my.imgurl+item.avatar_url" mode="" class="brYuan"></image>
									<view class="font33 fontS24">{{item.nickname}}</view>
								</view>
								<view class="fontS24 font60" style="margin-left: 66rpx;">
									{{item.price}}{{item.coin_type}}
								</view>
							</view>
						</view>
					</u-scroll-list>
				</view>
				
				<!-- 链上信息 -->
				<u-collapse :border='false' v-if="false">
					<u-collapse-item :title="$t('链上信息')" name="Docs guide" :border='false' class="marLR40">
						<view class="flexJBC lianlisbox">
							<text class="fonts24 font33">{{$t('合约地址')}}</text>
							<view class="els font60">
								0x454sd...sd4z0x454sd...sd4z0x454sd...sd4z0x454sd...sd4z0x454sd...sd4z0x454sd...sd4z0x454sd...sd4z
							</view>
						</view>
						<view class="flexJBC lianlisbox">
							<text class="fonts24 font33">{{$t('令牌ID')}}</text>
							<view class="els">1786465654334...</view>
						</view>
						<view class="flexJBC lianlisbox">
							<text class="fonts24 font33">{{$t('代币标准')}}</text>
							<view class="els">ERC-1155</view>
						</view>
						<view class="flexJBC lianlisbox">
							<text class="fonts24 font33">{{$t('区块链')}}</text>
							<view class="els">以太坊</view>
						</view>
					</u-collapse-item>
				</u-collapse>
				<!-- 报价详情 -->
				<view v-if="goodsDetail_info.bid_details">
					<view class="offer_detail marLR40 ">
						<u-collapse :border='false' @open='border=true' @close='border=false'>
							<u-collapse-item :title="$t('报价详情')" name="Docs guide"></u-collapse-item>
						</u-collapse>
					</view>
					<view class="list_content" v-if="border" style="margin-top: -60rpx;">
						<view class="lis_box_content" v-for="(item,index) in goodsDetail_info.bid_details" :key="index">
							<view class="relative">
								<view class="list_box flex">
									<view class="lis_box relative flexJBC" style="width: 100%;">
										<view class="flex">

											<view class="center_box textAl" style="margin-top: -10rpx;">
												<view class="fontS28 fw7" style="margin: 18rpx 0 28rpx;">{{item.nickname}}
												</view> 
												<view class="fontS24 font99" @click="item.More=!item.More">
													{{item.More?'-Less' :"+ More"}}
												</view>
											</view>
										</view>
										<view class="r_box flex">
											<view class="">
												<view class="flex flexic">
													<image src="/static/img/zs.png" mode=""></image>
													<text class="fontS28">{{item.coin}}</text>
												</view>
												<text class="font99 fontS24"
													style="margin-top: 28rpx;">{{item.create_time}}</text>
											</view>
											<view class="fontS20 btn00 textAc" @click="nftbuy(item)"
												v-if="goodsDetail_info.is_self && routeType==1"
												style="height: 40rpx;line-height: 40rpx;width: 112rpx;margin-left: 20rpx;">
												{{$t('接受报价')}}
											</view>
											<view class="fontS20 btn00 textAc" @click="nftcancel(item)"
												v-if="item.is_owner==1 && routeType==1"
												style="height: 40rpx;line-height: 40rpx;width: 112rpx;margin-left: 20rpx;">
												{{$t('取消报价')}}
											</view>
										</view>
										<view class="line3"></view>
									</view>
								</view>
								<view class="" style="height: 154rpx;" v-if="item.More">
									<view class="flexJBC bott">
										<view class="li">
											<text class="font99">{{$t('底价')}}</text>
											<view class="fontS24">
												{{item.floor_diff}}%
											</view>
										</view>
										<view class="li">
											<text class="font99">{{$t('数量')}}</text>
											<view class="fontS24">
												{{item.num}}
											</view>
										</view>
										<view class="li">
											<text class="font99">{{$t("出价者")}}</text>
											<view class="fontS24 font60">
												{{item.nickname}}
											</view>
										</view>
										<view class="li">
											<text class="font99">{{$t('报价时间')}}</text>
											<view class="fontS24">
												{{item.day>0 || item.hr>0 || item.min >0?((item.day>0?item.day+$t('天'):'')+ (item.hr?item.hr +$t( '时'):'') + (item.min?item.min+$t('分'):'')) : item.sec+$t('秒')}} {{$t('之前')}}
											</view> 
										</view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
				<!-- 交易历史 -->
				<view v-if="false">
					<view class="offer_detail marLR40 ">
						<u-collapse :border='false' @open='border1=true' @close='border1=false'>
							<u-collapse-item :title="$t('交易历史')" name="Docs guide"></u-collapse-item>
						</u-collapse>
					</view>
					<view class="list_content" v-if="border1" style="margin-top: -60rpx;">
						<view class="lis_box_content" v-for="(item,index) in 2" :key="index">
							<view class="relative">
								<view class="list_box flex">
									<view class="lis_box relative flexJBC" style="width: 100%;">
										<view class="flex">
											<view class="center_box textAl" style="margin-top: -10rpx;">

												<view class="fontS28 fw7" style="margin: 18rpx 0 28rpx;">CryptoBerliner
													#163
												</view>
												<view class="fontS24 font99">
													+ More
												</view>
											</view>
										</view>
										<view class="r_box">
											<view class="flex flexic">
												<image src="/static/img/zs.png" mode=""></image>
												<text class="fontS28">0.93</text>
											</view>
											<text class="font99 fontS24" style="margin-top: 28rpx;">5 hours ago</text>
										</view>
										<view class="line3"></view>
									</view>
								</view>
								<view class="" style="height: 154rpx;">
									<view class="flexJBC bott fontS24">
										<view class="li">
											<text class="font99">{{$t('底价')}}</text>
											<view class="">
												40.4% below
											</view>
										</view>
										<view class="li">
											<text class="font99">{{$t('数量')}}</text>
											<view class="">
												1
											</view>
										</view>
										<view class="li">
											<text class="font99">{{$t("出价者")}}</text>
											<view class=" font60">
												Ssds
											</view>
										</view>
										<view class="li">
											<text class="font99">{{$t('过期时间')}}</text>
											<view class="">
												in 22 minutes
											</view>
										</view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
				<!-- 合集 -->
				<view class="hj marLR40">
					<view class="fontS32 font33">
						<text>{{$t('合集')}}</text>
					</view>
					<view class="lisone flex flexic"
						@click="$my.go(`/pages/Collectionpage/Collectionpage?id=${goodsDetail_info.id}&coll_type=2`)">
						<image :src="$my.imgurl+collection.logo_url" mode=""></image>
						<view class="">{{collection.name}}</view>
					</view>
				</view>
				<!-- 其他藏品 -->
				<view class="other_box marLR40" v-if="routeType != '3'">
					<view class="fontS32 font33 ">
						{{$t('此系列其他藏品')}}
					</view>
					<List :list="goodsDetail_info.nft_other"
						v-if="goodsDetail_info.nft_other?goodsDetail_info.nft_other.length>0:false" />
					<NoDate v-else :fixed='false' />
				</view>
			</view>
			<u-overlay :show="show" @click="show = false">
				<view class="warp" @tap.stop>
					<view class="fontS36 textAc ">
						{{$t('修改nft合集')}}
					</view>
					<view class="flexJBC flexW">
						<view class="lis flex flexic fontS32 " v-for="(item1) in  collection_menu" :key="item1.id"
							:class="item1.id==collection_active.id?'active':''" @click="editCollection(item1)">
							<image :src="$my.imgurl+item1.logo_url" mode=""
								class="brYuan"></image><text class="els"
								style="width: 60%;">{{item1.name}}</text>
						</view>
					</view> 
				</view>
			</u-overlay>
			<!-- 底部按钮 -->

			<view class="btn_box flex flexic flexJBC" v-if="goodsDetail_info.bottom_type">
				<view class="flexJBC" style="flex: 1;">
					<view class="left" v-if="goodsDetail_info.order_msg && goodsDetail_info.bottom_type!=2">
						<text
							class="">{{sell_id?goodsDetail_info.order_msg.coin: (goodsDetail_info.order_msg.max_price?goodsDetail_info.order_msg.max_price:goodsDetail_info.order_msg.start_price)}}</text>
						<text class="fontS36">{{goodsDetail_info.coin_type}}</text>
					</view>
					<!-- 已结束 -->
					<u-button
						v-if="goodsDetail_info.bottom_type==14 || goodsDetail_info.bottom_type==20 || goodsDetail_info.bottom_type==8?$t('已结束'):''"
						style='width:250rpx;height: 115rpx;background: #ccc;border-radius: 20rpx;color: #fff;margin-right: 0;'
						:text="goodsDetail_info.bottom_type==14 || goodsDetail_info.bottom_type==20 || goodsDetail_info.bottom_type==8?$t('已结束'):''">
					</u-button>
					<!-- 编辑 卖出 购买  出价 加价 -->
					<u-button
						v-if="goodsDetail_info.bottom_type==1 || goodsDetail_info.bottom_type==3  || goodsDetail_info.bottom_type==7  || goodsDetail_info.bottom_type==18 || goodsDetail_info.bottom_type==19"
						@click="btnClickbottom"
						style='width:250rpx;height: 115rpx;background: #0F172C;border-radius: 20rpx;color: #fff;margin-right: 0;'
						:text="goodsDetail_info.bottom_type==1?$t('编辑'):goodsDetail_info.bottom_type==3?$t('卖出'):goodsDetail_info.bottom_type==7?$t('购买'):goodsDetail_info.bottom_type==18?$t('出价'):goodsDetail_info.bottom_type==19?$t('加价'):''">

					</u-button>

					<!-- 未开始 -->
					<u-button
						v-if="goodsDetail_info.bottom_type==5 || goodsDetail_info.bottom_type==10 || goodsDetail_info.bottom_type==16"
						style='width:250rpx;height: 115rpx;background: #ccc;border-radius: 20rpx;color: #fff;margin-right: 0;'
						:text="goodsDetail_info.bottom_type==5 || goodsDetail_info.bottom_type==10 || goodsDetail_info.bottom_type==16 ?$t('未开始'):'' ">
					</u-button>

					<!-- 下架 -->
					<u-button @click="btnClickbottom"
						v-if="goodsDetail_info.bottom_type==4 || goodsDetail_info.bottom_type==6 || goodsDetail_info.bottom_type==9 || goodsDetail_info.bottom_type==11 || goodsDetail_info.bottom_type==15|| goodsDetail_info.bottom_type==17"
						style='width:250rpx;height: 115rpx;background: #0F172C;border-radius: 20rpx;color: #fff;margin-right: 0;'
						:text="goodsDetail_info.bottom_type==4 || goodsDetail_info.bottom_type==6 || goodsDetail_info.bottom_type==9 || goodsDetail_info.bottom_type==11 ||  goodsDetail_info.bottom_type==15 || goodsDetail_info.bottom_type==17?$t('下架'):'' ">
					</u-button>

					<!-- 编辑 -->
					<view class="flexJBC" style="flex: 1;" v-if="goodsDetail_info.bottom_type==2">
						<u-button
							@click="$my.go(`/pages/goodsDetail/sellout/sellout?id=${goodsDetail_info.nft_id}&img=${$my.imgurl+goodsDetail_info.attachment_text}`)"
							style='width:80%;height: 115rpx;background: #0F172C;border-radius: 20rpx;color: #fff;margin: 0;'
							:text="$t('卖出')">
						</u-button>
						<text @click="show=true">{{$t('编辑')}}</text>
					</view>
					<!-- 购买 -->
					<view class="btnclick_box flex" style="width: 300rpx;"
						v-if="goodsDetail_info.bottom_type==13 || goodsDetail_info.bottom_type==12">
						<view class="btn_l"
							@click="$my.go(`/pages/goodsDetail/payAndOffer?offer_id=${sell_id}&offer=0`)">
							{{$t('购买')}}
						</view>
						<view class="btn_r"
							@click="$my.go(`/pages/goodsDetail/payAndOffer?offer_id=${sell_id}&offer=2`)">
							{{$t(goodsDetail_info.bottom_type==12?$t('报价'):$t)}}
						</view>
					</view>
				</view>
			</view>

			<view class="" v-if="false">
				<view class="btn_box flex flexic flexJBC">
					<!-- 我购买的 -->
					<view class="" v-if="routeType==3" style="flex: 1;">
						<view style="width: 100%;">
							<u-button
								@click="$my.go(`/pages/goodsDetail/sellout/sellout?id=${goodsDetail_info.nft_id}&img=${$my.imgurl+goodsDetail_info.attachment_text}`)"
								style='width:100%;height: 115rpx;background: #0F172C;border-radius: 20rpx;color: #fff;'
								:text="$t('卖出')">
							</u-button>
						</view>
					</view>
					<!-- 我创建的 -->
					<view class="flexJBC" v-if="routeType==4" style="flex: 1;">
						<u-button
							@click="$my.go(`/pages/goodsDetail/sellout/sellout?id=${goodsDetail_info.nft_id}&img=${$my.imgurl+goodsDetail_info.attachment_text}`)"
							style='width:80%;height: 115rpx;background: #0F172C;border-radius: 20rpx;color: #fff;margin-left: 0;'
							:text="$t('卖出')">
						</u-button>
						<text>编辑</text>
					</view>

		

					<!-- 普通藏品 -->
					<view v-if="routeType==1" style="flex: 1;" class="flexJBC">
						<view class="left ">
							<text class="">{{goodsDetail_info.coin}}</text>
							<text class="fontS36">{{goodsDetail_info.coin_type}}</text>
						</view>
						<view class="" v-if="goodsDetail_info.is_launch==1">
							<view class="btn00"
								@click="$my.go(`/pages/goodsDetail/payAndOffer?offer_id=${sell_id}&offer=0`)">
								{{$t('购买')}}
							</view>
						</view>
						<view class="btnclick_box flex" v-else>
							<view class="btn_l"
								@click="$my.go(`/pages/goodsDetail/payAndOffer?offer_id=${sell_id}&offer=0`)">
								{{$t('购买')}}
							</view>
							<view class="btn_r"
								@click="$my.go(`/pages/goodsDetail/payAndOffer?offer_id=${sell_id}&offer=2`)">
								{{$t('报价')}}
							</view>
						</view>
					</view>

					<!-- 拍卖 -->
					<view v-if="routeType==2" style="flex: 1;">
						<view class="flexJBC">
							<view class="left">
								<text class="">{{goodsDetail_info.coin}}</text>
								<text class="fontS36">{{goodsDetail_info.coin_type}}</text>
							</view>
							<!-- <view class="btn00"
								@click="$my.go(`/pages/goodsDetail/payAndOffer?offer_id=${auction_id}&offer=1`)">
								{{goodsDetail_info.is_auction_add?$t('加价'):$t('出价')}}
							</view> -->

							<!-- <view class="btn00"  v-else>
								{{$t('出价')}}
							</view> -->

						</view>
					</view>
				</view>
			</view>


			<view class="btn_box flex flexic flexJBC" v-if="false">
				<view class="left " v-if="goodsDetail_info.sell_status!=0">
					<text class="">{{goodsDetail_info.coin}}</text>
					<text class="fontS36">{{goodsDetail_info.coin_type}}</text>
				</view>
				<!-- 表示是属于我的nft可以卖出修改 -->
				<view style="width: 100%;" v-if="goodsDetail_info.is_self && goodsDetail_info.sell_status==0">
					<u-button
						@click="$my.go(`/pages/goodsDetail/sellout/sellout?id=${goodsDetail_info.id}&img=${$my.imgurl+goodsDetail_info.attachment_text}`)"
						style='width:100%;height: 115rpx;background: #0F172C;border-radius: 20rpx;color: #fff;'
						:text="$t('卖出')">
					</u-button>
				</view>
				<!-- <view>
					<view class="" v-if='goodsDetail_info.is_been_auction>1'>
						{{$t('加价')}}
					</view>
					<view class="" v-else>
						<view class="btn00" v-if='goodsDetail_info.sell_status==0' style='background: #ccc'>
							{{$t('未售卖')}}
						</view>
						<view class="btnclick_box flex" v-if="goodsDetail_info.sell_status==1">
							<view class="btn_l" @click="btnClick">
								{{$t('购买')}}
							</view>
							<view class="btn_r" @click="btnClick(1)">
								{{$t('报价')}}
							</view>
						</view>
						<view class="btn00" @click="btnClick" v-else>
							{{$t('出价')}}
						</view>
					</view>
				</view> -->
			</view>
		</view>
	</view>
</template>
<script>
	import List from '../../componentes/list.vue'
	import Share from '../../componentes/share.vue'
	import uCharts from '@/uni_modules/qiun-data-charts/js_sdk/u-charts/u-charts.js';
	var uChartsInstance = {};
	var _this;
	export default {
		data() {
			return {
				collection_active:{} ,//当前选中的合集
				collection_menu:[],//所有合集列表
				show:false, //展示修改nft合集弹窗
				sell_id: "", //购买id
				auction_id: "", //拍卖的id
				img: require('../../static/img/Property 1=Chinese.png'),
				Bg: "", //图片box-shown背景颜色
				border: false, //报价详情
				border1: false, //交易历史
				collection: '',
				creator: "",
				user: "",
				goodsDetail_info: "", //商品详情
				goods_id: '', //商品详情的Id
				routeType: '', //1表示普通藏品进入  2表示从拍卖进入  出价后再次进入会变成加价  3表示我购买的  4表示我创建的 5表示我喜欢的
				share_show: false, //分享
				cWidth: "100%",
				cHeight: 1000,
				isStart: false, //未开始拍卖
				shadowStyle: {
					backgroundImage: "linear-gradient(-180deg,#F4F5F7 50%, rgba(255, 255, 255, .5) 80%)",
					paddingTop: "100px",
					marginTop: "-100px",
				},
			}
		},

		components: {
			List,
			Share
		},
		methods: {
			// 修改nft  只能修改合集
			editCollection(item){
				this.collection_active=item
				this.$my.post('/index/nft/edit_nft_collection_by_address',{collection_id:item.id,token_id:this.goodsDetail_info.token_id,contract_address:this.goodsDetail_info.contract_address}).then(res=>{
					this.$my.toast(res.message)
					if(res.code==200){
						this.show=false
					}
				})
			},
			btnClickbottom() {
				console.log(123)
				if (this.goodsDetail_info.bottom_type == 1) {
					// 编辑
					this.show=true
				} else if (this.goodsDetail_info.bottom_type == 3) {
					this.$my.go(
						`/pages/goodsDetail/sellout/sellout?id=${this.goodsDetail_info.nft_id}&img=${this.$my.imgurl+this.goodsDetail_info.attachment_text}`
						)
				} else if (this.goodsDetail_info.bottom_type == 7) {
					this.$my.go(`/pages/goodsDetail/payAndOffer?offer_id=${this.sell_id}&offer=0`)
				} else if (this.goodsDetail_info.bottom_type == 18 || this.goodsDetail_info.bottom_type == 19) {
					this.$my.go(`/pages/goodsDetail/payAndOffer?offer_id=${this.auction_id}&offer=1`)
				}
			},
			// 取消报价
			nftcancel(item) {
				this.$my.post('/index/bid/nft_bid_cancel', {
					id: item.id,
					order_id:this.sell_id 
				}).then(res => {
					this.$my.toast(res.message)
					if (res.code == 200) {
						this.getLIst()
					}
				})  
			},
			// 同意报价
			nftbuy(item) {
				this.$my.post('/index/bid/nft_bid_buy', {
					order_id: this.sell_id,
					id: item.id
				}).then(res => {
					this.$my.toast(res.message)
					if (res.code == 200) {
                        this.getLIst()
					}
				})
			},
			getImageColor(canvasID, imgID, imgSrc) {
				var imgWidth;
				var imgHeight;
				var canvasWidth;
				var canvasHeight;
				var canvas = uni.createCanvasContext(canvasID);
				// 获取img的宽度/高度
				var pro = function() {
					return new Promise((resolve, reject) => {
						uni.createSelectorQuery().select("#" + imgID).boundingClientRect(ret => {
							imgWidth = ret.width;
							imgHeight = ret.height;
							// 赋值canvas宽度/高度
							canvasWidth = imgWidth;
							canvasHeight = imgHeight;
							canvas.drawImage(imgSrc, 0, 0, canvasWidth, canvasHeight);

							canvas.draw(true, () => {
								// 获取像素数据
								uni.canvasGetImageData({
									// #ifdef MP-WEIXIN
									canvasId: canvas.canvasId,
									// #endif
									// #ifndef MP-WEIXIN
									canvasId: canvas.id,
									// #endif
									x: 0,
									y: 0,
									width: imgWidth,
									height: imgHeight,
									success: (res) => {
										var r = 1,
											g = 1,
											b = 1,
											a = 1;
										let imgData = res.data;
										const arr = Array.prototype.slice.call(
											imgData, 0)
										// 取所有像素的平均值
										for (var i = 0; i < arr.length; i += 4) {
											r += arr[i];
											g += arr[i + 1];
											b += arr[i + 2];
											a += arr[i + 3];
										}
										// // 求取平均值
										r /= (imgWidth * imgHeight);
										g /= (imgWidth * imgHeight);
										b /= (imgWidth * imgHeight);
										a /= (imgWidth * imgHeight);
										// 将最终的值取整
										r = Math.round(r);
										g = Math.round(g);
										b = Math.round(b);
										a = Math.round(a);
										let obj = {
											r,
											g,
											b
										}
										resolve(obj);
									},
									fail: (fail) => {
										reject(fail);
									}
								});
							});

						}).exec();
					}).catch(e => {
						console.log(e)
					})
				}
				return pro();
			},
			btnClick(val) {
				if (val) {
					// 和普通购买出价
					this.$my.go('/pages/goodsDetail/payAndOffer?offer=1')
				} else if (this.goodsDetail_info.sell_status == 0) {
					this.$my.toast('未开始售卖')
				} else if (this.goodsDetail_info.sell_status == 1) {
					// 购买
					this.$my.go('/pages/goodsDetail/payAndOffer?offer=0')
				} else if (this.goodsDetail_info.sell_status == 2) {
					// 拍卖  
					this.$my.go('/pages/goodsDetail/payAndOffer?offer=1')
				}
			},
			// 收藏
			enshrine() {
				this.$my.post('/index/enshrine/update', {
					nft_id: this.goods_id,
					owner_id: this.goodsDetail_info.owner_id
				}).then(res => {
					if (res.code == 200) {
						this.$my.toast(res.message)
						this.getLIst()
					}
				})
			},
			shareClcik() {
				this.share_show = false
			},
			getLIst() {
				console.log(this.sell_id, this.auction_id)
				let data = this.sell_id ? {
					sell_id: this.sell_id
				} : {
					auction_id: this.auction_id
				}
				this.$my.get('/index/nft/get_nft_details', Object.assign({
					nft_id: this.goods_id
				}, data)).then(res => {
					if (res.code == 200) {
						let {
							collection,
							user,
							creator
						} = res.data
						this.goodsDetail_info = res.data
						if (this.goodsDetail_info.auction_details) {
							this.goodsDetail_info.auction_details.forEach(item => {
								this.$set(item, "nickname", item.user.nickname)
								this.$set(item, "avatar_url", item.user.avatar_url)
							}) 
						}
						if (this.goodsDetail_info.bid_details && this.goodsDetail_info.bid_details.length > 0) {
							this.goodsDetail_info.bid_details.forEach(item => {
								this.$set(item, "More", false)
								this.$set(item, "nickname", item.user.nickname)
								this.$set(item, "avatar_url", item.user.avatar_url)
								let second = Math.floor(item.expires);
								// 天数
								let day = Math.floor(second / 3600 / 24);
								// 小时
								let hr = Math.floor(second / 3600 % 24);
								// 分钟
								let min = Math.floor(second / 60 % 60);
								// 秒
								let sec = Math.floor(second % 60);
								let dataAndTime = (day ? day + ":" : '') + hr + ":" + min + ":" + sec
								this.$set(item, "day", day)
								this.$set(item, "hr", hr)
								this.$set(item, "min", min)
								this.$set(item, "sec", sec)
								console.log(second,dataAndTime,'fsdfsd')
							})
							console.log(this.goodsDetail_info.bid_details, "fsdfds")
						}

						this.collection = collection
						this.user = user
						if (this.user.length > 0) {
							this.user.forEach(item => {
								this.$set(item, "nickname", item.user.nickname)
								this.$set(item, "avatar_url", item.user.avatar_url)
								this.$set(item, "pay_password_status", item.user.pay_password_status)
							})
						}
						this.creator = creator
						this.img = this.$my.imgurl + this.goodsDetail_info.attachment_text
						var _this = this;
						_this.$nextTick(function() {
							_this.getImageColor("myCanvas", "loadImg", this.img).then(res => {
								console.log(res, 'res')
								if (res != '') {
									_this.Bg = 'rgba(' + res.r + ',' + res.g + ',' + res.b +
										',.5)';
									_this.Bg = `radial-gradient( ${_this.Bg} ,#F4F5F7 70%)`
								}
							})
						});
						// 请注意上方已在组件中添加ref-uReadMore 
						this.$nextTick(() => {
							this.$refs.uReadMore.init();
						})
					}
				})
			},
			
			
			tap(e) {
				uChartsInstance[e.target.id].touchLegend(e);
				uChartsInstance[e.target.id].showToolTip(e);
			},

			back() {
				uni.navigateBack()
			},

		},
		onLoad(option) {
			this.goods_id = option.nft_id // 商品详情 nft_id
			this.routeType = option.routeType ? option.routeType : 3; //1标识普通购买
			// this.order_id=option.order_id?option.order_id:1
			this.sell_id = option.sell_id ? option.sell_id : "" //普通购买
			this.auction_id = option.auction_id ? option.auction_id : "" //拍卖
			
			this.$my.get('/index/collection/get_user_collection').then(res => {
				if (res.code == 200) {
						this.collection_menu = res.data.data
						this.collection_active = res.data.data[0]
						console.log(this.collection_menu)
				}
			});
		},
		onShow() {
			this.getLIst()
		}
	}
</script>

<style lang="scss" scoped>
	.warp {
		width: 100%;
		/* height: 466rpx; */
		position: fixed;
		bottom: 0;
		padding: 40rpx 40rpx 70rpx;
		box-sizing: border-box;
		background: #FFFFFF;
		border-radius: 40rpx 40rpx 0px 0px;
	
		.lis {
			justify-content: center;
			padding: 0 20rpx;
			box-sizing: border-box;
			width: 319rpx;
			height: 72rpx;
			background: #FFFFFF;
			border: 2rpx solid #0F172C;
			border-radius: 20rpx;
			line-height: 72rpx;
			text-align: center;
			margin-top: 32rpx;
	
			image {
				width: 48rpx;
				height: 48rpx;
				background-color: #fff;
				border: 1rpx solid #707070;
			}
		}
	
		.active {
			background-color: #0F172C;
			color: #fff;
		}
	}
	.btnclick_box {
		width: 444rpx;
		height: 80rpx;
		line-height: 80rpx;
		text-align: center;
		border-radius: 16rpx;
		font-size: 30rpx;

		.btn_l {
			width: 50%;
			text-align: center;
			background: #0F172C;
			color: #fff;

			border-radius: 16rpx 0 0 16rpx;
		}

		.btn_r {
			width: 50%;
			text-align: center;
			border: 2rpx solid #0F172C;
			border-radius: 0 16rpx 16rpx 0;
			color: #0F172C;
		}
	}

	/deep/ .u-collapse-item__content__text {
		padding: 24rpx 0;
	}

	.lis_box_content {
		.bott {

			padding: 35rpx 40rpx;
			box-sizing: border-box;
			box-shadow: 0px 14px 18px rgba(31, 48, 81, 0.0600);

			.li {
				text-align: center;

				view {
					margin-top: 14rpx;
				}
			}
		}

		.list_box {
			.lis_box {
				// box-shadow: 6rpx 0px 10rpx rgba(31, 48, 81, 0.0600);
				padding: 72rpx 40rpx;
				box-sizing: border-box;

				.r_box {
					image {
						width: 30rpx;
						height: 30rpx;
						margin-right: 7rpx;
					}
				}


				.image {
					width: 106rpx;
					height: 106rpx;
					border-radius: 24rpx;
					margin-right: 24rpx;
				}
			}
		}

		.line3 {
			width: 90%;
			height: 2rpx;
			background: rgba(51, 51, 51, .1) !important;
			bottom: 0;
			left: 50%;
			transform: translateX(-50%);
			position: absolute;
		}
	}


	.share_box {
		width: 100%;
		height: 286rpx;
		background-color: #fff;
		position: absolute;
		bottom: 0%;
		border-radius: 40rpx 40rpx 0 0;
		padding: 40rpx 100rpx 0;
		box-sizing: border-box;
		color: #666;

		.share {
			text-align: center;
			margin-bottom: 45rpx;
		}

		.b {
			image {
				width: 80rpx;
				height: 80rpx;
				margin: 0 auto;
				border: 1rpx dotted #666;
			}

			view {
				margin-top: 18rpx;
			}
		}

	}


	.img_box {

		// margin-top: 20rpx;
		.imgbtext {
			margin-top: 45rpx;
			position: relative;
			align-items: center;

			text {
				margin-left: 20rpx;
			}
		}
	}

	.charts-box {
		width: 100%;
		height: 1000rpx;
	}



	.detailPrice {
		margin: 42rpx 0 50rpx;
		padding: 0 40rpx;
		box-sizing: border-box;

		.ch_lis {
			// width: 300rpx !important;
			// height: 100rpx;
			background: #FFFFFF;
			border: 2rpx solid #6094FF;
			margin-right: 20rpx;
			padding: 14rpx;
			box-sizing: border-box;

			.b {
				.l {
					width: 190rpx;

					image {
						display: block;
						width: 40rpx;
						height: 40rpx;
						background-color: #f5f5f5;
						margin-right: 10rpx;

					}
				}
			}


		}
	}

	.lianlisbox {
		line-height: 80rpx;

		view {
			text-align: right;
			flex: 1;
			margin-left: 10rpx;
		}
	}

	.btn_box {
		width: 100%;
		background-color: #fff;
		// min-height: 120rpx;
		height: 175rpx;
		line-height: 175rpx;
		position: fixed;
		bottom: 0;
		padding: 30rpx 40rpx;
		box-sizing: border-box;


		.left {
			text:nth-of-type(1) {
				font-size: 48rpx;
			}
		}

		.btn00 {
			width: 240rpx;
			height: 80rpx;
			line-height: 80rpx;
		}

		.text {
			font-size: 32rpx;
			font-family: Source Han Sans CN;
			font-weight: 400;
			line-height: 175rpx;
			color: #999999;
			opacity: 1;
		}

	}

	.bgc {
		background-color: #F4F5F7;

		position: sticky;
		top: 0;
		left: 0;
		z-index: 99;

		.head {
			padding: 20rpx 40rpx 20rpx 25rpx;
			line-height: 80rpx;
			width: 100%;
			position: fixed;
			top: 0;
			left: 0;
			z-index: 99;
		}

		.head_img {
			width: 90rpx;
			height: 90rpx;
			border: 1px solid #D4D4D4;
			display: flex;
			justify-content: center;

			&:nth-of-type(2) {
				margin-left: 38rpx;
			}
		}

		.head {
			background-color: #F4F5F7;
			padding: 20rpx 40rpx;

			box-sizing: border-box;
			color: #0F172C;
		}
	}

	/deep/.u-read-more__toggle {
		justify-content: left;
	}

	/deep/.u-text__value {
		font-weight: 700 !important;
	}

	/deep/.u-cell__title-text {
		// font-weight: 600;
		font-size: 32rpx;
	}

	/deep/.u-cell__body {
		padding: 0;
		margin: 40rpx 0 0rpx;
	}

	.hj {
		margin-top: 72rpx;

		.lisone {
			margin-top: 40rpx;

			image {
				width: 80rpx;
				height: 80rpx;
				border-radius: 20rpx;
				margin-right: 30rpx;
			}

		}
	}

	.other_box {
		margin-top: 72rpx;
	}

	.content_box {

		/deep/.u-count-down,
		.time_box {
			position: absolute;
			text-align: center;
			font-size: 24rpx;
			width: 200rpx;
			padding: 20rpx 0;
			box-sizing: border-box;
			background: rgba(0, 0, 0, .4);
			border-radius: 16rpx;
			top: 38rpx;
			right: 38rpx;
		}

		/deep/.u-count-down-text {
			color: #fff;
		}

		margin-top:220rpx;

		.introduce_box {


			.lis {
				margin-bottom: 40rpx;

				image {
					width: 60rpx;
					height: 60rpx;
					// margin-right: 30rpx;
				}

				.buy {
					font-size: 20rpx;
					line-height: 48px;
					color: #6094FF;
					margin-left: 10rpx;
					background: rgba(#6094FF, .2);
					height: 28rpx;
					line-height: 28rpx;
					border-radius: 20rpx;
					padding: 5rpx 15rpx;
					font-weight: 500;
				}
			}

			.title {
				width: 100%;
				margin: 50rpx 0 48rpx;

			}

			margin-top: 70rpx;

			.r_box {
				color: #C2C2C2;

				text {
					margin-left: 5rpx;
				}
			}
		}

		.top_img {
			width: 100%;
			height: 628rpx;
			background: #C2C2C2;
			z-index: 11;
		}

	}


	.head_img {
		width: 90rpx;
		height: 90rpx;
		border: 1px solid #D4D4D4;
		display: flex;
		justify-content: center;

		&:nth-of-type(2) {
			margin-left: 38rpx;
		}
	}
</style>
