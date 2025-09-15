// Script para analizar el bundle de JavaScript y detectar código sin usar
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = {
  webpack: (config, { isServer }) => {
    if (!isServer && process.env.ANALYZE === 'true') {
      config.plugins.push(
        new BundleAnalyzerPlugin({
          analyzerMode: 'static',
          openAnalyzer: false,
          reportFilename: './bundle-analysis.html',
        })
      );
    }
    
    // Optimización de chunks para reducir JavaScript sin usar
    config.optimization.splitChunks = {
      chunks: 'all',
      cacheGroups: {
        // Separar vendor libraries
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
          priority: 10,
        },
        // Separar componentes UI
        ui: {
          test: /[\\/]components[\\/]ui[\\/]/,
          name: 'ui-components',
          chunks: 'all',
          priority: 5,
        },
        // Separar componentes de página
        pages: {
          test: /[\\/]components[\\/](?!ui)[\\/]/,
          name: 'page-components',
          chunks: 'all',
          priority: 3,
        },
        // Chunk común
        common: {
          name: 'common',
          minChunks: 2,
          chunks: 'all',
          priority: 1,
        },
      },
    };
    
    return config;
  },
};
