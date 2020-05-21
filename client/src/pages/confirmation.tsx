import React from 'react'
import Layout from '../components/layout'
import SEO from '../components/seo'
import Confirmation from '../features/user/confirmation'

const ConfirmationPage = () => {
  return (
    <Layout>
      <SEO title="Confirmation" />
      <Confirmation />
    </Layout>
  )
}

export default ConfirmationPage
