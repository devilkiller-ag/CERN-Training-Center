import { graphql } from "gatsby"
import * as React from "react"

const articleStyles = {
  marginBottom: 48,
}

const pageStyles = {
  color: "#232129",
  padding: 96,
  fontFamily: "-apple-system, Roboto, sans-serif, serif",
}
const headingStyles = {
  marginTop: 0,
  marginBottom: 64,
  maxWidth: 320,
}
const headingAccentStyles = {
  color: "#663399",
}
const paragraphStyles = {
  marginBottom: 18,
}

const listStyles = {
  marginBottom: 96,
  paddingLeft: 0,
}
const listItemStyles = {
  fontWeight: 300,
  fontSize: 24,
  maxWidth: 560,
  marginBottom: 30,
}

const linkStyle = {
  color: "#8954A8",
  fontWeight: "bold",
  fontSize: 16,
  verticalAlign: "5%",
}

const linkBarStyle = {
  display: "flex",
  gap: 15,
}

const IndexPage = ({ data }) => {
  return (
    <main style={pageStyles}>
      <h1 style={headingStyles}>
        CERN
        <br />
        <span style={headingAccentStyles}>— Training Center 📖</span>
      </h1>
      
      <ul style={listStyles}>
        {
          data.allTrainingModulesYaml.edges.map((edge) => {
            return (
              <article style={articleStyles} key={edge.node.id}>
                <h1 style={listItemStyles}>{edge.node.name}</h1>
                <p style={paragraphStyles}>{edge.node.description}</p>
                <div style={linkBarStyle}>
                  <a style={linkStyle} href={edge.node.repository}>Repository</a>
                  <a style={linkStyle} href={edge.node.repository}>Webpage</a>
                  {edge.node.videos ? <a style={linkStyle} href={edge.node.videos}>Videos</a> : ''}
                </div>
              </article>
            )
          })
        }
      </ul>
    </main>
  )
}

export const query = graphql`
  query {
    allTrainingModulesYaml {
      edges {
        node {
          id
          description
          name
          repository
          status
          videos
          webpage
          yamlId
        }
      }
    }
  }
`

export const Head = () => <title>CERN Training Center</title>

export default IndexPage

