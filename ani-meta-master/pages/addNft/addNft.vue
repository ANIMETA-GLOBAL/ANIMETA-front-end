<template>
	<view class="content">
		<u-overlay :show="$store.state.isSHowAddNft" @click='close' opacity='0.4'>
				<view class="flexJBC warp fixed fontfff" @tap.stop>
				     <view class="box" @click="$my.go('/pages/addNft/releaseNft')">
				     	 <image src="../../static/img/creatNft.png" mode="" class="wh100 brYuan"></image>
						 <view class="fontS22">
						 	{{$t('发布NFT')}}
						 </view>
				     </view>
					 <view class="box" @click="goUploadNft">
					 	 <image src="../../static/img/UpNft.png" mode="" class="wh100 brYuan"></image>
						 <view class="fontS22" >
						 	{{$t('上传其他NFT')}}
						 </view>
					 </view>
				</view>
		</u-overlay>
	</view>
</template>

<script>
     export default{
		 props:{show:{
			 default:true
		 }},
		 data(){
			 return{
			 }
		 },
		 onLoad() {
		 	console.log(this.$store.state.isSHowAddNft)
		 },
		 methods:{
			 close() {
			 	this.$store.commit('changeAddNft',false)
			 },
			 goUploadNft(){
				 // this.$my.go('/pages/addNft/uploadNft')
				 this.$my.toast(this.$t('功能开发中'))
			 }
			
		 }
	 }
</script>

<style lang='scss' scoped>
	.warp{
		width: 100%;
		padding: 0 165rpx;
		box-sizing: border-box;
		.box{
			/* width:50%; */
			/* text-align: center; */
			image{
				margin: 0 auto;
				background-color: #fff;
				margin-bottom: 24rpx;
			}
		}
	}
	/deep/ .u-transition {
		z-index: 99 !important;
	}
	.content{
		.warp{
			bottom:300rpx;
		}
	}
</style>