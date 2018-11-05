import { pctDecChars } from "uri-js";

export default {
  // 趋势指标
  trendIndicator: [
    {
      code: 1,
      title: '浏览次数'
    },
    {
      code: 2,
      title: '访客次数'
    },
    {
      code: 3,
      title: 'IP'
    },
    {
      code: 4,
      title: '新独立访客数'
    },
    {
      code: 5,
      title: '平均访客深度'
    },
    {
      code: 6,
      title: '平均访客时长'
    },
    {
      code: 7,
      title: '跳出率'
    },
    {
      code: 8,
      title: '浏览量占比'
    },
    {
      code: 9,
      title: '新访客比率'
    }
  ],
  // 设备端
  deviceSide: [
    {
      code: 1,
      title: 'PC计算机'
    },
    {
      code: 2,
      title: '移动端'
    }
  ],
  // 访客
  visitor: [
    {
      code: 1,
      title: '新客户'
    },
    {
      code: 2,
      title: '老客户'
    }
  ],
  // 网站类型
  webType: [
    {
      code: 1,
      title: '全部'
    },
    {
      code: 2,
      title: '搜索引擎'
    },
    {
      code: 3,
      title: '网站导航'
    },
    {
      code: 4,
      title: '外部链接'
    }
  ]
}
