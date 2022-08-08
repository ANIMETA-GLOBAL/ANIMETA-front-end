<template>
	<view>
		<Head  :title="$t('设置')" /> 
		<view class="box">
			<view class="one_list">
				<view class="title">
					{{$t('账户')}}
				</view>
				<view class="My_collection" @click="JumpPage('/pages/my/setup/UpdateUserInfo/UpdateUserInfo')">
					<text>{{$t('修改个人信息')}}</text>
					<view class="My_collection_son">
						<u-icon name="arrow-right"></u-icon>
					</view>
				</view>
				<view class="My_collection" @click="$my.go('/pages/login/setPassWord?type=2')"> 
					<text>{{$t('修改支付密码')}}</text>
					<view class="My_collection_son">
						<u-icon name="arrow-right"></u-icon>
					</view>
				</view>
				<view class="My_collection" @click="$my.go(`/pages/login/email?type=5&passworde=${true}`)">
					<text>{{$t('忘记支付密码')}}</text>
					<view class="My_collection_son">
						<u-icon name="arrow-right"></u-icon>
					</view>
				</view>
			</view>
			<view class="one_list two_list">
				<view class="title"> 
					APP
				</view>
				<view class="My_collection" @click="JumpPage('/pages/my/setup/Selectlanguage/Selectlanguage')">
					<text>{{$t('选择语言')}}</text>
					<view class="My_collection_son">
						<text>{{$t(locale)}}</text>
						<u-icon name="arrow-right"></u-icon> 
					</view>
				</view>
				<!-- <view class="My_collection">
					<text>{{$t('暗黑模式')}}</text>
					<view class="My_collection_son">
						<u-switch
							space="2" v-model="Darkswitch" activeColor="#000000" 
							inactiveColor="rgb(230, 230, 230)">
						</u-switch>
					
					</view>
				</view> -->  
			</view>

			<view class="one_list three_list">
				<view class="title">
				{{$t('关于&支持')}}
				</view>
				<view class="My_collection">
					<text>{{$t('联系我们')}}	</text>
					<view class="My_collection_son">
						<u-icon name="arrow-right"></u-icon>
					</view>
				</view>
				<view class="My_collection">
					<text>{{$t('常见问题解答')}}</text>
					<view class="My_collection_son">
						<u-icon name="arrow-right"></u-icon>
					</view>
				</view>
				<view class="My_collection">
					<text>{{$t('服务条款')}}</text>
					<view class="My_collection_son">
						<u-icon name="arrow-right"></u-icon>
					</view>
				</view>
				<view class="My_collection" @click="$my.go('/pages/my/privacyPolicy')">
					<text>{{$t('隐私政策')}}</text> 
					<view class="My_collection_son">
						<u-icon name="arrow-right"></u-icon>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
               Darkswitch:false,
			   locale:'chinese' ,//语言
			};
		},
		methods: {
			JumpPage(url) {
				uni.navigateTo({
					url: url
				})
			}
		},
		onShow() {
			let locale= this.$store.state.locale
			 switch (locale){
			 	case "zh":
				    this.locale="中文" 
			 		break;
				case "en":
				    this.locale="英文"
					break;
				case "jp":
				    this.locale="日文"
					break;
			 	default:
			 		break;
			 }
		}
	}
</script>


<style lang="less" scoped>
	.box {
		padding: 0 40rpx;
		box-sizing: border-box;
		margin-top: 48rpx;

		.one_list {
			width: 670rpx;
			height: 400rpx;
			background: #FFFFFF;
			padding: 38rpx;
			box-sizing: border-box;
			border-radius: 40rpx;
			display: flex;
			flex-direction: column;
			justify-content: space-between;

			.title {
				font-size: 32rpx;
				font-family: Source Han Sans CN;
				font-weight: 600;
				color: #333333;
			}

		}

	}

	.My_collection {
		display: flex;
		display: flex;
		flex-direction: row;
		align-items: center;
		width: 100%;
		height: 48rpx;

		text {
			font-size: 28rpx;
			font-family: Source Han Sans CN;
			font-weight: 400;
			line-height: 56px;
			color: #666666;
			opacity: 1;
		}

		.My_collection_son {
			flex: 1;
			text-align: right;
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: flex-end;

			text {
				font-size: 24rpx;
				font-family: Source Han Sans CN;
				font-weight: 400;
				color: #999999;
				margin-right: 29rpx;
			}

			/deep/.u-icon--right[data-v-6e20bb40] {
				float: right;
			}
		}
	}


	.two_list {
		height: 200rpx !important;
		margin-top: 32rpx !important;
	}

	.three_list {
		height: 486rpx !important;
		margin-top: 32rpx !important;
	}
</style>
