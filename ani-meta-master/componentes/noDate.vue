<template>
	<view :class="fixed?'fixed1':'content'" v-if='show'>
		 <image src='/static/img/nodate.png' mode=""></image>
		 <text>{{$t(value)}}</text>
	</view>
</template>

<script> 
export default {
	props:{
		value:{
			default:'这里什么也没有'
		},
		fixed:{
			default:true  //默认是在页面中间   false是绝对位置
		}
	},
	data() {
		return {
			show: false
		} 
	},
	mounted(){
		setTimeout(()=>{
			this.show=true 
		}, 300);
	}
}
</script>

<style lang='scss' >
	image{
		width:220rpx;
		height:258rpx;
		margin-bottom:41rpx;
	}
	text{
		color:#ccc;
		font-size:28rpx;
	}
	.fixed1{
		position:fixed;
		top:50%;
		left: 50%; 
		text-align: center;
		transform: translateX(-50%) translateY(-50%) !important;
	}
	.content{
		position:absolute;
		height:600rpx;
		left:50%;
		transform:translateX(-50%);
		color:#ccc; 
		text-align:center;
	}
</style>