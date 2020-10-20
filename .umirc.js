// let base = 'http://192.168.100.158:9003';

let base = 'http://tangmix.com:9013';
export default {
  // publicPath: '/dist/',
  publicPath: '/static/',
  theme: {
    'primary-color': 'rgba(85, 104, 186, 1)',
  },
  plugins: [
    ['umi-plugin-react', {
      antd: true,
      // dynamicImport: {
      //   loadingComponent: './framework/loading',
      //   webpackChunkName: true,
      // },
      dll: {
        include: [
          'antd',
          'react',
          'react-dom',
        ],
      },
    }],
  ],
  proxy: {
    '/rest': {
      target: base + '/rest',
      pathRewrite: { '^/rest': '' },
      changeOrigin: true,
    },
    '/api': {
      target: base + '/api',
      pathRewrite: { '^/api': '' },
      changeOrigin: true
    },
  },

};
