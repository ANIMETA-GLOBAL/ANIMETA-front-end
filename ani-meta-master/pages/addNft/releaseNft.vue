<template>
	<view class="content_box">
		<Head :title="id?'编辑合集':type==1?'创建NFT':'创建合集'" />
		<view class="content relative">
			<!-- 形象标识 -->
			<view class="topimgUp" v-if="type==2">
				<view class="title flex">
					<text>{{$t('形象标识')}}</text>
					<image src="../../static/img/imgbs.png" mode="widthFix" style="width: 14rpx;"></image>
				</view>
				<view class="imgbox relative" @click.stop="upLoadimg(1)">
					<view class="flexC abcenter absolute textAc" v-if="!sepImg.url">
						<image src="/static/img/2552.png" class="image255"></image>
						<text class="fontS24">{{$t('上传图像')}}</text>
					</view>
					<image :src="$my.imgurl+sepImg.url" alt="" style='width: 100%;height:200rpx ;'>
				</view>
			</view>
			<!-- 特色图片 -->
			<view class="lis">
				<view class="title flex flexic">
					<text>{{$t('特色图片')}}</text>
					<!-- <view class="fontS26" style='margin-left:20rpx' v-if="type==1">
						<text :class="{font60:isImg}" @click='isImg=true;upload_cover={};upLoadimg(2)'>图片</text>/<text @click='isImg=false;upload_cover={};upLoadimg(2)' :class="{font60:!isImg}">视频</text>
					</view> -->
				</view>
				<view class="upImg relative " @click.stop="upLoadimg(2)">
					<view class=" flexC abcenter absolute textAc" v-if="!upload_cover.url">
						<image src="/static/img/2552.png" class="image255" style=""></image>
						<text class="fontS28">{{$t(isImg?'上传图像':'上传视频')}}</text>
					</view>
					<view v-else>
						<!-- <video :src="src"  :autoplay='true' v-if='!isImg && upload_cover.url'  object-fit='fill' style="width: 100%;height: 400rpx;border-radius:40rpx ;"></video> -->
						<image :src="$my.imgurl+upload_cover.url" style="width: 100%;height: 400rpx;" class="br20">
						</image>
					</view>
				</view>
				<view class="fontS20 font99" v-if="type==1">
					{{$t('支持的文件类型')}}：JPG、SVG、png
				</view>
			</view>
			<!-- 横幅banner -->
			<view class="lis" v-if="type==2">
				<view class="title">{{$t('横幅banner')}}</view>
				<view class="upImg banner relative " @click="upLoadimg(3)">
					<view class=" flexC abcenter  absolute textAc" v-if="!banberImg.url">
						<image src="/static/img/2552.png" class="image255"></image>
						<text class="fontS28">{{$t('上传图像')}}</text>
					</view>
					<image :src="$my.imgurl+banberImg.url" v-else style="width: 100%;height: 243rpx;" class="br20">
					</image>
				</view>
			</view>
			<!-- 标题 -->
			<view class="lis" v-if="type==1">
				<view class="title">
					{{$t('标题')}}
				</view>
				<u--input placeholder="请输入藏品名" border="surround" v-model="titleValue"></u--input>
			</view>
			<!-- 集合名称 -->
			<view class="lis" v-if="type==2">
				<view class="title flex">
					<text>{{$t('集合名称')}}</text>
					<image src="../../static/img/imgbs.png" mode="widthFix" style="width: 14rpx;"></image>
				</view>
				<u--input :placeholder="$t('请输入集合名称')" border="surround" v-model="titleValue"></u--input>
			</view>
			<!-- 简介 -->
			<view class="lis">
				<view class="title">
					{{$t('简介')}}
				</view>
				<u-textarea style='min-height: 220rpx;' maxlength='200' count v-model="intruValue"
					:placeholder="$t('请输入内容')" autoHeight height='200' confirmType="done"></u-textarea>
				<view class="fontS20 font99">
					{{$t('描述将出现在其图像下方的项目详细信息页面上。')}}
				</view>
			</view>
			<!-- 选择合集 -->
			<view class="lis" v-for="(item,index) in lis" :key="index">
				<view class="title" v-if="(type==1 &&  index!=2) || (type==2 &&  index!=0)">
					{{item.title}}
				</view>
				<view class="box" v-if="(type==1 &&  index!=2) || (type==2 &&  index!=0)">
					<view class="flex flexic" @click="item.show=true">
						<image :src="index==0?$my.imgurl+item.active.logo_url:$my.imgurl+item.active.icon"
							class='brYuan' v-if="index!=3 && (item.active.logo_url || item.active.icon)"></image>
						<view class="picker font33 fontS28">
							<text class="font99" v-if="!item.active">{{$t('请')}} {{item.title}}</text>
							<text v-else>
								{{item.active.name}}
							</text>
						</view>
						<u-icon :name="item.show?'arrow-up':'arrow-down'" color="#333333" size='18'></u-icon>
					</view>
					<u-overlay :show="item.show" @click="item.show = false">
						<view class="warp" @tap.stop>
							<view class="fontS36 textAc ">
								{{item.title}}
							</view>
							<view class="flexJBC flexW">
								<view class="lis flex flexic fontS32 " v-for="(item1) in item.menu" :key="item1.id"
									:class="item.active.id==item1.id?'active':''" @click="activeClick(index,item1)">
									<image :src="index==0?$my.imgurl+item1.logo_url:$my.imgurl+item1.icon" mode=""
										class="brYuan" v-if="index!=2 && (item1.logo_url || item1.icon) "></image><text
										class="els" style="width: 60%;">{{item1.name}}</text>
								</view>
							</view>
						</view>
					</u-overlay>
				</view>
			</view>

			<!-- 创作者收益 -->
			<view class="lis" v-if="type==2">
				<view class="title flex">
					<text>{{$t('创作者收益')}}</text>
					<image src="../../static/img/imgbs.png" mode="widthFix" style="width: 14rpx;"></image>
				</view>
				<u-input style='padding: 0 30rpx;margin-bottom: 28rpx;' :placeholder="$t('请输入内容')" border="none"
					v-model="earnings" type='number'>
					<template slot="suffix">
						<view class="">
							%
						</view>
					</template>
				</u-input>
				<view class="fontS20 font99">
					{{$t('当用户转售您最初创建的项目时收取费用。从最终售价中扣除，并按月支付到您选择的支付地址。请输入10%-30%。')}}
				</view>
			</view>
			<!-- 支付钱包地址 -->
			<view class="lis" v-if="type==2">
				<view class="title flex">
					<text>{{$t('支付钱包地址')}}</text>
					<image src="../../static/img/imgbs.png" mode="widthFix" style="width: 14rpx;"></image>
				</view>
				<u--input :placeholder="$t('请输入地址')" border="none" v-model="address">
				</u--input>

			</view>
			<view class="lis" v-if="type==1">
				<view class="title flex">
					<text>{{$t('铸造数量')}}</text>
					<image src="../../static/img/imgbs.png" mode="widthFix" style="width: 14rpx;"></image>
				</view>
				<u--input type='number' :placeholder="$t('请输入铸造数量')" border="none" v-model="num">
				</u--input>
			</view>
			<!-- 上链费 -->
			<!-- <view class=" fontS32" v-if="type==1">
				<view class="title"></view>
				<view class="flexJBC">
					<text class=" font99">{{$t('上链费')}}：</text>
					<text class="font60">{{webGasPrice}} ETH</text>
				</view>
			</view> -->

			<!-- @click="nftAddAndPay" -->
			<view v-if="!id">
				<u-button   v-if="type==1" @click="nftAddAndPay" class="btn00 paybtn " :loading='loading'>
					{{$t('创建并支付')}}
				</u-button>
				<!-- <view class="btn00 paybtn " v-if="type==1" @click="nftAddAndPay">
					{{$t('创建并支付')}}
				</view> -->
				<view class="btn00 paybtn " v-else @click="nftAddAndPay">
					{{$t('创建')}}
				</view>
			</view>
			<view class="btnn flexJBC fixed" v-else>
				<view class="btn00 fontS32" style="width: 80%;" @click="nftAddAndPay">
					{{$t('修改')}}
				</view>
				<view class="fontS32 font99" v-if="" @click="showdel=true">
					删除
				</view>
			</view>
		</view>
		<u-popup mode="center" :closeable="true" :round="40" :show="showdel" @close="showdel=false"
			:overlayStyle="{ width: '100%' }">
			<view class="dloo_box">
				<view class=""> {{$t('温馨提示')}} </view>

				<view class="content"> {{$t('确认要删除合集吗')}}？ </view>
				<view class="btn_dloo_box">
					<u-button @click="deletColl" style="
		          height: 84rpx;
		          background: #0f172c;
		          opacity: 1;
		          border-radius: 20rpx;
		          color: #ffffff;
		          font-size: 32rpx;
		        " :text="$t('确认')"></u-button>

					<u-button @click="showdel=false" style="
		          height: 84rpx;
		          opacity: 1;
		          border-radius: 20rpx;
		          color: #333;
		          font-size: 32rpx;
		        " :text="$t('取消')"></u-button>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	// import Web3 from 'web3';
	export default {
		data() {
			return {
				loading:false,
				showdel: false,
				src: "",
				isImg: true, // false代表上传视频   true表示上传图片
				ABI: [],
				webGasPrice: '',
				id: "", //如果id有值表示编辑
				num: "1",
				sepImg: {
					url: '',
					id: ''
				}, // 合集形象表示
				upload_cover: {
					url: '',
					id: ''
				}, // 合集特色图片
				banberImg: {
					url: '',
					id: ''
				}, //合集banner
				lis: [
					// 合集
					{
						title: "选择合集",
						show: false,
						active: {},
						menu: []
					},
					// 区块链
					{
						title: "选择区块链",
						show: false,
						active: {},
						menu: []
					},
					// 类别 
					{
						title: "添加类别",
						show: false,
						active: {},
						menu: []
					},
				],
				index: 0,
				type: 1, // 1标识当前页面是创建Nft  2标识是创建合集页面  
				address: '', //地址
				earnings: '', //收益 
				titleValue: "", //标题  
				intruValue: "", //简介 
			}
		},
		onShow() {
			this.$my.get('/index/collection/get_user_collection').then(res => {
				if (res.code == 200) {
					if (res.data.data.length <= 0) {
						this.lis[0].menu = [{
							id: '',
							logo_url: "",
							name: "默认合集"
						}]
						this.lis[0].active = this.lis[0].menu[0]
					} else { 
						this.lis[0].menu = res.data.data
						this.lis[0].active = res.data.data[0]
					}

				}
			});
			this.$my.get('/index/com/get_chain_type').then(res => {
				if (res.code == 200) {
					this.lis[1].menu = res.data
					this.lis[1].active = res.data[0]
				}
			});
			this.$my.get('/index/com/collection_type').then(res => {
				if (res.code == 200) {
					this.lis[2].menu = res.data
					this.lis[2].active = res.data[0]


				}
			});
			// 支付地址
			this.$my.get('/index/user/get_user_msg').then(res => {
				if (res.code == 200) {
					this.address = res.data.wallet_address
				}
			})
			// 编辑
			if (this.id || this.id === 0) {
				// 编辑合集
				if (this.type == 2) {
					this.$my.get('/index/collection/get_details', {
						id: this.id
					}).then(res => {
						if (res.code == 200) {
							let data = res.data;
							this.sepImg.url = data.logo_url;
							this.sepImg.id = data.logo;
							this.banberImg.url = data.banner_url;
							this.banberImg.id = data.banner;
							this.upload_cover.url = data.cover_url;
							this.upload_cover.id = data.cover;
							this.titleValue = data.name;
							this.intruValue = data.details;
							this.earnings = data.royalties;
							this.lis[1].active = {
								id: data.chain_type,
								name: data.chain_type
							};
							this.lis[2].menu.forEach(item => {
								if (item.id == data.type_id) {
									this.lis[2].active = {
										id: data.type_id,
										name: item.name
									}
								}
							});
						}
					})
				}
			};
		},
		onLoad(e) {
			this.id = e.id ? e.id : "";
			this.type = e.type ? e.type : 1;

			// 编辑nft
			if (this.type == 1) {
				// this.$my.get('/index/nft/get_nft_details', {
				// 	id: this.id
				// }).then(res => {
				// 	if (res.code == 200) {
				// 		let data=res.data
				// 		this.upload_cover.att_dir = data.attachment_text
				// 		this.titleValue=data.name
				// 		this.intruValue=data.abstract
				// 		this.lis[0].active={id:data.collection.id,name:data.collection.name}
				// 		this.lis[1].active={id:data.chain_type,name:data.chain_type}
				// 		// 请注意上方已在组件中添加ref-uReadMore
				// 		this.$my.post('')
				// 	}
				// })
			}

			// 编辑ntf



		},
		methods: {
			deletColl() {
				this.$my.post('/index/collection/del', {
					id: this.id
				}).then(res => {
					if (res.code == 200) {
						this.$my.toast(res.message)
						setTimeout(() => {
							this.$my.go('/pages/my/Mycollection/Mycollection')
						}, 1500)
					} else {
						this.$my.toast(res.message)
					}
				})
			},
			async getApprove() {
				// if (window.web3) {
				// 	let web3 = new Web3(window.web3.currentProvider);
				// 	web3.eth.getGasPrice().then(res => {
				// 		console.log(web3.utils.fromWei(res, 'ether'))
				// 		this.webGasPrice = web3.utils.fromWei(res, 'ether');
				// 		// console.log(web3.utils.hexToNumber(String(res)));
				// 	})
				// 	this.ABI = this.$my.ABI
				// 	console.log(this.ABI);
				// 	let ethContract = new web3.eth.Contract(this.ABI,
				// 		"0x1098D78BC5dC14907683840E683f84001Ec4CF2d") //所有代币的abi可以通用（abi,合约地址）
				// 	let fromAddress = await web3.eth.getAccounts()
				// 	ethContract.methods.mintTo(fromAddress[0], '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff',
				// 		'https://ipfs.io/ipfs/QmZLLBtYVtf5SddHW1uLnKsNRDsfS8jvbDRBBpauT9RFj1?filename=data.json', 8
				// 		).send({
				// 		from: fromAddress[0]
				// 	})
				// }
			},
			// // 上传图片
			async upLoadimg(type) {
				// 合集形象表示

				type == 1 ? this.sepImg = await this.$my.choosepic('/index/collection/upload_logo') : ''

				// 合集特色图片
				if (type == 2) {
					// 上传图像
					if (this.isImg) {
						this.upload_cover = await this.$my.choosepic('/index/collection/upload_cover')
						console.log(this.upload_cover)
					} else {
						// 上传视频
						var self = this;
						uni.chooseVideo({
							count: 1,
							sourceType: ['camera', 'album'],
							success: function(res) {
								self.src = res.tempFilePath;
								uni.uploadFile({
									url: self.$my.url + "/index/collection/upload_cover",
									filePath: res.tempFilePath,
									name: 'file',
									header: {
										'token': uni.getStorageSync('token'),
									},
									formData: {
										"file": res.tempFilePath,
										use: 'company_photo'
									},
									success: (uploadFileRes) => {
										let res = JSON.parse(uploadFileRes.data);
										if (res.code == 200) {
											self.$my.toast(res.message)
											self.upload_cover = res.data
										} else {
											self.$my.toast(res.message)
										}
									}
								});
							},
							fail(e) {
								console.log(e)
							}
						});
					}
				}
				// 合集banber
				type == 3 ? this.banberImg = await this.$my.choosepic('/index/collection/upload_banner') : ''
			},
			// 底部按钮
			nftAddAndPay() {
				this.loading=true;
				// 表明当前页面是创建NFt
				if (this.type == 1) {
					let data = {
						collection_id: this.lis[0].active.id, //合集id
						chain_type: this.lis[1].active.id, //链类型
						name: this.titleValue, //名称
						abstract: this.intruValue, //简介
						attachment_id: this.upload_cover.id, //资源id
						num: this.num
					}; 
					this.$my.post('/index/nft/add', data).then(res => {
						this.loading=false;
						if (res.code == 200) {
							this.$my.toast(res.message)
							this.$my.go(`/pages/addNft/creatSucce?id=${res.data.id}&img=${this.upload_cover.url}`)
						} else {
							this.$my.toast(res.message)
						}
					});
				} else if (this.type == 2) {
					console.log(41564)
					let data = {
						name: this.titleValue, //名称
						logo: this.sepImg.id, //形象标识
						cover: this.upload_cover.id, //特色图片
						banner: this.banberImg.id, //banner图
						details: this.intruValue, //简介
						royalties: Number(this.earnings), //收益
						wallet_address: this.address, //地址
						type_id: this.lis[2].active.id, //类别
						chain_type: this.lis[1].active.id, //区块链
					}
					if (this.id || this.id === 0) {
						let data1 = {
							id: this.id
						}
						this.$my.post('/index/collection/edit', Object.assign(data1, data)).then(res => {
							this.loading=false;
							if (res.code == 200) {
								this.$my.toast(res.message)
								setTimeout(() => {
									uni.navigateBack()
								}, 1500)
							} else {
								this.$my.toast(res.message)
							}
						});
					} else {
						this.$my.post('/index/collection/add', data).then(res => {
							this.loading=false;
							if (res.code == 200) {
								this.$my.toast(res.message)
								setTimeout(() => {
									this.$my.go('/pages/my/Mycollection/Mycollection')
								}, 1500)
							} else {
								this.$my.toast(res.message)
							}
						});
					}


				}
			},
			activeClick(index, item) {
				this.lis[index].active = item
			},
		}

	}
</script>

<style lang="scss" scoped>
	.dloo_box {
		.btn_dloo_box {
			display: flex;
			justify-content: space-between;
			position: absolute;
			bottom: 30rpx;
			width: calc(100% - 80rpx);

			/deep/.u-button {
				width: 200rpx;
			}
		}

		width: 600rpx !important;
		height: 400rpx !important;
		background: #ffffff;
		opacity: 1;
		border-radius: 40rpx !important;
		padding: 30rpx 40rpx !important;
		box-sizing: border-box;
		position: relative;

		.content {
			width: 100%;
			position: absolute;
			top: 50%;
			left: 50%;
			margin-top: -10%;
			margin-left: -50%;
			text-align: center;
		}

		.number-box {
			position: absolute;
			top: 50%;
			left: 50%;
			margin-left: -110rpx;
			margin-top: -30rpx;
		}
	}

	.btnn {
		bottom: 0;
		padding: 30rpx 40rpx;
		box-sizing: border-box;
		width: 100%;
		background-color: #fff;
		left: 0;

		.btn00 {
			width: 80%;
			height: 115rpx;
			line-height: 115rpx;
		}
	}

	.banner {
		height: 243rpx !important;
	}

	.topimgUp {
		.imgbox {
			width: 200rpx;
			height: 200rpx;
			background: #FFFFFF;
			border-radius: 50%;
			overflow: hidden;
		}
	}

	.image255 {
		width: 50rpx;
		height: 44rpx;
		margin: 28rpx auto;
	}

	.paybtn {
		margin-top: 78rpx;
		height: 115rpx;
		line-height: 115rpx;
		font-size: 32rpx;
	}

	.warp {
		width: 100%;
		/* height: 466rpx; */
		position: fixed;
		bottom: 0;
		padding: 40rpx 40rpx 70rpx;
		box-sizing: border-box;
		background: #FFFFFF;
		border-radius: 40rpx 40rpx 0px 0px;

		.lis {
			justify-content: center;
			padding: 0 20rpx;
			box-sizing: border-box;
			width: 319rpx;
			height: 72rpx;
			background: #FFFFFF;
			border: 2rpx solid #0F172C;
			border-radius: 20rpx;
			line-height: 72rpx;
			text-align: center;
			margin-top: 32rpx;

			image {
				width: 48rpx;
				height: 48rpx;
				background-color: #fff;
				border: 1rpx solid #707070;
			}
		}

		.active {
			background-color: #0F172C;
			color: #fff;
		}
	}

	.box {
		image {
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

		.picker {
			// width: 500px;
			flex: 1;
		}
	}

	.title {
		margin: 72rpx 0 40rpx;
		color: #0F172C;
	}

	/deep/.u-input,
	/deep/.u-textarea {
		width: 100%;
		background: #FFFFFF;
		border-radius: 32rpx;
		padding-left: 38rpx !important;
		box-sizing: border-box;
	}

	/deep/.u-input {
		height: 106rpx;
	}

	/deep/.u-textarea {
		// min-height: 303rpx;
		margin-bottom: 28rpx;
	}

	.upImg {
		width: 100%;
		border-radius: 40rpx !important;
		background-color: #fff !important;
		margin: 48rpx 0 28rpx;
		height: 400rpx;
	}

	.content {
		padding: 0 40rpx;
		box-sizing: border-box;
	}
</style>
