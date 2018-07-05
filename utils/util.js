/**
 * get请求
 */
function get(url, callBack) {
    wx.request({
        url: url,
        method: 'GET',
        header: {
            "Content-Type": "json"
        },
        success: function(res) {
            callBack(res.data);
        },
        fail: function(error) {
            console.log(error);
        }
    })
}

/**
 * 评分
 */
function convertToStarsArray(stars) {
    var num = stars.toString().substring(0,1);
    var array = [];
    for (var i = 1; i <= 5; i++) {
        array.push(i <= num ? 1 : 0);
    }

    return array;
}

/**
 * 格式化影人
 */
function convertToCastString(casts) {
    var castsjoin = "";
    for (var idx in casts) {
        castsjoin = castsjoin + casts[idx].name + " / ";
    }
    return castsjoin.substring(0, castsjoin.length - 2);
}


/**
 * 格式化演员
 */
function convertToCastInfos(casts) {
    var castsArray = []
    for (var idx in casts) {
        var cast = {
            img: casts[idx].avatars ? casts[idx].avatars.large : "",
            name: casts[idx].name
        }
        castsArray.push(cast);
    }
    return castsArray;
}

module.exports = {
    convertToStarsArray: convertToStarsArray,
    get: get,
    convertToCastString: convertToCastString,
    convertToCastInfos: convertToCastInfos
}