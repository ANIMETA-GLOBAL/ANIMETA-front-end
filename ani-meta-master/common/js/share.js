export default {
    data() {
        return {
           sharew: {
                title: '和我一起来放松吧',
                path: '', 
                imageUrl: '',  
            }
        }
    }, 
    // 1.发送给朋友
    onShareAppMessage(res) {
		let pages = getCurrentPages()
		let view=pages[pages.length-1]
		 let curParam =view.options
		 let param = ''
		 let j = 0;
		 if(curParam!="[object Object]"){
			 for (let key in curParam) {
		 	if (j === 0) {
		 		param += '?' + key + '=' + curParam[key]
		 	} else {
		 		param += '&' + key + '=' + curParam[key]
		 	}
		 	j++;
		   }
		 }
		 
		 this.sharew.path = view.route+ param
		console.log(this.sharew.path)  
		return  this.sharew
    },
    //2.分享到朋友圈
    onShareTimeline(res) {
     let pages = getCurrentPages()
     let view=pages[pages.length-1]
      let curParam =view.options
      let param = ''
      let j = 0;
      if(curParam!="[object Object]"){
     	 for (let key in curParam) {
      	if (j === 0) {
      		param += '?' + key + '=' + curParam[key]
      	} else {
      		param += '&' + key + '=' + curParam[key]
      	}
      	  j++;
        }
      }
      this.sharew.path = view.route+ param
      console.log(this.sharew.path)  
      return  this.sharew
    },
}