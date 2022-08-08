<template>

	<view class="">
		<!-- 未登录 -->
		<AddNft />
		<TabBar  selectedIndex='3'/> 
		
		<view class="wallet" v-if="ouTstatus">
			<view class="wallet_title">
				{{$t('选择并链接您的钱包！')}}
			</view>
			<view class="wallet_count">
				<view class="wallet_img" @click='LinkWallet'>
					<image src="../../static/wallet/Metamask.png" alt="">
				</view>
				<view class="wallet_img" @click='LinkWallet'>
					<image src="../../static/wallet/Metamask.png" alt="">
				</view>
				<view class="wallet_img" @click='LinkWallet'>
					<image src="../../static/wallet/WalletConnect.png" alt="">
				</view>
				<view class="wallet_img" @click='LinkWallet'>
					<image src="../../static/wallet/Coinbase Wallet.png" alt="">
				</view>
				<view class="wallet_img" @click='LinkWallet'>
					<image src="../../static/wallet/MathWallet.png" alt="">
				</view>
				<view class="wallet_img" @click='LinkWallet'>
					<image src="../../static/wallet/TokenPocket.png" alt="">
				</view>
			</view>
			 
			<!-- 登录页不要tabs -->
			<u-button @click='LinkWallet'
				style='width: 670rpx;height: 115rpx;background: #0F172C;opacity: 1;border-radius: 20rpx;color: #FFFFFF;font-size: 32rpx;position: fixed;bottom: 130rpx;'
				:text="$t('链接钱包')" v-if="false"></u-button>
			<view class="temporary" @click='LinkWallet' v-if="false">
				{{$t('暂时跳过')}}
			</view>
		</view>
		<!-- 已登录 -->
		<view class="boxStyle" v-if="!ouTstatus" :style="{paddingTop:$store.state.tabh }">
			<!-- 头部操作 -->
			<view class="top_operation" >
				<view class="img_list" @click='mylist'>
					<image src="../../static/img/mylist.png" alt="" class='' />
					<!-- <view class="text_left">
						3
					</view> -->
				</view>
				<view class="top_operation_left">
					<image src="../../static/img/my_she.png" alt="" @click='setup'>
				</view>
			</view>
			<!-- 头像 -->
			<view class="user">
				<image  :src="userinfo.avatar_url" mode="" class="brYuan" style="width: 180rpx;height: 180rpx;" v-if="userinfo.avatar_url"></image>
				<image src="/static/img/head.png" style="width: 180rpx;height: 180rpx;" v-else></image>
				<!-- <u--image :showLoading="true" :src="userinfo.avatar_url" width="90px" height="90px" shape='circle'
					@click="click"></u--image> -->
				<view class="userinfo"  style="flex: 1;">
					<view class="username">
						{{userinfo.nickname}} 
					</view> 
					<view class="userdescribe flex" @click="copy('123')" v-if="userinfo.nickname">
						<text class="elipes1" style="width: 80%;">{{userinfo.uuid}}</text> 
						<image src="../../static/img/my_copy.png" mode=""></image>
					</view>
				</view>
			</view>
			<!-- tabs -->
			<view class="tabs_content">  
				<scroll-view scroll-x="true">
					<view class="tabs_box">
						<view :class="[item.chcek ? 'tabs_text tabs_text_c' : 'tabs_text']" v-for="item in tabslist"
							@tap="tabsC(item.id)" :key="item.id" style="margin-right:60rpx;">

							<view class="flex flexic">
								<image :src="item.img" style="width: 28rpx;height: 24rpx;" v-if="currenId==item.id">
								</image>
								<image :src="item.image" style="width: 28rpx;height: 24rpx;" v-else></image>
								<u-icon :name="item.icon" size="15"></u-icon>
								<text style="margin-left: 10rpx;">{{$t(item.name)}}</text>
							</view>
							<u-transition :show="item.chcek">
								<view class="tabs_line"></view>
							</u-transition>
						</view>
					</view>
				</scroll-view>
			</view>
			<view class="line"></view>
			<!-- Search -->
			<view class="search flexJBC" v-if="currenId!=='04'">
				<u-search :placeholder="$t('请输入关键字')" :clearabled="true" height='80rpx' borderColor='#C2C2C2'
					:showAction="false" bgColor='#F4F5F7' v-model="keyword" @change="changeSearch"></u-search>
				<view class="search_left" @click="searchFn">
					<image src="../../static/img/Sea_list.png" alt="" />
					<view class="fontS24">{{$t('筛选')}}</view>
				</view> 
			</view>
			<view class="flexJBC fontS28 catory " v-else>
				<view class="li flex flexic textAc" @click="showsell = true">
					<text>{{$t(activesell.name)}}</text>
					<u-icon name="arrow-down-fill" color="#333" size="17rpx"></u-icon>
				</view>
				<view class="li flex textAc" @click="showBl = true">
					<text>{{activeBl.name}}</text>
					<u-icon name="arrow-down-fill" color="#333" size="17rpx"></u-icon>
				</view>
			</view>
			<!-- 列表 -->

			<view class="list_content" v-if="currenId=='04' || currenId=='05' || currenId=='06'">
				<noDate v-if='myoffer.length<=0' :fixed='false' />
				<view class="lis_box_content" v-for="(item,index) in myoffer" :key="index">
					<view>
						<scroll-view scroll-x="true">
							<view class="list_box flex" style="width:1062rpx;">
								<view class="lis_box relative flexJBC" style="width: 750rpx;">
									<view class="flex">
										<image :src="$my.imgurl+item.attachment_text" mode="" class="image"></image>
										<view class="center_box textAl" style="margin-top: -10rpx;">
											<text class="fontS20 font99">{{item.nft_name}}</text>
											<view class="fontS28" style="margin: 18rpx 0 28rpx;">{{item.collection_name}}
											</view>
											<view class="fontS24 font99" @click="item.More=!item.More">
												{{item.More?'-Less':'+mode'}}
											</view>
										</view>
									</view>
									<view class="r_box ">
										<view class="flex flexic">
											<image src="/static/img/zs.png" mode=""></image>
											<text class="fontS28">{{item.coin}}</text>
										</view>
										<text class="font99 fontS24" style="margin-top: 28rpx;">{{item.create_time}}</text>
									</view>
									<view class="line3"></view>
								</view>
								<div class="shanchu_del relative" style='width:312rpx;'>
									<view class="line3"></view>
									<view class="" v-if="currenId=='05'" >
										<view class="btn" @click="$my.go(  `/pages/goodsDetail/payAndOffer?offer_id=${item.order_id}&offer=2` )">
											{{$t('再次报价')}}
										</view>
										<view class="btn btn2" style="margin-top: 20rpx;" @click.stop="Cancelquotation(item.nft_id)">
											{{$t('取消报价')}}
										</view>
									</view>
									<view class="" v-if="currenId=='06'">
										<view class="btn" @click="Acceptquotation(item.order_id,item.nft_id,item.num)">
											{{$t('接受报价')}}
										</view> 
									</view>
								</div>
							</view>
						</scroll-view>
						<view class="flexJBC bott" v-if="item.More">
							<view class="li">
								<text class="font99">{{$t('USD价格')}}</text>
								<view class="fontS24">
									$ {{item.usd_price}}
								</view>
							</view>
							<view class="li">
								<text class="font99">{{$t('底价')}}</text>
								<view class="fontS24">
									{{item.floor_diff}}% below
								</view>
							</view>
							<view class="li">
								<text class="font99">{{$t("出价者")}}</text>
								<view class="fontS24 font60">
									{{item.from}}
								</view>
							</view>
							<view class="li" v-if="currenId!='04'">
								<text class="font99">{{$t('过期时间')}}</text>
								<view class="fontS24">
									{{
									  item.day > 0 || item.hr > 0 || item.min > 0
										? (item.day > 0 ? item.day + $t("天") : "") +
										  (item.hr ? item.hr + $t("时") : "") +
										  (item.min ? item.min + $t("分") : "")
										: item.sec + $t("秒")
									}}
									{{ $t("之前") }}
								</view>
						  </view>
					</view>
				</view>
				
			</view>
		</view>
		<view class="relative" v-else style="margin-top: 30rpx;">
			<u-list height='900rpx' @scrolltolower="scrolltolower" v-if='list.length>0'>
					<u-list-item class='Shoplist'>
						<view class="Single" v-for="item in list" @click.stop="go(item)">
							<view class="relative">
								<image class="img_B" :src='$my.imgurl+item.attachment_text'></image>
								<view class="shengheing" v-if="currenId=='02' &&  item.check_status!=1">
									<text>{{item.check_status==0?$t('审核中'):$t('不通过')}}</text>
								</view>
							</view>
							<view class="S_text elipes2">
								{{item.collection_name}}
							</view>
							<view class="S_title">
								<view class="elipes1">
									{{item.nft_name}}
								</view>
								<image src="../../static/img/3....png"
				v-if="(item.check_status==1 && currenId=='02') || currenId!='02'" @click.stop="item.black_view = true" />
							</view>
							<view class="black_view" v-if="item.black_view" @click.stop="item.black_view = false">
								<view class="black_btn" @click="$my.copy(item.token_id)">
									{{$t('复制链接')}}
								</view>
								<view class="black_btn" @click="setavatar(item.id)" v-if="currenId!='03'">
									{{$t('设置头像')}}
								</view> 
								<view class="black_btn" @click.stop="transfer(item)" v-if="currenId!='03'">
									{{$t('转移/赠与')}}
								</view>
							</view>
						</view> 
					</u-list-item>
				</u-list>
				<noDate v-if='list.length<=0' :fixed='false' />
			</view>
		</view>
		<!-- 筛选弹窗 -->
		<Bdialog :show='Bdialogshow' :title="$t('筛选')" :buttonName="$t('确定')" @closeFn='closeFn'
			@SubmitLimit='SubmitLimit'></Bdialog> 
		<!-- 左侧弹窗 -->
		<!-- 侧边 -->
		<u-popup :show="mylistShow" mode="left" @close="close" @open="open">
			<view class="my_user_function">
				<view class="my_user_img">
					<image :src="userinfo.avatar_url" alt="" v-if="userinfo.avatar_url" />
					<image src="/static/img/head.png" mode="" v-else></image>
					<text>{{userinfo.nickname}}</text>
					<!-- 链接钱包 -->
					<!-- <view class="img2">  
						<image src="../../static/img/outlogin.png" class='img2' alt="" @click='loginOut' />
					</view> -->
				</view>
				<view class="my_user_Collection">
					<view class="My_collection flexJBC" @click="goto_collection('/pages/my/Mycollection/Mycollection')">
						<image src="../../static/img/copy.png" mode=""></image>
						<view class="My_collection_son " >
							{{$t('我的合集')}}
						</view>
						<u-icon name="arrow-right"></u-icon>
					</view>
					<view class="My_collection flexJBC" @click="goto_collection('/pages/my/Mywallet/Mywallet')">
						<image src="../../static/my/3461.png" mode=""></image>
						<view class="My_collection_son"> 
							{{$t('我的钱包')}}
						</view> 
						<u-icon name="arrow-right"></u-icon>
					</view>

					<view class="My_collection flexJBC" @click="goto_collection()">
						<image src="../../static/img/tags.png" mode=""></image>
						<view class="My_collection_son">
							{{$t('我的交易')}}
						</view>
						<u-icon name="arrow-right"></u-icon>
					</view>

					<view class="My_collection flexJBC" @click="goto_collection('/pages/my/auction')">
						<image src="../../static/my/harner.png" mode=""></image>
						<view class="My_collection_son">
							{{$t('我的拍卖')}}
						</view>
						<u-icon name="arrow-right"></u-icon>
					</view>




					<view class="My_collection flexJBC" @click="goto_collection('/pages/my/Messagecenter/Messagecenter')">
						<image src="../../static/img/clock.png" mode=""></image>
						<view class="My_collection_son">
							{{$t('我的消息')}}
						</view>
						<u-icon name="arrow-right"></u-icon>
					</view>


				</view>

				<view class="my_user_Collection" style="margin-top: 66rpx;">
					<view class="My_collection flexJBC" @click="$my.go('/pages/my/setup/Blockchainquery/Blockchainquery')">
						<image src="../../static/img/Light.png" mode=""></image>
						<view class="My_collection_son">
						{{$t('区块链查询')}}
						</view>
						<u-icon name="arrow-right"></u-icon> 
					</view> 
					<view class="My_collection flexJBC">
						<image src="../../static/img/help.png" mode=""></image>
						<view class="My_collection_son">
							{{$t('帮助')}}
						</view>
						<u-icon name="arrow-right"></u-icon>
					</view>

					<view class="My_collection flexJBC">
						<image src="../../static/img/earth.png" mode=""></image>
						<view class="My_collection_son">
							{{$t('新闻资讯')}}
						</view>
						<u-icon name="arrow-right"></u-icon>
					</view>
					<view class="My_collection flexJBC" style="margin-bottom: 0;">
						<image src="../../static/img/Light.png" mode=""></image>
						<view class="My_collection_son">
							{{$t('合作')}}
						</view>
						<u-icon name="arrow-right"></u-icon>
					</view>
				</view>
			</view>
		</u-popup>
		<!-- 出售-->
		<u-overlay :show="showsell" @click="showsell = false">
			<view class="warp" @tap.stop>
				<view class="fontS36 textAc">
					{{$t('事件分类')}}
				</view>
				<view class="flexJBC flexW">
					<view class="lis flex flexic fontS32 " v-for="(item,index) in sell" :key="index"
						:class="activesell.id==item.id?'active':''" @click="activeClick(item,1)">
						<text>{{$t(item.name)}}</text>
					</view>
				</view>
			</view>
		</u-overlay>
		<!-- 区块链 -->
		<u-overlay :show="showBl" @click="showBl = false">
			<view class="warp" @tap.stop>
				<view class="fontS36 textAc">
					{{$t('区块链')}}
				</view>
				<view class="flexJBC flexW">
					<view class="lis flex flexic fontS32 " v-for="(item,index) in BlockChain" :key="index"
						:class="activeBl.id==item.id?'active':''" @click="activeClick(item,2)">
						<image :src="$my.imgurl+item.icon" mode="" class="brYuan" v-if="index!=0"></image>
						<text>{{item.name}}</text>
					</view>
				</view>
			</view>
		</u-overlay>
		<!-- 报价弹窗 -->    
		<u-overlay :show="showbaojia" @click="showbaojia = false">
			<view class="warp" @tap.stop>
				<view class="fontS36 textAc">
					{{$t('筛选')}}
				</view>
				<view class="flexJBC flexW">
					<view class="lis flex flexic fontS32 " v-for="(item,index) in baojia" :key="index"
						:class="activeBaojia.id==item.id?'active':''" @click="activeClick(item,3)">
						<text>{{item.name}}</text>
					</view>
				</view>
			</view>
		</u-overlay>
	</view>
	</view>
</template>

<script>
	import AddNft from '../addNft/addNft.vue';
	// import Web3 from 'web3';
	export default {
		data() {
			return {
				myoffer:[],//我发出的报价 和 我收到的报价
				Limit: {}, //筛选
				balanceOfList: [],
				TokenId: null,
				ABI: [],
				keyword: "",
				baojia: [{
						name: "报价中",
						id: "1"
					},
					{
						name: "已失效",
						id: "2"
					},
					{
						name: "最新报价",
						id: "3"
					}
				],
				
				showbaojia: false,
				activeBaojia: {
					name: "报价中",
					id: "1"
				},
				sell: [{
						name: "销量",
						id: "88"
					},
					{
						name: "清单",
						id: "89"
					},
					{
						name: "收藏",
						id: "84"
					},
					{
						name: "转移",
						id: "82"
					},
				], //s事件分类
				activesell: {
					name: "销量",
					id: "88"
				}, //出售
				showsell: false,
				activeBl: {}, //区块链
				showBl: false,
				BlockChain: [],
				currenId: "",
				list: [],
				listCopy: [],
				page: 1,
				userinfo: {},
				ouTstatus: false,
				mylistShow: false,
				overlayshow: false,
				Bdialogshow: false,
				tabslist: [{
						name: '我购买的',
						chcek: true,
						id: '01',
						img: require("../../static/my/3303.png"),
						image: require("../../static/my/3261.png"),

					}, {
						name: '我创建的',
						chcek: false,
						id: '02',
						img: require("../../static/my/3304.png"),
						image: require("../../static/my/3262.png"),
					}, {
						name: '我喜欢的',
						chcek: false,
						id: '03',
						img: require("../../static/my/start_fill.png"),
						image: require("../../static/my/start.png"),

					},
					{
						name: '事件',
						chcek: false,
						id: '04',
						img: require("../../static/my/3305.png"),
						image: require("../../static/my/3263.png"),


					},
					{
						name: '我发出的报价',
						chcek: false,
						id: '05',
						img: require("../../static/my/3306.png"),
						image: require("../../static/my/3265.png"),

					},
					{
						name: '我收到的报价',
						chcek: false,
						id: '06',
						img: require("../../static/my/3307.png"),
						image: require("../../static/my/3266.png"),
					},
				],
			}
		},
		components: {
			AddNft 
		},
		onShow() {
			   this.myoffer=[];
			   this.list=[];
			   this.page=1; 
			   this.$my.get('/index/user/get_user_msg').then(res => {
			    this.userinfo = res.data;
			   }) 
			   this.getData('/index/user/get_user_nft');
		},


		onLoad() {
			// 区块链
			this.$my.get('/index/com/get_chain_type').then(res => {
				if (res.code == 200) {
					this.BlockChain = res.data;
					this.BlockChain.unshift({
						id: '',
						name: this.$t('所有区块链')
					})
					this.activeBl = this.BlockChain[0];
				}
			})
			this.nextTokenIdToMint()
		},
		
		onReachBottom() {
			this.page++;
			if(this.currenId=="04" ||this.currenId=="05" ||this.currenId=="06" ){
				this.getdata2();
			}else{
				this.getData();
			} 
		},
		methods: {
			Cancelquotation(id){
				this.$my.post('/index/bid/nft_bid_cancel',{id:id}).then(res=>{
					this.$my.toast(res.message)
				})
			},
			Acceptquotation(order_id,nft_id,num){
			this.$my.post('/index/bid/nft_bid_sell',{order_id:order_id,id:nft_id}).then(res=>{
				console.log(res);
				this.$my.toast(res.message);
				this.myoffer = [];
				this.page=1;
				this.getdata2();
			})
			},
			changeSearch(e) {
				this.keyword = e; 
				this.list = [];
				if(this.currenId=='05' || this.currenId=='06'){
					this.getdata2();
				}else{
					this.getData()
				}
			},
			setavatar(id) {
				this.$my.get('/index/user/set_avatar_by_nft', {
					nft_id: id
				    }).then(res => {
					if (res.code == '200') {
						this.$my.toast(res.message)
						this.$my.get('/index/user/get_user_msg').then(res => {
							this.userinfo = res.data;
						})
					} else {
						this.$my.toast(res.message)
					}
				})
			},
			async nextTokenIdToMint() {
				// if (window.web3) {
				// 	let web3 = new Web3(window.web3.currentProvider);
				// 	web3.eth.getGasPrice().then(res => {
				// 		console.log(web3.utils.fromWei(res, 'ether'))
				// 		this.webGasPrice = web3.utils.fromWei(res, 'ether');
				// 		// console.log(web3.utils.hexToNumber(String(res)));
				// 	})
				// 	this.ABI = this.$my.ABI
				// 	console.log(this.ABI);
				// 	let ethContract = new web3.eth.Contract(this.ABI,
				// 		"0x1098D78BC5dC14907683840E683f84001Ec4CF2d") //所有代币的abi可以通用（abi,合约地址）
				// 	let fromAddress = await web3.eth.getAccounts()
				// 	ethContract.methods.nextTokenIdToMint().call({
				// 		from: '0x7E7C3f75FC39A8B28e2666130f31B4dd7E15e663'
				// 	}).then(res => {
				// 		console.log(res, 'id');
				// 		this.TokenId = res;
				// 		this.balanceOfBatch()
				// 	})



				// }
			},
			

			// async uri() {
			// 	if (window.web3) {
			// 		let web3 = new Web3(window.web3.currentProvider);
			// 		web3.eth.getGasPrice().then(res => {
			// 			console.log(web3.utils.fromWei(res, 'ether'))
			// 			this.webGasPrice = web3.utils.fromWei(res, 'ether');
			// 			// console.log(web3.utils.hexToNumber(String(res)));
			// 		})
			// 		// this.ABI = this.$my.ABI
			// 		// console.log(this.ABI);
			// 		let ethContract = new web3.eth.Contract(this.ABI,
			// 			"0x1098D78BC5dC14907683840E683f84001Ec4CF2d") //所有代币的abi可以通用（abi,合约地址）
			// 		let fromAddress = await web3.eth.getAccounts()
			// 		var _this = this;
			// 		this.balanceOfList.forEach(item => {
			// 			if (item) {
			// 				ethContract.methods.uri(item)
			// 					.call({
			// 						from: '0x7E7C3f75FC39A8B28e2666130f31B4dd7E15e663'
			// 					}).then(res => {
			// 						let url = res.split('//');
			// 						console.log(url);
			// 						_this.$my.getnft('https://ipfs.io/ipfs/' + url[1]).then(res => {
			// 							console.log(res, '数据');
			// 						})
			// 					})
			// 			}
			// 		})
			// 	}
			// },
			activeClick(item, num) {
				if (num == 1) {
					this.activesell = item;
					this.showsell = false;
				} else if (num == 2) {
					this.activeBl = item;
					this.showBl = false;
				} else if (num == 3) {
					this.activeBaojia = item; 
					this.getdata2() 
					this.showbaojia = false;
				}
				// else{
				// 	this.activesell=item;
				// 	this.showsell=false;
				// } 
				 
			},
			go(item) {
				this.$my.go(`/pages/goodsDetail/goodsDetaill?routeType=3&nft_id=${item.nft_id}`) 
			},
			// 筛选的数据
			SubmitLimit(val) {
				this.Limit = JSON.parse(val) //右上角筛选
				this.list = [];
				this.getData(this.Limit)
			},

			getdata2(){
				this.$my.post('/index/bid/get_bid_record', {
					type: this.currenId == '05' ? 1 : 2,
					limit: 10,
					page: this.page,
					screener: this.activeBaojia.id,
					keyword:this.keyword
				}).then(res => {
					if (res.code = 200) {
						if(res.data.data.length>0){
							this.myoffer=this.myoffer.concat(res.data.data)  
							this.myoffer.forEach(item=>{
								this.$set(item,"More",false)
								let second = Math.floor(item.expires);
								// 天数
								let day = Math.floor(second / 3600 / 24);
								// 小时
								let hr = Math.floor((second / 3600) % 24);
								// 分钟
								let min = Math.floor((second / 60) % 60);
								// 秒
								let sec = Math.floor(second % 60);
								let dataAndTime =
								  (day ? day + ":" : "") + hr + ":" + min + ":" + sec;
								this.$set(item, "day", day);
								this.$set(item, "hr", hr);
								this.$set(item, "min", min);
								this.$set(item, "sec", sec);
							})
						}
					} 
				})
			},
			getData() {
				let url = '';
				this.tabslist.forEach(item => {
					if (item.chcek == true) {
						if (item.id == '01') {
							url = '/index/user/get_user_nft'
						} else if (item.id == '02') {
							url = '/index/user/get_creator_nft'
						} else if (item.id == '03') {
							url = '/index/enshrine/list'
						} else if (this.currenId == '05' || this.currenId == '06') {
							this.myoffer=[];
							this.getdata2();
						}
					}
				});
				if (this.currenId != '05' && this.currenId!= '06') {
					let data = { 
						page: this.page,
						limit: 10,
						keyword: this.keyword,
					}
					this.$my.get(url, Object.assign(data, this.Limit)).then(res => {
						if (res.code == 200) {
							if (res.data.data.length > 0) {
								this.list = this.list.concat(res.data.data)
								this.list.forEach(item => {
									this.$set(item, 'black_view', false)
								})
							} 
						}
					})
				}
			},
			setup() {
				uni.navigateTo({
					url: '/pages/my/setup/setup'
				})
			},
			transfer(item) {
				uni.navigateTo({
					url: `/pages/my/Transfercollection/Transfercollection?img=${item.attachment_text}&id=${item.id}&name=${item.nft_name}`
				})
			},
			goto_collection(url) {
				if (!url) {
					uni.navigateTo({
						url: '/pages/my/collection/collection'
					});
				} else {
					uni.navigateTo({
						url: url
					});
				}
				this.mylistShow = false;
			},
			LinkWallet() {
				this.ouTstatus = false; //未登录状态
				this.mylistShow = false;
			},
			loginOut() {
				// this.ouTstatus = true; //未登录状态 --- 正式使用
				uni.navigateTo({
					url: '/pages/login/login2'
				})
			},
			mylist() {
				this.mylistShow = true; 
			},

			Submit(val) {
				console.log(val, '提交');
			},
			searchFn() {
				if (this.currenId == "06" || this.currenId == '05') {
					this.showbaojia = true
				} else {
					this.Bdialogshow = true;
				}
			},
			closeFn(val) {
				this.Bdialogshow = val;
			},
			open() {
				// console.log('open');
			},
			close() {
				this.mylistShow = false
			},
			copy(value) {
				this.$my.copy(value)
			},
			tabsC(id) {
				this.currenId = id;
				this.page = 1;
				this.list = [];
				this.keyword = "";
				this.Limit = {};
				this.tabslist.forEach(item => {
					if (item.id == id) {
						item.chcek = true;
					} else {
						item.chcek = false;
					}
				})
				if(id!='04'){
					this.getData();
				}else{
					this.myoffer=[]
				}
			},
			scrolltolower() {},
		},
	}
</script>


<style lang="less" scoped>
	.tabs_content {
		border-bottom: 1rpx solid #c2c2c2;
		margin-bottom: 42rpx;
	}

	.wallet {
		padding: 0 40rpx;
		box-sizing: border-box;
	}

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
				margin-right: 30rpx;
			}
		}

		.active {
			background-color: #0F172C;
			color: #fff;
		}
	}

	.catory {
		color: #666;
		padding: 42rpx 20rpx;
		box-sizing: border-box;

		.li {
			// width:28%;
			text-align: center;
			margin: 0 auto;

			text {
				margin-right: 6rpx;
			}
		}
	}

	.list_content {
		margin-top: 10rpx;

		.bott {
			padding: 35rpx 40rpx;
			box-shadow: 0px 14px 18px rgba(31, 48, 81, 0.0600);
			.li {
				text-align: center;

				// width: 25%;
				view {
					margin-top: 14rpx;
				}
			}
		}
	}



	.lis_box_content {
		.line3 {
			width: 90%;
			height: 2rpx;
			background: rgba(51,51,51,0.1216) !important;
			bottom: 0;
			position: absolute; 
		}

		.shanchu_del {
			display: flex;
			justify-content: space-around;
			flex-direction: column;
			padding: 20rpx 0;

			.btn {
				border: 2rpx solid #0F172C;
				width: 198rpx;
				height: 78rpx;
				background: #0F172C;
				border-radius: 16rpx;
				text-align: center;
				margin: 0rpx auto;
				text-align: center;
				line-height: 80rpx;
				color: #fff;
				font-size: 28rpx;
			}

			.btn2 {
				background: none;
				color: #0F172C;
			}

			.line3 {
				left: 50%;

			}
		}
	}

	.list_box {
		.line3 {
			left: 50%;
			transform: translateX(-50%);
		}

		.lis_box {
			box-shadow: 6rpx 0px 10rpx rgba(31, 48, 81, 0.0600);
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

	.shengheing {
		width: 120rpx;
		height: 120rpx;
		text-align: center;
		line-height: 120rpx;
		color: #FFFFFF;
		font-size: 24rpx;
		// background: rgba(#0F172C, #0F172C, #0F172C, 0.6);
		background-color: #0F172C;
		border-radius: 50%;
		opacity: 0.6;
		position: absolute;
		top: 50%;
		left: 50%;
		white-space: nowrap;
		transform: translateX(-50%) translateY(-50%);
	}

	// 头部操作栏
	.top_operation {
		display: flex;
		width: 100%;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 72rpx;
		position: relative;
		padding: 0 40rpx;
		box-sizing: border-box;

		.img_list {
			position: relative;
			image {
				width: 51rpx;
				height: 40rpx;
				display: block;
			}

			.text_left {
				width: 32rpx;
				height: 32rpx;
				background: #FF4040;
				border-radius: 50%;
				opacity: 1;
				font-size: 18rpx;
				font-family: Source Han Sans CN;
				font-weight: 400;
				color: #FFFFFF;
				opacity: 1;
				text-align: center;
				position: absolute;
				top: -12rpx;
				right: 0;
				line-height: 32rpx;
			}
		}

		.top_operation_left {
			image { 
				width: 90rpx;
				height: 90rpx;
			}

			image:nth-child(2) {
				margin-left: 48rpx;
			}
		}
	}

	// 用户信息
	.user {
		display: flex;
		margin-bottom: 72rpx;
		margin-left: 30rpx;
		.userinfo {
			padding: 32rpx 35rpx;
			box-sizing: border-box;

			.username {
				font-size: 40rpx;
				font-family: Source Han Sans CN;
				font-weight: 800;
				margin-bottom: 20rpx;
				color: #333333;
				opacity: 1;
			}

			.userdescribe {
				font-size: 28rpx;
				font-family: Source Han Sans CN;
				font-weight: 400;
				color: #666666;
				opacity: 1;

				image {
					width: 28rpx;
					height: 28rpx;
					margin-left: 16rpx;
				}
			}
		}

	}

	// tabs
	.tabs_box {
		display: flex;
		height: 66rpx;
		padding: 0 40rpx;
		box-sizing: border-box;

		.tabs_text {
			flex: 1;
			white-space: nowrap;
			font-size: 28rpx;
			font-family: Source Han Sans CN;
			font-weight: 500;
			color: #999999;
			// line-height: 0px;
			text-align: center;
			// line-height: 10rpx;
			position: relative;

			.tabs_line {
				width: 112rpx;
				height: 6rpx;
				background: #0F172C;
				opacity: 1;
				border-radius: 3px;
				position: absolute;
				bottom: -0rpx;
				z-index: 9999;
				// left: calc(50% - 90rpx);
				left: 50%;
				transform: translateX(-50%);
			}
		}

		.tabs_text_c {
			color: #333333;
		}
	}

	// .line {
	// 	width: 100%;
	// 	height: 0px;
	// 	border: 1rpx solid #C2C2C2;
	// 	opacity: 1;
	// 	margin-bottom: 42rpx;

	// }


	.Shoplist {
		padding: 0rpx 40rpx 128rpx 40rpx;
		box-sizing: border-box;
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		flex-direction: initial;



		.Single {
			display: inline-block;
			width: 319rpx;
			// height: 428rpx;
			background: #FFFFFF;
			opacity: 1;
			border-radius: 40rpx;
			margin-bottom: 32rpx;
			padding: 24rpx;
			box-sizing: border-box;
			z-index: 1;
			position: relative;

			.black_view {
				width: 100%;
				height: 100%;
				z-index: 2;
				background: rgba(0, 0, 0, 0.3);
				position: absolute;
				top: 0;
				left: 0;
				border-radius: 40rpx;
				padding: 8rpx 24rpx;
				box-sizing: border-box;

				.black_btn {
					width: 271rpx;
					height: 60rpx;
					background: #FFFFFF;
					opacity: 1;
					border-radius: 29rpx;
					margin: 32rpx 0;
					font-size: 24rpx;
					font-family: Source Han Sans CN;
					font-weight: 400;
					line-height: 60rpx;
					color: #333333;
					opacity: 1;
					text-align: center;
				}
			}

			.img_B {
				width: 271rpx;
				height: 284rpx;
				background: #E0E0E0;
				opacity: 1;
				border-radius: 28rpx;
			}

			.S_text {
				font-size: 18rpx;
				font-family: Source Han Sans CN;
				font-weight: 400;
				color: #999999;
				margin-top: 24rpx;
				margin-bottom: 12rpx;
				margin-left: 4rpx;
				line-height: 40rpx;
			}

			.S_title {
				font-size: 26rpx;
				font-family: Source Han Sans CN;
				font-weight: 500;
				color: #333333;
				// line-height: 28rpx;
				margin-left: 4rpx;
				display: flex;
				flex-direction: row;
				align-items: center;
				justify-content: space-between;
				image {
					width: 33rpx;
					height: 7rpx;
				}
			}

			.S_pir {
				display: flex;
				justify-content: space-between;
				margin-top: 16rpx;
				.S_pirnum { 
					font-size: 32rpx;
					font-family: Source Han Sans CN;
					font-weight: 500;
					color: #333333;
					line-height: 64rpx;

					text {
						font-size: 20rpx;
					}
				}

				.S_start {}
			}
		}
	}

	.search {
		display: flex;
		margin-bottom: 0rpx;
		padding: 0 40rpx;
		box-sizing: border-box;

		.search_left {
			margin-top: 15rpx;
			margin-left: 33rpx;
			font-size: 20rpx; 
			image {
				width: 33rpx;
				height: 26rpx;
			}

			view {
				font-size: 16rpx;
				font-family: Source Han Sans CN;
				font-weight: 500;
				color: #333333;
				opacity: 1;
				line-height: 40rpx;
			}
		}
	}

	.my_user_function {
		padding: 140rpx 40rpx 100rpx;
		box-sizing: border-box;
		background-color: #F4F5F7; 
		height: 100vh;
		overflow-y: scroll; 
		.my_user_img {
			display: flex;
			flex-direction: row;
			align-items: center;
			margin-bottom: 72rpx;

			image {
				width: 96rpx;
				height: 96rpx;
				border-radius: 50%;
			}

			.img2 {
				flex: 1;
				width: 30rpx;
				height: 30rpx;
				border-radius: 0;
				display: block;
				float: right;
				position: relative;

				image {
					width: 30rpx;
					height: 30rpx;
					position: absolute;
					right: 44rpx;
				}
			}

			text {
				font-size: 32rpx;
				font-family: Source Han Sans CN;
				font-weight: 500;
				line-height: 96rpx;
				color: #333333;
				opacity: 1;
				margin-left: 32rpx;
			}
		}
	}
	.my_user_Collection {
		width: 550rpx;
		// height: 432rpx;
		background: #FFFFFF;
		opacity: 1;
		border-radius: 36rpx;
		padding: 30rpx;
		box-sizing: border-box;
		.My_collection {
			width: 100%;
			height: 48rpx;
			margin-bottom: 60rpx;
			image {
				width: 60rpx;
				height: 60rpx;
				margin-right: 29rpx;
			}

			font-size: 32rpx;
			font-family: Source Han Sans CN;
			font-weight: 500;
			line-height: 48rpx;
			.My_collection_son {
				flex: 1;
				text-align: left;
			}
		}

		// .My_collection:nth-child(5) {
		// 	margin-bottom: 0 !important;
		// }
		.My_collection:nth-child(5) {
			margin-bottom: 0 !important;
		}


	}

	.wallet {
		padding-top: 120rpx;
		box-sizing: border-box;

		.wallet_title {
			font-size: 32rpx;
			font-family: Source Han Sans CN;
			font-weight: 600;
			// line-height: 0px;
			color: #333333;
			opacity: 1;
			// margin-top: 100rpx;
		}

		.wallet_count {
			width: 100%;
			display: flex;
			padding: 70rpx 30rpx 0;
			box-sizing: border-box;
			flex-wrap: wrap;
			justify-content: space-between;
			margin-bottom: 40rpx;

			.wallet_img {
				width: 276rpx;
				height: 250rpx;
				background: #FFFFFF;
				// border: 1rpx solid #707070;
				opacity: 1;
				border-radius: 32rpx;
				margin-bottom: 40rpx;

				img {
					width: 100%;
					height: 100%;
				}
			}
		}
	}

	.temporary {
		width: calc(100% - 80rpx);
		font-size: 28rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #666666;
		position: fixed;
		bottom: 60rpx;
		text-align: center;
	}
</style>
