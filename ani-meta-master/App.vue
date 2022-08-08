
<script>
	export default {
		onLaunch: function() {
			uni.getSystemInfo({
				success:(res)=>{
					let deviceWidth=uni.getSystemInfoSync().windowWidth;
					let tabh =(750 / deviceWidth) * Number(res.statusBarHeight)
					let tabhHeight =Number(tabh)  + 82 +'rpx'
					this.$store.commit('changetabhHeight',tabhHeight)  
					this.$store.commit('changetabh',tabh+'rpx')
					let locale = uni.getStorageSync("locale")
					if(locale){
						this.$store.commit('changeLocale',locale)
						this.$i18n.locale = locale ;
					}
				}
			}) 
		},
		onShow: function() {
			console.log('App Show');
			uni.hideTabBar({ animation: false })
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>
<style lang="scss">
	// @font-face {
	// 	font-family: "syblock";
	// 	src: url('@/static/fonts/SourceHanSansCN-Normal.ttf') format('truetype');
	// }
page{
		background-color: #F4F5F7; 
		padding-bottom:200rpx;
		color: #333;
		font-family: Arial, Helvetica, sans-serif;
		image{display: block}
		box-sizing: border-box;
	}
	@import "/uview-ui/index.scss";
	@import "/common/css/my.css";
	/*每个页面公共css */
</style>
