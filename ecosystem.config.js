module.exports = {
  apps: [
    {
      name: 'prod',
      script: 'node_modules/.bin/nuxt-start',
      args: '-c /var/www/html/nuxt.config.js',
      instances: 'max',
      exec_mode: 'cluster',
      merge_logs: true,
      autorestart: true,
      watch: false,
      max_memory_restart: '128M'
    }
  ]
}
