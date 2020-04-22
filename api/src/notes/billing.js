import stripePackage from 'stripe'
import { handler } from '../utils'

function calculateCost(storage) {
  // eslint-disable-next-line no-nested-ternary
  const rate = storage <= 10 ? 4 : storage <= 100 ? 2 : 1

  return rate * storage * 100
}

export const main = handler(async (event) => {
  const { storage, source } = JSON.parse(event.body)
  const amount = calculateCost(storage)
  const description = 'Scratch charge'

  // Load our secret key from the  environment variables
  const stripe = stripePackage(process.env.stripeSecretKey)

  await stripe.charges.create({
    source,
    amount,
    description,
    currency: 'usd',
  })
  return { status: true }
})
