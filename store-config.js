function withStoreConfig(nextConfig = {}) {
  const features = nextConfig.features || {}
  delete nextConfig.features

  nextConfig.env = nextConfig.env || {}

  Object.entries(features).forEach(([key, value]) => {
    if (value) {
      nextConfig.env[`FEATURE_${key.toUpperCase()}_ENABLED`] = 'true'
    } else {
      nextConfig.env[`FEATURE_${key.toUpperCase()}_ENABLED`] = 'false'
    }
  })

  return nextConfig
}

module.exports = { withStoreConfig }
