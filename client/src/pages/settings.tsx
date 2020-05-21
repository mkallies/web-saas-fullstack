import React, { useState, useEffect } from 'react'
import { Stack, Text } from '@chakra-ui/core'
import Layout from '../components/layout'
import config from '../config/index'

declare global {
  interface Window {
    Stripe: any
  }
}

const Settings = () => {
  const [stripe, setStripe] = useState(null)

  useEffect(() => {
    setStripe(window.Stripe(config.STRIPE_KEY))
  }, [])

  return (
    <Layout>
      ><Text>Settings </Text>
    </Layout>
  )
}

export default Settings
