export default {
  hash: true,
  title: 'demacia design',
  mode: 'site',
  favicon: 'logo.png',
  menus: {},
  navs: [
    null,
    {
      title: 'GitHub',
      path: 'https://github.com/ht1131589588/react-components',
    },
    {
      title: '更新日志',
      path: 'https://github.com/ht1131589588/react-components/releases',
    },
  ],
  extraBabelPlugins: [
    [
      'import',
      {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: 'css',
      },
    ],
    [
      'import',
      {
        libraryName: 'antd-mobile',
        libraryDirectory: 'es',
        style: 'css',
      },
      'antd-mobile',
    ],
  ],
  scripts: ['https://v1.cnzz.com/z_stat.php?id=1278653578&web_id=1278653578'],
  styles: ['a[title=站长统计] { display: none; }'],
  exportStatic: {},
};
