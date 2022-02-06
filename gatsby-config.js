require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  pathPrefix: "/eth-alchemy-gatsby",
}

module.exports = {
  siteMetadata: {
    title: 'alchemy-web3-test',
    description: 'Testing the Alchemy Web3 API',
    author: '@anderzaj',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-offline',
    'gatsby-plugin-postcss',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/images`,
      },
    },
  ],
};
