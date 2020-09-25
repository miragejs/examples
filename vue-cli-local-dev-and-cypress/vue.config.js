module.exports = {
  pluginOptions: {
    webpackBundleAnalyzer: {
      openAnalyzer: false,
    },
  },

  chainWebpack: (config) => {
    config.resolve.symlinks(false);

    /*
      Don't remember exactly why we added this, but it was causing the e2e tests to break
      since the app wasn't able to use mirage. I think we might have added this as an example
      of how to get rid of mirage in production - but I think we did the sideEffect: false
      thing in 1.40 since then, so not sure we still need this. Just want to leave it as a reference
      for a bit in case. Can delete if it doesn't come up soon.
    */
    // if (
    //   process.env.NODE_ENV === "production" &&
    //   process.env.MIRAGE_ENABLED !== "true"
    // ) {
    //   config.module
    //     .rule("exclude-mirage")
    //     .test(/node_modules\/miragejs\//)
    //     .use("null-loader")
    //     .loader("null-loader");
    // }
  },
};
