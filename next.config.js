module.exports = {
  target: 'serverless',
  webpack: function (config) {
    config.module.rules.push({ test: /\.md$/, use: 'raw-loader' })
    config.module.rules.push({ test: /\.yml$/, use: 'raw-loader' })
    config.module.rules.push({
      test: /\.(jpe?g|png)$/,
      use: {
        loader: 'url-loader',
        options: {
          limit: 8192,
          publicPath: '/_next/static/',
          outputPath: 'static/'
        }
      }
    })
    config.module.rules.push({
      test: /\.svg$/,
      issuer: {
        test: /\.(js|ts)x?$/
      },
      use: ['@svgr/webpack']
    })
    return config
  }
}
