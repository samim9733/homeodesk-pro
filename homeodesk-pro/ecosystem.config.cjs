module.exports = {
  apps: [{
    name: "homeodesk-preview",
    script: "npx",
    args: "vite preview --port 4173 --host 0.0.0.0",
    cwd: "/home/z/my-project/homeodesk-pro",
    watch: false,
    restart_delay: 3000,
    max_restarts: 99
  }]
}
