<template>
	<view >
		<Head :tab="true" :title='$t(title)' />
		<view class="box">
			<view class="title">
				{{item.target_name}}
			</view>
			<view class="time">
				{{item.create_time}}
			</view>
			<view class="line"></view>
			<view class="content">
				{{item.content}} 
			</view>
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
				title:'', //标题
				item:'',
			}
		},
		onLoad(option) {
			this.title=option.title
			this.item=JSON.parse(decodeURIComponent(option.item))
			// nft_sell nft_auction
			this.getList()
		},
		onReachBottom() {
			this.page++;
			this.status = 'loading';
			this.getList()
		},
		methods:{
			getList(){
				this.$my.get('/index/notice/get_list_by_title',{limit:10,page:this.page,title:this.title}).then(res=>{
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

<style lang="less">
	.box{
		padding: 0 40rpx;
		box-sizing: border-box;
		margin-top: 48rpx;
		.title{
			font-size: 36rpx;
			font-family: Source Han Sans CN;
			font-weight: 500;
			line-height: 36px;
			color: #333333;
			opacity: 1;
		}
		.time{
			font-size: 20rpx;
			font-family: Source Han Sans CN;
			font-weight: 400;
			line-height: 20px;
			color: #999999;
			opacity: 1;
			margin-top: 20rpx;
		}
		.line{
			height: 0px;
			border: 1rpx solid rgba(51, 51, 51, 0.12156862745098039);
			opacity: 1;
			margin-top: 40rpx;
			margin-bottom: 40rpx;
		}
		.content{
			font-size: 28rpx;
			font-family: Source Han Sans CN;
			font-weight: 400;
			line-height: 50rpx;
			color: #999999;
			opacity: 1;
		}
	}
</style>