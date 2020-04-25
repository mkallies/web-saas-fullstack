import React from 'react'
import Layout from '../components/layout'
import SEO from '../components/seo'
import Login from '../features/user/login'
import { Auth } from 'aws-amplify'

const LoginPage = () => {
  const handleSubmit = async ({ email, password }) => {
    try {
      await Auth.signIn(email, password)
      console.log('LOgged in')
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <Layout>
      <SEO title="Login" />
      <Login onSubmit={handleSubmit} />
    </Layout>
  )
}

export default LoginPage
