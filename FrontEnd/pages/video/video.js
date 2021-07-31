// pages/video/video.js
import request from "../utils/request";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    videoGroupList:[], // 导航标签数据
    navId:'', // 导航的标识
    videoList:[], // 视频的列表数据
    videoId:'', // 视频id标识
    videoUpdateTime:[], // 记录video播放的时长
    isTriggered:false, // 标识下拉刷新是否被触发
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取导航数据
    this.getVideoGroupListData();

  },

  // 获取导航数据
  async getVideoGroupListData() {
    let _this = this;
    let videoGroupListData = await request('/video/group/list');
    _this.setData({
      videoGroupList:videoGroupListData.data.slice(0,14),
      navId:videoGroupListData.data[0].id
    })

    // 获取视频列表数据
    _this.getVideoList(_this.data.navId);
  },

  // 获取视频列表数据
  async getVideoList(navId){
    let _this = this;
    let videoListData = await request('/video/group',{id:navId});
    // 关闭消息提示框
    wx.hideLoading();
    let index = 0;
    let videoList = videoListData.datas.map(item => {
      item.id = index++;
      return item;
    })
    _this.setData({
      videoList,
      isTriggered:false     // 关闭下拉刷新
    })
  },

  // 点击切换导航的回调
  changeNav(event){
    let navId = event.currentTarget.id;// 通过id向event传参的时候，如果传的是number会自动转换成string
    // let navId = event.currentTarget.dataset.id;// 通过data-key的形式就不会
    // console.log("event.currentTarget",event.currentTarget)
    this.setData({
      // navId:navId*1
      // 位移运算符，将目标数据先转换成二进制，然后移动指定位数
      // 右移/左移0位，会将非number数据强制转换成number
      navId:navId >>> 0,
      videoList:[]
    })
    // 显示正在加载
    wx.showLoading({
      title:'正在加载'
    })
    // 动态获取当前导航对应的视频数据
    this.getVideoList(this.data.navId);
  },

  // 点击播放/继续播放的回调
  handlePlay(event){
    /*
    * 问题：多个视频同时播放的问题
    * 需求：
    *   1. 在点击播放的事件中需要找到上一个播放的视频
    *   2. 在播放新的视频之前关闭上一个正在播放的视频
    * 关键：
    *   1. 如何找到上一个视频的实例对象
    *   2. 如何确认点击播放的视频和正在播放的视频不是同一个视频
    * 单例模式：
    *   1. 需要创建多个对象的场景下，通过一个变量接收，始终保持只有一个对象
    *   2. 优点是节省内存空间
    * */

    let vid = event.currentTarget.id;
    // 关闭上一个播放的视频
    // this.vid !== vid && this.videoContext && this.videoContext.stop();
    // this.vid = vid;

    // 更新data中 videoId 的状态数据
    this.setData({
      videoId:vid
    })
    // 创建控制video标签的实例对象
    this.videoContext = wx.createVideoContext(vid);

    // 判断当前的视频之前是否播放过，是否有播放记录，如果有，跳转至指定的播放位置
    let {videoUpdateTime} = this.data;
    let videoItem = videoUpdateTime.find(item => item.vid === vid);
    if(videoItem){
      this.videoContext.seek(videoItem.currentTime);
    }
    this.videoContext.play();
  },

  // 监听视频播放进度的回调
  handleTimeUpdate(event){
    // console.log(even);
    let videoTimeObj = {vid:event.currentTarget.id,currentTime:event.detail.currentTime};
    let {videoUpdateTime} = this.data;
    /*
    * 思路：判断记录播放时长的 videoUpdateTime 数组中是否有当前视频的播放记录
    *   1. 如果有，在原有的播放记录中修改播放时间为当前的播放时间
    *   2. 如果没有，需要在数组中添加当前视频的播放对象
    * */

    // find 是浅拷贝，如果其中一个对象改变了这个地址，就会影响到另一个对象
    let videoItem = videoUpdateTime.find(item => item.vid === videoTimeObj.vid);
    if(videoItem) { // 之前有
      videoItem.currentTime = event.detail.currentTime;
    }else { // 之前没有
      videoUpdateTime.push(videoTimeObj);
    }
    // 更新 videoUpdateTime 的状态
    this.setData({
      videoUpdateTime
    })
  },

  // 视频播放结束调用的回调
  handleEnded(event){
    // 移除记录播放时长数组中当前视频的对象
    let {videoUpdateTime} = this.data;
    videoUpdateTime.splice(videoUpdateTime.findIndex(item=>item.vid === event.currentTarget.id),1);
    this.setData({
      videoUpdateTime
    })

  },

  // 自定义下拉刷新的回调 scroll-view
  handleRefresher(){
    console.log('刷新')
    // 再次发请求，获取最新的视频列表数据
    this.getVideoList(this.data.navId);
  },

  // 自定义上拉触底的回调 scroll-view
  handleToLower(){
    console.log('上拉触底')
    // 数据分页：1. 后端分页 2. 前端分页
  },

  // 跳转至搜索界面
  toSearch(){
    wx.navigateTo({
      url:'/pages/search/search'
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
    console.log('页面的下拉刷新');
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log('页面的上拉触底');
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function ({from}) {
    console.log(from);
    if(from === 'button'){
      return {
        title:'来自 卿卿 的转发',
        page: '/pages/video/video'
        // imageUrl:'/static/images/nvsheng.jpg'
      }
    }else{
      return {
        title:'来自 青青 的转发',
        page: '/pages/video/video'
        // imageUrl:'/static/images/nvsheng.jpg'
      }
    }   
  }
})