<template>
	<view class="waterfall-layout" :style="{ margin: columnGap + 'px' }">
		<view class="water-flow-column" :style="{ 'margin-right': columnGap + 'px' }" v-for="(col, c) in colunmList" :key="c">
			<view class="item" :id="col.id" style="width: 100%;">
				<view
					v-for="(item, index) in col.list"
					:key="index"
					class="item_content"
					:style="{ 'margin-bottom': columnGap + 'px' }"
					 @click="choose(item)"
					 style="background: #fff;border-radius: 36rpx;"
				>
					<view class="water-flow-image">
						<image mode="widthFix" :lazy-load="true" :src="item.image"  style="width: 100%;min-height: 235rpx;"></image>
						<view class="name">
							圣斗士
						</view>
						<view class="will_start_box">
							 <view class="text" style="font-size: 14rpx;">
							 	即将上线
							 </view>
							 <view class="date" style="font-size: 16rpx;">
							 	24:24:12
							 </view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	name: 'grass-water-flow',
	props: {
		fieldKey: {
			//关键比对key
			type: String,
			default: 'id'
		},
		idPrefix: {
			//前缀
			type: String,
			default: 'water-flow-'
		},
		colunmNumber: {
			//瀑布流列数
			type: Number,
			default: 2
		},
		columnGap: {
			//列间隔
			type: Number,
			default: 30
		},
		flowList: {
			// 瀑布流数据
			type: Array,
			// required: true,
			default: function() {
				return [];
			}
		},
		value: {
			type: Number,
			default: 0
		},
	},
	data() {
		return {
			colunmList: [], //列
			internalDataList: [], //内部操作数据
			refrenshColunmDataList: [] //记录加载的数据
		};
	},
	watch: {
		colunmNumber: function(v) {
			this.internalDataList = Object.assign([], this.refrenshColunmDataList);
			// this.calculateColumn(v, false);
		},
		flowList: function(v) {
			// console.log(v,"++++++++++")
			this.internalDataList = Object.assign(this.internalDataList, v);
			if (this.internalDataList.length > 0) {
				this.getPushContainer();
			}
		},
		colunmList: {
			
			handler() {
				this.$nextTick(function() {
					this.getPushContainer();
				});
			},
			deep: true
		}
	},
	created() {
		this.internalDataList = Object.assign([], this.flowList);
		this.calculateColumn(this.colunmNumber, true);
	},
	mounted() {
		if (this.internalDataList.length > 0) {
			this.colunmList[0].list.push(this.internalDataList[0]);
			let shiftObj = this.internalDataList.shift();
			this.pushLoadData(shiftObj);
		}
	},
	methods: {
		// 选中点击
		choose(item) {
			console.log(item)
		},
		/**
		 * 计算列
		 * @param {Object} size       列数
		 * @param {Object} isCreate   是否初始化创建(created生命周期)
		 */
		calculateColumn: function(size, isCreate) {
			this.colunmList = [];
			for (let i = 1; i <= size; i++) {
				let obj = {};
				// console.log(this.idPrefix + i)
				obj.id = this.idPrefix + i;
				obj.list = [];
				this.colunmList.push(obj);
			}
			if (!isCreate) {
				if (this.internalDataList.length > 0) {
					this.colunmList[0].list.push(this.internalDataList[0]);
					let shiftObj = this.internalDataList.shift();
					this.pushLoadData(shiftObj);
				}
			}
		},
		/**
		 * 获取节点信息
		 */
		getPushContainer() {
			let sortList = [];
			const query = uni.createSelectorQuery().in(this);
			query
				.selectAll('.item')
				.boundingClientRect()
				.exec(res => {
					if (res) {
						sortList = res[0];
						sortList.sort(function(a, b) {
							return a.height - b.height;
						});
						this.pushShiftData(sortList[0]);
					}
				});
		},
		/**
		 * 处理数据
		 * @param {Object} pushObj
		 */
		pushShiftData(pushObj) {
			if (this.internalDataList.length > 0) {
				for (let i = 0; i < this.colunmList.length; i++) {
					
					if (this.colunmList[i].id == pushObj.id) {
						this.colunmList[i].list.push(this.internalDataList[0]);
						let shiftObj = this.internalDataList.shift();
						this.pushLoadData(shiftObj);
					}
				}
			}
		},
		/**
		 * 记录加载的数据
		 * @param {Object} obj
		 */
		pushLoadData(obj) {
			if (this.refrenshColunmDataList.length > 0) {
				let result = this.refrenshColunmDataList.some(item => {
					if (item[this.fieldKey] == obj[this.fieldKey]) {
						return true;
					}
				});
				if (!result) {
					this.refrenshColunmDataList.push(obj);
				}
			} else {
				this.refrenshColunmDataList.push(obj);
			}
		},
		/**
		 * 外部刷新数据时，调用此方法，清理掉原有加载数据
		 */
		externalRefrensh() {
			this.refrenshColunmDataList = [];
			for (let i = 0; i < this.colunmList.length; i++) {
				this.colunmList[i].list = [];
			}
		}
	}
};
</script>

<style lang="scss" scoped>
	image{
		border-radius: 36rpx;
		overflow: hidden;
	}
	.water-flow-image{
		font-family: syblock;
		position: relative;
		
		.name{
			position: absolute;
			color: #fff;
			bottom:0;
			// left: 50%;
			// transform: translateX(-50%);
			font-size: 28rpx;
			width: 100%;
			height: 71rpx;
			line-height: 71rpx;
			text-align: center;
background: linear-gradient(360deg, rgba(0, 0, 0, 0.69) 0%, rgba(84, 84, 84, 0) 100%);
border-radius: 0 0 36rpx 36rpx;
		}
		.will_start_box{
			position: absolute;
			top: 20rpx;
			right: 20rpx;
			width: 100rpx;
			height: 100rpx;
			// line-height: 100rpx
			text-align: center;
			background: #000000;
			border-radius: 50%;
			opacity: 0.4;
			font-weight: 400;
			color: #fff;
			.text{
				font-size: 16rpx;
				margin: 15rpx 0 10rpx;
			}
			.date{
				font-size: 18rpx;
			}
		}
	}
.waterfall-layout {
	display: flex;
	flex-direction: row;
	height: auto;
	.water-flow-column {
		display: flex;
		flex-flow: column wrap;
		width: 100%;
		.water-flow-tietle {
			width: 100%;
			margin: 12rpx auto 0;
			// white-space: nowrap;
			// overflow: hidden;
			// text-overflow: ellipsis;
			font-size: 28rpx;
			line-height: 40rpx;
			// font-weight: 700;
		}
		
		.water-flow-bot {
			width: 90%;
			margin: 0 auto;
			height: 80rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding-bottom: 8rpx;
		}
		
		.water-flow-jf {
			color: #666;
			font-size: 24rpx;
			margin: 8rpx auto 0;
			height: 80rpx;
			line-height: 40rpx;
			overflow: hidden;
			display: -webkit-box;
			-webkit-box-orient: vertical;
			-webkit-line-clamp: 2;
		}
		
		.water-flow-height{
			height: 34rpx;
		}
		
		.exchange-time {
			font-size: 24rpx;
			color: #666666;
			width: 90%;
			margin: 0 auto;
		}
	}
	.water-flow-column:last-child {
		margin-right: 0px !important;
	}
}

</style>