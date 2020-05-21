import React from 'react'
import Layout from '../components/layout'
import SEO from '../components/seo'
import Login from '../features/user/login'

const LoginPage = () => {
  return (
    <Layout>
      <SEO title="Login" />
      <Login />
    </Layout>
  )
}

export default LoginPage
