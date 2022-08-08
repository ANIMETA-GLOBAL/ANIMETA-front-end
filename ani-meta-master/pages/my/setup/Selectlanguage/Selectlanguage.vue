<template>
	<view>
		<Head :tab="true" :title="$t('选择语言')" />
	
		<view class="box">
			<view :class="[item.active ? 'list active' : 'list']" v-for="item in list" 
			:key="item.code"
			@click="TICKFn(item.code)"
			>
				<view><image :src="item.imgurl" alt=""></image>
					<text>{{$t(item.name)}}</text>
				</view>
				<image src="../../../../static/img/dagou.png" v-if="item.active" alt="" class='Tick'>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [
					{name: '中文',
						imgurl: require('../../../../static/img/Property 1=Chinese.png'),
						active: false,
						code: 'zh'
					},
					{
						name: '英文',
						imgurl: require('../../../../static/img/Property 1=English.png'),
						active: false,
						code: 'en'
					},
					{
						name: '日文',
						imgurl: require('../../../../static/img/riben.png'),
						active: false,
						code: 'jp'
					}
				]
			}
		},
		onLoad() {
			let locale= this.$store.state.locale
			this.list.forEach(item=>{
				if(item.code==locale){
					item.active=true
				}
			})
		},
		methods:{
			TICKFn(code){
				this.list.forEach(item=>{
					if(item.code == code){
						item.active = true;
						// 切换语言 
						this.$i18n.locale = code;
						this.$store.commit("changeLocale",code)
						uni.setStorageSync("locale",this.$store.state.locale)
						// uni.navigateBack() 
					}else{
						item.active = false 
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

		.list {
			height: 106rpx;
			background: #FFFFFF;
			border-radius: 32rpx;
			margin-bottom: 40rpx;
			padding: 29rpx 40rpx;
			box-sizing: border-box;
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: space-between;

			view {
				display: flex;
				flex-direction: row;
				align-items: center;
			}

			image {
				width: 48rpx;
				height: 48rpx;
			}

			text {
				font-size: 28rpx;
				font-family: Source Han Sans CN;
				font-weight: 400;
				color: #333333;
				opacity: 1;
				margin-left: 24rpx;
			}

			.Tick {
				width: 34rpx;
				height: 23rpx;
				opacity: 1;
				display: inline-block;
				float: right;
			}
		}

		.active {
			border: 1px solid #0F172C;
		}
	}
</style>
