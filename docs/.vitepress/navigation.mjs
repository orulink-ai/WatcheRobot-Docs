export const siteNavigation = {
  zh: {
    nav: [
      { text: "快速开始", link: "/guide/getting-started" },
      { text: "客户端与设备", link: "/guide/client-and-device" },
      { text: "Python SDK", link: "/sdk/" },
      { text: "故障排查", link: "/troubleshooting/" },
    ],
    sidebar: {
      "/guide/": [
        {
          text: "使用指南",
          items: [
            { text: "快速开始", link: "/guide/getting-started" },
            { text: "客户端与设备", link: "/guide/client-and-device" },
            {
              text: "固件版本管理",
              link: "/guide/firmware-version-management",
            },
            {
              text: "树莓派真机 CI",
              link: "/guide/hardware-in-the-loop",
            },
          ],
        },
      ],
      "/sdk/": [
        {
          text: "开发者",
          items: [{ text: "Python SDK 概览", link: "/sdk/" }],
        },
      ],
      "/troubleshooting/": [
        {
          text: "支持",
          items: [{ text: "故障排查", link: "/troubleshooting/" }],
        },
      ],
    },
  },
  en: {
    nav: [
      { text: "Getting started", link: "/en/guide/getting-started" },
      { text: "Client and device", link: "/en/guide/client-and-device" },
      { text: "Python SDK", link: "/en/sdk/" },
      { text: "Troubleshooting", link: "/en/troubleshooting/" },
    ],
    sidebar: {
      "/en/guide/": [
        {
          text: "Guides",
          items: [
            { text: "Getting started", link: "/en/guide/getting-started" },
            { text: "Client and device", link: "/en/guide/client-and-device" },
            {
              text: "Firmware versions",
              link: "/en/guide/firmware-version-management",
            },
            {
              text: "Hardware-in-the-loop",
              link: "/en/guide/hardware-in-the-loop",
            },
          ],
        },
      ],
      "/en/sdk/": [
        {
          text: "Developers",
          items: [{ text: "Python SDK overview", link: "/en/sdk/" }],
        },
      ],
      "/en/troubleshooting/": [
        {
          text: "Support",
          items: [{ text: "Troubleshooting", link: "/en/troubleshooting/" }],
        },
      ],
    },
  },
};
