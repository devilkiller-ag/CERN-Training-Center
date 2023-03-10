/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
  siteMetadata: {
    title: `CERN Training Center`,
    siteUrl: `https://www.yourdomain.tld`
  },
  plugins: [
    `gatsby-transformer-yaml`, // To get the data from data source (training-modules.yaml) to data layer
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/training-modules/`, // Path of data source
      },
    },
  ],
};