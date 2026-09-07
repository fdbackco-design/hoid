// next-sitemap.config.js
/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://hoid.co.kr",
  generateRobotsTxt: true,
  sitemapSize: 7000,
  changefreq: "weekly",
  priority: 0.7,
  exclude: ["/admin/*", "/private/*"],
  transform: async (config, path) => {
    const priorities = {
      "/": 1.0,
      "/faq": 0.8,
      "/as-center": 0.8,
      "/bulk-purchase": 0.7,
    };

    return {
      loc: path,
      changefreq: path === "/" ? "daily" : config.changefreq,
      priority: priorities[path] ?? config.priority,
      lastmod: new Date().toISOString(),
    };
  },
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/private/"],
      },
      {
        userAgent: "Yeti",
        allow: "/",
      },
    ],
    additionalSitemaps: [],
  },
};
