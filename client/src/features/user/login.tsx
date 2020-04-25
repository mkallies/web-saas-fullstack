import React, { useState } from 'react'
import {
  Stack,
  Heading,
  Input,
  Button,
  FormControl,
  FormLabel,
  // FormErrorMessage
} from '@chakra-ui/core'

type SubmitPayload = {
  email: string
  password: string
}

type LoginProps = {
  onSubmit: ({ email, password }: SubmitPayload) => void
}

const Login = ({ onSubmit }: LoginProps) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onSubmit({ email, password })
    e.currentTarget.reset()
    setEmail('')
  }

  return (
    <Stack width="100%" maxWidth="md">
      <Heading textAlign="center">Login</Heading>
      <Stack mt={5} borderWidth="1px" rounded="md" py={3} px={5}>
        <FormControl my={6} as="form" onSubmit={handleSubmit}>
          <FormLabel htmlFor="email">Email</FormLabel>
          <Input
            variant="flushed"
            type="email"
            id="email"
            onChange={(e: any) => setEmail(e.target.value)}
            value={email}
            isRequired
          />
          <FormLabel htmlFor="password">Password</FormLabel>
          <Input
            variant="flushed"
            type="password"
            id="password"
            onChange={(e: any) => setPassword(e.target.value)}
            value={password}
            isRequired
          />
          <Button variantColor="teal" mt={5} type="submit">
            Submit
          </Button>
        </FormControl>
      </Stack>
    </Stack>
  )
}

export default Login
