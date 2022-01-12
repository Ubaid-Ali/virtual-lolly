module.exports = {
  /* Your site config here */
  plugins: [
    // {
    //   resolve: "gatsby-source-graphql",
    //   options: {
    //     typeName: "author",
    //     fieldName: "author",
    //     url:"http://localhost:8888/.netlify/functions/makeLolly",
    //     // url: `https://trusting-turing-8cd474.netlify.app/.netlify/functions/makeLolly`,
    //     // refetchInterval: 10 // Refresh every 60 seconds for new data
    //   }
    // },
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [
          `Dancing Script`,
          `Acme`,
          `Satisfy`,
          `source sans pro\:300,400,400i,700` // you can also specify font weights and styles
        ],
        display: 'swap'
      }
    }
  ],
}
