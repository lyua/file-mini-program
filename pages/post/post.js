var postsData = require('../../data/post-data.js')

Page({
    // 绑定标签属性需要加引号，绑定text元素不需要加引号
    data: {
        // 小程序总是会读取data对象来做数据绑定，这个动作我们称之为A
        // 而这个动作A的执行，是在onLoad事件执行之后发生的
        posts_key: []
    },

    onLoad: function(options) {
        // 页面初始化 options为页面跳转所带来的参数
        this.setData({
            posts_key: postsData.postList
        });
    },

    onPostTap: function(event) {
        var postId = event.currentTarget.dataset.postid;
        console.log(postId);
        wx.navigateTo({
            url: './post-detail/post-detail?id=' + postId,
        })
    },

    onSwiperTap: function(event) {
        // target 和 currentTarget
        // target 指的是当前点击的组件 currentTarget 指的是事件捕获的组件
        // target 这里指的是image，而currentTarget指的是swiper
        var postId = event.target.dataset.postid;
        wx.navigateTo({
            url: './post-detail/post-detail?id=' + postId,
        })
    }
})