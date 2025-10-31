module.exports = {
  apps: [
    {
      name: 'web',
      script: 'node_modules/next/dist/bin/next',
      args: 'start',
      cwd: './', // Your app directory
      env: {
        NODE_ENV: 'production',
        PORT: 3000, // Change if needed
      },
    },
  ],
};
