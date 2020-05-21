import React from 'react'
import Layout from '../components/layout'
import SEO from '../components/seo'
import config from '../config'
import CreateAccount from '../features/user/create-account'

const Signup = props => {
  return (
    <Layout>
      <SEO title="Signup" />
      <CreateAccount />
    </Layout>
  )
}

export default Signup
