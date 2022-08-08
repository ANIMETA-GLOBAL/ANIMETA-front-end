<template>
	<view class="">
		<Head  :title="$t('我创建的合集')" />
		<view class="box" > 
			<view class="box_son"> 
				<view class="search">
					<u-search :placeholder="$t('请输入关键字')" :clearabled="true" height='80rpx' borderColor='#C2C2C2'
						:showAction="false" bgColor='#F4F5F7' v-model="keyword"></u-search>
					<view class="search_left" @click="go('/pages/addNft/releaseNft?type=2')">
						<image src="../../../static/img/add.png" alt="">
					</view>
				</view> 
				<view v-for="(item,index) in Collection" @click="$my.go(`/pages/Collectionpage/Collectionpage?id=${item.id}&coll_type=1`)" :key="index">
					<view class="content">
						<view class="center"  :style="{backgroundImage:item.logo_url}">
							<view class="center"  style="overflow: hidden;">
								<image :src="item.cover_url?$my.imgurl+item.cover_url:$my.imgurl+item.logo_url" class="" alt="" mode="widthFix" style="margin-top: -50%;"/>
							</view>
							<image class="box_e" :src="$my.imgurl+item.logo_url" />
						</view> 
						<view class="text">
							{{item.name}}
						</view>
						<view class="text_two">
							{{item.creator.nickname}}
						</view>
					</view> 
				</view> 
			</view>
			 <noDate v-if='Collection.length==0'/> 
		</view> 
	</view>
</template>

<script>
	export default {
		data() {
			return {
				page:1,
				keyword: '',
				Collection: []
			};
		},
		onReachBottom() {
			this.page++
			this.getCollection();
		},
		created() {
			this.getCollection();
		},
		
		methods: {
			getCollection() {
				this.$my.get('/index/collection/get_user_collection',{page:this.page,limit:10}).then(res => {
					if(res.code==200){
						if(res.data.data.length>0){
							this.Collection =this.Collection.concat(res.data.data) ;
						}
					}
				})
			},
			go(url){
				this.$my.go(url)
			},
		}
	}
</script>

<style lang="scss" scoped>
	.box {
		.box_son {
			margin-top: 48rpx;
		}
		
		padding: 0 40rpx;
		box-sizing: border-box;
		.search {
			display: flex;
			margin-bottom: 48rpx;
		
			.search_left {
				margin-left: 33rpx;
		
				image {
					width: 90rpx;
					height: 90rpx;
					border: 1rpx solid #D4D4D4;
					border-radius: 50%;
					opacity: 1;
				}
		
		
			}
		}
		.content {
			width: 670rpx;
			height: 472rpx;
			background: #FFFFFF;
			opacity: 1;
			border-radius: 40rpx;
			padding: 30rpx;
			box-sizing: border-box;
			margin-bottom: 40rpx;
		
			.center {
				width: 610rpx;
				height: 254rpx;
				// overflow: hidden;
				background: #c2c2c2;
				opacity: 1;
				border-radius: 32rpx;
				position: relative;
				margin-bottom: 84rpx;
		
				.box_e {
					width: 120rpx;
					height: 120rpx;
					background: #DEDEDE;
					border: 4rpx solid #FFFFFF;
					border-radius: 50%;
					opacity: 1;
					position: absolute;
					top: calc(254rpx - 62rpx);
					left: calc(305rpx - 62rpx);
					
				}
			}
		
			.text {
				text-align: center;
				font-size: 32rpx;
				font-family: Source Han Sans CN;
				font-weight: 500;
				line-height: 32rpx;
				color: #333333;
				opacity: 1;
			}
		
			.text_two {
				text-align: center;
				font-size: 24rpx;
				font-family: Source Han Sans CN;
				font-weight: 500;
				line-height: 24px;
				color: #6094FF;
				opacity: 1;
			}
		
		}
	}

	

	
</style>
