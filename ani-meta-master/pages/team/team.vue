<template>
	<view > 
		<TabBar selectedIndex='1'/>
		<AddNft /> 
		<!-- 筛选弹窗 -->
		<Bdialog :show='Bdialogshow' :title="$t('筛选')" :buttonName="$t('确定')" @closeFn='closeFn' @SubmitLimit='SubmitLimit' ></Bdialog>
		<view class="content"> 
			<view class="top_box"  :style="{paddingTop:$store.state.tabh }">
				<SearchAndLimit  @closeFn='closeFn' :showLimt='current!=3' @searchChange='searchChange'/>
				<view class="classification flexJBC" :style="{padding:(!loca || loca=='zh')?'0 84rpx 0' : '0 20rpx 0'}">
					<view class="fontS30 relative fw6"  v-for="(item,index) in tags" :key='index' :class="index+1==current?'active':''" @click="getList(index+1)">
						{{$t(item)}}
					</view>
				</view>
		   </view>
		   <List :list="list" routeType='1' :isshow='false' :style="{paddingTop:$store.state.tabh }"/>
		   <noDate v-if='list.length<=0'/>
		   <u-loadmore :status="status" v-if='list.length>5' line/> 
		</view>
	</view>
</template>
<script>
	import SearchAndLimit from '../../componentes/searchAndLimit.vue'
	import List from '../../componentes/list.vue'
	import AddNft from '../addNft/addNft.vue'
	export default{
		components:{SearchAndLimit,List,AddNft},
		data(){
			return{
				status:'',
				Limit:{},//右上角筛选的数据
				inputvalue:'',//搜索关键字
				page:1,
				tags:["首发","寄售","盲盒"],
				current:1, //页面当前分类
				Bdialogshow: false,
				list:[], //列表数据
				loca:"",
			}
		},
		onShow() {
			this.list=[];
			this.page=1;
			this.loca=uni.getStorageSync('locale')
			this.getList()
		},
		onReachBottom() {
			this.page++;
			this.status = 'loading';
			this.getList()
		},
		methods:{
			// 筛选的数据
			SubmitLimit(val){
				this.Limit=JSON.parse(val); //右上角筛选
				this.getList()
			},
			// 搜索
			searchChange(value){
				this.inputvalue=value;
				this.list=[];
				this.getList()
			},
			// 交易列表 Limit表示是筛选里面的数据
			getList(val){
				// 页面里的分类
				if(val){
					this.current=val
					this.page=1 
					 this.list=[];
				} 
				let data={
					limit:10,
					page:this.page,
					keyword:this.inputvalue,
					nft_sales_type:this.current,
				}
				if(this.current!=3){
					let data1=Object.assign(data,this.Limit)
					this.$my.post("/index/nft/get_nft_by_market",data1).then(res=>{
					      if(res.code==200){
							  if(res.data.data.length>0){
								    this.list=this.list.concat(res.data.data)
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
		}
	}
</script> 
<style lang="scss" scoped>
	
	.content{
		.top_box{
			position: fixed;top:0rpx; z-index: 9;background: #F4F5F7;width: 100%;left:50%;transform: translateX(-50%);padding: 28rpx 40rpx 0rpx;box-sizing: border-box;
		} 
		padding:118rpx 40rpx 0; 
		.classification{
			margin-top: 48rpx;
			width: 100%;
			padding: 0 84rpx 0;
			box-sizing: border-box;
			border-bottom: 1px solid #D4D4D4;
			view{
				padding: 0 0 30rpx;color: #999999;
			}
			.active:before{
				content: '';
				position: absolute;
				bottom: -4rpx;
				left: 50%;
				transform: translate(-50%);
				width: 100%;
				height: 6rpx;
				background: #0F172C;
				border-radius: 3rpx;
			}
			.active{color: #333333 !important;}
		}
	}
	
</style>