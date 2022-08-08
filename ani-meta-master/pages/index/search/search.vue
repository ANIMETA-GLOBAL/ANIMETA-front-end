<template>
	<view class="box">
		<search @keyWordchange='keyWordchange' :style="{paddingTop:$store.state.tabh }">
			<view class="text" @click="returnFn">
				返回
			</view>
		</search>
		<view v-if='collection.length>0'>
			<view class="title">
				合集
			</view>
			<view class="Collection">
				<view class="list" @click="gotoinfo(`/pages/Collectionpage/Collectionpage?id=${item.id}`)" v-for="(item,index) in collection" :key='item.id'>
			
					<view class="list_top" >
						<view class="list_top" style="overflow: hidden;">
							<image :src="item.banner_url?$my.imgurl+item.banner_url : $my.imgurl+item.logo_url" mode="widthFix" style="width: 100%;"></image>
						</view>
						<image class="list_center" :src="$my.imgurl+item.logo_url" alt=""></image>
					</view> 
					<view class="headline"> 
						{{item.name}}
					</view>
					<view class="info">
						{{item.nickname}}
					</view>
				</view>
			</view>
		</view>
		<view v-if='user.length>0'>
			<view class="title">
				账户
			</view>
			<view class="account">
				<view class="list" v-for="(item,index) in user" :key='index'>
					<image :src="$my.imgurl+item.avatar_url" alt="">
					<view class="content" style='width:70%'>
						<view class="name">
							{{item.nickname}}
						</view>
						<view class="flex flexic" >
							<view class="info els" >
								{{item.wallet_address}}
							</view> 
							<image src="/static/img/my_copy.png" mode="" style='width:24rpx;height:24rpx;margin-left:10rpx' @click='copy(item.blockchain_address)'></image>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view v-if='nft.length>0'>
			<view class="title">
				藏品
			</view>
			<List :list='nft'/>
		</view> 
		<noDate v-if='nft.length<=0 && user.length<=0 && collection.length<=0'/>
	</view>
</template> 


<script>
	import Search from "@/componentes/search.vue"
	import List from '@/componentes/list.vue'
	export default {
		components: {
			'Search': Search,
			 List
		},
		data() {
			return {
				collection:[],
				nft:[],
				user:[],
				keyword:"",
			};
		},
		onLoad(){
			this.getList()
		},
		
		methods: {
			keyWordchange(e){
				this.keyword=e
				this.getList()
			},
			getList(){ 
				this.$my.get('/index/home/global_search',{keyword:this.keyword,limit:20}).then(res=>{
					if(res.code==200){
						let {collection,nft,user} = res.data;
						this.collection=collection;
						this.collection.forEach(item=>{
							this.$set(item,"nickname",item.creator?item.creator.nickname:'')
						})
						this.nft=nft;
						this.user=user;
					}
				})
			},
			returnFn() {
				this.$my.go()
			},
			scrolltolower(){
				
			},
			copy(value) {
				this.$my.copy(value)
			},
			gotoinfo(url){
				this.$my.go(url)
			} 
		}
	}
</script>

<style lang="less">
	page{
		padding-bottom: 040rpx;
	}
	.box {
		overflow: hidden;
		padding: 0 40rpx;
		box-sizing: border-box;
		margin-top: 10rpx;

		.text {
			font-size: 24rpx;
			font-family: Source Han Sans CN;
			font-weight: 400;
			color: #999999;
			opacity: 1;

		}

		.title {
			font-size: 36rpx;
			font-family: Source Han Sans CN;
			font-weight: 500;
			color: #333333;
			opacity: 1;
			margin-top: 48rpx;
			// margin-bottom: 48rpx;
		}

		.Collection {
			display: flex;
			justify-content: space-between;
			flex-wrap: wrap;

			.list {
				width: 319rpx;
				height: 340rpx;
				background: #FFFFFF;
				opacity: 1;
				border-radius: 40rpx;
				margin-top: 40rpx;
				overflow: hidden;
				text-align: center;
				

				.list_top {
					background-repeat: no-repeat;
					background-size: 100% 100%;
					width: 319rpx;
					height: 170rpx;
					background: #AFAFAF;
					opacity: 1;
					position: relative;
					margin-bottom: 74rpx;

					.list_center {
						width: 100rpx;
						height: 100rpx;
						border: 4rpx solid #FFFFFF;
						border-radius: 50%;
						opacity: 1;
						position: absolute;
						top: calc(100% - 50rpx);
						left: calc(50% - 50rpx);
					}
				}

				.headline {
					font-size: 28rpx;
					font-family: Source Han Sans CN;
					font-weight: 500;
					line-height: 28rpx;
					color: #333333;
					opacity: 1;
				}

				.info {
					font-size: 24rpx;
					font-family: Source Han Sans CN;
					font-weight: 500;
					line-height: 24px;
					color: #6E94E2;
					opacity: 1;
				}
			}
		}

		.account {
			padding-top: 8rpx;

			.list {
				height: 160rpx;
				background: #FFFFFF;
				opacity: 1;
				border-radius: 32rpx;
				margin-top: 32rpx;
				padding: 21rpx 0 27rpx 40rpx;
				box-sizing: border-box;
				display: flex;

				image {
					width: 112rpx;
					height: 112rpx;
					background: #DEDEDE;
					opacity: 1;
					border-radius: 56rpx;
				}

				.content {
					margin-left: 24rpx;

					.name {
						font-size: 32rpx;
						font-family: Source Han Sans CN;
						font-weight: 500;
						line-height: 32px;
						color: #333333;
						opacity: 1;
					}

					.info {
						font-size: 28rpx;
						font-family: Source Han Sans CN;
						font-weight: 400;
						color: #666666;
						opacity: 1;
					}
				}
			}
		}

		.Shoplist {
			padding: 0rpx 0 128rpx 0;
			box-sizing: border-box;
			display: flex;
			justify-content: space-between;
			flex-wrap: wrap;
			flex-direction: initial;
			margin-top: 40rpx;


			.Single {
				display: inline-block;
				width: 319rpx;
				height: 428rpx;
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
					line-height: 20rpx;
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
	}
</style>
