<template>
	<view class="">
		<Head :title="$t('查看更多拥有者')"/>
		<view class="lis_box">
			 <view class="lis flex flexic" v-for="item in list" :key="item.user_id">
			 	<image :src="item.avatar_url" mode="" class="brYuan wh100"></image>
				 <view class="c flexCl">
					 <view class="name fontS28 fw8">
					 {{item.nickname}}
					 </view>
					 <view class="font66 fontS24 address">
					  <!-- <text class="elipes1">{{item.user.uuid}}</text> -->
					  <text class="elipes1">{{item.user.uuid}}</text>
					  <image @click="$my.copy(item.user.uuid)" src="/static/wallet/addresscopy.png"
					  	alt="">
					 </view>
				 </view>
				 <view class="font66 fontS24">
				 {{item.num}} items
				 </view>
			 </view>  
		</view>
		<!-- <u-loadmore :status="status"   v-if="list.length>5"/> -->
	</view>
</template>

<script>
	export default{
		data(){
			return{
				page:1,
				status:"",
				list:[],
			}
		},
		onLoad(e) {
			if (e.itemlist) {
				let obj = e.itemlist.replace("\"([^\"]*)\"", "$1");
				this.list = JSON.parse(obj);
				console.log(this.list);
				
			} 
		},
		methods:{
			getList(){
				this.$my.get('',{limit:10,page:this.page}).then(res=>{
					if(res.code==200 && res.data ){ 
						if(res.data.length>0){ 
							this.list=this.list.concat(res.data)
						}else{
							this.status=this.$t('没有更多了') 
						}
					}
				})
			}
		},
		// onReachBottom() {
		// 	this.page++;
		// 	this.status = 'loading';
		// 	this.getList();
		// },
	}
</script>

<style lang="scss" scoped>
	.lis_box{
		padding: 0 40rpx;
		box-sizing: border-box;
		.lis{
			padding: 48rpx 0;
			border-bottom: 1rpx solid rgba(51,51,51,0.1216);;
			.c{
				flex: 1;
				margin-left: 32rpx;
				box-sizing: border-box;
				.name{
					margin-bottom: 27rpx;
				}
			}
			.r{
				width: 138rpx;
				text-align: right;
			}
		}
	}
	
	.address {
		
		font-size: 24rpx;
		font-family: Source Han Sans CN;
		font-weight: 500;
		line-height: 48rpx;
		color: #333333;
		display: flex;
		flex-direction: row;
		align-items: center;
		text{
			width: 70%;
			
		}
	
	
		image {
			width: 24rpx;
			height: 24rpx;
			margin-left: 11rpx;
		}
	}
</style>