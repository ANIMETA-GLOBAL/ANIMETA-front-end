<template>
		<view class="bgc fontS40" :style="{background:bgc,color:color}" >
			<view class="status_bar"  :style="{'height':tabh+'rpx'}"></view>
			<view class="head flexJBC" v-if="title || tab" > 
				<view class="leftButton "> 
					<u-icon name="arrow-left"  size="28"  @click="back" v-if="tab" :color="color" style='margin-left: -20rpx;'></u-icon> 
					<view class="title fontS40 fw7" v-if="title" :style="{color:color}">
						{{title}}
					</view>
				</view>
				<view class="flex flexic">
					<slot></slot>
				</view>
			</view>
		</view>
</template>

<script>
export default {
	data() {
		return {
			index: 1,
			tabh:'',
			keyword:"",
			
		}
	},
	created() {
		uni.getSystemInfo({
			success:(res)=>{
				let tabh1= res.statusBarHeight
				let deviceWidth=uni.getSystemInfoSync().windowWidth;
				this.tabh = (750 / deviceWidth) * Number(tabh1)  + 2
			}
		}) 
		
	},
  props:{
	    color:{
		  default:'#0F172C'
	    },
	    bgc:{ //背景颜色
		  default:'#F4F5F7',
	    },
		title:{ //标题
			type:String
		},
		tab:{  //是否显示返回按钮
			type:Boolean,
			default:true
		},
	},
	methods:{
		back(){
			uni.navigateBack()
			this.$store.commit('changeAddNft',false)
		},
	}
}
</script>

<style lang="scss" scoped>
	.myimg{
		border: 2rpx dotted #676767;
	}
	.bgc{
		background-color: #F4F5F7;
		position: sticky;top:0;left: 0;z-index: 99;
	}
	.head {   
		padding:0rpx 40rpx !important;
		height: 80rpx; 
		line-height: 80rpx;
		box-sizing: border-box;
		position: sticky;
		color: #0F172C;
	}
	.leftButton{
		display: flex;
		align-items: center;
		.title{
			margin-left: 14rpx;
		}
	}
	.rightboxsearch{
		width: 494rpx;
		height: 68rpx;
		background: #676767;
		box-shadow: 0px 6rpx 20rpx 1rpx rgba(0, 0, 0, 0.2);
		border-radius: 49rpx;
		opacity: 1;
	}
</style>
