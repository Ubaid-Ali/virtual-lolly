module.exports = {
  /* Your site config here */
  plugins: [
    {
      resolve: "gatsby-source-graphql",
      options: {
        typeName: "Lolly",
        fieldName: "AllLollies",
        url: "https://virtual-lolly-u.netlify.app/.netlify/functions/hello",
        // url:`${process.env.URL}/.netlify/functions/makeLolly`,
        refetchInterval: 60 // Refresh every 60 seconds for new data
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
