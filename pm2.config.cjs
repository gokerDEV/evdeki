module.exports = {
  apps: [
    {
      name: "evdeki",
      cwd: "/srv/apps/evdeki/current",
      script: "/home/goker/.bun/bin/bun",
      args: "server.js",
      interpreter: "none",

      env: {
        NODE_ENV: "production",
        PORT: "8000",
      },

      autorestart: true,
      restart_delay: 3000,
      max_restarts: 10,
      time: true,
    },
  ],
};
