const path = require(`path`)

module.exports = {
  /* Your site config here */
  plugins: [
    {
      resolve: "gatsby-source-graphql",
      options: {
        // Arbitrary name for the remote schema Query type
        typeName: "Lolly",
        // Field under which the remote schema will be accessible. You'll use this in your Gatsby query
        fieldName: "lollies",
        // Url to query from
        url: "https://virtual-lolly-u.netlify.app/.netlify/functions/hello",
        // url: "http://localhost:8888/.netlify/functions/hello",
        refetchInterval: 60, // Refresh every 60 seconds for new data
      },
    },
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [
          `Dancing Script`,
          `Acme`,
          `Satisfy`,
          `source sans pro\:300,400,400i,700`, // you can also specify font weights and styles
        ],
        display: "swap",
      },
    },
  ],
}
