# 个人主页创建教程

[English Version](README.md) | 中文版

这个仓库包含一个简洁的个人主页模板，本教程将指导你如何 fork 该项目并添加自己的信息，打造属于你自己的个人主页。

**免责声明：本项目模板仅用于研究和学习目的，不涉及任何商业用途。**

**如果您使用本项目模板创建个人主页，您需要确保遵守相关法律法规，不得用于任何商业活动。**

## 1. 项目介绍

本项目是一个基于 HTML 和 JavaScript 的个人主页模板，具有以下特点：
- 简洁美观的界面设计
- 基于配置文件的内容管理
- 无需编程经验即可自定义
- 支持展示个人信息、经历、荣誉、论文等内容

注意，本主页支持横竖屏双端适配（电脑、手机），效果如下：
- 电脑端（横屏）

![电脑端](./images/preview/preview_computer.gif)

- 手机端（竖屏）

![手机端](./images/preview/preview_phone.gif)

## 2. 如何开始

### 步骤 1: Fork 仓库

1. 访问 [Excursion-ConsHein.github.io](https://github.com/Excursion-ConsHein/Excursion-ConsHein.github.io) 仓库
2. 点击右上角的 "Fork" 按钮，将仓库复制到你的 GitHub 账户
3. 将 fork 后的仓库克隆到本地：
   ```bash
   git clone https://github.com/{你的用户名}/{你的仓库名}.github.io.git
   ```
   其中，{你的用户名} 是你的 GitHub 用户名，{你的仓库名} 是你 fork 后的仓库名。
   
   例如，我的用户名是 ConsHein，仓库名是 Excursion-ConsHein.github.io，那么我应该执行：
   ```bash
   git clone https://github.com/ConsHein/Excursion-ConsHein.github.io.git
   ```
   这将把仓库克隆到本地的 `Excursion-ConsHein.github.io` 目录中。

### 步骤 2: 目录结构

项目的目录结构如下：
```
├── README.md              # 项目文档（本教程）
├── index.html             # 主 HTML 文件
├── configs/               # 配置文件
│   ├── cv.pdf             # 简历 PDF
│   ├── experiences.json   # 工作和教育经历
│   ├── honors.json        # 荣誉和奖项
│   ├── info.json          # 个人基本信息
│   ├── intro.txt          # 介绍文本
│   ├── news.json          # 最新动态
│   ├── papers.json        # 发表的论文
│   ├── patents.json       # 专利
│   ├── reviewer.json      # 审稿经历
│   └── teaching.json      # 教学经历
└── images/                # 图片文件
    ├── experience/        # 经历相关图片
    ├── homepage/          # 主页图片
    │   ├── background/    # 背景图片
    │   ├── favicon/       # 网站图标
    │   ├── homekey/       # 主页按钮图片
    │   ├── info icon/     # 信息图标
    │   └── photo/         # 个人照片
    ├── preview/           # readme中的配图
    └── publication/       # 出版物相关图片
```

## 3. 自定义你的信息

**注意：以下所有的图例内容仅为演示功能使用，不代表真实信息！**

### 修改个人基本信息

编辑 `configs/info.json` 文件，添加你的个人信息：
```json
{
  "name": "你的姓名",
  "address": "你的地址",
  "institution": "你的机构",
  "google scholar": "你的 Google Scholar 链接",
  "github": "你的 GitHub 链接",
  "email": "你的邮箱",
  "UTC": "你的时区， eg. +8，默认设置为+8",
}
```

![个人基本信息](./images/preview/preview_info.png)


### 添加经历

编辑 `configs/experiences.json` 文件，添加你的工作和教育经历：
```json
[
    {
        "logoSrc": "所在学校单位的logo图，存放在images/experience/目录下",
        "school": "学校名称",
        "details": [
            {
                "degree": "学位",
                "major": "专业",
                "college": "学院",
                "time": "时间"
            },
            // 如果你在同一个单位具有多段不同的经历，可以在此继续添加...
        ],
        "link": "学校链接"
    },
    // 如果你在其他单位具有经历，可以在此继续添加...
]
```

![经历](./images/preview/preview_experiences.png)


### 添加荣誉和奖项

如果没有荣誉和奖项相关的信息，那就将文档空置，或者删除文档，对应的栏目将会隐藏。

编辑 `configs/honors.json` 文件：
```json
[
    {
        "time": "获奖年份",
        "award": "获奖名称",
        "unit": "颁奖单位"
    },
    // 如果你具有多项荣誉和奖项，可以在此继续添加...
]
```

![荣誉和奖项](./images/preview/preview_honors.png)

### 添加教学经历

如果没有教学经历相关的信息，那就将文档空置，或者删除文档，对应的栏目将会隐藏。

编辑 `configs/teaching.json` 文件：
```json
[
    {
        "school": "学校名称",
        "course": "课程名称",
        "code": "课程代码",
        "identity": "身份，eg. 助教/讲师",
        "season": "学期，eg. 秋季/春季",
        "year": "年份",
        "link": "课程链接，如果没有链接，可以将其删除"
    },
    // 如果你具有多项教学经历，可以在此继续添加...
]
```

![教学经历](./images/preview/preview_teaching.png)

### 添加审稿经历

如果没有审稿经历相关的信息，那就将文档空置，或者删除文档，对应的栏目将会隐藏。

编辑 `configs/reviewer.json` 文件：
```json
[
    {
        "conference": "审稿会议名称",
        // 如果审稿的目标是期刊，则写为 "journal": "审稿期刊名称"
        "year": "审稿年份"
    },
    // 如果你具有多项审稿经历，可以在此继续添加...
]
```

![审稿经历](./images/preview/preview_reviewer.png)


### 添加论文

编辑 `configs/papers.json` 文件：
```json
{
  "年份": [
    {
      "title": "论文标题",
      "authors": "作者列表",
      "type": "论文类型，期刊/会议",
      "conference": "会议名称",
      // 以上是以会议举例，如果是期刊，则写为 "journal": "期刊名称",
      "image": "论文配图，存放在images/publication/目录下",
      "award": "论文所获奖项，如果无，则可以删除此行",
      "abstract": "论文摘要",
      "keyword": "论文关键词",
      "bibtex": "论文 bibtex 格式引用",
      "paperLink": "论文链接",
      "videoLink": "嵌入的视频链接，如果无，则可以删除此行",
      "codeLink": "代码仓库链接，如果无，则可以删除此行",
      "siteLink": "定制的项目浏览页链接，如果无，则可以删除此行",
      "selectedPaper": true
      // 如果想将这篇论文放在首页home的Research Highlights中，就将selectedPaper设置为true，否则设置为false
    },
    // 如果本年有其他论文，可以在此继续添加...
  ],
  // 如果其他年份有论文，可以在此继续添加...
}
```

![论文](./images/preview/preview_papers.gif)

![高亮](./images/preview/preview_highlights.gif)

### 添加专利

如果没有专利相关的信息，那就将文档空置，或者删除文档，对应的栏目将会隐藏。

编辑 `configs/patents.json` 文件：
```json
{
  "patents": [
    {
        "type": "专利类型",
        "title": "专利标题",
        "authors": "作者列表",
        "number": "专利号",
        "date": "授权日期",
        "link": "专利链接"
    },
    // 如果有更多专利，可以在此继续添加...
  ]
}
```

![专利](./images/preview/preview_patents.png)

### 添加最新动态

编辑 `configs/news.json` 文件：
```json
{
  "news": [
    {
        "time": "动态时间，eg. 2023-01-01",
        "content": "动态内容"
    },
    // 如果有更多动态，可以在此继续添加...
  ]
}
```

![最新动态](./images/preview/preview_news.png)

### 添加简历

将你的简历 PDF 文件命名为 `cv.pdf`，替换 `configs/cv.pdf` 文件。

![简历](./images/preview/preview_cv.png)

### 添加个人介绍

编辑 `configs/intro.txt` 文件，添加你的个人介绍文本。

![个人介绍](./images/preview/preview_intro.png)

## 4. 添加图片

### 个人照片

将你的个人照片替换 `images/homepage/photo/photo.png` 文件。

### 背景和图标

你可以替换 `images/homepage/background/BG.png`更换背景图片，替换`images/homepage/favicon/favicon.ico`更换网站图标，自定义你的主页风格。

![photo_and_BG](./images/preview/preview_photo_BG.png)

![favicon](./images/preview/preview_favicon.png)

### 主页按钮图片

你可以替换 `images/homepage/homekey/homekey.png` ，自定义home键按钮的外观。

![homekey](./images/preview/preview_homekey.png)

### 信息图标

你可以替换 `images/homepage/info icon/` 目录下的图片，自定义信息图标。

![info_icon](./images/preview/preview_info_icon.png)  

### 清理资源

你可以删除 `images/preview` 文件夹，以及清空两个 README.md 文件，减少提交时的文件大小，防止推送阻塞。


## 5. 预览和部署

### 本地预览

1. 在本地计算机上打开 `index.html` 文件即可预览你的个人主页
2. 对于更高级的预览，可以使用本地服务器，例如使用 Python 的简单 HTTP 服务器：
   ```bash
   cd 你的仓库目录
   python -m http.server
   ```
3. 然后在浏览器中访问 `http://localhost:8000`

### 部署到 GitHub Pages

1. 确保你的仓库名称格式为 `你的用户名.github.io`
2. 将所有修改提交并推送到 GitHub：
   ```bash
   git add .
   git commit -m "更新个人信息"
   git push origin main
   ```
3. 等待几分钟，然后访问 `https://你的用户名.github.io` 查看你的个人主页

## 6. 常见问题

### Q: 我需要懂编程吗？
A: 不需要。你只需要按照本教程修改配置文件和添加图片即可。

### Q: 如何自定义页面样式？
A: 如果你有 HTML/CSS 基础，可以修改 `index.html` 文件中的样式。

### Q: 我的主页什么时候会更新？
A: 当你将修改推送到 GitHub 后，通常会在几分钟内更新。

## 7. 联系我们

如果你在使用过程中遇到问题，可以通过以下方式联系我们：
- Email: Conshein_Yuanxing@outlook.com
- GitHub: [Excursion-ConsHein](https://github.com/Excursion-ConsHein)

祝你创建一个出色的个人主页！