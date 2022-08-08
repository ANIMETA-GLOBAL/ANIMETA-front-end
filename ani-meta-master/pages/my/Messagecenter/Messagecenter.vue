<template>
	<view>
		<Head :tab="true" :title="$t('消息中心')" />

		<view class="content">
			<view class="list" @click="to_like_and_like(item)" v-for="(item,index) in list" :key="index">
				<view class="list_img"> 
					<image :src="$my.imgurl+item.item.attachment_text" mode="" class="img"></image>
				<!-- 	<view class="text_left">
						3
					</view> -->
				</view>

				<view class="text">
					<view class="title">
						<text>{{item.title}}</text> <text>{{item.item.create_time}}</text>
					</view>
					<view class="info" >
						<text style="color: #6094FF;"></text>
						{{item.item.content}} 
					</view>
				</view>
			</view>
				 <u-loadmore :status="status" v-if='list.length>10' line/>
				 <noDate v-if='list.length==0'/> 
		</view> 
	</view>
</template>

<script>
	export default {
		data() {
			return {
				page:1,
				list:[],
				status:"",
			}
		},
		onLoad() {
			this.getList()
		},
		onReachBottom() {
			this.page++;
			this.status = 'loading';
			this.getList()
		},
		methods: {
			to_like_and_like(item) {
				let url;
				// if(item.id=='nft_enshrine'){
					url=`/pages/my/Messagecenter/Like-and-like?id=${item.id}&title=${item.title}`
				// }else{
				// 	url=`/pages/my/Messagecenter/Systemnotification?id=${item.id}&title=${item.title}`
				// } 
				uni.navigateTo({
					url: url
				}) 
			},
			getList(){
				this.$my.get('/index/notice/list',{limit:10,page:this.page}).then(res=>{
					if(res.code==200){
						if(res.data.length>0){
							this.list=this.list.concat(res.data)
						}else{
							this.status=this.$t('没有更多了')
						}	
					}
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.content {
		width: 100%;
		height: 100vh;
		padding: 0 40rpx;
		box-sizing: border-box;
		margin-top: 48rpx;

		.list {
			width: 100%;
			height: 100rpx;
			margin-bottom: 40rpx;
			display: flex;

			.list_img {
				position: relative;
			}

			.img {
				width: 100rpx;
				height: 100rpx;
				background: linear-gradient(180deg, #B9C1D6 0%, #ABB5CD 100%);
				border-radius: 50%;
				opacity: 1;
			}

			.text {
				margin-left: 24rpx;
				flex: 1;

				.title {
					font-size: 28rpx;
					font-family: Source Han Sans CN;
					font-weight: 500;
					color: #333333;
					opacity: 1;
					line-height: 28px;
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

				.info {
					font-size: 24rpx;
					font-family: Source Han Sans CN;
					font-weight: 400;
					color: #999999;
					opacity: 1;
					line-height: 20px;
					display: -webkit-box; //对象作为弹性伸缩盒子模型显示
					overflow: hidden; //溢出隐藏
					-webkit-box-orient: vertical; //设置伸缩盒子对象的子元素的排列方式
					-webkit-line-clamp: 1; //设置 块元素包含的文本行数

				}
			}
		}
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
		top: -4rpx;
		right: -4rpx;
		line-height: 32rpx;
	}
</style>
