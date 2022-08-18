module.exports = {
  apps: [
    {
      name: 'radioju-api',
      script: 'src/bin/www',
      watch: false,
      autorestart: true,
      time: false,
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
};
