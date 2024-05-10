/** @type {import('next').NextConfig} */
const nextConfig = {
    // output: 'export', // Outputs a Single-Page Application (SPA).
    distDir: './dist', // Changes the build output directory to `./dist/`.
    images: {
        unoptimized: false, // Disables image optimization.
    },
    webpack(config) {
        config.module.rules.push({
          test: /\.(ogg|mp3|wav|mpe?g)$/i,
          use: [
            {
              loader: 'url-loader',
              options: {
                name: '[name]-[hash].[ext]',
              },
            },
          ],
        });
        return config;
      },
  }
   
  export default nextConfig