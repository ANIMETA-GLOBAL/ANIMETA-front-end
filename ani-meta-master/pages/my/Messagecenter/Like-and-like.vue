<template>
	<view>
		<Head :tab="true" :title='title' />
		<view class="content">
			<view class="list flexJBC" v-for="item in list" :key="item.id" @click="go(item)">
				<image :src="$my.imgurl+item.user_avatar" class="img">
				<view class="text">
					<view class="title">
						<text>{{item.user_nickname}}</text>
					</view>
					<view class="info">
						{{item.content}} <text>{{item.create_time}}</text>
					</view>
				</view>
				<image :src="$my.imgurl+item.attachment_text" class="cover">
			</view>
			 <u-loadmore :status="status" v-if='list.length>15' line/>
			 <noDate v-if='list.length==0'/> 
		</view> 
	</view>
</template>
 
<script>
	export default{
		data(){
			return{
				status:"",
				page:1,
				list:[],
				id:'nft_enshrine',
				title:'',
			}
		},
		onLoad(option) {
			this.title=option.title;
			this.id=option.id;
			this.getList();
		},
		onReachBottom() {
			this.page++;
			this.status = 'loading';
			this.getList()
		},
		
		methods:{
			go(item){
				if(this.id!='nft_enshrine'){
					this.$my.go(`/pages/my/Messagecenter/Systemnotification?item=${encodeURIComponent(JSON.stringify(item)) }&title=${this.title}`)
				}
			},
			getList(){
				this.$my.get('/index/notice/get_list_by_title',{limit:20,page:this.page,title:this.id}).then(res=>{
					 if(res.code==200){
						 if(res.data.data.length>0){
							 this.list=this.list.concat(res.data.data)
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

					text {
						margin-left: 10rpx;
					}

				}

			}

			.cover {
				width: 120rpx;
				height: 120rpx;
				background: #E3E3E3;
				opacity: 1;
				border-radius: 12rpx;
			}
		}
	}
	
	
</style>
