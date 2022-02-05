require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  siteMetadata: {
    title: 'alchemy-web3-test',
    description: 'Testing the Alchemy Web3 API',
    author: '@anderzaj',
  },
  plugins: [
    'gatsby-plugin-postcss',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-image',
    'gatsby-plugin-offline',
    'gatsby-plugin-postcss',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'gatsby-tailwind-template',
        short_name: 'Gatsby with Tailwind Template',
        start_url: '/',
        background_color: '#ffffff',
        theme_color: '#039Be5',
        display: 'minimal-ui',
        icon: 'src/images/icon.png',
      },
    },
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        output: '/robots.txt',
        sitemap: null,
        // Internal product (private) => don't index nor follow
        policy: [{ userAgent: '*', disallow: '/' }],
      },
    },
  ],
};
