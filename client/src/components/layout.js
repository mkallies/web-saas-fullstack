import React from 'react'
import PropTypes from 'prop-types'
import { useStaticQuery, graphql } from 'gatsby'
import { theme, ThemeProvider, CSSReset, Stack } from '@chakra-ui/core'
import { Amplify } from 'aws-amplify'
import { Header } from './header.tsx'
import config from '../config/index.ts'

Amplify.configure({
  Auth: {
    mandatorySignIn: true,
    region: config.cognito.REGION,
    userPoolId: config.cognito.USER_POOL_ID,
    identityPoolId: config.cognito.IDENTITY_POOL_ID,
    userPoolWebClientId: config.cognito.APP_CLIENT_ID,
  },
  Storage: {
    region: config.s3.REGION,
    bucket: config.s3.BUCKET,
    identityPoolId: config.cognito.IDENTITY_POOL_ID,
  },
  API: {
    endpoints: [
      {
        name: 'notes',
        endpoint: config.apiGateway.URL,
        region: config.apiGateway.REGION,
      },
    ],
  },
})

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  console.log({ data })

  return (
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <CSSReset />
        <Header />

        <Stack as="main" maxWidth="2xl" mt="5rem">
          {children}
        </Stack>
        <footer>
          © {new Date().getFullYear()}, Built with
          {` `}
          <a href="https://www.gatsbyjs.org">Gatsby</a>
        </footer>
      </ThemeProvider>
    </React.StrictMode>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
