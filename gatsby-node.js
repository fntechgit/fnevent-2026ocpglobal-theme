const fs = require("fs");
const path = require("path");
const webpack = require("webpack");

exports.onCreateWebpackConfig = ({ actions }) => {
  const heroDirectory = path.dirname(
    require.resolve("@openeventkit/event-site/src/components/MarketingHero")
  );

  // Explicitly wire this event's hero in both browser and SSR builds. The
  // deployed build rendered the upstream component despite the theme shadow.
  actions.setWebpackConfig({
    plugins: [
      new webpack.NormalModuleReplacementPlugin(/^\.\/MainColumn$/, (resource) => {
        if (resource.context === heroDirectory) {
          resource.request = path.resolve(
            __dirname,
            "src/@openeventkit/event-site/components/MarketingHero/MainColumn.js"
          );
        }
      })
    ]
  });
};

exports.onPostBuild = ({ reporter }) => {
  const siteSettings = require("./src/content/site-settings/index.json");
  if (siteSettings.maintenanceMode?.enabled) return;

  const homepage = fs.readFileSync(path.join(__dirname, "public/index.html"), "utf8");
  if (!homepage.includes('data-ocp-hero="true"')) {
    reporter.panicOnBuild("The generated homepage is missing the OCP custom hero.");
  }
};
