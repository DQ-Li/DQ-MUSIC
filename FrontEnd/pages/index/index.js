// pages/index/index.js
import request from "../utils/request";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bannerList:[], // 轮播图数据
    recommendList:[], // 推荐歌单
    topList:[], // 排行榜数据
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    let _this = this;
    // 获取轮播图数据
    let bannerListData = await request('/banner',{type:2});
    _this.setData({
      bannerList:bannerListData.banners
    })

    // 获取推荐歌单的数据
    let recommendListData = await request('/personalized',{limit:10});
    _this.setData({
      recommendList:recommendListData.result
    })

    // 获取排行榜数据
    /*
    * 需求分析：
    *   1. 需要根据idx的值获取对应的数据
    *   2. idx的取值范围是0-20，我们需要0-4
    *   3. 需要发送5次请求
    *
    * */
    let index = 0;
    let resultArr = [];
    while (index < 5) {
      let topListData = await request('/top/list', {idx:index++});
      // splice(会修改原数组)，slice(不会修改原数组)，都可以对数组进行增删改
      let topListItem = {name: topListData.playlist.name,tracks:topListData.playlist.tracks.slice(0,3)};
      resultArr.push(topListItem);

      // 不需要等待五次请求全部结束才更新，用户体验好，但是渲染次数会多一些
      _this.setData({
        topList:resultArr
      })
    }

    // 更新 topList 的状态值，放在此处更新会导致发送请求的过程中页面长时间白屏，用户体验差
    // _this.setData({
    //   topList:resultArr
    // })
  },

  // 跳转至 recommendSong 页面的回调
  toRecommendSong(){
    wx.navigateTo({
      url:'/pages/recommendSong/recommendSong'
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})