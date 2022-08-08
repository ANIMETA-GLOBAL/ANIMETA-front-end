<template>
	<view>
		<Head :title="type==1?$t('设置支付密码'):$t('修改支付密码')" />
		<view class="content padLR40">
			<u-input v-if="type==2" v-model='oldpassword' :type="isShoweye?'text':'password'" clearable
				:placeholder="$t('请输入旧密码')" placeholderStyle="color:#C2C2C2;font-size:28rpx"
				style='height: 106rpx;border-radius: 32rpx;padding: 0 32rpx;box-sizing: border-box;margin-top: 48rpx; '>
				<u-icon name="lock-open" slot="prefix" size='40rpx' color="#C2C2C2"></u-icon>
				<image src="/static/img/eye.png" slot="suffix" v-if="isShoweye"
					style="width: 32rpx;height: 32rpx;" @click="isShoweye=!isShoweye"></image>
				<image src="/static/img/noteye.png"  v-else slot="suffix" style="width: 32rpx;height: 32rpx;"
					@click="isShoweye=!isShoweye"></image>
			</u-input>
			
			
			<view v-else>
				<u-input  v-model='password' :type="isShoweye?'text':'password'" clearable
					:placeholder="$t('请输入支付密码')" placeholderStyle="color:#C2C2C2;font-size:28rpx"
					style='height: 106rpx;border-radius: 32rpx;padding: 0 32rpx;box-sizing: border-box;margin-top: 48rpx; '>
					<u-icon name="lock-open" slot="prefix" size='40rpx' color="#C2C2C2"></u-icon>
					<image src="/static/img/eye.png" slot="suffix" v-if="isShoweye"
						style="width: 32rpx;height: 32rpx;" @click="isShoweye=!isShoweye"></image>
					<image src="/static/img/noteye.png"  v-else slot="suffix" style="width: 32rpx;height: 32rpx;"
						@click="isShoweye=!isShoweye"></image>
				</u-input>
				<u-input @blur='blur' v-model='passwordCopy'  :type="isShoweye1?'text':'password'"
					clearable :placeholder="$t('请再次支付输入密码')" placeholderStyle="color:#C2C2C2;font-size:28rpx"
					style='height: 106rpx;border-radius: 32rpx;padding: 0 32rpx;box-sizing: border-box;margin-top: 48rpx; '>
					<u-icon name="lock-open" slot="prefix" size='40rpx' color="#C2C2C2"></u-icon>
					<image src="/static/img/eye.png" slot="suffix"  v-if="isShoweye1"
						style="width: 32rpx;height: 32rpx;" @click="isShoweye1=!isShoweye1"></image>
					<image src="/static/img/noteye.png"  v-else slot="suffix" style="width: 32rpx;height: 32rpx;"
						@click="isShoweye1=!isShoweye1"></image>
				</u-input>
			</view>
			<u-button :text="$t('确定')" @click="finsh"  class="btn00 btn fontS32" :loading='loading'>
			</u-button> 
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				oldpassword:"", //旧密码
				type:1, //设置支付密码   2修改支付密码 
				loading:false,
				isShoweye:"",
				isShoweye1:"",
				password:"",
				passwordCopy:"",
			}
		},
		methods:{
			blur(){
				if(this.password!=this.passwordCopy){
					this.$my.toast('两次密码不一致')
				}
			},
			finsh(){
				
			}
		},
		onLoad(e) {
			this.type=e.type?e.type:1
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