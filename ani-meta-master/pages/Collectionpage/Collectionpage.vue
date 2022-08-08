<template>
	<view>
		<Share :share_show='share_show' @confirm='shareClcik' />
		<view class="bgc fontS40" :style="{backgroundImage: $my.imgurl+coll_detail.banner}">
			<view class="head flexJBC">
				<view class="leftButton ">
					<u-icon name="arrow-left" size="28" @click="back" color='#0F172C'></u-icon>
				</view>
				<view class="flex flexic">
					<view class="head_img brYuan " @click="share_show=true">
						<image src="./fenxaing2.png" alt="" style='width: 90rpx;height: 90rpx;' ></image>
					</view>
					<view class="head_img brYuan " style="margin-left: 48rpx;" @click="moreFn" v-if="coll_detail.is_self">
						<image src="./more.png" alt="" style='width: 90rpx;height: 90rpx;' ></image>
					</view>
				</view>
			</view>
			<view class="coll_img">
				<image :src="coll_detail.logo_url" class="img"></image>
			</view>
		</view>

		<view class="box">
			<view class="title" >
				{{coll_detail.name}}
			</view>
			<view class="richtext" style="margin-top: 100rpx;"> 
				<u-read-more  ref="uReadMore" showHeight="600" :toggle='true' :shadowStyle="obj" fontSize='24rpx' color='#666' closeText='- more'>
					<rich-text :nodes="coll_detail.details" style="font-size: 24rpx;line-height: 48rpx"></rich-text>
				</u-read-more>
			</view>
			<!-- <img src="" alt="" class='img'> -->
			<view class="numlist">
				<view>{{coll_detail.items}}</view>
				<view>{{coll_detail.owners}}</view>
				<!-- <view>00</view>
				<view>00</view> -->
			</view>
			<view class="numlist numtext">
				<view>items</view>
				<view>owners</view> 
				<!-- <view>floor price</view>
				<view>traded</view> -->
			</view>
			<AddNft />
			<view class="content">
				<view class="top_box">
					<!-- 	<SearchAndLimit /> -->
					<Search @keyWordchange='keyWordchange' >
						<view @click="SearchFn">
							<image src="../../static/img/Sea_list.png" alt="">
							<view>{{$t('筛选')}}</view>
						</view>
					</Search>
					<view class="classification fontS32 flexJBC fw6">
						<view class="l " :class="type==1?'active':''" @click="getmenu(1)">{{$t('项目')}}</view>
						<view class="r" :class="type==2?'active':''" @click="getmenu(2)">{{$t('事件')}}</view>
					</view>
				</view>
				<List style=''  :list='list_menu' routeType="1" :showbtottom='true' :isBottom="false"/>
				<noDate :fixed='false' v-if="list_menu.length==0" style='margin-top: 80rpx;'/> 
				<!-- <u-empty
				style='margin-top: 40rpx;'
				v-else mode="data">
				</u-empty> --> 
			</view> 
			<!-- 底部弹窗 -->
			<Bdialog :show='Bdialogshow'  @closeFn='closeFn' @SubmitLimit='Submit' ></Bdialog>
			<u-action-sheet  :closeOnClickOverlay="true" :closeOnClickAction="true" :title="$t('更多')"
				:show="more_Bdlog" @close='more_Bdlog = false' round='40rpx'>
				<view class="more_operation flex">
					<view class="list" @click="edit_coll(1)">
						<image src="../Collectionpage/eidt.png" alt="" />
						<view class="">
							{{$t('编辑合集')}}
						</view>
					</view> 
					<view class="list marLR60" @click="edit_coll(2)">
						<image src="../Collectionpage/add.png" alt="" />
						<view class="">
							{{$t('添加项目')}}
						</view>
					</view>
				</view>
				</u-action-sheet>
				
		</view>
		<view style='margin-top:60rpx'>
			<u-loadmore :status="status"   v-if="list_menu.length>2" />
		</view>
		
	</view>
</template>

<script>
	import SearchAndLimit from '../../componentes/searchAndLimit.vue'
	import AddNft from '../addNft/addNft.vue'
	import List from '../../componentes/list.vue'
	import Search from "../../componentes/search.vue"
	import Share from '../../componentes/share.vue'
	export default {
		components: {
			SearchAndLimit,
			List,
			AddNft,
			Search,
			Share
		},
		data() {
			return {
				status:"",
				keyWord:"", //搜索关键子
				Limit:"",//筛选
				share_show:false,//分享
				coll_type:2, //1自己的合集2藏品的合集
				page:1,
				list_menu:[],//项目列表
				coll_detail:"",//合集详情
				id:'',//合集id
				more_Bdlog:false,
				Bdialogshow: false,
				type: 1, //1是项目2是时间
				obj: {
					backgroundImage: "linear-gradient(-180deg,#F4F5F7 50%, rgba(255, 255, 255, .5) 80%)",
					paddingTop: "100px",
					marginTop: "-100px",
				},
			};
		},
		onLoad(option) {
			this.id=option.id; //合集id
			this.coll_type=option.coll_type?option.coll_type:this.coll_type; //自己的合集还是藏品的合集
			this.$my.get('/index/collection/get_details',{id:this.id}).then(res=>{
				if(res.code==200){
					this.$nextTick(() => {
						this.$refs.uReadMore.init();
					})
					this.coll_detail=res.data
				}
			})
			this.getmenu()
		},
		onShow() { 
			// this.list_menu=[];
			// this.page=1;
			// this.$my.get('/index/collection/get_details',{id:this.id}).then(res=>{
			// 	if(res.code==200){
			// 		this.$nextTick(() => {
			// 			this.$refs.uReadMore.init();
			// 		})
			// 		this.coll_detail=res.data
			// 	}
			// })
			// this.getmenu()
		},
		onReachBottom() {
			this.page++;
			this.status = 'loading';
			this.getmenu();
			
		},
		methods: {
			keyWordchange(e){
				this.keyWord=e;
				this.list_menu=[];
				this.getmenu();
			},
			// 分享
			shareClcik() {
				this.share_show = false
			},
			// 编辑合集
			edit_coll(val){
				this.more_Bdlog = false;
				val==1?	this.$my.go(`/pages/addNft/releaseNft?type=2&id=${this.id}`) :this.$my.go(`/pages/addNft/releaseNft?type=1`) 
			},
			load() {
				this.$refs.uReadMore.init();
			},
			// 项目
			getmenu(val){
				if(val){
					this.type=val;
					this.page=1;
					this.list_menu=[];
				}
				 if(val!=2){
					 let data={limit:10,page:this.page,collection_id:this.id,is_self:this.coll_detail.is_self?1:2,keyword:this.keyWord}
					 this.$my.get('/index/collection/get_nft_by_collection',Object.assign(data,this.Limit)).then(res=>{
					 	if(res.code==200){ 
					 		if(res.data.data.length>0){
					 			this.list_menu=this.list_menu.concat(res.data.data)
					 		} else{
					 			this.status=this.$t('没有更多了') 
					 		}
					 	}
					 })
				 }
			},
			back() {
				uni.navigateBack()
			},
			SearchFn() {
				this.Bdialogshow = true;
			},
			Submit(val) {
					this.Limit=JSON.parse(val) //右上角筛选
					this.getmenu() 
			},
			closeFn() {
				this.Bdialogshow = false;
			},
			moreFn(){
				this.more_Bdlog = true;
			}
		}
	}
</script>

<style lang="less" scoped>
	page {
		padding-bottom: 20rpx !important;
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
	
	// /deep/.u-cell__body {
	// 	padding: 0;
	// 	margin: 40rpx 0 0rpx;
	// }
	.more_operation{
		padding:72rpx 0 40rpx 40rpx ;
		.list{
			width: 100rpx;
			// height: 100rpx;
			border-radius: 50%;
			image{
				width: 100%;
				height: 100rpx;
			}
			font-size: 24rpx;
			font-family: Source Han Sans CN;
			font-weight: 400;
			line-height: 48rpx;
			color: #666666;
			text-align: center;
		}
	}
/deep/.u-action-sheet__header__icon-wrap {
		display: none !important;
	}


	/deep/.search_left {
		margin-left: 33rpx;
		display: flex;
		flex-direction: column;
		justify-content: space-around;

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

	.box {
		padding: 0 40rpx;
		box-sizing: border-box;
	}

	.img {
		width: 750rpx;
		height: 386rpx;
		background: #FFFFFF;
		opacity: 1;
		border-radius: 0px;
	}

	.bgc {
		width: 750rpx;
		height: 386rpx;
		background-color: #F4F5F7;
		position: sticky;
		top: 0;
		left: 0;
		z-index: 99;
		padding-top: 56rpx;
		position: relative; 
		.head {
			padding: 20rpx 40rpx 20rpx 25rpx;
			line-height: 80rpx;
			box-sizing: border-box;
			position: sticky;
			color: #0F172C;
		}
	}

	.head_img {
		width: 90rpx;
		height: 90rpx;
		border: 1px solid #D4D4D4;
		display: flex;
		justify-content: center;
	}
</style>


<style lang="less" scoped>
	.bgc {
		margin-bottom: 163rpx;
	}

	.coll_img {
		.img{
			width: 215rpx;
			height: 215rpx;
		}
		width: 215rpx;
		height: 215rpx;
		background: #AC9595;
		border: 4rpx solid #FFFFFF;
		border-radius: 50%;
		opacity: 1;
		overflow: hidden;
		position: absolute;
		top: calc(100% - (215rpx / 2));
		left: calc(50% - (215rpx / 2));
	}

	.title {
		font-size: 40rpx;
		font-family: Source Han Sans CN;
		font-weight: 500;
		// line-height: 0px;
		color: #333333;
		opacity: 1;
		text-align: center;
		margin-bottom: 48rpx;
	}

	.richtext {
		margin-bottom: 72rpx;
	}

	.numlist {
		display: flex;
		justify-content: space-between;

		view {
			flex: 1;
			text-align: center;
			// background-color: #AC9595;

		}
	}

	.numtext {
		font-size: 24rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #999999;
		opacity: 0.8;
		margin-bottom: 72rpx;
	}
</style>


<style lang='scss' scoped>
	.content {
		.listSlot_box {
			align-items: flex-end;

			.right_btn {
				width: 116rpx;
				height: 48rpx;
				line-height: 48rpx;
				margin-bottom: 5rpx;
			}

			.minititle {
				margin-bottom: 12rpx;
			}
		}

		/* padding: 45rpx 40rpx; */
		box-sizing: border-box;

		.top_box {
			/* position: fixed;top:0; */
			z-index: 9;
			background: #F4F5F7;
			width: 100%;
			/* left:50% */
			
			/* transform: translateX(-50%); */
			/* padding: 28rpx 40rpx 0rpx; */
			box-sizing: border-box;
		}

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
</style>
