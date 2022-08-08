<template>
	<view>
		<Head :tab="true" :title="$t('修改个人信息')" />
		<view class="box">
			<view class="userinfo">
				<view class="My_collection">
					<text>{{$t('头像')}}</text>
					<view class="My_collection_son">
						<!-- <u-upload :fileList="fileList" @afterRead="afterRead" name="6" :maxCount="1" width="110rpx"
							height="110rpx">
							<img :src="userInfo.avatar" alt="">
						</u-upload> -->
						<image :src="userInfo.avatar_url" alt="" @click="up" v-if="userInfo.avatar_url">
						<image src="/static/img/head.png" mode="" v-else></image>
						<u-icon name="arrow-right"></u-icon>
					</view>
				</view>
				<view class="My_collection">
					<text>{{$t('昵称')}}</text>
					<view class="My_collection_son">
						<u--input border="none" v-model="userInfo.nickname" @change='inpchange'></u--input>
						<!-- <text>{{userInfo.nickname}}</text> -->
						<u-icon name="arrow-right"></u-icon>
					</view>
				</view>
			</view>
			<view class="">
				<u-button :text="$t('保存')" :disabled='disabled' @click='save' :loading='loading'
					style='width: 670rpx;height: 115rpx;background: #0F172C;border-radius: 20rpx;color: #fff;position: fixed;bottom: 30rpx;'>
				</u-button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				token: null,
				action: 'http://animeta.test/index/user/upload_avatar',
				fileList: [],
				userInfo: {
					nickname: '--',
				},
				disabled: true,
				num: 0,
				loading: false,
				imgsrcArr:[]
				// fileList: [],
			};
		},
		onLoad() {
			this.getUser();
			this.token = uni.getStorageSync('token');
		},
		methods: {
		
		up(){
			let _this = this;
			uni.chooseImage({
				count: 1, //默认9
				sizeType: ['compressed'], //可以指定是原图还是压缩图，默认二者都有
				// sourceType: ['camera '], //手机拍照
				success:(res)=> {
					console.log(res);
					const tempFilePaths = res.tempFilePaths;
					// if (res.tempFiles[0].size > 2291456) return uni.showToast({title: "上传图片大小不能超过2MB",icon: 'none'});
					this.imgsrcArr.push(res.tempFilePaths[0])
					uni.uploadFile({
						url: `${this.$my.url}/index/user/upload_avatar`,
						filePath: tempFilePaths[0],
						name: 'file',
						header: {
							'token': uni.getStorageSync('token'),
						},
						formData: {
							"file":tempFilePaths[0],
							use:'company_photo'
						},
						success: (uploadFileRes) => {
							console.log(JSON.parse(uploadFileRes.data),"返回信息");
							let res = JSON.parse(uploadFileRes.data);
							console.log(res.code == 200,res.code,'fsdfsdf')
							if(res.code == 200){ 
								uni.showToast({
									icon:'none',
									title:res.message
								})
								this.getUser();
							}else{
								uni.showToast({
									icon:'none',
									title:res.message
								})
								this.getUser();
								
							}
						}
					});
				}
			});
		},
		
			getUser() {
				this.$my.api('/index/user/get_user_msg', {}, 'get', '用户信息').then(res => {
					this.userInfo = res.data;
					this.num = 0;
				})
			},
			inpchange(val) {
				console.log(this.num);
				if (!this.num) {
					this.num = this.num + 1;
				} else {
					this.disabled = false;

				}
			},
			save() {
				this.loading = true;
				this.$my.api('/index/user/edit_user_msg', {
					nickname: this.userInfo.nickname
				}, 'post', '修改用户信息').then(res => {
					if (res.code == 200) {
						this.$my.toast(this.$t('修改成功') + '!')
						this.getUser();
						this.loading = false;
						this.disabled = true;
					}
				})
			}
		}
	}
</script>

<style lang="less">
	.box {
		padding: 0 40rpx;
		box-sizing: border-box;
		margin-top: 48rpx;

		.userinfo {
			height: 290rpx;
			background: #FFFFFF;
			border-radius: 40rpx;
			padding: 38rpx;
			box-sizing: border-box;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
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
			color: #333333;
			opacity: 1;
		}


		.My_collection_son {
			flex: 1;
			text-align: right;
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: flex-end;

			.u-upload {
				display: inline-block;
				width: 110rpx;
				height: 110rpx;
				border-radius: 50%;
				flex: 0;

				.u-upload {
					width: 100%;
					height: 100%;
				}
			}

			image {
				width: 110rpx;
				height: 110rpx;
				border-radius: 50%;
			}

			view {}

			/deep/.uni-input-input {
				font-size: 24rpx;
				font-family: Source Han Sans CN;
				font-weight: 400;
				line-height: 24px;
				color: #999999;
				text-align: right;
			}

			/deep/.u-icon--right[data-v-6e20bb40] {
				float: right;
				margin-left: 29rpx;
			}
		}
	}
</style>
