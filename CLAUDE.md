# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**jpLogo** - LogoAI.jp 日本AI Logo生成服务
- **Type**: Next.js 14 App Router 多页面营销网站
- **Target**: 日本中小企业主、个体事业主、自由职业者
- **Tech Stack**: Next.js 14.2.5 + React 18 + Tailwind CSS 3.4 + Framer Motion 11.3

## Common Commands

```bash
npm run dev      # 启动开发服务器 (localhost:3000)
npm run build    # 生产环境构建
npm run start    # 启动生产服务器
npm run lint     # 代码检查
```

## Project Structure

```
jpLogo/
├── app/                    # Next.js App Router 页面
│   ├── layout.tsx          # 根布局 (Metadata SEO)
│   ├── page.tsx            # 首页
│   ├── features/           # 功能页面
│   ├── pricing/            # 价格页面
│   ├── faq/                # FAQ页面
│   ├── works/              # 作品展示
│   ├── about/              # 关于我们
│   ├── how-it-works/       # 使用流程
│   ├── industry/[slug]/    # 行业模板动态路由
│   └── for/[slug]/         # 场景模板动态路由
├── components/             # 共享组件
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   └── BottomCTA.tsx
├── doc/                    # 规格文档 (19个规范文件)
├── public/                 # 静态资源
├── tailwind.config.ts      # 设计系统配置
├── next.config.mjs         # Next.js配置
└── tsconfig.json
```

## Design System

已在 `tailwind.config.ts` 中定义:

- **Primary**: `#1A3A2A` (深绿)
- **Accent**: `#C9963A` (金色)
- **Background**: `#FAFAF7`
- **Heading字体**: Noto Serif JP
- **Body字体**: Noto Sans JP
- **动画**: float, pulse-slow, typing, blink

## Key Patterns

1. **SEO Metadata**: 所有页面在 `layout.tsx` 中定义全局 metadata，支持日文SEO
2. **动态路由**: 使用 `[slug]` 文件夹实现 `/industry/餐饮`、`/for/个人品牌` 等
3. **Framer Motion**: 用于页面动画和交互效果
4. **规格文档**: 详细开发规范在 `doc/` 目录，按编号组织

## Development Notes

- 这是前端展示项目，无后端API
- 当前实现为静态页面，功能页面（create、pricing等）已有路由但可能为占位内容
- 遵循 spec-first 开发：实现前参考 `doc/` 中的规格文档
