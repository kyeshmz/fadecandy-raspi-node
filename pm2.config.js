module.exports = {
  apps: [
    {
      name: "fadecandy-raspi",
      script: "ts-node",
      args: "./examples/server.ts",
      cwd: "./",
      env: {
        PORT: 4001,
        NODE_ENV: "development",
      },
      env_production: {
        PORT: 4001,
        NODE_ENV: "production",
      },
    },
  ],
};
