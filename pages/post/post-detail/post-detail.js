var postsData = require('../../../data/post-data.js')

Page({
    data: {
        postData: {}
    },
    onLoad: function(option) {
        var postId = option.id;
        this.data.postId = postId;
        for (var i = 0; i < postsData.postList.length; i++) {
            if (postsData.postList[i].postId == postId) {
                var postData = postsData.postList[i];
            }
        }
        this.setData({
            postData: postData
        })

        // 根据storage中存储的内容判断收藏图标显示状态
        // var postsCollected = {
        //     1: true,
        //     2: false
        //     ...
        // }
        var postsCollected = wx.getStorageSync('post_collected');
        if (postsCollected) {
            var postCollected = postsCollected[postId];
            if (postCollected) {
                this.setData({
                    collected: postCollected
                })
            }
        } else {
            var postsCollected = {};
            postsCollected[postId] = false;
            wx.setStorageSync('post_collected', postsCollected);
        }
    },

    // 切换收藏状态
    colletionTap: function(event) {
        this.getPostsCollectedAsy();
    },

    // 异步获取storage
    getPostsCollectedAsy: function () {
        var that = this;
        wx.getStorage({
            key: "post_collected",
            success: function (res) {
                var postsCollected = res.data;
                var postCollected = postsCollected[that.data.postId];
                // 收藏变成未收藏，未收藏变成收藏
                postCollected = !postCollected;
                postsCollected[that.data.postId] = postCollected;
                that.showToast(postsCollected, postCollected);
            }
        })
    },

    // 同步获取storage
    getPostsCollectedSyc: function() {
        var postsCollected = wx.getStorageSync('post_collected');
        var postCollected = postsCollected[this.data.postId];
        // 更新收藏状态值
        postCollected = !postCollected;
        postsCollected[this.data.postId] = postCollected;
        this.showToast(postsCollected, postCollected);
    },

    showToast: function(postsCollected, postCollected) {
        // 更新文章是否缓存值
        wx.setStorageSync('post_collected', postsCollected);
        // 更新数据绑定变量，从而实现切换图片
        this.setData({
            collected: postCollected
        })

        wx.showToast({
            title: postCollected ? '收藏成功' : '取消成功',
            duration: 1000,
            icon: "success"
        })
    },

    showModal: function(postsCollected, postCollected) {
        var that = this;
        wx.showModal({
            title: '收藏',
            content: postCollected ? '收藏该文章？' : '取消收藏该文章？',
            showCancel: true, 
            cancelText: '取消',
            cancelColor: '#333',
            confirmText: '确定',
            confirmColor: '#405f80',
            success: function(res) {
                if (res.confirm) {
                    // 更新文章是否缓存值
                    wx.setStorageSync('post_collected', postsCollected);
                    // 更新数据绑定变量，从而实现切换图片
                    that.setData({
                        collected: postCollected
                    })
                }
            }
        })
    },

    onShareTap: function() {
        var itemList = [
            '分享给微信好友',
            '分享到朋友圈',
            '分享到QQ',
            '分享到微博'
        ];
        wx.showActionSheet({
            itemList: itemList,
            itemColor: '#405f80',
            success: function(res) {
                // res.cancle 用户是否点击了取消按钮
                // res.tapIndex 数组元素的序号，从0开始
                wx.showModal({
                    title: '用户' + itemList[res.tapIndex],
                    content: '用户是否取消？' + res.cancel + ' 现在无法实现分享功能。',
                })
            }
        })
    }
})