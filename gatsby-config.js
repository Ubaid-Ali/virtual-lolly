module.exports = {
  /* Your site config here */
  plugins: [
    {
      resolve: "gatsby-source-graphql",
      options: {
        typeName: "Lolly",
        fieldName: "AllLollies",
        url: `${process.env.URL}/.netlify/functions/hello`,
        // refetchInterval: 60 // Refresh every 60 seconds for new data
      }
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
