# NotionNext 个人博客定制指南

本文以 **Hexo 主题**为例，记录了将 NotionNext 模板改造为个人博客的常见定制步骤，供有类似需求的用户参考。

---

## 目录

1. [基本信息配置](#1-基本信息配置)
2. [选择主题](#2-选择主题)
3. [代码块样式](#3-代码块样式)
4. [联系方式](#4-联系方式)
5. [头像与 Favicon](#5-头像与-favicon)
6. [Hexo 主题专项定制](#6-hexo-主题专项定制)
   - [首页欢迎语](#61-首页欢迎语)
   - [侧边栏：文章页隐藏个人名片与公告](#62-侧边栏文章页隐藏个人名片与公告)
   - [侧边栏：「公告」改为「个人简介」，内容左对齐](#63-侧边栏公告改为个人简介内容左对齐)
   - [文章封面图比例](#64-文章封面图比例)
   - [文章页最大宽度](#65-文章页最大宽度)
   - [隐藏「跳转评论」浮动按钮](#66-隐藏跳转评论浮动按钮)
   - [深色模式按钮添加 Tooltip](#67-深色模式按钮添加-tooltip)
   - [去除页脚的 Powered by](#68-去除页脚的-powered-by)
   - [去除 Live2D 看板娘](#69-去除-live2d-看板娘)
   - [首页 Banner 图比例锁定](#610-首页-banner-图比例锁定)
7. [Notion 数据库字段扩展](#7-notion-数据库字段扩展)
8. [同步上游更新](#8-同步上游更新)

---

## 1. 基本信息配置

文件：`blog.config.js`

这是最核心的配置文件，修改以下字段即可完成基本个性化：

```js
AUTHOR: process.env.NEXT_PUBLIC_AUTHOR || 'YourName',   // 昵称
BIO:    process.env.NEXT_PUBLIC_BIO    || 'Your motto',  // 个人简介
LINK:   process.env.NEXT_PUBLIC_LINK   || 'https://yoursite.com', // 网站地址
KEYWORDS: process.env.NEXT_PUBLIC_KEYWORD || 'Blog, Notion', // SEO 关键词
SINCE:  process.env.NEXT_PUBLIC_SINCE  || 2024,          // 建站年份，显示在页脚
```

欢迎语（首页打字动画，多条用英文逗号隔开）：

```js
GREETING_WORDS:
  process.env.NEXT_PUBLIC_GREETING_WORDS ||
  '欢迎来到我的博客,Hi there!',
```

---

## 2. 选择主题

文件：`blog.config.js`

```js
THEME: process.env.NEXT_PUBLIC_THEME || 'hexo',
```

可选主题名称（文件夹名）：`claude` · `endspace` · `fuwari` · `gitbook` · `heo` · `hexo` · `landing` · `matery` · `medium` · `next` · `nobelium` · `plog` · `proxio` · `simple`

> 也可以在 Vercel/Cloudflare 的环境变量 `NEXT_PUBLIC_THEME` 中设置，无需改代码。

---

## 3. 代码块样式

文件：`conf/code.config.js`

NotionNext 使用 [PrismJS](https://prismjs.com/) 渲染代码块，可从 [prism-themes](https://github.com/PrismJS/prism-themes) 挑选主题。

```js
// 默认主题（浅色/深色未分别配置时使用）
PRISM_THEME_PREFIX_PATH:
  'https://cdn.jsdelivr.net/npm/prism-themes@1.9.0/themes/prism-gruvbox-light.min.css',

PRISM_THEME_SWITCH: true, // 开启浅色/深色自动切换

PRISM_THEME_LIGHT_PATH:
  'https://cdn.jsdelivr.net/npm/prism-themes@1.9.0/themes/prism-gruvbox-light.min.css',

PRISM_THEME_DARK_PATH:
  'https://cdn.jsdelivr.net/npm/prism-themes@1.9.0/themes/prism-gruvbox-dark.min.css',

CODE_MAC_BAR: false, // 是否显示代码块左上角的 macOS 红黄绿圆点，关闭更简洁
```

---

## 4. 联系方式

文件：`conf/contact.config.js`

填入你自己的社交链接，留空则不显示对应图标：

```js
CONTACT_GITHUB:   'https://github.com/yourname',
CONTACT_TWITTER:  '',
CONTACT_EMAIL:    '',
// ... 其他字段同理
```

---

## 5. 头像与 Favicon

1. 将你的头像图片命名为 `avatar.png`，放到 `public/` 目录（替换原有的 `avatar.svg` 或 `avatar.png`）。
2. 将你的网站图标命名为 `favicon.ico`，同样放到 `public/` 目录。
3. 修改 `lib/db/SiteDataApi.js`，确保默认头像指向你的文件：

```js
// 约第 675 行
const defaultIcon = NOTION_CONFIG?.AVATAR || '/avatar.png'
```

---

## 6. Hexo 主题专项定制

### 6.1 首页欢迎语

文件：`themes/hexo/config.js`

```js
HEXO_HOME_BANNER_GREETINGS: [
  '你的第一句欢迎语',
  '你的第二句欢迎语',
],
```

> 注意：`blog.config.js` 里的 `GREETING_WORDS` 与此处作用相同，二者取其一即可（主题 config 优先级更高）。

---

### 6.2 侧边栏：文章页隐藏个人名片与公告

默认情况下，侧边栏的「个人名片」和「公告」在文章页也会显示，显得冗余。

文件：`themes/hexo/components/SideRight.js`

```jsx
// 修改前
<InfoCard {...props} />
// ...
<Announcement post={notice} />

// 修改后：仅在非文章页（首页/列表页）显示
{!post && <InfoCard {...props} />}
// ...
{!post && <Announcement post={notice} />}
```

---

### 6.3 侧边栏：「公告」改为「个人简介」，内容左对齐

**标题文字**，文件：`lib/lang/zh-CN.js`

```js
ANNOUNCEMENT: '个人简介',  // 原值为 '公告'
```

**内容对齐**，文件：`themes/hexo/components/Announcement.js`

```jsx
// 修改前
<NotionPage post={post} className='text-center' />
// 修改后
<NotionPage post={post} className='text-left' />
```

---

### 6.4 文章封面图比例

文件：`themes/hexo/components/BlogPostCard.js`

原版封面图占卡片宽度的 5/12，图片较小。改为 7/12 并锁定宽高比，视觉更突出：

```jsx
// 修改前
<div className='md:w-5/12 overflow-hidden'>
  <img className='h-56 w-full object-cover ...' />

// 修改后
<div className='md:w-7/12 overflow-hidden'>
  <img className='w-full object-cover ... aspect-[7/2]' />
```

---

### 6.5 文章页最大宽度

文件：`themes/hexo/index.js`，约第 125 行。

原版文章内容区限制最大宽度为 `max-w-4xl`，对于有大量代码或宽图的文章会显得局促。改为 `max-w-full` 可让内容铺满容器：

```jsx
// 修改前
className={`... ${fullWidth ? '' : 'max-w-4xl'} ...`}
// 修改后
className={`... ${fullWidth ? '' : 'max-w-full'} ...`}
```

> 如果只想对个别文章全屏，可在 Notion 数据库中为该文章添加 `fullWidth` 属性（值为 `true`），参见第 7 节。

---

### 6.6 隐藏「跳转评论」浮动按钮

文件：`themes/hexo/index.js`，约第 80 行。

如果你不需要这个浮动按钮，注释掉即可：

```jsx
{/* {post && <ButtonJumpToComment />} */}
```

---

### 6.7 深色模式按钮添加 Tooltip

文件：`themes/hexo/components/ButtonFloatDarkMode.js`

鼠标悬停时显示「切换到深色/浅色模式」提示：

```jsx
<div
  title={isDarkMode ? locale.MENU.LIGHT_MODE : locale.MENU.DARK_MODE}
  onClick={handleChangeDarkMode}
  ...
>
```

需要先在组件内引入 `locale`：

```js
const { isDarkMode, updateDarkMode, locale } = useGlobal()
```

---

### 6.8 去除页脚的 Powered by

文件：`themes/hexo/components/Footer.js`

找到并删除这一行：

```jsx
<PoweredBy className='justify-center' />
```

---

### 6.9 去除 Live2D 看板娘

文件：`themes/hexo/components/SideRight.js`

注释掉 `<Live2D />` 即可：

```jsx
{/* <Live2D /> */}
```

---

### 6.10 首页 Banner 图比例锁定

文件：`themes/hexo/components/Hero.js`

为 Banner 图添加 `aspect-[137/60]`，在不同屏幕尺寸下保持一致的宽高比：

```jsx
className={`header-cover w-full h-screen object-cover object-center aspect-[137/60] ...`}
```

---

## 7. Notion 数据库字段扩展

如果你希望对某篇文章单独设置全屏显示，可在 Notion 数据库中添加一列：

| 列名 | 类型 | 说明 |
|------|------|------|
| `fullWidth` | Checkbox | 勾选后该文章正文区不受最大宽度限制 |

然后在 `conf/notion.config.js` 中注册该字段：

```js
NOTION_PROPERTIES: {
  // ...其他字段
  fullWidth: process.env.NEXT_PUBLIC_NOTION_PROPERTY_FULLWIDTH || 'fullWidth',
}
```

---

## 8. 同步上游更新

NotionNext 原项目更新活跃。Fork 后建议定期同步上游，以获取 Bug 修复和新功能。

```bash
# 首次配置（只需一次）
git remote add upstream https://github.com/tangly1024/NotionNext.git

# 此后每次同步
git fetch upstream
git merge upstream/main
# 解决冲突后
git push origin main
```

**合并时的注意事项：**

- `blog.config.js` 容易产生冲突（双方都会修改），手动保留自己的配置值即可。
- 若上游对某个文件做了较大重构（如重命名、拆分），需要将你的改动迁移到新文件。
- 组件改动（`themes/hexo/components/`）冲突较少，但上游有时会将 `<Link>` 替换为 `<SmartLink>` 等，注意跟进。
