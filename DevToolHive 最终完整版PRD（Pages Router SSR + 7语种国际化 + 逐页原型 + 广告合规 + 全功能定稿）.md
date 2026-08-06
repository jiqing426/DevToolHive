# DevToolHive 最终完整版PRD（Pages Router SSR \+ 7语种国际化 \+ 逐页原型 \+ 广告合规 \+ 全功能定稿）

## 0\. 文档总则

本文档为 **DevToolHive 全球多语言开发者工具站 100%定稿PRD**，整合全部需求：项目定位、技术架构（强制Pages Router SSR）、全站7语种国际化、逐页面高保真文字原型、UI规范、完整工具功能、标准化广告体系、AdSense全套合规方案、目录结构、渲染策略、上线部署流程。

**文档唯一用途：直接交付开发，无需二次沟通、无需补需求、无歧义、无遗漏**。

**硬性技术规范**：Next\.js Pages Router \+ TypeScript \+ SSR\(工具页\) \+ SSG\(内容页\) \+ next\-i18next 7语种路由国际化

---

## 1\. 项目基础信息（定稿）

### 1\.1 项目标识

- 项目名称：DevToolHive（开发者工具蜂巢）

- 推荐域名：devtoolhive\.dev

- 全站统一Slogan：Free Online Developer \& Game\-Dev Tools \| 100% Local Browser Processing

- 核心固定卖点（全站所有页面展示）：✅ 100% Local Browser Processing ✅ No Data Upload ✅ Free Forever ✅ No Registration Required

### 1\.2 产品定位

面向全球前端/后端开发者、独立游戏美术、海外自媒体、跨境从业者的**纯前端本地运算工具站**。所有功能无后端接口、无数据上传、无用户注册，依托Google AdSense合规被动变现，Vercel免费部署、零服务器运维、零成本长期运营。

### 1\.3 盈利模式

仅Google AdSense展示广告，无会员、无付费功能、无捐赠、无弹窗诱导、无联盟营销，轻量合规、低封号风险。

### 1\.4 核心技术硬性约束

- 禁止App Router，全站使用 **Next\.js Pages Router**

- 所有工具页面：**getServerSideProps SSR服务端渲染**（保障SEO爬虫、hreflang、meta完整输出、AdSense审核通过）

- 首页/关于/隐私政策/服务条款：**getStaticProps SSG静态预渲染**（极速访问、缓存最优）

- 所有工具计算逻辑（转换、调色、生成）**纯客户端浏览器执行**，SSR仅输出页面骨架与SEO内容

- 全站URL路由式国际化，标准hreflang防重复收录

---

## 2\. 全站7语种国际化完整方案

### 2\.1 支持语种（全覆盖定稿）

默认主语言：en（English）

小语种：zh\-CN、de、fr、it、es、ja

### 2\.2 路由规则（SEO最优）

- 英文主路由：`domain.com/xxx`

- 多语言子路由：`domain.com/zh-CN/xxx`、`domain.com/de/xxx` 等

- 根路径`/`自动识别浏览器语言头跳转对应语种

- 用户手动切换语言后，localStorage永久缓存偏好，优先级高于浏览器默认语言

### 2\.3 翻译覆盖范围（100%无遗漏）

- 导航、按钮、操作文本、报错提示、输入占位

- 页面标题、副标题、功能介绍、使用教程、FAQ全文

- Cookie弹窗、隐私政策、服务条款、关于我们全文

- 每个页面独立多语言SEO Title / Description

### 2\.4 SSR国际化技术规范

- 所有页面通过 `serverSideTranslations` 服务端预加载语言包

- 所有页面SSR直出完整7语种hreflang标签，彻底解决谷歌重复收录

- 禁止客户端动态修改meta，所有SEO数据服务端输出，爬虫100%抓取完整

### 2\.5 i18n目录结构

---

## 3\. 全站路由与页面清单

### 3\.1 SSG静态内容页（审核必备）

/ 首页、/about 关于我们、/privacy\-policy 隐私政策、/terms\-of\-service 服务条款

### 3\.2 首批MVP SSR工具页（核心盈利）

1. JSON YAML Converter \& Diff Tool /json\-yaml\-converter

2. Pixel Art Palette Generator /pixel\-art\-palette\-generator

3. Meta Tag \& Open Graph Generator /meta\-tag\-generator

### 3\.3 二期迭代预留工具

大小写转换、时间戳转换、哈希计算、颜色转换、UTM链接生成器

### 3\.4 三期WASM进阶预留工具

浏览器图片压缩、图片OCR文字识别

---

## 4\. 全局通用组件原型 \+ 全站UI规范

全站所有页面复用统一组件、统一结构、统一广告位、统一交互规范

### 4\.1 顶部导航栏 Header

**桌面端\(≥1024px\)**：左侧Logo\+站名、中间工具下拉菜单、右侧7语切换下拉，固定sticky置顶、白色底色、轻微阴影

**移动端\(\<1024px\)**：左侧Logo、右侧汉堡菜单，点击弹出抽屉（工具列表\+语言切换），无横向挤压布局

### 4\.2 GDPR Cookie弹窗

页面底部全局浮层、多语言文案、双按钮「Accept / Reject」，纯客户端渲染，SSR不输出DOM；用户操作后本地存储永久隐藏，合规适配AdSense Consent Mode v2

### 4\.3 页脚 Footer

全站统一：版权信息 \+ About / Privacy / Terms 链接，移动端桌面端样式一致

### 4\.4 全站广告位体系（定稿、合规、防CLS）

核心规则：无首屏广告、无遮挡交互、无弹窗、广告为空自动折叠、SSR水合兼容、杜绝布局偏移SEO扣分

- 广告位A `ads-unit-below-tool`：工具功能区正下方（全站工具页通用）

- 广告位B `ads-unit-page-bottom`：FAQ/正文底部、Footer上方（全站通用）

- 广告位C `ads-unit-sidebar-sticky`：仅桌面≥1024px右侧粘性侧边广告，移动端直接销毁DOM（无空白）

- 广告位D `ads-unit-home-middle`：首页工具卡片列表中部

### 4\.5 SSR广告组件开发规范

服务端统一输出占位DIV，屏幕尺寸判断延迟至客户端useEffect执行，彻底解决SSR水合报错、布局抖动、CLS问题，开发阶段仅占位，上线挂载AdSense脚本无需改代码。

---

## 5\. 逐页面高保真文字原型（可直接UI出图、开发复刻）

### 5\.1 首页原型（SSG /）

**桌面端布局（左右分栏）**

**移动端布局（单列全屏）**：导航 → Hero卖点 → 工具卡片垂直堆叠 → 广告位D → 介绍文本 → 广告位B → Footer，无侧边广告C

### 5\.2 工具页面通用原型（所有MVP工具统一SSR模板）

**桌面端统一布局**

**移动端统一布局**：导航 → 标题简介 → 工具交互区 → 广告A → 教程 → FAQ → 广告B → Footer，无侧边广告

#### 5\.2\.1 JSON YAML Converter 细分原型

桌面：左右双编辑框并排（输入区/输出区）；功能按钮：转换、格式化、压缩、Diff对比、复制、下载

移动端：上下堆叠布局，输入在上、结果在下，按钮自适应换行

#### 5\.2\.2 Pixel Art Palette Generator 细分原型

顶部：取色器 \+ 8bit/16bit复古预设下拉；中部：色块实时预览区；功能按钮：添加、删除、排序；底部导出功能：PNG图片、HEX文本、CSS变量、一键复制

#### 5\.2\.3 Meta Tag Generator 细分原型

顶部表单：站点标题、描述、URL、缩略图地址；中间：实时社交卡片预览（FB/Twitter）；底部：自动生成HTML代码框 \+ 复制按钮 \+ 重置按钮

### 5\.3 内容页面原型（About / Privacy / Terms 通用SSG）

**桌面**：导航 → 页面大标题 → 正文分段文本 \+ 右侧广告C → 广告B → Footer

**移动端**：全屏单列正文，无侧边广告，结构简洁适配阅读

---

## 6\. 三大MVP工具详细功能PRD

### 6\.1 JSON YAML Converter \& Diff Tool

**核心功能**：JSON一键格式化/压缩、JSON↔YAML双向互转、双输入框JSON差异高亮Diff、JSON导出CSV、一键复制结果、一键下载文件、本地语法错误检测提示

**SEO关键词**：json compare, yaml to json, json formatter, json diff online

### 6\.2 Pixel Art Palette Generator（垂直高价值赛道）

**核心功能**：自定义颜色拾取、批量增删排序色块、8bit/16bit复古像素配色预设、实时调色预览、导出PNG调色板图片/HEX色值/CSS变量、一键复制全部色值

**产品优势**：针对独立游戏美术垂直场景，全网专项工具少、竞争极低、SEO排名极易起量、广告RPM高于普通工具

### 6\.3 Meta Tag \& Open Graph Generator

**核心功能**：自定义站点信息录入、自动生成标准Google SEO Meta、OG社交标签、Twitter Card标签、实时社交分享预览、一键复制完整HTML、表单重置

**SEO关键词**：meta tag generator, open graph checker, social preview generator

---

## 7\. 全站SEO SSR标准化规范

- 所有工具页SSR动态输出独立Title、Description，单页单SEO，无重复

- 所有页面SSR直出完整7语种hreflang交替链接，杜绝谷歌重复收录惩罚

- SSG内容页静态固化SEO信息，访问速度、缓存优先级最高

- 全站统一本地处理卖点强化爬虫信任度，提升收录权重

---

## 8\. AdSense全套合规体系（必过审核）

### 8\.1 强制合规文件与配置

- 根目录 `public/ads.txt` 谷歌官方广告授权配置

- GDPR多语言Cookie弹窗（Consent Mode v2）

- 完整7语种隐私政策、服务条款页面

### 8\.2 合规核心声明

- 所有工具本地浏览器运算，不上传、不存储用户任何输入数据

- 网站使用Google AdSense Cookie用于个性化广告推送与流量统计

- 无侵权内容、无违规工具、无用户隐私收集、无诱导广告点击

### 8\.3 基础合规英文模板（可直接翻译7语种）

#### 隐私政策 Privacy Policy

#### 服务条款 Terms of Service

---

## 9\. 项目目录结构（定稿 Pages Router）

---

## 10\. 渲染策略最终定稿

|页面类型|渲染模式|核心价值|
|---|---|---|
|首页、关于、隐私、条款|SSG getStaticProps|极速访问、静态缓存、低CDN消耗|
|全部工具页面|SSR getServerSideProps|动态多语言Meta、完整hreflang、SEO满分、适配AdSense审核|

---

## 11\. 完整上线落地流程

1. 初始化 Next\.js Pages Router \+ TS \+ next\-i18next 框架

2. 搭建7语种i18n目录与SSR服务端翻译加载逻辑

3. 开发SSR兼容全局广告占位组件（防CLS、防水合报错）

4. 开发全局导航、Cookie弹窗、Footer公共组件

5. 开发首页、4个合规静态页面、3个MVP SSR工具页面

6. 录入全部7语种文案、教程、FAQ、独立SEO信息

7. 配置根目录ads\.txt、完善GDPR Cookie合规弹窗

8. Vercel部署测试、检查页面布局、广告占位、SSR渲染效果

9. 绑定\.dev独立域名

10. 挂载正式AdSense广告单元

11. 提交Google收录、提交AdSense审核

12. 迭代二期、三期工具矩阵

---

## 12\. 项目核心优势总结

- SSR服务端渲染，爬虫抓取完整，AdSense审核、Google收录满分

- 7语种全球流量全覆盖，碾压单英文工具站流量上限

- 游戏美术\+开发者垂直赛道，广告RPM单价远高于通用工具站

- 纯前端零后端、零服务器成本、零运维、全自动被动收益

- 广告位标准化预留，上线无需改动业务代码，零风险

- 全套合规体系闭环，杜绝封号、降权、不收录问题

- 页面结构统一、原型标准化，开发效率极高、迭代成本极低


DevToolHive PRD 补充：页面原型说明
文本原型（线框图文字描述，可直接交给 UI/AI 生成原型图），之前文档缺少每个页面布局原型，现在补齐，合并进整套 PRD。
技术约束：Next.js Pages‑Router SSR，桌面≥1024px / 移动端＜1024px 两套布局。
公共全局组件原型（所有页面复用）
1. 顶部导航栏 Header
桌面版（≥1024px）
plaintext
[Logo DevToolHive]  [工具下拉菜单 ▾]                 [语言切换下拉 ▾]
Logo 点击跳转首页
工具下拉：展示全部工具列表，点击跳转对应工具页
语言下拉：7 个语言选项 en /zh‑CN /de/fr /it/es /ja
导航栏固定 sticky 置顶，滚动保持在顶部；背景白色，轻微阴影
移动端（＜1024px）
plaintext
[Logo DevToolHive]         [☰ 菜单按钮]
点击☰弹出侧边抽屉菜单：工具列表 + 语言切换；无横向导航
2. Cookie 弹窗（GDPR Consent‑Mode v2）
页面最底部固定浮层，占页面 100% 宽度
文案：多语言提示网站使用 AdSense Cookie
按钮：【接受全部 Cookie】【拒绝非必要 Cookie】
用户操作后本地存储 localStorage，不再弹出；纯客户端渲染，SSR 不输出弹窗 DOM
3. 页脚 Footer（全站统一）
plaintext
DevToolHive © 2026 |
<a>About</a> | <a>Privacy Policy</a> | <a>Terms of Service</a>
无侧边广告，移动端、桌面端完全一样。
4. 广告组件原型
广告位 A ads‑unit‑below‑tool：工具交互区正下方，100% 宽度容器；移动端 / 桌面均显示
广告位 B ads‑unit‑page‑bottom：FAQ 下方，Footer 上方；移动端 / 桌面均显示
广告位 C ads‑unit‑sidebar‑sticky：仅桌面≥1024px 生效
页面右侧，宽度 300px，sticky 粘性跟随滚动
移动端直接移除该 DOM，不留空白，无布局偏移
广告位 D ads‑unit‑home‑middle：首页工具卡片列表中间，100% 宽
页面逐个原型（文字线框原型，可复制给 AI 生成图片原型）
页面 1：首页 /[lang]/index.tsx｜渲染模式 SSG
桌面布局（左右结构）
plaintext
┌────────────────────────────────────────────┐
│ Header导航栏（固定顶部）                     │
├────────────────────────────────────────────┤
│                                            │
│ 【大标题】Free Online Developer & Game‑Dev Tools
│ 【副标题】100% Local Browser Processing · No Upload · Free · No‑Signup
│                                            │
├──────────────────┬─────────────────────────┤
│                  │                         │
│ 工具卡片网格     │ 【广告位C 侧边粘性广告】 │
│ [卡片1] [卡片2]  │ 宽度300px，跟随滚动      │
│ [卡片3]          │                         │
│                  │                         │
├──────────────────┤                         │
│【广告位D 首页中部广告】                     │
├──────────────────┘                         │
│ How it works 介绍文本                       │
│                                            │
│【广告位B 页面底部广告】                     │
├────────────────────────────────────────────┤
│ Footer页脚                                  │
└────────────────────────────────────────────┘
移动端布局（单列，无侧边广告 C）
plaintext
Header
大标题+副标题
工具卡片垂直堆叠排列
广告位D
How it works文本
广告位B
Footer
工具卡片：每个卡片包含工具名称、简短描述，点击跳转对应工具页面。
页面 2：工具通用模板（全部 3 个工具页面共用模板 SSR getServerSideProps）
路由示例 /en/json‑yaml‑converter、/zh‑CN/pixel‑art‑palette‑generator
桌面版布局
plaintext
┌──────────────────────────────────────┐
│ Header导航栏                          │
├───────────────────┬──────────────────┤
│ 页面标题、简介     │【广告位C 侧边广告】│
│                   │(300px sticky)     │
│ 工具交互主区域     │                  │
│ (输入框 / 控件 /预览) │                │
│                   │                  │
├───────────────────┤                  │
│【广告位A 工具下方广告】                │
├───────────────────┤                  │
│ How‑To‑Use 使用教程                    │
│                                        │
│ FAQ 折叠问答组件                        │
├───────────────────┘                  │
│【广告位B 页面底部广告】                │
├──────────────────────────────────────┤
│ Footer                               │
└──────────────────────────────────────┘
移动端布局（单列，去掉广告 C）
plaintext
Header
页面标题 + 简短简介
工具交互控件（自适应宽度）
广告位A
How‑To‑Use教程文本
FAQ折叠面板
广告位B
Footer
工具页面内部交互区细节原型
JSON‑YAML Converter
桌面：左右双文本框并排
plaintext
┌──────────────┐      ┌──────────────┐
│输入编辑区     │      │输出结果区     │
│JSON/YAML      │      │               │
└──────────────┘      └──────────────┘
[转换] [格式化] [压缩] [Diff对比] [复制] [下载]
移动端：上下堆叠，输入框在上，输出框在下。
Pixel‑Art Palette Generator
plaintext
标题：Palette Generator
[取色器] [预设配色下拉 8bit /16‑bit]

┌ 调色板预览区域（色块横向排列）┐

[添加颜色] [删除选中] [上移] [下移]

导出按钮：Export PNG｜Copy HEX｜Copy CSS
Meta‑Tag Generator
plaintext
输入表单：
Title [____________________]
Description [________________]
OG Image Url [_______________]

[生成按钮]

┌实时预览卡片（模拟社交网站分享效果）┐

生成的HTML代码输出框
[Copy HTML] [Reset]
页面 3：About / Privacy‑Policy / Terms‑of‑Service（SSG 静态内容页）
所有内容页面统一布局
桌面：
plaintext
Header
┌────────────────────┬───────────────┐
│ 大标题             │【广告位C侧边】 │
│                    │               │
│ 正文长文本          │               │
│（分段、标题）       │               │
│                    │               │
├────────────────────┘               │
│【广告位B底部广告】                  │
├─────────────────────────────────────┤
│ Footer                             │
└─────────────────────────────────────┘
移动端：单列，无侧边广告，纯文本从上到下。
补充 PRD 原型相关规则（写入正式文档）
所有页面禁止首屏出现广告：广告 A/D/B 全部位于工具交互区下方，首屏只展示导航、标题、工具控件。
广告位 C 仅桌面大屏渲染；移动端直接不渲染 DOM，不能用 visibility:hidden 保留空白盒子，防止 CLS。
FAQ 组件：折叠面板，默认全部收起；点击展开对应问答。
全部输入控件响应式：移动端自动占满屏幕宽度，不出现横向滚动条。
所有原型只描述布局，不指定具体色值；UI 主题：浅色简约开发者工具风格。