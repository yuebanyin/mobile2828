> 前端开发细则

1. 依赖包管理工具尽量使用 pnpm
2. 组件开发尽量使用 ts 语法，尽量少用 any 定义一个变量
3. 开发页面前先看下 components、hooks 之中是否已存在对应的实现
4. 所有写死的文字都要在 locales 中定义双语，页面使用对应 key 值
5. 新增主题色时需要将 theme 下的每一个主题文件都加入对应的变量
6. 图片支持换肤的一律使用 components 下的 Img、Img.BgImg 组件
7. 组件内的路径统一使用绝对路径：@/

> 前端代码编写规则

1. 项目内的文件严格按照 eslint 规范编写代码
2. 项目外接入的可以通过 eslintignore 忽略对应文件的检查，但是要先运行下确保不会报错
3. 样式编写时，如果使用 cssModule 时，文件命名例如：demo.module.less ts 文件使用时需在文件顶部 import styles from 'demo.module.less';
4. 如果不需要 cssModule 时，文件命名 index.less ts 文件顶部直接通过 import 'index.less'引入
5. 命名规范 1> ts 类型定义、组件定义统一大驼峰 2> 文件夹/文件命名以及变量命名（除常量外例如正则）统一小驼峰命名
6. 能手写的尽量手写，使用 UI 组件库可能样式修改更加麻烦
7. 写样式时一定要去 global.scss 文件中搜索下是否已有该样式，如有直接使用没有的话@谢逊添加

> 前端封装好的组件有

1. 图片组件 图片展示使用 Img 组件 背景图展示使用 BgImg 组件
2. Outlint 组件 项目中所有跳转，包括内部路由跳转以及外跳统一使用该组件
3. Swiper 组件 使用经过我们处理的组件 避免直接使用 UI 组件库的组件

> 文件目录

- dist 项目打包后的文件目录
- public 该文件夹的文件不会被打包编译，直接复制到 dist 文件夹下
  - mock 项目用到的 mock 文件都在该文件夹下
- src
  - assets 静态资源（.png、.jpeg、svg 等）
  - constants 常量保存地方
  - components 公共组件
  - hoc 高阶组件
  - hooks 自定义 hook 函数封装
  - layouts 过滤层文件
  - locales 国际化（多语言）
  - mobx 全局状态管理（mobx）
  - pages 页面相关
  - routes 路由相关
  - services 接口定义相关
  - theme 主题色
  - utils 工具类函数或者类文件
  - global.less 全局样式文件
  - Loading.tsx 全局加载中组件
- webpack 打包配置目录
- .eslintignore eslint 的忽略文件目录
- .eslintrc.js eslint 的配置规则，约束代码
- .gitignore git 的忽略文件，svn 用不到，暂时不加
- .prettierignore prettier 的忽略文件目录
- .prettierrc.js prettier 的配置规则
- tsconfig.json ts 的配置规则
- typings.d.ts 全局声明文件
- README.md 项目说明文件

# Style  scss 公共文件管理

1. font.scss 文件 包含文字大小、文字对齐方式、是否换行、文字是否折行等

2. boxLayout.scss 文件 包含盒子布局：弹性盒、浮动、定位（相对、绝对）等

3. boxSize.scss 文件 包含宽高、内边距外边距等

4. color.scss 文件 存放颜色的内容

5. animate 文件 包含 c3 动画和过渡效果

6. global.scss 文件 包含基础配置 和一些公共样式代码块

## 详细列表
### font 相关
1. 文字大小和行高定义在一起（参照已有）
2. 文字是否加粗 用700 和900 还有400
3. 文字对齐方式
4. 是否换行
5. 是否折行
6. 是否倾斜
7. 边框相关（注意：文字内容相对来讲偏少且固定，故把边框、边框圆角写到这个文件中）
### boxLayout 
	1. 弹性盒子布局相关
	2. 浮动定位相关
	3. 相对绝对定位相关（包括层级、定位）
	4. 盒子的对齐方式

### boxSize	
	1. 宽 目前已有的宽度
	2. 高 目前已有的宽度
	3. 内边距 
	4. 外边距 


  >  项目代码提交规范

   ## 使用type(subtype):description 形式提交commit ,type 如下:

   * feat 新增功能
   * chore 构建过程或辅助工具的变动
   * refactor 重构(即不是新增功能,也不是修改bug的代码变动)
   * style 修改格式,不影响逻辑
   * fix 修复问题
   * revert 回滚
   * docs 编写文档
   * test 测试类

