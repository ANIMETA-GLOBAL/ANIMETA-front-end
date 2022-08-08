<template>
	<view class="">
		<Head :title="type==1?$t('验证手机'):$t('验证邮箱')" />
		<view class="content padLR40">
			<view class="text_box fontS32 fw7">
				<view class="">
					{{$t('验证码已发送到您的')}}{{type==1?$t('手机'):$t('邮箱')}}
				</view>
				<view class="number">
					{{areaCode && type==1?('+' + areaCode + '  ' + emailOrNumber ) :emailOrNumber}}
				</view>
			</view>
			<view class="scanCodeBox">
				<u-code-input @finish="finsh" v-model="sancode" mode="line" :focus="true" :maxlength="4" hairline borderColor="#D4D4D4">
				</u-code-input>
			</view>
			<view class="fontS28 fw7">
				00 : {{num>9?num:"0"+num}}
			</view>
			<view class="send" :style="num=='0'?'':'color:#ccc'" @click="sancodeAgin">
				{{$t('重新发送')}}
			</view>
			<!-- <view class="btn00 btn fontS22" @click="finsh">
				{{$t('完成')}}
			</view> -->
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				passworde:false, //是否是忘记支付密码的手机验证
				emailOrNumber: '',
				num: 60, //倒计时
				sancode: "", //验证码
				type: 1, //1表示手机验证页面  2表示邮箱验证页面
				type1: 1, // 1注册验证 2.重置密码验证
				email: "", //邮箱绑定手机号的 邮箱
				areaCode:"",//区号
			} 
		},
		onLoad(e) {
			this.type = e.type ? e.type : 1
			this.type1 = e.type1 ? e.type1 : 1
			this.emailOrNumber = e.emailOrNumber
			this.email = e.email ? e.email : ''
			this.areaCode=e.areaCode?e.areaCode:''
			this.passworde=e.passworde?e.passworde:false;
			let timer = setInterval(() => {
				if (this.num <= 0) {
					clearInterval(timer)
				} else {
					this.num--
				}
			}, 1000)
		},
		methods: {
			sancodeAgin() {
				// 发送验证码
				if (this.num == 0) {
					uni.showLoading()
					let url;
					let data;
					if (this.type == 1) {
						// 手机验证码
						url = "/index/login/get_phone_code_by_login";
						data = {
							phone:this.areaCode+ this.emailOrNumber
						}
					} else {
						// 邮箱验证码
						url = "/index/register/get_email_code"
						data = {
							email: this.emailOrNumber
						}
					}
					this.$my.post(url, data).then(res => {
						uni.hideLoading()
						if (res.code == 200) {
							this.$my.toast(res.message);
							this.num = 60
						} else {
							this.$my.toast(res.message);
						}
					})
				}

			},
			finsh() {
				uni.showLoading()
				if (this.type == 1) {
					if (this.emailOrNumber && this.email) {
						// 邮箱绑定手机号
						this.$my.post('/index/register/bind_phone_after_email', {
							email: this.email,
							phone:this.areaCode+this.emailOrNumber,
							phone_code:this.sancode
						}).then(res => {
							uni.hideLoading()
							if (res.code == 200) {
								uni.setStorageSync('token', res.data.token);
								setTimeout(() => {
									uni.switchTab({
										url: '/pages/index/index'
									})
								}, 500)
							} else {
							this.$my.toast(res.message);
						}
						})
					} else {
						// 手机号登录
						this.$my.post('/index/login/login_by_phone',{
							phone:this.areaCode+this.emailOrNumber ,
							phone_code:this.sancode
						}).then(res=>{ 
							uni.hideLoading() 
							if(res.code==200){
								uni.setStorageSync('token', res.data.token);
								setTimeout(() => {
									uni.switchTab({ 
										url: '/pages/index/index' 
									})  
								}, 500)
							} else {
							this.$my.toast(res.message);
						}
						})
						
					}
				} else {
					let url;
					let data = {
						email: this.emailOrNumber,
						email_code: this.sancode
					};
					if (this.type1 == 1) {
						// 验证邮箱
						url = '/index/register/verify_email_code';
						data = {
							email_code: this.sancode,
							email: this.emailOrNumber
						}
					} else {
						// 我忘记密码验证邮箱
						url = '/index/login/verify_email_code';
					}
					this.$my.post(url, data).then(res => {
						uni.showLoading()
						if (res.code == 200) {
							this.$my.toast(res.message)
							setTimeout(() => {
								this.$my.go(`/pages/login/email?type=${this.type1==1?2:3}`)
							}, 500)
						} else {
							this.$my.toast(res.message)
						}
					})
				}
			}
		}
	}
</script> 

<style lang="scss" scoped>
	.content {
		box-sizing: border-box;
		margin-top: 72rpx;

		.number {
			margin-top: 32rpx;

		}

		.scanCodeBox {
			margin: 209rpx 0 72rpx;

		}
		.send {
			color: #556EF7;
			margin-top: 32rpx;
		}
		.btn {
			margin-top: 200rpx;
			height: 115rpx;
			line-height: 115rpx;
		}
	}
</style>
