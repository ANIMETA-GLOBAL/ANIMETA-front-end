<template>
	<view class="content_box">
		<Share :share_show='share_show' @confirm='shareClcik'/>
		<view class="bgc fontS40" >
			<view class="head flexJBC"  >
				<view class="leftButton ">
					<u-icon name="arrow-left"  size="28"  @click="$my.go()" color='#0F172C' ></u-icon> 
				</view>
				<view class="flex flexic">
					<view class="head_img brYuan "  @click="share_show = true">
						<u-icon name="share-square" size='38rpx'></u-icon>
					</view>
				</view>
			</view>
		</view>
		<view class="content">
			<view class="title fontS32 ">
			{{$t('NFT上传成功,请等待后台审核')}}!
			</view> 
			<view class="white_box  br40">
				<view class="relative">
					<image :src="$my.imgurl+img" mode=""></image>
					<view class="audit absolute abcenter fontS32 fontfff">
						{{$t('审核中')}}
					</view>
				</view>
				<view class="fontS28 mini">
					{{collection.name}}
				</view>
				<view class="name fontS32">
					{{goodsDetail_info.name}}
				</view>
			</view> 
			<!-- <view class="btnn flexJBC fixed">
				<view class="btn00 fontS32" @click="$my.go(`/pages/goodsDetail/sellout/sellout?id=${goodsDetail_info.id}&img=${$my.imgurl+goodsDetail_info.attachment_text}`)" style="width: 100%;">
					{{$t('立即卖出')}}
				</view>  
			</view> -->
		</view>
	</view>
</template>

<script>
	import Share from '../../componentes/share.vue'
	export default{
		data(){
			return{
				img:"",
				share_show:false,
				collection:'',
				goodsDetail_info:"",
			}
		},
		methods:{
			shareClcik(){
				this.share_show=false
			}
		},
		onLoad(option) {
			this.img=option.img
		
			// this.$my.get('/index/nft/get_nft_details', {
			// 	id:option.id
			// }).then(res => {
			// 	if (res.code == 200) {
			// 		let {collection} =res.data
			// 		this.goodsDetail_info = res.data
			// 		this.collection=collection
			// 	}
			// })
		},
		components:{Share},
	}
</script>

<style lang="scss">
	.content{
		padding: 0 40rpx;
		box-sizing: border-box;
		.btnn{
			bottom: 0;
			padding: 30rpx 40rpx;
			box-sizing: border-box;
			width: 100%;
			background-color: #fff;
			left: 0;
			.btn00{
				width: 80%;
				height: 115rpx;
				line-height: 115rpx;
			}
		}
		.title{
		  margin:200rpx 0 0;
		  color: #0F172C;
		}
		.white_box{
			width:100%;
			height: 822rpx;
			background-color: #fff;
			padding: 40rpx;
			margin-top: 60rpx;
			box-sizing: border-box;
			.audit{
				z-index: 999;
				width: 220rpx;
				height: 220rpx;
				background-color: rgba(0, 0, 0, .4);
				border-radius: 50%;
				text-align: center;
				line-height: 220rpx;
				
			}
			.mini{
             color: #8197C4;
			 margin: 32rpx 0;
			}
		    image{
			 width: 100%;
			 height: 618rpx;
			 background: #E0E0E0;
			 border-radius: 28rpx;
			 
		 }
		}
	}
	
	.bgc{
		background-color: #F4F5F7;
		width: 100%;
		position: fixed;top:0;left: 0;z-index: 99;
		.head_img{
			width: 90rpx;
			height: 90rpx;
			border: 1px solid #D4D4D4;
			display: flex;
			justify-content: center;
			&:nth-of-type(2){
				margin-left: 38rpx;
			}
		}
		.head {
			background-color: #F4F5F7;
			padding:20rpx 40rpx ;
			box-sizing: border-box;
			color: #0F172C;
		}
	}
</style>