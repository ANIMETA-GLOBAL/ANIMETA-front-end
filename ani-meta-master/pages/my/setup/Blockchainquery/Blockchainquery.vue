<template>
	<view>
		<Head :tab="true" :title="$t('区块链查询')" />
		<view class="box">
			<view class="content">
				<u--textarea v-model="value" :placeholder="$t('请输入内容')" count  confirmType='done'></u--textarea>
				<view class="text">
					{{$t('支持藏品、账户相关区块链信息查询')}}
				</view>
			</view>
			
			<view class="" @click="btnClick">
				<u-button :text="$t('查询')" style='width: 670rpx;height: 115rpx;background: #0F172C;border-radius: 20rpx;color: #fff;position: fixed;bottom: 30rpx;'></u-button>
			</view>
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// value:'0x442d6b8bb90b8245fdf17196498f109d9d781f792151812a9ed5ce259bf3d8e2'
				value:"",
			};
		},
		methods:{
			btnClick(){
				let url='';
				// if(this.value.length==42){
				// 	url='https://etherscan.io/address/'
				// }
				if(this.value.length==66){
					url='https://etherscan.io/tx/'
				}else{
					url='https://etherscan.io/address/'
				}
				let newurl = encodeURI(url+this.value)
				// let newurl='https://www.baidu.com/'
				plus.runtime.openURL(newurl)     
			}
		},
	}
</script>

<style lang="less">
.box{
	padding: 0 40rpx;
	box-sizing: border-box;
	margin-top: 48rpx;
	.content{
		/deep/.u-textarea[data-v-7ecdb080]{
			height: 262rpx;
			background: #FFFFFF;
			border-radius: 20rpx;
			border: #FFFFFF;
			margin-bottom: 25rpx;
		}
		.text{
			font-size: 24rpx;
			font-family: Source Han Sans CN;
			font-weight: 400;
			line-height: 24px;
			color: #999999;
			opacity: 1;
		}
		
		
	}
}
</style>
