/** Imports */
import { graphql } from "gatsby"
import * as React from "react"
import { useState } from "react"

/** Styling */
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
  marginBottom: 24,
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

const barStyle = {
  display: "flex",
  gap: 15,
}

const statusDropdownDivStyles = {
  position: "relative",
  userSelect: "none",
  maxWidth: "80px",
  height: "28px",
  marginBottom: "115px",
}

const statusDropdownBtnStyles = {
  display: "flex",
  textAlign: "center",
  justifyContent: "space-around",
  alignItems: "center",
  cursor: "pointer",
  width: "100%",
  height: "100%",
  backgroundColor: "#f2f2f2",
}

const statusDropdownStyles = {
  position: "absolute",
  bottom: "-110px",
  width: "100%",
  zIndex: "9999999",
  backgroundColor: "#f2f2f2",
}

const statusDropdownOptionsStyles = {
  padding: "4px",
  cursor: "pointer",
}

/** Store Status Options */
const statusOptions = ["All", "Stable", "Beta" , "Alpha"]

const IndexPage = ({ data }) => {

  const [ isStatusDropdownActive, setIsStatusDropdownActive ] = useState(false);
  const [ selectedStatus, setSelectedStatus ] = useState('All');

  return (
    <main style={pageStyles}>
      <h1 style={headingStyles}>
        CERN
        <br />
        <span style={headingAccentStyles}>— Training Center 📖</span>
      </h1>

      <div className="statusDropdown" style={statusDropdownDivStyles}>
        <div className="statusDropdownButton" style={statusDropdownBtnStyles} onClick={() => {setIsStatusDropdownActive((prev) => !prev)}}>
          <span>{selectedStatus}</span>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"> {/** Dropdown Icon */}
            <path d="M8 11L3 5.99999L3.7 5.29999L8 9.59999L12.3 5.29999L13 5.99999L8 11Z" fill="#212529"/>
          </svg>
        </div>
        {
          isStatusDropdownActive && <div style={statusDropdownStyles} className="statusOptions">
            {
              statusOptions.map((option) => {
                return (
                  <div style={statusDropdownOptionsStyles} onClick={() => {
                    setSelectedStatus(option)
                    setIsStatusDropdownActive(false)
                  }}>
                    {option}
                  </div>
                )
              })
            }
          </div>
        }
      </div>

      <ul style={listStyles}>
        {
          selectedStatus.toLowerCase() === "all" ? 
          data.allTrainingModulesYaml.edges.map((edge) => {
            return (
              <article style={articleStyles} key={edge.node.id}>
                <h1 style={listItemStyles}>{edge.node.name}</h1>
                <p style={paragraphStyles}>{edge.node.description}</p>
                <div style={barStyle}>
                  <a style={linkStyle} href={edge.node.repository}>Repository</a>
                  <a style={linkStyle} href={edge.node.repository}>Webpage</a>
                  {edge.node.videos ? <a style={linkStyle} href={edge.node.videos}>Videos</a> : ''}
                </div>
              </article>
            )
          })
          :
          data.allTrainingModulesYaml.edges.map((edge) => {
            if (edge.node.status === selectedStatus.toLowerCase()) {
              return ( 
                <article style={articleStyles} key={edge.node.id}>
                  <h1 style={listItemStyles}>{edge.node.name}</h1>
                  <p style={paragraphStyles}>{edge.node.description}</p>
                  <div style={barStyle}>
                    <a style={linkStyle} href={edge.node.repository}>Repository</a>
                    <a style={linkStyle} href={edge.node.repository}>Webpage</a>
                    {edge.node.videos ? <a style={linkStyle} href={edge.node.videos}>Videos</a> : ''}
                  </div>
                </article>
              )
            }
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

