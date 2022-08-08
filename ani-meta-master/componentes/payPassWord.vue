<template>
	<view class="content">
		<u-popup :show="show"  mode="bottom" :round="20" @close="show=false">
			<view class="box textAc">
				<text class="title fw7">{{$t(title)}}</text>
				<view class="password_box">
					<u-code-input v-model="password" size='96rpx' :space="0" focus dot  @finish='finish'></u-code-input>
				</view>
				<text class="mimi font99 fontS24">忘记密码?</text>
			</view>
		</u-popup> 
	</view>
</template>  

<script>
	import CryptoJS from "crypto-js";
	
	export default{
		props:{
			title:{
				default:"输入支付密码"
			}, 
			show:{
				default:false
			}
		},
		data(){
			return{
				password:"",
			}
		},
		methods:{
			// 加密
			/**
			  * 
			  * 第一个参数word是待加密或者解密的字符串；
			  * 第二个参数keyStr是aes加密需要用到的16位字符串的key；
			  * 第三个参数是初始化向量 iv。
			*/
		 
			 encrypt(word, keyStr, ivStr) {
			    const key = CryptoJS.enc.Latin1.parse(keyStr);
			    const iv = CryptoJS.enc.Latin1.parse(ivStr);
			    const encoded = CryptoJS.AES.encrypt(word, key, {
			        iv: iv,
			        mode: CryptoJS.mode.CBC,
			        adding: CryptoJS.pad.ZeroPadding
			    }).toString()
				console.log(encoded)
			  this.$emit("finish",encoded)
			  this.$emit("isShow",false)
			  },
			finish(e){
				this.encrypt(e,"BLiJjLmfNfuQookzT1ifBv3kkwG62set", [{'start': 10,'end':16}])
			}
		},
	}
</script>

<style lang="scss" scoped>
	.box{
		height: 30vh;
		width: 100%;
		padding: 40rpx;
		box-sizing: border-box;
		.title{
			font-size: 36rpx;
		}
		.mimi{
			float: right;
			margin-right: 40rpx;
			margin-top: 31rpx;
		}
		.password_box{
			width: 100%;
			padding-left: 35rpx;
			box-sizing: border-box;
			margin-top: 100rpx;
		}
		/deep/ .u-code-input__item:nth-of-type(6){
			border-radius: 0 20rpx 20rpx 0 !important;
		}
		/deep/ .u-code-input__item:nth-of-type(1){
			border-radius: 20rpx 0 0 20rpx !important;
		}
		// /deep/.u-code-input__input{
		// 	width: none;
		// 	margin:  100rpx auto !important;
		// }
	}
</style>