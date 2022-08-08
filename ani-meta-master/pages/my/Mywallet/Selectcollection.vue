<template>
	<view class="">
		<Head :title="$t('全部') + 'NFT'">
			<u-button :text="$t('完成')" :disabled='btndisabled' @click='complete'
				style='width: 112rpx;height: 60rpx;background: #0F172C;border-radius: 12rpx;color: #FFFFFF;'></u-button>
		</Head>

		<view class="flexW flexJB mode1_box relative pad40">
			<view class="libox br40  " v-for="(item,index) in list" :key="item.id" @click="">
				<view class="imag_box relative">
					<image :src="$my.imgurl+item.attachment_text">
						<view class="date_box absolute fontS18 fontc08 textAc" v-if="isShowTime && item.surplus_num">
							{{"x" + item.surplus_num}}
						</view>
				</view>
				<view class="bottom_box" @click="isCheckedFn(item.id)">
					<view class="minititle fontS18" v-if="isshow">
						{{item.collection_name?item.collection_name:item.collection.name}}
					</view>
					<view class="title fontS26 font33 fw6 flex ">
						<text>{{item.nft_name?item.nft_name:item.name}}</text>
						<view class="CA_box" v-if="item.check">
							<u-icon color='#fff' name="checkbox-mark"></u-icon>
						</view>
						<view class="C_box" v-else>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="Selectall">
			<u-checkbox-group v-model="allvue" placement="column" shape='circle' @change='change'>
				<u-checkbox :customStyle="{marginBottom: '8px'}" label="全选" name="all_in">
				</u-checkbox>
			</u-checkbox-group>

		</view>


		<u-popup mode="center" :closeable='true' :round="40" :show="show" @close="close" :overlayStyle="{width:'100%'}">
			<view class="dloo_box">
				<view class="">
					{{$t('选择数量')}}
				</view>
				<view class="number-box">
					<u-number-box v-model="NFTquantity" integer :min="1" :max="maxNFTquantity"></u-number-box>

				</view>

				<u-button @click='Determine' style='margin: 0 auto;width:calc( 100% - 80rpx);height: 84rpx;
					background: #0F172C;opacity: 1;border-radius: 20rpx;
					color: #FFFFFF;font-size: 32rpx;position: absolute;bottom: 40rpx;' :text="$t('确认')"></u-button>


			</view>
		</u-popup>

	</view>



</template>

<script>
	export default {
		data() {
			return {
				completeArr: [],
				btndisabled: true,
				NFTid: '',
				NFTquantity: 1,
				maxNFTquantity: 1,
				show: false,
				isChecked: true,
				allvue: [],
				isshow: true,
				list: [],
				isBottom: true,
				isShowTime: true,
				page: 1,
				limit: 10,
				arr: [],
			}
		},
		watch: {},
		onReachBottom() {
			this.getData(this.page, this.limit);
		},
		onLoad(e) {
			if (e.itemlist) {
				let obj = e.itemlist.replace("\"([^\"]*)\"", "$1");
				this.arr = JSON.parse(obj);
				console.log(this.arr);
				this.getData();

			} else {
				this.getData();
			}


		},
		methods: {
			from() {
				console.log(this.arr);
				let arr = this.arr;
				for (let i = 0; i < this.list.length; i++) {
					for (let a = 0; a < arr.length; a++) {
						if (this.list[i].id == arr[a].id) {
							this.list[i] = arr[a];
						}
					}
				}
				
				var num = 0;
				this.list.forEach(item => {
					if (item.check) {
						num = num + 1
					}
				})
				
				if (num == this.list.length) {
					this.allvue = ['all_in']
				} else {
					this.allvue = [];
				}
				
				// this.change(this.list)
				console.log(this.list);
			},

			// 提交按钮
			complete() {
				this.completeArr = [];
				this.list.forEach(item => {
					if (item.check) {
						this.completeArr.push(item)
					}
				})
				console.log(this.completeArr);
				let items = encodeURIComponent(JSON.stringify(this.completeArr));
				uni.navigateTo({
					url: '/pages/my/Mywallet/transfer?itemlist=' + items,
				})

			},

			btndisFn(newValue) {
				var arr = [];
				newValue.forEach(item => {
					if (item.check) {
						arr.push(item)
					}
				})
				if (arr.length) {
					this.btndisabled = false;
				} else {
					this.btndisabled = true;
				}
			},

			Determine() {
				this.close()
				this.isCheckedFn(this.NFTid, this.NFTquantity)
			},
			close() {
				this.show = false;
			},
			change(e) {
				if (e && e.length) {
					this.list.forEach(item => {
						item.check = true;
					})
					this.allvue = ['all_in']
				} else {
					this.list.forEach(item => {
						item.check = false;
					})
					this.allvue = []
				}

				this.btndisFn(this.list)

			},
			isCheckedFn(id, numb) {
				var num = 0;
				this.list.forEach(item => {
					if ((item.id == id && item.surplus_num == 1) || (item.id == id && item.check)) {
						item.check = !item.check;
					} else if (item.id == id && item.surplus_num != 1 && item.check == false && !numb) {
						this.maxNFTquantity = item.surplus_num;
						this.NFTquantity = 1;
						this.show = true;
						this.NFTid = item.id;
					} else if (item.id == id && item.surplus_num != 1 && numb) {
						item.check = !item.check;
						item.NFTquantity = numb;
					}
					if (item.check) {
						num = num + 1
					}
				})

				if (num == this.list.length) {
					this.allvue = ['all_in']
				} else {
					this.allvue = [];
				}
				this.btndisFn(this.list);
			},
			getData(page, limit) {
				if (page) {
					this.page = page;
				} else {
					this.page = 1;
				}
				if (limit) {
					this.limit = limit;
				} else {
					this.limit = 10;
				}
				this.$my.get('/index/user/get_all_nft', {
					page: this.page,
					limit: this.limit
				}).then(res => {
					console.log(res);

					if (res.data.last_page >= this.page) {
						this.page = this.page + 1;
						this.list = [...this.list, ...res.data.data];
						console.log(this.list);
						this.list.forEach(item => {
							if (item.check) {
								item.check = true;
							} else {
								item.check = false;
							}
						})



						if (this.arr && this.arr.length) {
							this.from();
						} else {
							this.change([])
						}

					}

				})
			},
		}
	}
</script>

<style lang="less" scoped>
	.C_box {
		width: 45rpx;
		height: 45rpx;
		border: 1rpx solid #0F172C;
		border-radius: 50%;
		opacity: 1;
		box-sizing: border-box;
	}

	.CA_box {
		width: 45rpx;
		height: 45rpx;
		background: #6094FF;
		border-radius: 50%;
		line-height: 45rpx;
		text-align: center;
		box-sizing: border-box;

		/deep/.u-icon {
			display: inline-block;
			color: #FFFFFF;
		}
	}

	.Selectall {
		width: 100%;
		height: 88rpx;
		background: #FFFFFF;
		position: fixed;
		bottom: 0;

		/deep/.u-checkbox-group {
			width: 100%;
			height: 100%;
		}

		/deep/.u-checkbox {
			min-width: 100rpx;
			position: absolute;
			top: 50%;
			margin-top: calc(-18rpx);
			right: 40rpx;

		}
	}
</style>

<style lang="scss" scoped>
	.libox {
		width: 319rpx;
		margin-top: 44rpx;
		background-color: #fff;
		padding: 20rpx;
		box-sizing: border-box;

		.imag_box {
			width: 271rpx;
			height: 284rpx;
			border-radius: 28rpx;
			overflow: hidden;
			background: #E0E0E0;

			image {
				width: 100%;
				height: 284rpx;
			}

			.date_box {
				padding: 6rpx 15rpx;
				background: #000000;
				opacity: 0.4;
				background: #000000;
				opacity: 0.6;
				border-radius: 15rpx;
				top: 14rpx;
				right: 14rpx;
			}
		}

		.bottom_box {
			margin-top: 24rpx;

			.minititle {
				color: #999999;
				margin-bottom: 12rpx;
			}

			.title {
				display: flex;
				flex-direction: row;
				align-items: center;
				justify-content: space-between;
				margin-bottom: 10rpx;

				/deep/.uni-checkbox-input {
					width: 45rpx;
					height: 45rpx;
					border: 1rpx solid #0F172C;
					border-radius: 50%;
					box-sizing: border-box;
				}

				/deep/ .uni-checkbox-input-checked {
					color: #fff !important;
					background: #6094FF;
					border: 1rpx solid #6094FF;
					border: none;
				}
			}

			.b {
				.num {}
			}

		}


	}

	.dloo_box {
		width: 600rpx !important;
		height: 400rpx !important;
		background: #FFFFFF;
		opacity: 1;
		border-radius: 40rpx !important;
		padding: 30rpx 40rpx !important;
		box-sizing: border-box;
		position: relative;

		.number-box {
			position: absolute;
			top: 50%;
			left: 50%;
			margin-left: -110rpx;
			margin-top: -30rpx;
		}
	}
</style>
