// pages/movies/more-movie/more-movie.js
var app = getApp();
var util = require('../../../utils/util.js');

Page({

    /**
     * 页面的初始数据
     */
    data: {
        movies: {},
        navigateTitle: '',
        requestUrl: '',
        totalCount: 0,
        isEmpty: true
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        var category = options.category;
        this.data.navigateTitle = category;
        var dataUrl = "";
        switch (category) {
            case "正在热映":
                dataUrl = app.globalData.doubanBase +
                    "/v2/movie/in_theaters";
                break;
            case "即将上映":
                dataUrl = app.globalData.doubanBase +
                    "/v2/movie/coming_soon";
                break;
            case "豆瓣Top250":
                dataUrl = app.globalData.doubanBase + "/v2/movie/top250";
                break;
        }
        this.data.requestUrl = dataUrl;
        util.get(dataUrl, this.processDoubanData);
    },

    /**
     * 处理电影列表数据
     */
    processDoubanData: function(moviesDouban) {
        var movies = [];
        for (var i in moviesDouban.subjects) {
            var subject = moviesDouban.subjects[i];
            var temp = {
                stars: util.convertToStarsArray(subject.rating.stars),
                title: (subject.title.length > 6) ? (subject.title.substring(0, 6) + '...') : subject.title,
                average: subject.rating.average,
                coverageUrl: subject.images.large,
                movieId: subject.id
            }
            movies.push(temp);
        }

        var totalMovies = {};
        if (this.data.isEmpty) {
            totalMovies = movies;
            this.data.isEmpty = false;
        } else {
            totalMovies = this.data.movies.concat(movies);
        }
        this.setData({
            movies: totalMovies
        });
        this.data.totalCount += 20;
        wx.hideNavigationBarLoading();
        wx.stopPullDownRefresh();
    },

    /**
     * movie-grid 上拉加载更多
     */
    onReachBottom: function(event) {
        var nextUrl = this.data.requestUrl +
            "?start=" + this.data.totalCount + "&count=20";
        util.get(nextUrl, this.processDoubanData);
        wx.showNavigationBarLoading();
    },

    /**
     * movie-grid 下拉刷新数据
     */
    onPullDownRefresh: function(event) {
        var refreshUrl = this.data.requestUrl +
            "?star=0&count=20";
        this.data.movies = {};
        this.data.isEmpty = true;
        this.data.totalCount = 0;
        util.get(refreshUrl, this.processDoubanData);
        wx.showNavigationBarLoading();
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {
        wx.setNavigationBarTitle({
            title: this.data.navigateTitle
        })
    },

    /**
     * 跳转到详情页
     */
    onMovieTap: function (event) {
        var movieId = event.currentTarget.dataset.movieid;
        wx.navigateTo({
            url: '../movie-detail/movie-detail?id=' + movieId,
        })
    },

})