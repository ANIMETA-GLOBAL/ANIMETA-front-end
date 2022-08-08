<template>
	<view class="">
		<Head :title="$t('上传其他藏品')"/>
		<view class="content relative">
			<view class="fontS32 fw7 title">
				{{$t('区块链')}}
			</view>
			<view class="box">
				<view class="flex flexic" @click="show=true">
					<image src='/static/img/aa.jpg' mode="" class='brYuan'></image>
					<view class="picker font33 fontS28" >
						{{active.name}}
						<!-- <text v-for="item in BlockChain">
							 {{active.includes(item.id)?item.name+'':''}}
						 </text> -->
					</view>
					<u-icon :name="show?'arrow-up':'arrow-down'" color="#333333" size='18'></u-icon>
				</view>
				 <u-overlay :show="show"   @click="show = false">
					 <view class="warp" @tap.stop>
						 <view class="fontS36 textAc"> 
						 	{{$t('区块链')}}
						 </view> 
						<view class="flexJBC flexW"> 
							<view class="lis flex flexic fontS32 " v-for="(item,index) in BlockChain" :key="index" :class="active.id==item.id?'active':''" @click="activeClick(item)">
								<image :src="$my.imgurl+item.icon" mode="" class="brYuan" ></image><text>{{item.name}}</text>
							</view>
						</view>
					</view>
				 </u-overlay>
			</view>
			<view class="fontS32 fw7 title" style="margin-top: 63rpx;">
				{{$t('地址')}}
			</view>
				 <u--textarea
				    :placeholder="$t('请输入地址')"
				    border="none"
				    v-model="value"
				    @change="change"
					:autoHeight='true'
					maxlength='-1'
				  ></u--textarea>
				  <text class="font99 fontS18">{{$t('您的ERC721或ERC1155合同在mainnet网络上的地址是什么？')}}</text>
				  <view class="fixed btn">
				  	  <view class="btn00">
				  	    	{{$t('确认')}} 
				  	  </view>
				  </view>
		</view>
	</view>
</template>
<script>
	
  export default {
		data() {
			return {
				value:'',
				columns: [[{label:'中国'}]],
				BlockChain:[],
				index:0,
				show:false,
				active:[1],
			}
		},
		onLoad() {
			this.$my.get('/index/com/get_chain_type').then(res=>{
				if(res.code==200){
					 this.BlockChain=res.data;
					 this.active=this.BlockChain[0];
				} 
			})
		},
		methods: {
			activeClick(item){
				this.active=item;
				this.show=false;
			},
			bindPickerChange() {
			},
			confirm(e){
				console.log(e)
			}
		},
	}
</script>

<style lang='scss' scoped>
	.warp{
		width: 100%;
		/* height: 466rpx; */
		position: fixed;
		bottom: 0;
		padding: 40rpx 40rpx 70rpx;
		box-sizing: border-box;
		background: #FFFFFF;
		border-radius: 40rpx 40rpx 0px 0px;
		.lis{
			
			justify-content: center;
			width: 319rpx;
			height: 72rpx;
			background: #FFFFFF;
			border: 2rpx solid #0F172C;
			border-radius: 20rpx;
			line-height: 72rpx;
			text-align: center;
			margin-top: 32rpx;
			image{
				width: 48rpx;
				height: 48rpx;
				background-color: #fff;
				border: 1rpx solid #707070;
			}
		}
		.active{
			background-color: #0F172C;
			color: #fff;
		}
	}
	.btn{
		width: 100%;
		left: 0;
		padding:0 40rpx;
		box-sizing: border-box;
		bottom: 90rpx;
		.btn00{
			width: 100%;
			height: 115rpx;
			line-height: 115rpx;
			font-size: 32rpx;
			
		}
	}
	
	/deep/.u-textarea{
		border-radius: 32rpx;
		padding: 30rpx 38rpx;box-sizing: border-box;
		margin-bottom: 26rpx;
	}
	
	.picker{
		flex:1;
		/* width: 100rpx; */
	}
	.content{
		padding:72rpx 40rpx 0;
		box-sizing: border-box;
		.title{
			margin-bottom:35rpx;
		}
		.box{
			image{
				width: 48rpx;
				height: 48rpx;
				margin-right: 20rpx;
			}
			width: 100%;
			height: 106rpx;
			line-height:106rpx;
			padding:0 38rpx;
			box-sizing: border-box;
 			border-radius: 32rpx;
			background:#fff;
			.picker{
				width: 500px;
			}
		}
	}
</style>