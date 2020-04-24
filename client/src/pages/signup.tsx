import React from 'react'
import { Box, Flex, Text, Link, Button } from '@chakra-ui/core'
import Layout from '../components/layout'
import SEO from '../components/seo'
import config from '../config'

const Signup = props => {
  console.log({ config, test: process.env })
  return (
    <Layout>
      <SEO title="Signup" />
      <Box>Signup Page</Box>
    </Layout>
  )
}

export default Signup
