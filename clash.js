// ==================== [ DNS 配置优化 防泄露版 ] ====================
const domesticNameservers = [
  "223.5.5.5",
  "119.29.29.29",
  "https://doh.pub/dns-query"
];

const foreignNameservers = [
  "https://1.1.1.1/dns-query",
  "https://8.8.4.4/dns-query"
];

const dnsConfig = {
  "enable": true,
  "listen": "0.0.0.0:1053",
  "ipv6": false,
  "respect-rules": true,
  "cache-algorithm": "arc",

  "default-nameserver": [
    "223.5.5.5",
    "119.29.29.29"
  ],

  "nameserver": [
    ...foreignNameservers
  ],

  "proxy-server-nameserver": [
    "223.5.5.5",
    "119.29.29.29"
  ],

  "direct-nameserver": [
    "223.5.5.5",
    "119.29.29.29"
  ],

  "nameserver-policy": {
    "geosite:cn,private": domesticNameservers,
    "geosite:geolocation-!cn": foreignNameservers
  }
};

// ==================== [ 规则集配置 ] ====================
// 规则源：raw.githubusercontent.com，不走 CDN
// 图标源：Qure IconSet/Color，走 fastly.jsdelivr.net CDN
const ruleProviderCommon = {
  "type": "http",
  "format": "yaml",
  "interval": 86400,
  "proxy": "Proxy"
};

const lsPrefix = "https://raw.githubusercontent.com/Loyalsoldier/clash-rules/release/";
const bmRulePrefix = "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/";

const ruleProviders = {
  // ==================== Loyalsoldier 基础规则 ====================
  "icloud": {
    ...ruleProviderCommon,
    "behavior": "domain",
    "url": lsPrefix + "icloud.txt",
    "path": "./ruleset/icloud.yaml"
  },

  "apple": {
    ...ruleProviderCommon,
    "behavior": "domain",
    "url": lsPrefix + "apple.txt",
    "path": "./ruleset/apple.yaml"
  },

  // 不加入 Loyalsoldier 的 google.txt
  // 因为它是 Google 在中国大陆可直连域名列表，不符合防泄露思路

  // 不加入 Loyalsoldier 的 reject.txt
  // 也就是不启用广告拦截域名列表

  "proxy": {
    ...ruleProviderCommon,
    "behavior": "domain",
    "url": lsPrefix + "proxy.txt",
    "path": "./ruleset/proxy.yaml"
  },

  "direct": {
    ...ruleProviderCommon,
    "behavior": "domain",
    "url": lsPrefix + "direct.txt",
    "path": "./ruleset/direct.yaml"
  },

  "private": {
    ...ruleProviderCommon,
    "behavior": "domain",
    "url": lsPrefix + "private.txt",
    "path": "./ruleset/private.yaml"
  },

  "gfw": {
    ...ruleProviderCommon,
    "behavior": "domain",
    "url": lsPrefix + "gfw.txt",
    "path": "./ruleset/gfw.yaml"
  },

  "tld-not-cn": {
    ...ruleProviderCommon,
    "behavior": "domain",
    "url": lsPrefix + "tld-not-cn.txt",
    "path": "./ruleset/tld-not-cn.yaml"
  },

  "telegramcidr": {
    ...ruleProviderCommon,
    "behavior": "ipcidr",
    "url": lsPrefix + "telegramcidr.txt",
    "path": "./ruleset/telegramcidr.yaml"
  },

  "cncidr": {
    ...ruleProviderCommon,
    "behavior": "ipcidr",
    "url": lsPrefix + "cncidr.txt",
    "path": "./ruleset/cncidr.yaml"
  },

  "lancidr": {
    ...ruleProviderCommon,
    "behavior": "ipcidr",
    "url": lsPrefix + "lancidr.txt",
    "path": "./ruleset/lancidr.yaml"
  },

  "applications": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": lsPrefix + "applications.txt",
    "path": "./ruleset/applications.yaml"
  },

  // ==================== BlackMatrix7 细分规则 ====================
  "GitHub": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": bmRulePrefix + "GitHub/GitHub.yaml",
    "path": "./ruleset/GitHub.yaml"
  },

  "Google": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": bmRulePrefix + "Google/Google.yaml",
    "path": "./ruleset/Google.yaml"
  },

  "YouTube": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": bmRulePrefix + "YouTube/YouTube.yaml",
    "path": "./ruleset/YouTube.yaml"
  },

  "Netflix": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": bmRulePrefix + "Netflix/Netflix.yaml",
    "path": "./ruleset/Netflix.yaml"
  },

  "Spotify": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": bmRulePrefix + "Spotify/Spotify.yaml",
    "path": "./ruleset/Spotify.yaml"
  },

  "TikTok": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": bmRulePrefix + "TikTok/TikTok.yaml",
    "path": "./ruleset/TikTok.yaml"
  },

  "Bahamut": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": bmRulePrefix + "Bahamut/Bahamut.yaml",
    "path": "./ruleset/Bahamut.yaml"
  },

  "Bilibili": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": bmRulePrefix + "BiliBili/BiliBili.yaml",
    "path": "./ruleset/Bilibili.yaml"
  },

  "Microsoft": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": bmRulePrefix + "Microsoft/Microsoft.yaml",
    "path": "./ruleset/Microsoft.yaml"
  },

  "OpenAI": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": bmRulePrefix + "OpenAI/OpenAI.yaml",
    "path": "./ruleset/OpenAI.yaml"
  },

  "Claude": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": bmRulePrefix + "Claude/Claude.yaml",
    "path": "./ruleset/Claude.yaml"
  },

  "Gemini": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": bmRulePrefix + "Gemini/Gemini.yaml",
    "path": "./ruleset/Gemini.yaml"
  },

  "Copilot": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": bmRulePrefix + "Copilot/Copilot.yaml",
    "path": "./ruleset/Copilot.yaml"
  }
};

// ==================== [ 分流规则 ] ====================
const rules = [
  // 测试站专项分流：强制走代理，避免 DNS 泄露测试误判
  "DOMAIN-KEYWORD,browserleaks,Proxy",
  "DOMAIN-KEYWORD,dnsleak,Proxy",
  "DOMAIN-KEYWORD,ipleak,Proxy",
  "DOMAIN-KEYWORD,whoer,Proxy",

  // GitHub 手动优先规则
  "DOMAIN-SUFFIX,github.com,GitHub",
  "DOMAIN-SUFFIX,github.io,GitHub",
  "DOMAIN-SUFFIX,github.dev,GitHub",
  "DOMAIN-SUFFIX,githubusercontent.com,GitHub",
  "DOMAIN-SUFFIX,githubassets.com,GitHub",

  // 自定义规则
  "DOMAIN,v2rayse.com,Proxy",

  // 本地应用 / 私有地址
  "RULE-SET,applications,Direct",
  "RULE-SET,private,Direct",

  // 精细化规则：放在 proxy / gfw / tld-not-cn 前面
  "RULE-SET,GitHub,GitHub",
  "RULE-SET,telegramcidr,Telegram,no-resolve",

  "RULE-SET,YouTube,YouTube",
  "RULE-SET,Netflix,Netflix",
  "RULE-SET,Bahamut,Bahamut",
  "RULE-SET,Spotify,Spotify",
  "RULE-SET,Bilibili,Bilibili",
  "RULE-SET,TikTok,TikTok",

  // AI 规则
  "RULE-SET,OpenAI,AI",
  "RULE-SET,Claude,AI",
  "RULE-SET,Gemini,AI",
  "RULE-SET,Copilot,AI",

  // Google 使用 BlackMatrix7 的 Google 规则
  // 不是 Loyalsoldier 的 google.txt
  "RULE-SET,Google,Google",

  // Microsoft 单独分组
  "RULE-SET,Microsoft,Microsoft",

  // Apple / iCloud
  "RULE-SET,icloud,Apple",
  "RULE-SET,apple,Apple",

  // 国外 / GFW / 非 CN 顶级域名
  "RULE-SET,proxy,Proxy",
  "RULE-SET,gfw,Proxy",
  "RULE-SET,tld-not-cn,Proxy",

  // 国内直连
  "RULE-SET,direct,Direct",
  "RULE-SET,lancidr,Direct,no-resolve",
  "RULE-SET,cncidr,Direct,no-resolve",
  "GEOSITE,CN,Direct",
  "GEOIP,LAN,Direct,no-resolve",
  "GEOIP,CN,Direct,no-resolve",

  // 兜底
  "MATCH,Final"
];

const groupBaseOption = {
  "hidden": false
};

// ==================== [ 程序主入口 ] ====================
function main(config) {
  const proxyCount = config?.proxies?.length ?? 0;
  if (proxyCount === 0) throw new Error("配置文件中未找到任何代理");

  // 1. 拆分订阅信息节点与正常代理节点
  const subscriptionInfoPatterns = [
    /(套餐|流量|剩余|到期|重置|充值|订阅|刷新|清零|结算|Expire|Traffic|Reset|Renew)/i,
    /(重置时间|重置日|刷新时间|刷新日|下次重置|下次刷新|到期时间|续费时间|更新时间|reset\s*(time|day)?|renew(?:al)?\s*(time|date|day)?)/i
  ];

  const noiseRegex = /(官网|异常)/i;

  const isSubscriptionInfoName = (name) =>
    subscriptionInfoPatterns.some(pattern => pattern.test(name));

  const getSubscriptionInfoPriority = (name) => {
    if (/(重置时间|重置日|刷新时间|刷新日|下次重置|下次刷新|reset\s*(time|day)?|renew(?:al)?\s*(time|date|day)?)/i.test(name)) return 3;
    if (/(到期|过期|续费|充值|套餐|结算|expire)/i.test(name)) return 2;
    if (/(剩余|流量|traffic|upload|download|total|used|用量)/i.test(name)) return 1;
    return 4;
  };

  const subscriptionInfoNames = config.proxies
    .map((proxy, index) => ({ "name": proxy.name, index }))
    .filter(proxy => isSubscriptionInfoName(proxy.name))
    .sort((a, b) => {
      const priorityA = getSubscriptionInfoPriority(a.name);
      const priorityB = getSubscriptionInfoPriority(b.name);
      if (priorityA !== priorityB) return priorityA - priorityB;
      return a.index - b.index;
    })
    .map(proxy => proxy.name);

  let validProxies = config.proxies.filter(
    p => !isSubscriptionInfoName(p.name) && !noiseRegex.test(p.name)
  );

  // 2. 地区优先排序逻辑
  const regionOrder = [
    ["🇭🇰", "香港", "HK", "Hong Kong", "HongKong"],
    ["🇯🇵", "日本", "JP", "Japan"],
    ["🇺🇸", "美国", "US", "United States", "America"],
    ["🇹🇼", "台湾", "TW", "Taiwan"],
    ["🇸🇬", "新加坡", "狮城", "SG", "Singapore"],
    ["🇰🇷", "韩国", "KR", "Korea"],
    ["🇬🇧", "英国", "伦敦", "UK", "United Kingdom", "Britain"],
    ["🇩🇪", "德国", "DE", "Germany"],
    ["🇫🇷", "法国", "FR", "France"],
    ["🇦🇺", "澳洲", "澳大利亚", "悉尼", "AU", "Australia"],
    ["🇨🇦", "加拿大", "CA", "Canada"],
    ["🇮🇳", "印度", "IN", "India"]
  ];

  validProxies.sort((a, b) => {
    const getRegionIndex = (name) => {
      const upperName = name.toUpperCase();
      for (let i = 0; i < regionOrder.length; i++) {
        if (regionOrder[i].some(keyword => upperName.includes(keyword.toUpperCase()))) return i;
      }
      return 999;
    };

    const indexA = getRegionIndex(a.name);
    const indexB = getRegionIndex(b.name);

    if (indexA !== indexB) return indexA - indexB;
    return a.name.localeCompare(b.name, "zh-CN", { numeric: true });
  });

  const sortedNames = validProxies.map(p => p.name);
  const allProxyNames = [...subscriptionInfoNames, ...sortedNames];

  const taiwanNames = validProxies
    .filter(p => /(台湾|tw|TW|🇹🇼)/i.test(p.name))
    .map(p => p.name);

  const nonTaiwanNames = sortedNames.filter(name => !taiwanNames.includes(name));

  const bahamutNames = taiwanNames.length > 0
    ? [...subscriptionInfoNames, ...taiwanNames, ...nonTaiwanNames]
    : allProxyNames;

  // 3. 注入 DNS
  config["dns"] = dnsConfig;

  // 4. 注入嗅探配置
  config["sniffer"] = {
    "enable": true,
    "parse-pure-ip": true,
    "sniff": {
      "HTTP": {
        "ports": [80, 8080],
        "override-destination": true
      },
      "TLS": {
        "ports": [443, 8443],
        "override-destination": true
      },
      "QUIC": {
        "ports": [443, 8443],
        "override-destination": true
      }
    },
    "skip-domain": [
      "Mijia Cloud",
      "+.apple.com"
    ]
  };

  // 5. 注入策略组：图标统一使用 Qure IconSet/Color 完整 URL
  config["proxy-groups"] = [
    {
      ...groupBaseOption,
      "name": "Proxy",
      "type": "select",
      "proxies": allProxyNames,
      "icon": "https://fastly.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Proxy.png"
    },

    {
      ...groupBaseOption,
      "name": "GitHub",
      "type": "select",
      "proxies": ["Proxy", "Direct", ...allProxyNames],
      "icon": "https://fastly.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/GitHub.png"
    },

    {
      ...groupBaseOption,
      "name": "Google",
      "type": "select",
      "proxies": ["Proxy", "Direct", ...allProxyNames],
      "icon": "https://fastly.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Google_Search.png"
    },

    {
      ...groupBaseOption,
      "name": "YouTube",
      "type": "select",
      "proxies": ["Proxy", "Direct", ...allProxyNames],
      "icon": "https://fastly.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/YouTube.png"
    },

    {
      ...groupBaseOption,
      "name": "Netflix",
      "type": "select",
      "proxies": ["Proxy", "Direct", ...allProxyNames],
      "icon": "https://fastly.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Netflix.png"
    },

    {
      ...groupBaseOption,
      "name": "Telegram",
      "type": "select",
      "proxies": ["Proxy", "Direct", ...allProxyNames],
      "icon": "https://fastly.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Telegram.png"
    },

    {
      ...groupBaseOption,
      "name": "AI",
      "type": "select",
      "proxies": ["Proxy", ...allProxyNames],
      "icon": "https://fastly.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/ChatGPT.png"
    },

    {
      ...groupBaseOption,
      "name": "TikTok",
      "type": "select",
      "proxies": ["Proxy", ...allProxyNames],
      "icon": "https://fastly.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/TikTok.png"
    },

    {
      ...groupBaseOption,
      "name": "Microsoft",
      "type": "select",
      "proxies": ["Direct", "Proxy", ...allProxyNames],
      "icon": "https://fastly.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Microsoft.png"
    },

    {
      ...groupBaseOption,
      "name": "Apple",
      "type": "select",
      "proxies": ["Direct", "Proxy", ...allProxyNames],
      "icon": "https://fastly.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Apple.png"
    },

    {
      ...groupBaseOption,
      "name": "Bahamut",
      "type": "select",
      "proxies": ["Proxy", ...bahamutNames],
      "icon": "https://fastly.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Bahamut.png"
    },

    {
      ...groupBaseOption,
      "name": "Bilibili",
      "type": "select",
      "proxies": ["Direct", "Proxy", ...allProxyNames],
      "icon": "https://fastly.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/bilibili.png"
    },

    {
      ...groupBaseOption,
      "name": "Spotify",
      "type": "select",
      "proxies": ["Proxy", "Direct", ...allProxyNames],
      "icon": "https://fastly.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Spotify.png"
    },

    {
      ...groupBaseOption,
      "name": "Direct",
      "type": "select",
      "proxies": ["DIRECT", "Proxy", ...allProxyNames],
      "icon": "https://fastly.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Direct.png"
    },

    {
      ...groupBaseOption,
      "name": "Final",
      "type": "select",
      "proxies": ["Proxy", "Direct", ...allProxyNames],
      "icon": "https://fastly.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Final.png"
    }
  ];

  // 6. 注入规则集和规则
  config["rule-providers"] = ruleProviders;
  config["rules"] = rules;

  return config;
}
