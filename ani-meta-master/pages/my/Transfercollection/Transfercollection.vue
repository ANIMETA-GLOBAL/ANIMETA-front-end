<template>
	<view>
		<Head :tab="true" :title="$t('转移藏品')" />
		<view class="box">
			<image :src="img" mode="" class="content"></image>
			<view class="title">
				{{$t('地址')}}
			</view>
			<view class="input">
				 <u--input  :placeholder="$t('请输入内容')"  v-model="address" ></u--input>
			</view>
			<view class="info">
				{{$t('您的藏品')}}“ {{name}} ”{{$t('将转移到此地址')}}
			</view>
		</view>
		<view class="btn00 " @click="btnClick">
			{{$t('转移')}}
		</view>
	</view>
</template>

<script>
	
	export default {
		data() {
			return {
				address:'',
				img:"",
				name:"",
				id:'',
			};
		},

		methods:{
			btnClick(){
				this.$my.post('/index/user/give_nft',{address:this.address,nft_id:this.id}).then(res=>{
					this.$my.toast(res.message)
					if(res.code==200){
						uni.navigateBack()
					}
				}) 
			}
		},
		onLoad(option){
			this.img=this.$my.imgurl+option.img
			this.name=option.name
			this.id=option.id
		}
	}
</script>

<style lang="less" scoped>
	.btn00{
		position: fixed;
		bottom: 100rpx; 
		height: 115rpx;
		line-height: 115rpx;
		width: 90%;
		left: 50%;
		transform: translateX(-50%);
		
	}
.box{
	padding: 0 40rpx;
	box-sizing: border-box;
	
	.content{
		width: 671rpx;
		height: 400rpx;
		background: #CCCCCC;
		opacity: 1;
		border-radius: 40rpx;
		margin-top: 48rpx;
		margin-bottom: 72rpx;
	}
	.title{
		font-size: 32rpx;
		font-family: Source Han Sans CN;
		font-weight: bold;
		line-height: 32rpx;
		color: #0F172C;
		opacity: 1;
	}
	.input{
		margin-top: 34rpx;
		margin-bottom: 28rpx;
		/deep/.u-input[data-v-460c1d26]{
			width: 670rpx;
			height: 106rpx;
			background: #FFFFFF;
			opacity: 1;
			border-radius: 32rpx;
			padding-left: 38rpx !important;
			box-sizing: border-box;
		}
	}
	.info{
		font-size: 20rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		line-height: 20px;
		color: #999999;
		opacity: 1;
	}
}
</style>
