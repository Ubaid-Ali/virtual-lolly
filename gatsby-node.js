const path = require("path")
// const util = require("util") // it helps to console.log the data.

exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions
  const { data } = await graphql(`
    query myQuery {
      AllLollies {
        lollies {
          fillLollyTop
          fillLollyMiddle
          fillLollyBottom
          recipientName
          message
          sender
          lollyPath
        }
      }
    }
  `)

  data
    ? console.log(`===SUCCESS to get the data in "gatsby-node.js" file===`)
    : console.log(`===FAILED to get the data in "gatsby-node.js" file===`)

  data.AllLollies.lollies.forEach(({lollyPath}) => {
      createPage({
          path: `lollies/${lollyPath}`,
          component: path.resolve("./src/templates/dynamic_Lolly.tsx"),
          context: {
              lollyPath: lollyPath,
          },
      })
  })

  // console.log("data using util ===========\n", util.inspect(data, {showHidden: false, depth: null, colors: true}))
}
