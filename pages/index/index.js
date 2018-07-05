//index.js
Page({
    onTap: function() {
        wx.switchTab({
            url: '../post/post'
        })
        // wx.redirectTo({
        //     url: '../post/post'
        // })
    },

    /**
     * 设置分享功能
     */
    onShareAppMessage: function (res) {
        if (res.from === 'button') {
            // 来自页面内转发按钮
            console.log(res.target)
        }
        return {
            title: '豆瓣电影',
            path: '/pages/movies/movies'
        }
    }

})