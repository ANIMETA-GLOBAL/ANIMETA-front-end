<template>
	<view class="content_box" @click.stop="showSelect=false;isShowLocale=false">
		
		<view class="content":style="{paddingTop:$store.state.tabhHeight }">
			<view class="notLogin font99 fontS24" >
				<text @click.stop="nologin">{{$t('暂不登录')}}</text>
			</view>
			<view class="flexJBC title_box">
				<view class="title fw7"> 
					<text>{{$t('欢迎登录')}}</text> 
					<view style="margin-top: 20rpx;">ANIMETA</view>
				</view>
				<view class="locale_box fontS24 flexJBC relative " @click.stop="isShowLocale=true">
					<text>{{localvalue.name}}</text>
					<u-icon name="arrow-down" size='28rpx' color='#333'></u-icon>
					<view class="selectbox" v-if="isShowLocale"
						style="right: 100rpx;position: absolute;right: 40rpx;top: 45rpx;">
						<view class="triangle" style="left: 100%;">
						</view>
						<view class="box" style="width: 200rpx;">
							<scroll-view scroll-y="true" style="min-height: 10vh;max-height: 40vh;">
								<view v-for="(item,index) in list" :key="index" class="lis   fontS24 elipes1"
									@click.stop="localChange(item)">
									{{item.name}}
								</view> 
							</scroll-view>
						</view> 
					</view>
				</view>
			</view>
			<image src="/static/img/loginImg.png" mode=""></image>
			<view>
				<u-input v-model='phone' clearable placeholderStyle="font-size:28rpx" :placeholder="$t('请输入手机号')"
					style='height: 106rpx;border-radius: 32rpx;padding: 0 32rpx;box-sizing: border-box; '>
					<view class="flex" slot="prefix" @click.stop="showSelect=true" style="width: 130rpx;">
						<u--text size="28rpx" :text="'+'+areaCode" margin="0 34rpx 0 0" color="#333"></u--text>
						<u-icon name="arrow-down" size='28rpx' color='#333' style='margin-right: 30rpx;'></u-icon>
					</view>
				</u-input>
				<view class="selectbox" v-if="showSelect"> 
					<view class="triangle">
					</view>
					<view class="box">
						<scroll-view scroll-y="true" style="min-height: 10vh;max-height: 30vh;">
							<view v-for="(item,index) in listitem" :key="index" class="lis   fontS24 elipes1"
								@click="areaCode=item.prefix;showSelect=false">
								+{{item.prefix}}
							</view>
						</scroll-view>
					</view>
				</view>
			</view>
			<view class="tips fontS24 font99">
				{{$t('未注册用户将直接创建账号')}}
			</view>
			<u-button :text="$t('确定')" @click="vaildation(1)"  class="btn00 btn fontS32" :loading='loading'>
			</u-button>
			<!-- <view class="btn00 btn fontS32" @click="vaildation(1)">
				{{$t('短信验证')}}
			</view> -->
			<view class="btn00 btn btn1 fontS32"  @click="vaildation(2)" style="background: none !important;color: #0F172C !important;">
				{{$t('邮箱登录')}} 
			</view>
			<view class='radio_box flex flexic'>
				<view class="radio relative" @click="value=!value">
					<u-icon name="checkbox-mark" v-if="value" size='30rpx' color='#000'
						style='position: absolute;top: 50%;left: 50%;transform: translateX(-50%)  translateY(-50%)'>
					</u-icon>
				</view>
				<view class="fontS24">
					{{$t('已阅读并同意')}}<text class="font60"
						@click="$my.go('/pages/my/privacyPolicy?id=0')">{{$t('用户协议')}}</text>&<text class="font60"
						@click="$my.go('/pages/my/privacyPolicy?id=1')">{{$t('隐私政策')}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import indexList from '@/common/js/country.js'
	export default {
		data() {
			return {
				loading:false,
				localvalue:{
						name: '中文',
						code: 'zh'
					},
				isShowLocale: false,
				list: [{
						name: '中文',
						code: 'zh'
					},
					{
						name: 'English',
						code: 'en'
					},
					{
						name: '日本語', 
						code: 'jp'
					} 
				],
				listitem: [],
				showSelect: false, //显示区号下拉框
				areaCode: "86", //区号
				value: "", //是否同意
				password: "",
				phone: "", 
				isLoginPhone: false, //是否是手机登录 
				isshowpass: false, //密码是否可见
			};
		},
		onLoad() {
			this.$my.get('/index/com/get_phone_prefix').then(res=>{
				if(res.code==200){
					this.listitem=res.data 
					console.log(this.listitem) 
				}
			})
			let locale=uni.getStorageSync("locale");
			if(locale){
				if(locale=='jp'){
					this.localvalue=this.list[2]
				}else if(locale=='en'){
					this.localvalue=this.list[1]
				}else{
					this.localvalue=this.list[0]
				}
			}
		},
		methods: {
			nologin(){
				uni.switchTab({
					url:"/pages/index/index"
				})
			},
			localChange(item) {
				this.isShowLocale = false;
				this.localvalue = item;
				this.$i18n.locale = item.code;
				this.$store.commit("changeLocale", item.code)
				uni.setStorageSync("locale", this.$store.state.locale)
			},
			vaildation(val) {
				if (this.value) {
					if (val == 1) {
						this.loading=true;
						this.$my.post('/index/login/get_phone_code_by_login',{phone:this.areaCode+this.phone}).then(res=>{
							this.loading=false;
							if(res.code==200){
								this.$my.toast(res.message) 
								setTimeout(()=>{
									this.$my.go(`/pages/login/sendCode?type=1&emailOrNumber=${this.phone}&areaCode=${this.areaCode}`)
								},500)
							}else{
								this.$my.toast(res.message) 
							}
						})
					} else {
						this.$my.go('/pages/login/email?type=1')
					}
				}else{
					this.$my.toast(this.$t('请先同意用户协议与隐私政策')) 
				}
			},
			radioChange() { 
				this.value = true
			}
		}
	}
</script>



<style lang="scss" scoped>
	.content_box{
		padding-bottom: 30rpx;
	}
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

		.radio_box {
			.radio {
				width: 40rpx;
				height: 40rpx;
				border: 2rpx solid #C2C2C2;
				opacity: 1;
				border-radius: 8rpx;
				margin-right: 20rpx;
			}
		}

		.btn1 {
			border: 1rpx solid #0F172C;
			margin-top: 50rpx !important;
		}

		.btn {
			height: 115rpx;
			line-height: 115rpx;
			margin: 72rpx 0 52rpx;

		}

		.tips {
			text-align: right;
			margin-top: 32rpx;
		}

		padding: 0 40rpx;
		box-sizing: border-box;

		.notLogin {
			// width: 100rpx;
			text-align: right;
			margin-top: 32rpx;
		}

		.title_box {
			margin-top: 79rpx;

			.title {
				font-size: 40rpx;
				color: #0F172C;
			}

			.locale_box {
				width: 172rpx;
				height: 58rpx;
				border: 1rpx solid #333333;
				border-radius: 12rpx;
				line-height: 58rpx;
				padding: 0 20rpx;
				box-sizing: border-box;
			}
		}

		image {
			width: 429rpx;
			height: 337rpx;
			margin: 0rpx auto 0rpx;
		}
	}
</style>
