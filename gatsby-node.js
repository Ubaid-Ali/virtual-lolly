const path = require("path");

exports.createPages = async ({ graphql, actions }) => {
  // const { createPage } = actions;
  // const { data } = await graphql(`
  //   query author {
  //     author {
  //       id
  //       name
  //       married
  //     }
  //   }
  // `);
  // data
  //   ? console.log(`response.data ================================== `, data)
  //   : console.log(`response.data ================================== FAILED TO DATA IN GATSBY-NODE.JS`);

  // response.data.allContentfulBlogPost.edges.forEach(edge => {
  //     createPage({
  //         path: `/blog/${edge.node.slug}`,
  //         component: path.resolve("./src/templates/blog-post.js"),
  //         context: {
  //             slug: edge.node.slug,
  //         },
  //     })
  // })
};
