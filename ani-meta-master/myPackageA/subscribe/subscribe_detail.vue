<template>
	<view class="content" >
		 <Head :title="$t('ANIMETA认购')" bgc='#263355' color='#fff'>
			    <u-icon  name='more-dot-fill' size='44rpx' color='#fff' ></u-icon>
		 </Head> 
		  <view class="detail_box">
			  <!-- 顶部 -->
		  	  <view class="flex top">
		  	  	<u--image :showLoading="true" :src="src" width="220rpx" height="220rpx" radius='36rpx'></u--image>
				<view class="r flexCl">
					<view class="name fontc09 fontS36">
						Animeta Coin
					</view>
					<view class="introduce fontS20 fontc06 elipes3">
						shuomingshuomingshuomingshuomingshuomingshuomingsshuomingshuomingshuomingshuomingshuomingshuomingsshuom
					</view> 
					<view class="b fontS20">
						<text class="fontfff">01</text>
						<text class="fontc05">/</text>
						<text class="fontc05">04</text>
					</view>
				</view>
		  	  </view>
			  <!-- 认购白皮书 -->
			  <view class="whitBook marTB72">
			  	 <view class="namet fontS236 fontC09">
			  	 	{{$t('认购白皮书')}}
			  	 </view>
				 <view class="flexJBC b">
				 	 <view class="l fontS24 flex">
				 	 	<text class="icon"> p</text> 
						<text class="fontc08 ">ANIMETA {{$t('认购白皮书')}}.2022</text>
				 	 </view>
					 <view class="r fontC08 fontS24">
					 	{{$t('立刻查看')}}
					 </view>
				 </view>
			  </view>
			  <!-- 认购进度 -->
			  <view class="progress marTB72">
					<view class="fontS236 fontC09 namet">
						{{$t('认购进度')}}
					</view>
					<view class="fontc08 fontS24">
						{{$t('目标')}}：1,000,000 USDT
					</view>
					<view class="line">
						<u-line-progress  height="30rpx" :showText='false' activeColor='#6094FF' :percentage='30' inactiveColor='#303A6D;'  ></u-line-progress> 
					</view>
					<view class="fontc08 fontS28">{{$t('已达成')}}：{{0}}  '%'</view>
					<view style="margin-top: 16rpx;" class="fontc08 fontS28">{{$t('已认购')}}：{{parseInt(0)}} USDT</view>
			  </view>
				<!--时间说明 -->
			<view class="time_box">
				<view class="fontS236 fontC09 namet">
					 {{$t('时间说明')}}
				</view>
				<view class="line_step">
					<u-steps
						current="-1"  :dot='true'>
						<u-steps-item :title="$t('认购开始')" desc="10:30"></u-steps-item>
						<u-steps-item :title="$t('认购结束')" desc="10:35"></u-steps-item>
						<u-steps-item :title="$t('发放代币')" desc="10:35"></u-steps-item>
						<u-steps-item :title="$t('开放交易')" desc="11:40"></u-steps-item>
					</u-steps>
				</view> 
			 </view>
			 <!-- 数据 -->
			 <view class="echar namet">
			 	<view class="fontS236 fontC09 namet ">
			 		{{$t('数据')}}
			 	</view>
				<Echarts :option="option" id="myChart" style="border-radius: 20rpx; padding-left: 30rpx; box-sizing: border-box; height: 471rpx;width: 100%;background: #30406D;"></Echarts>
			 </view>
		  </view>
		  <!-- 更多-->
		<view class="more">
		  	<view class="fontS236 fontC09 namet">
		  		{{$t('更多')}}
		  	</view>
			<scroll-view scroll-x="true" >
				<view class="lis_box flex">
					<view class="lis fontS24 fontc08"  v-for="(item,index) in 3" :key="index" @click="active=index"  :style="active==index?'color:#6094FF':''">
						项目简介
					</view> 
				</view>
			</scroll-view>
			<view class="fontS20 fontc06" style="margin-bottom: 20rpx;width: 100%;word-break:break-all;">
				1.shuomingshuomingshuomingshuomingshuomingshuomingshuomingshuomingngshuo
				mingshuomingshuomingshuomingngshuomingshuomingshuomingshuomingngshuomings
				huomingshuomingshuoming
			</view>
			<view class="fontS20 fontc06" style="word-break:break-all;">
				2.shuomingshuomingshuomingshuomingshuomingshuomingshuomingshuoming
			</view>
		</view>
		<view class="btn_box">
			 <view class="btn fontS32">
			 	{{$t('立即认购')}}
			 </view> 
		</view>
	</view>
</template>

<script>

import Echarts from '../componentes/echarts.vue';
	export default{
		data(){
			return{
				option:{},
				src:'',
				active:0, //更多
			}
		},
		onLoad() {
			this.logstatrt()
		},
		// 注册组件
		components: {
			 Echarts
		},
		 methods:{
		        logstatrt() {
				// console.log('初次调用');
				this.option = {
					  xAxis: {
					    type: 'category',
					    data: ['5-12', '5-13', '5-14', '5-15', '5-16', '5-17', '5-18']
					  },
					  yAxis: {
					    type: 'value',
						minInterval:2000, //Y轴间隔
						 axisLabel: {
						    formatter:'{value} W'
						 },
						 splitLine: {
						      lineStyle: {
						        // 设置背景横线
						        color: '#515151' 
						      }
						    },
					  },
					   grid: [{
					           left: '20%',//因旋转导致名字太长的类目造成遮蔽，可以配合这两个属性
					      }],
					  series: [
					    {
					      data: [820, 932, 901, 934, 1290, 1330, 3320],
					      type: 'line',
					      smooth: true
					    }
					  ],
					}
				}
		    }
		
	}
</script>

<style lang="scss">
	 page{
	 	 background: #263355 ;
	 	 color: #fff;
	 } 
</style>
<style lang="scss" scoped>
	.page-lay {
			padding-top: 12px;
		}
	
		.echarts-layouts {
			width: calc(100vw - 24px);
			margin-left: 12px;
			border-radius: 5px;
		}
	
		/deep/ .echarts {
			width: calc(100vw - 24px);
			height: 360px;
		}
	.btn_box{
		padding:0  40rpx 58rpx;
		box-sizing: border-box;
		// position: fixed;
		// bottom: 0%;
		// width: 100%;
		margin-top: 142rpx;
		.btn{
			width: 100%;
			height: 115rpx;
			line-height: 115rpx;
			background: #6080FF;
			border-radius: 20rpx;
			text-align: center;
		}
	}
	.more{
		padding: 0 40rpx;
		box-sizing: border-box;
		.lis_box{
		 
			margin-top: 40rpx;
			margin-bottom: 58rpx;
			
			.lis{
				width: 144rpx;
				text-align: center;
				margin-right: 32rpx;
				padding: 12rpx 0rpx;
				border: 1px solid #6094FF;
				border-radius: 30rpx;
			}
		}
	}
	.time_box{
		.line_step{
			margin: 150rpx 0 100rpx;
			
		}
		/deep/.u-steps-item__wrapper{
			 background-color:  #263355 !important;
		}
		/deep/.u-text__value--content , /deep/.u-text__value--main {
			color: #fff !important;
			position: absolute;
			top: -60rpx;
			width: 70%;
			text-align: center;
			left: 50%;
			transform: translateX(-50%);
		}
		/deep/.u-text__value--tips{
			position: absolute;
			bottom: -40rpx;
			left: 50%; 
			transform: translateX(-50%);
			color: rgba(255, 255, 255, .5);
		}
	}
	 .detail_box{
		
		 .namet{margin-bottom: 40rpx;}
		 padding:48rpx 40rpx 0;
		 box-sizing: border-box;
		 .progress{
			 .line{
				 margin: 24rpx 0 40rpx;
				
			 }
		 }
		 .whitBook{
			 .b{
				 .l{ 
					 align-items: center;
					 .icon{
						 width: 48rpx;
						 height: 48rpx;
						 text-align: center;
						 line-height:40rpx;
						 background: #FFFFFF;
						 border-radius: 10rpx;
						 color: #999999;
						 margin-right: 24rpx;
					 }
				 }
				 .r{
					 width: 148rpx;
					 text-align: center;
					 height: 48rpx;
					 line-height: 48rpx;
					 align-items: center;
					 background: #6080FF;
					 border-radius: 12rpx;
				 }
			 }
		 }
		 .top{
			 .r{
				 margin-left: 40rpx;
			 }
			 .b{
				 text-align: right;
			 }
		 }
	 }
</style>