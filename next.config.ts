import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack(config) {
    // Grab the existing rule that handles file imports
    const fileLoaderRule = config.module.rules.find((rule: any) =>
      rule.test?.test?.(".mp4")
    );

    config.module.rules.push(
      // Reapply the existing rule, but only for MP4 imports ending in ?url
      {
        ...fileLoaderRule,
        test: /\.mp4$/i,
        resourceQuery: /url/, // *.mp4?url
      },
      // Add a new rule for handling MP4 files as binary assets
      {
        test: /\.mp4$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: {
          not: [...(fileLoaderRule.resourceQuery?.not || []), /url/],
        }, // exclude if *.mp4?url
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[hash].[ext]",
              outputPath: "static/media/",
            },
          },
        ],
      }
    );

    // Modify the file loader rule to ignore *.mp4, since we have it handled now.
    if (fileLoaderRule) {
      fileLoaderRule.exclude = /\.mp4$/i;
    }

    return config;
  },
};

export default nextConfig;
