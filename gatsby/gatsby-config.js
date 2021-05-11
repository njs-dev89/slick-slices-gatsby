import dotenv from "dotenv"
dotenv.config()

export default {
  siteMetadata: {
    title: `Slicks Slices`,
    siteUrl: "https://gatsby.pizza",
    description: "The best pizza place in town!",
  },
  plugins: [
    "gatsby-plugin-styled-components",
    "gatsby-plugin-react-helmet",
    {
      resolve: "gatsby-source-sanity",
      options: {
        projectId: "g0fh3yt7",
        dataset: "production",
        watchMode: true,
        token: process.env.SANITY_TOKEN,
      },
    },
  ],
}
