# DQ-MUSIC

## 1 感谢
- 感谢网易云音乐官方提供的开放接口
- 感谢服务器开源项目提供者：https://binaryify.github.io/NeteaseCloudMusicApi/#/

## 2 说明

本项目仅包括微信小程序前端代码。在微信开发工具测试正常。

## 3 目录主要结构

```markdown
|-- DQ-MUSIC
    |-- README.md
    |-- FrontEnd
        |-- app.js						#此处注册小程序实例
        |-- app.json					#全局配置文件
        |-- app.wxss					#全局样式文件
        |-- package.json				#项目的配置和依赖信息文件
        |-- project.config.json			#项目配置文件
        |-- sitemap.json				#页面是否允许被索引的配置文件
        |-- components
        |   |-- NavHeader				#封装的标题栏的组件
        |-- miniprogram_npm				#使用npm生成的文件
        |-- pages						#一般页面都包含四个文件：.js,.json,.wxml和.wxss
        |   |-- index					#首页
        |   |   |-- index.js			#存放index页面的js代码
        |   |   |-- index.json			#存放index页面的配置代码
        |   |   |-- index.wxml			#存放index页面的结构代码，类似于HTML文件
        |   |   |-- index.wxss			#存放index页面的样式代码，类似于CSS文件
        |   |-- login					#登录页面
        |   |-- personal				#个人中心页面
        |   |-- recommendSong			#每日推荐页面
        |   |-- search					#搜索音乐页面
        |   |-- songDetail				#播放歌曲页面
        |   |-- utils					#工具文件，主要是封装数据请求的组件
        |   |-- video					#视频页面
        |-- static						#静态资源，包括图片和wxss文件
            |-- iconfont
            |-- images

```

## 4 项目部分功能截图

### 4.1 首页

- 首页：

    <div  align=left ><img src="https://raw.githubusercontent.com/DQ-Li/DQ-MUSIC/master/FrontEnd/static/images/readme/indexFig1.png" width="375"  alt="首页"/></div>

  

- 首页排行榜：

    <img src=     https://raw.githubusercontent.com/DQ-Li/DQ-MUSIC/master/FrontEnd/static/images/readme/indexFig2.png      style="zoom:50%;" />
   
     

### 4.2 每日推荐

 <img src=     https://raw.githubusercontent.com/DQ-Li/DQ-MUSIC/master/FrontEnd/static/images/readme/recommendSong.png      style="zoom:50%;" />

### 4.3 歌曲详情页

 <img src=    https://raw.githubusercontent.com/DQ-Li/DQ-MUSIC/master/FrontEnd/static/images/readme/songDetail.png     style="zoom:50%;" />

### 4.4 歌曲搜索页

- 根据歌名搜索歌曲：

 <img src=     https://raw.githubusercontent.com/DQ-Li/DQ-MUSIC/master/FrontEnd/static/images/readme/searchFig1.png      style="zoom:50%;" />

- 根据歌手搜索歌曲：

 <img src=     https://raw.githubusercontent.com/DQ-Li/DQ-MUSIC/master/FrontEnd/static/images/readme/searchFig2.png      style="zoom:50%;" />

- 搜索历史以及热搜榜展示：

 <img src=     https://raw.githubusercontent.com/DQ-Li/DQ-MUSIC/master/FrontEnd/static/images/readme/searchFig3.png      style="zoom:50%;" />

### 4.5 视频页

 <img src=     https://raw.githubusercontent.com/DQ-Li/DQ-MUSIC/master/FrontEnd/static/images/readme/video.png      style="zoom:60%;" />

### 4.6 登录页面

 <img src=     https://raw.githubusercontent.com/DQ-Li/DQ-MUSIC/master/FrontEnd/static/images/readme/login.png      style="zoom:50%;" />

### 4.7 个人中心

 <img src=     https://raw.githubusercontent.com/DQ-Li/DQ-MUSIC/master/FrontEnd/static/images/readme/personal.png      style="zoom:50%;" />

​    





