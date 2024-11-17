const path = require("path");
const HTMLPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: {
    index: "./src/index.tsx",
    background: "./src/app/background.ts",
    sidepanel: "./src/features/side_panel/index.tsx",
    options: "./src/features/options/index.tsx",
    popup: "./src/features/popup/index.tsx",
  },
  mode: "production",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: "ts-loader",
            options: {
              compilerOptions: { noEmit: false },
            },
          },
        ],
        exclude: /node_modules/,
      },
      {
        exclude: /node_modules/,
        test: /\.css$/i,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
    ],
  },
  plugins: [
    new CopyPlugin({
      patterns: [{ from: "manifest.json", to: "manifest.json" }], // Adjusted path
    }),
    ...getHtmlPlugins(["index", "sidepanel", "options", "popup"]),
  ],
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    path: path.join(__dirname, "dist"),
    filename: "js/[name].js",
    publicPath: "/",
  },
};

function getHtmlPlugins(chunks) {
  return chunks.map(
    (chunk) =>
      new HTMLPlugin({
        title: "React extension",
        filename: `${chunk}.html`,
        chunks: [chunk],
      })
  );
}
