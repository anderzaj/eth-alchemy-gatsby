module.exports = {
  siteMetadata: {
    title: 'gatsby-tailwind-template',
    description: 'A starter template for Gatsby with Tailwind.',
    author: '@andreskemeny',
    siteUrl: 'https://www.yourdomain.tld',
  },
  plugins: [
    'gatsby-plugin-postcss',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-image',
    'gatsby-plugin-offline',
    'gatsby-plugin-typescript',
    'gatsby-plugin-postcss',
    'gatsby-plugin-tsconfig-paths',
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
