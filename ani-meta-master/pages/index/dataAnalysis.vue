<template>
	<view class="content">
		<Head :title="$t('数据')"/>
		<view  :style="{paddingTop:$store.state.tabhHeight }">
			<view class="top_box" :style="{paddingTop:$store.state.tabh }">
				<view class="classification fontS32 flexJBC fw6" >
					 <view class="l " :class="current==1?'active':''" @click="getList(1)">{{$t('排名')}}</view>
					 <view class="r" :class="current==2?'active':''" @click="getList(2)"> {{$t('事件')}}</view>
				</view>
				<view>
					<view v-if="current==1"  class="flexJBC fontS28 catory ">
						<view class="li flex flexic textAc"  @click="showColl = true">
							<text >{{activeco.name}}</text>
							<u-icon name="arrow-up-fill" color="#333" size="17rpx"></u-icon>
						</view>
						<view class="li flex textAc" @click="showBl = true">
							<text >{{activeBl.name}}</text>
							<u-icon name="arrow-up-fill" color="#333" size="17rpx"></u-icon>
						</view>
						<view class="li flex textAc" @click="showTime = true">
							<text >{{$t(activeTime.name)}}</text>
							<u-icon name="arrow-up-fill" color="#333" size="17rpx"></u-icon>
						</view>
					</view>
					<view class="flexJBC fontS28 catory " v-else>
						<view class="li flex flexic textAc"  @click="showsell = true">
							<text >{{$t(activesell.name)}}</text>
							<u-icon name="arrow-up-fill" color="#333" size="17rpx"></u-icon>
						</view>
						<view class="li flex textAc" @click="showBl = true">
							<text >{{activeBl.name}}</text>
							<u-icon name="arrow-up-fill" color="#333" size="17rpx"></u-icon>
						</view>
					</view>
				</view>
			</view>
		</view> 
		<view class="lis_box" style="margin-top: 130rpx;">
			<view class="li flexJBC" v-for="(item,index) in 10">
				<view class="left flex flexic">
					<text class="fontS20">{{index}}</text>
					<image src="../../static/img/aa.jpg" mode="" :class="current==1?'brYuan wh100':'br20 wh100'"></image>
					<view class="name_box">
						<view class="font66 fontS24" style="margin-bottom: 10rpx;" v-if="current==2">
							serire
						</view>
						<view class="name fontS28 fw8">
							Serices Name
						</view> 
						<view class="font66 fontS24">
							+more
						</view>
					</view>
				</view>
				<view class="right ">
					<view class="font66 fontS24" style="margin-bottom: 10rpx;" v-if="current==2">
						sale
					</view>
					<view class="T_num">
						<text class="fontS28 fw8">4,218</text>
						<text class="fontS20 font66" style="margin-left: 10rpx;">Wfca</text>
					</view>
					<!-- :style="{color:num.includes('+')?'#3FAA85':'#D56262'}" -->
					<view class="fontS24" v-if="current==1">
						+23,00%
					</view>
					<view class="fontS24 font66" v-else>
						1 minutes ago
					</view>
				</view>
			</view>
			
		</view>
		
		<!-- 类别 -->
		<u-overlay :show="showColl"   @click="showColl = false">
			 <view class="warp" @tap.stop>
				 <view class="fontS36 textAc"> 
					{{$t('类别')}}
				 </view>
				<view class="flexJBC flexW">
					<view class="lis flex flexic fontS32 " v-for="(item,index) in collection" :key="index" :class="activeco.id==item.id?'active':''" @click="activeClick(item,1)">
						<text>{{item.name}}</text>
					</view>
				</view>
			</view>
		</u-overlay>
		<!-- 区块链 -->
		<u-overlay :show="showBl"   @click="showBl = false">
			 <view class="warp" @tap.stop>
				 <view class="fontS36 textAc"> 
					{{$t('区块链')}}
				 </view>
				<view class="flexJBC flexW">
					<view class="lis flex flexic fontS32 " v-for="(item,index) in BlockChain" :key="index" :class="activeBl.id==item.id?'active':''" @click="activeClick(item,2)">
						<image :src="$my.imgurl+item.icon" mode="" class="brYuan" v-if="index!=0"></image><text>{{item.name}}</text>
					</view>
				</view>
			</view>
		</u-overlay>
		<!-- 时间-->
		<u-overlay :show="showTime"   @click="showTime = false">
			 <view class="warp" @tap.stop>
				 <view class="fontS36 textAc"> 
					{{$t('时间')}}
				 </view>
				<view class="flexJBC flexW">
					<view class="lis flex flexic fontS32 " v-for="(item,index) in time" :key="index" :class="activeTime.id==item.id?'active':''" @click="activeClick(item,3)">
					<text>{{$t(item.name)}}</text>
					</view>
				</view>
			</view>
		</u-overlay>
		<!-- 出售-->
		<u-overlay :show="showsell"   @click="showsell = false">
			 <view class="warp" @tap.stop>
				 <view class="fontS36 textAc"> 
					{{$t('事件分类')}}
				 </view>
				<view class="flexJBC flexW">
					<view class="lis flex flexic fontS32 " v-for="(item,index) in sell" :key="index" :class="activesell.id==item.id?'active':''" @click="activeClick(item,4)">
					<text>{{$t(item.name)}}</text>
					</view>
				</view>
			</view>
		</u-overlay>
		
		 <!-- <noDate v-if='list.length<=0'/> -->
		 <u-loadmore :status="status" v-if='list.length>8' line/>
	</view>
	
</template>

<script>
	export default{
		data(){
			return{
				showColl:false,
				showTime:false,
				showBl:false,
				showsell:false,
				BlockChain:[],
				collection:[],
				time:[
					{name:'过去24小时',id:'24,'},
					{name:'过去7天',id:'7,'},
					{name:'过去30天',id:'30,'},
					{name:'整天',id:'1,'}
				],
				sell:[
					{name:"销量",id:"88"},
					{name:"清单",id:"89"},
					{name:"收藏",id:"84"},
					{name:"转移",id:"82"},
				],//s事件分类
				page:1,
				current:2,
				list:[],
				status:"",
				activesell:{name:"销量",id:"88"},//出售
				activeco:{},//分类
				activeBl:{},//区块链
				activeTime:{name:'过去24小时',id:'24,'},//时间
				
			}
		},
		onLoad() {
			this.getList();
			this.$my.get('/index/com/get_chain_type').then(res=>{
				if(res.code==200){
					 this.BlockChain=res.data;
					this.BlockChain.unshift({id:'',name:this.$t('所有区块链')})
					 this.activeBl=this.BlockChain[0];
				} 
			})
			this.$my.get('/index/com/collection_type').then(res=>{
				if(res.code==200){
					this.collection=res.data
					this.collection.unshift({id:'',name:this.$t('所有类别')})
					this.activeco=this.collection[0]
				}
			})
			
		},
		methods:{
			activeClick(item,num){
				if(num==1){
					this.activeco=item;
					this.showColl=false;
				}else if(num==2){
					this.activeBl=item;
					this.showBl=false;
				}else if(num==3){
					this.activeTime=item;
					this.showTime=false;
				}else{
					this.activesell=item;
					this.showsell=false;
				}
				
			},
			getList(val){
				// 页面里的分类
				if(val){
					this.current=val;
					this.page=1 ;
					this.list=[];
				}  
				let data={
					limit:10,
					page:this.page,
					keyword:this.inputvalue,
					category:this.current,
				}
				let data1=Object.assign(data,this.Limit)
				this.$my.get('/index/auction/get_nft_by_auction',data1).then(res=>{
					if(res.code==200){
					  if(res.data.data.length>0){
							this.list=this.list.concat(res.data.data)
							this.list.forEach((item,index)=>{
								 this.getDayAndTime(item.end_time,true,index)
							})
					  }else{
							this.status=this.$t('没有更多了')
						}				
					}
				})
			},
		},
		onReachBottom() {
			this.page++;
			this.status = 'loading';
			this.getList();
		},
	}
</script>

<style lang="scss" scoped>
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
				margin-right: 30rpx;
			}
		}
		.active{
			background-color: #0F172C;
			color: #fff;
		}
	}
	.lis_box{
		padding: 0 40rpx;
		box-sizing: border-box;
		.li{
			margin-bottom: 48rpx;
			.left{
				image{
					margin: 0 32rpx;
				}
				.name{
					margin-bottom: 27rpx;
				}
			}
			.right{
				text-align: right;
				.T_num{
					margin-bottom: 24rpx;
				}
			}
		}
	}
	.top_box{
		position: fixed;
		margin-top: 48rpx; top:0; z-index: 9;background: #F4F5F7;width: 100%;left:50%;transform: translateX(-50%);padding: 28rpx 40rpx 0rpx;box-sizing: border-box;
		.catory{
			color: #666;
			padding: 42rpx 20rpx;
			box-sizing: border-box;
			.li{
				// width:28%;
				text-align: center; 
				margin: 0 auto;
				text{
					margin-right: 6rpx;
				}
			}
		}
		.classification{
			border-bottom: 1px solid #D4D4D4;
			margin-top: 48rpx;
			view{
				width: 50%;
				text-align: center;
				padding-bottom: 32rpx;
				color: #999999;
				position: relative;
			}
			.active{
				color: #0F172C;
				&:before{
					content: '';
					position: absolute;
					bottom: -4rpx;
					width: 100%;
					height: 6rpx;
					background: #0F172C;
					left: 0%;
				}
					
			}
		}
	}
	
</style>