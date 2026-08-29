import { defineConfig } from "vitepress";

import { siteNavigation } from "./navigation.mjs";

export default defineConfig({
  title: "WatcheRobot Docs",
  description: "WatcheRobot 官方用户与开发者文档",
  base: "/WatcheRobot-Docs/",
  cleanUrls: true,
  lastUpdated: true,
  sitemap: {
    hostname: "https://orulink-ai.github.io/WatcheRobot-Docs/",
  },
  head: [
    ["meta", { name: "theme-color", content: "#101c2c" }],
    ["meta", { name: "color-scheme", content: "light dark" }],
  ],
  locales: {
    root: {
      label: "简体中文",
      lang: "zh-CN",
      title: "WatcheRobot 文档",
      description: "设备使用、固件维护与 Application 开发的权威入口",
      themeConfig: {
        nav: siteNavigation.zh.nav,
        sidebar: siteNavigation.zh.sidebar,
        editLink: {
          pattern:
            "https://github.com/orulink-ai/WatcheRobot-Docs/edit/main/docs/:path",
          text: "在 GitHub 上编辑此页",
        },
        lastUpdated: {
          text: "最后更新",
          formatOptions: { dateStyle: "medium", timeStyle: "short" },
        },
        outline: { level: [2, 3], label: "本页内容" },
        docFooter: { prev: "上一页", next: "下一页" },
      },
    },
    en: {
      label: "English",
      lang: "en-US",
      link: "/en/",
      title: "WatcheRobot Docs",
      description:
        "The official guide to devices, firmware maintenance, and Application development",
      themeConfig: {
        nav: siteNavigation.en.nav,
        sidebar: siteNavigation.en.sidebar,
        editLink: {
          pattern:
            "https://github.com/orulink-ai/WatcheRobot-Docs/edit/main/docs/:path",
          text: "Edit this page on GitHub",
        },
        lastUpdated: { text: "Last updated" },
        outline: { level: [2, 3], label: "On this page" },
        docFooter: { prev: "Previous", next: "Next" },
        footer: {
          message: "WatcheRobot official documentation",
          copyright: "Copyright © 2026 Orulink AI",
        },
      },
    },
  },
  themeConfig: {
    siteTitle: "WatcheRobot",
    search: {
      provider: "local",
      options: {
        locales: {
          root: {
            translations: {
              button: { buttonText: "搜索文档", buttonAriaLabel: "搜索文档" },
              modal: {
                noResultsText: "没有找到相关结果",
                resetButtonTitle: "清除搜索条件",
                footer: {
                  selectText: "选择",
                  navigateText: "切换",
                  closeText: "关闭",
                },
              },
            },
          },
        },
      },
    },
    socialLinks: [
      {
        icon: "github",
        link: "https://github.com/orulink-ai/WatcheRobot-Docs",
      },
    ],
    footer: {
      message: "WatcheRobot 官方文档",
      copyright: "Copyright © 2026 Orulink AI",
    },
  },
});
