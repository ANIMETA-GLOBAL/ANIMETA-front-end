<template>
	<view class="boxStyle">
		<u-action-sheet :title="title || $t('筛选')" :show="show" :closeOnClickOverlay="true" :closeOnClickAction="true"
			:round="20" :safeAreaInsetBottom='true' @close='close'>
			<!-- <slot></slot> -->
			<u-collapse @change="change" @close="close2" @open="open" :border='false' align='left'>
				<!-- 折叠面板 -->
				<view v-for="(item,index) in list" :key="item.field" style="padding: 0 20rpx;"> 
					<u-collapse-item :title="item.name">
						<u-checkbox-group v-model="checked" placement="column" v-if="item.field == 'chain_type'"
							iconPlacement="right" @change="checkboxChange">
							<u-checkbox :label="item5.name" :name="item5.name" v-for="item5 in item.list" :key="item5.id"  style='margin-bottom: 40rpx;'></u-checkbox>
						</u-checkbox-group>
						<view class="radiobutton_box" v-else>
							<!-- @click="btncheckFn(item.code,iitem,item.complex ? true : false)" -->
							<!-- :class="[item.check.indexOf(iitem.check) > -1 ? 'radiobutton radiobuttonC' : 'radiobutton']" -->
							<view @click="btncheckFn(index,iitem.id)"
								:class="[item.check.includes(iitem.id) ? 'radiobutton radiobuttonC' : 'radiobutton']"
								v-for="(iitem,iindex) in item.list" :key="iitem.id">
								{{iitem.name}}  
							</view> 
						</view>
					</u-collapse-item>
					<u-line color="#D4D4D4"></u-line>
				</view>
			</u-collapse>
			<view class="b_btn">
				<u-button :text="buttonName || $t('确定')" @click='Submit'
					style='background: #0F172C;color: #FFFFFF;font-size: 32rpx;border-radius: 20rpx;height: 115rpx;'>
				</u-button>
			</view>
		</u-action-sheet>
	</view>
</template>

<script>
	export default {
		mounted() {
			this.$my.get('/index/com/filter_criteria').then(res=>{
				 if(res.code==200){
					let {category, chain_type,sales,sort,type} = res.data
					this.list=res.data
					this.list.forEach(item=>{
						this.$set(item,"check" , [])
					})
				 }
			})
		},
		data() {
			return {
				checked: [],
				list: [],
			}
		},
		props: ['show', 'title', 'buttonName'],
		//show  是否显示组件  //title 底部弹窗标题  //buttonName 按钮文字 //Submit 提交事件 //closeFn 关闭事件
		methods: {
			checkboxChange(e){
				this.checked=e
			},
			Submit() { //提交按钮
				let data={}
				this.list.forEach(item=>{
					if(item.field=='chain_type'){
						data[item.field] = this.checked.join(',')
					}else{
						data[item.field] = item.check.join(',')
					}
				})
				// 将筛选数据提价给父组件
				this.$emit('SubmitLimit', JSON.stringify(data));
				this.$emit('closeFn', false);
			},
			close() { //关闭事件
				// this.show = false;
				this.$emit('closeFn', false)
			},
			open(e) {
				// console.log('open', e)
			},
			close2(e) {
				// console.log('close', e)
			},
			change(e) {
				// console.log('change', e)
			},
			btncheckFn(index,iindex_id){
				if(this.list[index].field=='sort'){
					this.list[index].check=[iindex_id]
				}else{
					if(this.list[index].check.includes(iindex_id)){
						return
					}else{ 
						this.list[index].check.push(iindex_id)
					}
				}
			},
		}
	}
</script>

<style scoped>
	/deep/.u-action-sheet__header__icon-wrap {
		display: none !important;
	}
	/deep/.u-checkbox-label--right[data-v-54acf820] {
		margin-bottom: 38rpx;
	}

	.b_btn {
		width: 100%;
		height: 175rpx;
		background: #FFFFFF;
		opacity: 1;
		border-radius: 0px;
		padding: 30rpx 40rpx;
		box-sizing: border-box;
	}

	.u-line[data-v-60c80200] {
		width: 670rpx !important;
		margin: 0 auto !important;
		opacity: 0.6 !important;
	}

	.radiobutton_box {
		display: flex;
		flex-wrap: wrap;
	}

	.radiobutton {
		min-width: 180rpx;
		height: 72rpx;
		background: #FFFFFF;
		border: 2rpx solid #0F172C;
		opacity: 1;
		border-radius: 20rpx;
		font-size: 28rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #333333;
		opacity: 1;
		line-height: 72rpx;
		text-align: center;
		margin-right: 32rpx;
		margin-bottom: 20rpx;
		padding: 0 28rpx;
		box-sizing: border-box;
	}

	.radiobuttonC {
		background: #0F172C;
		color: #ffffff;
	}
</style>
