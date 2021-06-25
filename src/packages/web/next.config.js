module.exports = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/api/v2/:path*",
        destination: "http://localhost:3031/api/v2/:path*"
      }
    ];
  }
}
