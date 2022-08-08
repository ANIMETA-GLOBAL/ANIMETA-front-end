<template>
		<view class="tabbar fontS26" >
			<view class="navigator">
				<image src="/static/tabIcon/add.png" mode="widthFix" class="add" @click="addNft"></image>
				<view class="navigator-item" v-for="(item,index) in tabBar.list" :key="item.pagePath"
					@click="switchTab(index,item)">
						<image :src="item.iconPath" class="icon" v-if="selectedIndex != index">
						<image :src="item.selectedIconPath" class="icon" v-else>
						<text :class="['item-text',{'text-active':selectedIndex == index}]">{{ $t(item.text)}}</text>
				</view> 
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		props:{
			selectedIndex:{
				default:0
			}
		},
		watch: {
			$route: {
				immediate: true,
				handler(to) {
				      if(to){
						  if (to.meta.isTabBar ) {
						  // this.__path__ = this.$route.path
						  this.showselected = true
						  const index = this.tabBar.list.findIndex(item => to.meta.pagePath === item.pagePath)
						  this.$store.commit('changeAddNft',false)
						  if (index > -1) {
						  	// this.selectedIndex = index
						  } 
					  } 
				}
				}
			}
		},
		data() {
			return {
				// selectedIndex: 0,
				showselected: false,
				tabBar: {
					list: [{
							"pagePath": "pages/index/index",
							"iconPath": "/static/tabIcon/icon1.png",
							"selectedIconPath": "/static/tabIcon/icon2.png",
							"text": "首页"
						}, {
							"pagePath": "pages/team/team",
							"iconPath": "/static/tabIcon/icon3.png",
							"selectedIconPath": "/static/tabIcon/icon4.png",
							"text": "交易"
						}, {
							"pagePath": "pages/promotion/promotion",
							"iconPath": "/static/tabIcon/icon5.png",
							"selectedIconPath": "/static/tabIcon/icon6.png",
							"text": "拍卖"
						},
						{
							"pagePath": "pages/my/my",
							"iconPath": "/static/tabIcon/icon7.png",
							"selectedIconPath": "/static/tabIcon/icon8.png", 
							"text": "我的"
						}
					]
				},
			}
		},
		// beforeCreate() {
		// 	this.__path__ = this.$route.path
		// },
		methods: {
			addNft(){
				this.$store.commit('changeAddNft',true)
			},
			switchTab(index, item) {
				let url = '/' + item.pagePath
				let pagePath = url
				const detail = {
				  index,
				  pagePath
				}
				// this.$route.path != url
				if (true) {
				  // this.__path__ = this.$route.path
				  console.log(url);
				  uni.switchTab({
				    from: 'tabBar',
				    url:url,
				    detail
				  })
				} else {
				if (this.$route.path !== url) {
				  // this.__path__ = this.$route.path
				  uni.switchTab({
				    from: 'tabBar',
				    url,
				    detail
				  })
				} else {
				}
				// this.selectedIndex = index
			}
		},
	}}
</script>

 
<style>
	.navigator-item:nth-of-type(2){
		margin-right: 120rpx;
	}
	.add{
		width: 110rpx;
		height: 127rpx;
		position: absolute;
		top:0;
		left: 50%;
		transform: translateX(-50%) translateY(-50%);
	}
	.tabbar {
		position: fixed;
		bottom: 0;
		left: 0;
		z-index:999;
		width: 100%;
		height: 120rpx;
		background: #fff;
		box-shadow: 0px -6px 20px rgba(194, 194, 194, 0.2);
		border-top: 2rpx solid #eee;
		color: #C2C2C2;
		border-radius: 60rpx 60rpx 0 0;
	}
 
	.navigator {
		display: flex;
		justify-content: space-between;
		width: 85%;
		margin: 0 auto;
		padding: 20rpx;
	}
 
	.navigator-item {
		display: flex;
		align-items: center;
		flex-direction: column;
		/* width: 50rpx; */
		/* height: 100%; */
	}
 
	.item-text {
		margin-top: 6rpx;
		color: #777E86;
	}
 
	.text-active {
		color: #0F172C !important;
	
	}
 
	.icon {
		width: 48rpx;
		height: 48rpx;
	}
</style>
