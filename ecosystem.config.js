module.exports = {
  apps: [
    {
      name: 'radioju-api',
      script: 'src/bin/www',
      instances: 1,
      autorestart: true,
      watch: false,
      time: true,
      node_args: '--require dotenv/config',
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
};
