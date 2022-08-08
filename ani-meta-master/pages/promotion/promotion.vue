<template>
	<view >
		<TabBar selectedIndex='2'/>
		<AddNft />
		<!-- 筛选弹窗 -->
		<Bdialog :show='Bdialogshow' :title="$t('筛选')" :buttonName="$t('确定')" @closeFn='closeFn' @SubmitLimit='SubmitLimit' ></Bdialog>
		<view class="content">
			<view class="top_box" :style="{paddingTop:$store.state.tabh }"> 
				<SearchAndLimit  @closeFn='closeFn'   @searchChange='searchChange'/> 
				<view class="classification fontS32 flexJBC fw6">
					 <view class="l " :class="current==1?'active':''" @click="getList(1)">{{$t('竞价拍卖')}}</view>
					 <view class="r" :class="current==2?'active':''" @click="getList(2)"> {{$t('降价拍卖')}}</view>
				</view>
			</view>
			<List :style="{paddingTop:$store.state.tabh }" :isBottom='false' :list="list" routeType='2' v-slot="slotProps" :isShowTime='true' >
				<view class="flexJB listSlot_box" >
					<view class="">
						<view class="fontS18 minititle font99">
							{{$t('当前出价')}}
						</view> 
						<view class="font33 elipes1"> 
							<text class="fontS30 fw6">{{slotProps.data.max_price}}</text><text class="fontS18">{{slotProps.data.coin_type}}</text>
						</view>
					</view>
					<view class="right_btn btn00" v-if="slotProps.data.time_sub">
						{{$t('出价')}}
					</view> 
				</view> 
			</List>
			<noDate v-if='list.length<=0'/>
			 <u-loadmore :status="status" v-if='list.length>4' line/>
		</view>
	</view>
</template>

<script>
	import SearchAndLimit from '../../componentes/searchAndLimit.vue'
	import AddNft from '../addNft/addNft.vue'
	import List from '../../componentes/list.vue' 
	export default{
		data(){
			return{
				status:'',
				list:[],
				Bdialogshow:false,
				Limit:{},//右上角筛选的数据
				inputvalue:'',//搜索关键字
				page:1,
				current:1,
			}
		},
		onReachBottom() {
			this.page++;
			this.status = 'loading';
			this.getList();
		},
		onLoad() {
			this.getList()
		},
		// 下拉刷新
		onPullDownRefresh(){ 
			this.list=[]; 
			this.getList();
			uni.stopPullDownRefresh();
		},
		methods:{
			getDayAndTime(end_time,value,index){
				let date=new Date(end_time);
				 // 获取当前与结束时间戳来计算天数
				 let timestamp = Date.parse(new Date())/1000
				 let endtime = date.getTime()/1000
				 let num = endtime-timestamp;
				 let timer = setInterval(()=>{
					 num--
					 if(num<0){
						 this.$set(this.list[index],"time_sub",false)
					 }else{
						 let second = Math.floor(num);
						 // 天数
						 let day = Math.floor(second / 3600 / 24);
						 // 小时
						 let hr = Math.floor(second / 3600 % 24);
						 // 分钟
						 let min = Math.floor(second / 60 % 60);
						 // 秒
						 let sec = Math.floor(second % 60);
						 let dataAndTime=( day?day + ":":"") + hr + ":" + min + ":" + sec
						 if(this.list && this.list[index]){
							  this.$set(this.list[index],"time_sub",dataAndTime) 
						 }
					 }
					 
				 },1000)
				 if(num<0){
					 return this.time=false;
					 clearInterval(timer)
				 } 
			},
			// 筛选的数据
			SubmitLimit(val){
				this.Limit=JSON.parse(val); //右上角筛选
				this.getList();
			},
			// 搜索
			searchChange(value){
				this.inputvalue=value;
				this.list=[];
				this.getList();
			},
			getList(val){
				// 页面里的分类
				if(val){
					this.current=val;
					this.page=1 ;
					this.list=[];
				}  
				if(val!==2){
					let data={
						limit:10,
						page:this.page,
						keyword:this.inputvalue,
						// category:this.current,
					}
					let data1=Object.assign(data,this.Limit)
					this.$my.get('/index/auction/get_nft_by_auction',data1).then(res=>{
						if(res.code==200){
						  if(res.data.data.length>0){
								this.list=this.list.concat(res.data.data)
								this.list.forEach((item,index)=>{
									this.$set(item,"time_sub",'0:0:0:0')
									let date = new Date(item.end_time);
									// 获取当前与结束时间戳来计算天数
									let timestamp = Date.parse(new Date()) / 1000
									let endtime = date.getTime() / 1000
									let num = endtime - timestamp;
									let timer = setInterval(() => {
										num-- 
										if (num < 0) {
											if (value) {
											item.time_sub=false
											} else {
												timer = false
											}
										} else {
											let second = Math.floor(num);
											// 天数
											let day = Math.floor(second / 3600 / 24);
											// 小时
											let hr = Math.floor(second / 3600 % 24);
											// 分钟
											let min = Math.floor(second / 60 % 60);
											// 秒
											let sec = Math.floor(second % 60);
											let dataAndTime = day +':' + hr + ":" + min + ":" + sec
											item.time_sub=dataAndTime
										}
									}, 1000)
								})
						  }else{
								this.status=this.$t('没有更多了')
							}				
						}
					})
				}
				
			},
			closeFn(val) {
				this.Bdialogshow = val;
			},
		},
		components:{SearchAndLimit,List,AddNft} 
	}
</script>

<style lang='scss' scoped>
	.content{
		padding:118rpx 40rpx 0;
		box-sizing: border-box;
		.listSlot_box{  
			align-items: flex-end;
			.right_btn{
				width: 116rpx;
				height: 48rpx;
				line-height: 48rpx;
				margin-bottom:5rpx;
			}
			.minititle{
				margin-bottom: 12rpx;
			}
		}
		
		.top_box{
			position: fixed;top:0; z-index: 9;background: #F4F5F7;width: 100%;left:50%;transform: translateX(-50%);padding: 28rpx 40rpx 0rpx;box-sizing: border-box;
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