<template>
	<view>
		<Head :title="type==1?$t('邮箱登录'):type==2?$t('设置密码'):type==3?$t('重置密码'):type==5?$t('绑定手机号'):$t('邮箱注册')" />
		<view class="content padLR40">
			<view v-if="type!=5">
				<u-input v-model="email" v-if="type==1 || type==4 || type==6 " clearable :placeholder="$t('请输入邮箱')"
					placeholderStyle="color:#C2C2C2;font-size:28rpx"
					style='height: 106rpx;border-radius: 32rpx;padding: 0 32rpx;box-sizing: border-box; '>
					<u-icon name="email" slot="prefix" size='40rpx' color="#C2C2C2"></u-icon>
				</u-input>
				<u-input v-if="type!=4 && type!=6" v-model='password' :type="isShoweye?'text':'password'" clearable
					:placeholder="$t('请输入密码')" placeholderStyle="color:#C2C2C2;font-size:28rpx"
					style='height: 106rpx;border-radius: 32rpx;padding: 0 32rpx;box-sizing: border-box;margin-top: 48rpx; '>
					<u-icon name="lock-open" slot="prefix" size='40rpx' color="#C2C2C2"></u-icon>
					<image src="/static/img/eye.png" mode="" v-if="isShoweye" slot="suffix"
						style="width: 32rpx;height: 32rpx;" @click="isShoweye=!isShoweye"></image>
					<image src="/static/img/noteye.png" mode="" v-else slot="suffix" style="width: 32rpx;height: 32rpx;"
						@click="isShoweye=!isShoweye"></image>
				</u-input>
				<u-input @blur='blur' v-model='passwordCopy' v-if="type!=1 && type!=4 && type!=6" :type="isShoweye1?'text':'password'"
					clearable :placeholder="$t('请再次输入密码')" placeholderStyle="color:#C2C2C2;font-size:28rpx"
					style='height: 106rpx;border-radius: 32rpx;padding: 0 32rpx;box-sizing: border-box;margin-top: 48rpx; '>
					<u-icon name="lock-open" slot="prefix" size='40rpx' color="#C2C2C2"></u-icon>
					<image src="/static/img/eye.png" mode="" v-if="isShoweye1" slot="suffix" 
						style="width: 32rpx;height: 32rpx;" @click="isShoweye1=!isShoweye1"></image>
					<image src="/static/img/noteye.png" mode="" v-else slot="suffix" style="width: 32rpx;height: 32rpx;"
						@click="isShoweye1=!isShoweye1"></image>
				</u-input> 
				<view class="input_bon flexJBC fontS24 " v-if="type==1">
					<text class="font99 " @click="$my.go('/pages/login/email?type=4&type1=2')">{{$t('忘记密码')}}？</text>
					<text class="font0F zc" @click="$my.go('/pages/login/email?type=4')">{{$t('注册')}}</text>
				</view> 
			</view>
			<view v-else>
				<u-input v-model='phone' clearable placeholderStyle="font-size:28rpx" :placeholder="$t('请输入手机号')"
					style='height: 106rpx;border-radius: 32rpx;padding: 0 32rpx;box-sizing: border-box; '>
					<view class="flex" slot="prefix" @click="showSelect=true" style="width: 130rpx;">
						<u--text size="28rpx" :text="'+'+areaCode" margin="0 34rpx 0 0" color="#333"></u--text>
						<u-icon name="arrow-down" size='28rpx' color='#333' style='margin-right: 30rpx;'></u-icon>
					</view>
				</u-input>
				<view class="selectbox" v-if="showSelect">
					<view class="triangle">
					</view>
					<view class="box">
						<scroll-view scroll-y="true" style="min-height: 10vh;max-height: 40vh;">
							<view v-for="(item,index) in listitem" :key="index" class="lis   fontS24 elipes1"
								@click="areaCode=item.prefix;showSelect=false">
								+ {{item.prefix}} 
							</view>
						</scroll-view>
					</view>
				</view>
			</view>
			<u-button :text="$t('确定')" @click="finsh"  class="btn00 btn fontS32" :loading='loading'>
				{{type==1?$t('登录'):type==4?$t('验证邮箱'):type==5?$t('发送验证码') :type==6?$t('验证邮箱'):$t('完成')}}
			</u-button> 
		</view>
	</view>
</template>

<script>
	import indexList from '@/common/js/country.js'
	export default {
		data() {
			return { 
				passworde:false,//是否是忘记支付密码验证手机
				loading:false ,
				areaCode: "86", //区号
				listitem: indexList.list,
				showSelect: false,
				email: '', //邮箱  
				password: "", //密码
				passwordCopy: '', //再次输入密码
				type: 5, //1邮箱登录页， 2设置密码  3邮箱重置密码  4邮箱祖册需要验证页 5绑定手机号 
				type1:2,// 1表示邮箱注册  2表示忘记密码验证邮箱
				isShoweye: false,
				isShoweye1: false,   
				phone: '', //手机号码  
			}
		},
		onLoad(option){
			this.type = option.type ? option.type :1;
			this.type1=option.type1?option.type1:1;
			this.email=option.email?option.email:"";
			this.passworde=option.passworde?option.passworde:false;
			this.$my.get('/index/com/get_phone_prefix').then(res=>{
				if(res.code==200){
					this.listitem=res.data
					console.log(this.listitem) 
				}
			})
		},
		methods: {
			blur(){
				if(this.password!=this.passwordCopy){
					this.$my.toast('两次密码不一致')
				}
			},
			finsh() {
				let url;
				let data;
				this.loading=true;
				if (this.type == 1) {
					url = '/index/login/login_by_email'; // 邮箱登
					data = {
						email: this.email,
						password: this.password
					};
				} else if (this.type == 2 || this.type==3) {
					if(this.password!=this.passwordCopy){
						this.$my.toast('两次密码不一致')
						this.loading=false;
						return ;
					}else{
						data={password:this.password}
						if(this.type==2){
							url = '/index/register/register_by_email'; //设置密码
						
						}else{
							url = '/index/login/reset_by_email'; //重置设置密码
							
						}
						
					}
				}
				 else if (this.type == 4) {
					if(this.type1==1){
						// 邮箱注册  验证 （发送验证码
						data = {email: this.email};
						url='/index/register/get_email_code'
					}else{ 
						// 忘记密码 验证邮箱
						data = {email: this.email};
						url='/index/login/get_email_code_by_reset' 
					}
				} else if (this.type == 5) {
					// 绑定手机号
					data = {email: this.email,phone:this.areaCode+this.phone};
					url='/index/register/get_phone_code' 
				}
				this.$my.post(url,data).then(res => {
					this.loading=false;
					this.$my.toast(res.message);
					if(this.type==1  && res.code==205  ){
						this.$my.go(`/pages/login/email?type=5&email=${this.email}`)
					}
					if (res.code == 200) {
						if(this.type == 1){
							uni.setStorageSync('token', res.data.token);
							setTimeout(() => {
								uni.switchTab({
									url: '/pages/index/index' 
								}) 
							}, 500)
						}else if(this.type==2){
							this.$my.go(`/pages/login/email?type=5&email=${this.email}`)
						}
						else if(this.type==3){
							// 登录
							this.$my.go(`/pages/login/email?type=1`)
						}else if(this.type==4){
							 this.$my.go(`/pages/login/sendCode?type=2&emailOrNumber=${this.email}&type1=${this.type1}&areaCode=${this.areaCode}`)
						}else if(this.type==5){
							this.$my.go(`/pages/login/sendCode?type=1&type1=1&emailOrNumber=${this.phone}&email=${this.email}&areaCode=${this.areaCode}&passworde=${this.passworde}`)
						}
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		.selectbox {
			position: relative;
			width: 150rpx;
			z-index: 999;
			.lis {
				display: flex;
				justify-content: center;
				height: 88rpx;
				line-height: 88rpx;
				border-bottom: 1px solid rgba(129, 129, 129, 0.1216);
			}

			.triangle {
				width: 36rpx;
				height: 36rpx;
				background-color: #fff;
				left: 50%;
				transform: translateX(-50%) rotate(50deg);
				text-align: center;
				position: absolute;
				top: 20rpx;
				z-index: 99;
			}

			.box {
				padding: 0 24rpx;
				box-sizing: border-box;
				position: absolute;
				width: 100%;
				min-height: 10vh;
				max-height: 40vh;
				background-color: #fff;
				box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1000);
				top: 35rpx;
				left: 0;
			}
		}

		.btn {
			height: 115rpx;
			line-height: 115rpx;
			margin: 89rpx 0 20rpx;
		}

		margin-top: 72rpx;

		.radio_box {
			margin-top: 72rpx;

			.radio {
				width: 40rpx;
				height: 40rpx;
				border: 2rpx solid #C2C2C2;
				opacity: 1;
				border-radius: 8rpx;
				margin-right: 20rpx;
			}
		}

		.input_bon {
			margin-top: 32rpx;
		}

		.zc {
			text-decoration: underline;
		}
	}
</style>
