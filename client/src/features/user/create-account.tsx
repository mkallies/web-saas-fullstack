import React from 'react'
import {
  Stack,
  Heading,
  Input,
  Button,
  FormControl,
  FormLabel,
  Flex,
  FormErrorMessage,
} from '@chakra-ui/core'
import { useFormik } from 'formik'
import { useUserService } from './user.service'

const CreateAccount = () => {
  const { onSignup, currentState } = useUserService()

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: values => {
      onSignup({
        email: values.email,
        password: values.password,
      })
    },
  })

  return (
    <Stack width="100%" maxWidth="md">
      <Heading textAlign="center">Signup</Heading>
      <Stack mt={5} borderWidth="1px" rounded="md" py={3} px={5}>
        <FormControl
          my={6}
          as="form"
          isInvalid={Boolean(currentState.context.error)}
          onSubmit={formik.handleSubmit}
        >
          <FormLabel htmlFor="email">Email</FormLabel>
          <Input
            variant="flushed"
            type="email"
            id="email"
            onChange={formik.handleChange}
            value={formik.values.email}
            mb={4}
          />
          <FormLabel htmlFor="password">Password</FormLabel>
          <Input
            variant="flushed"
            type="password"
            id="password"
            onChange={formik.handleChange}
            value={formik.values.password}
            mb={4}
          />

          <FormErrorMessage>{currentState.context.error}</FormErrorMessage>
          <Flex justifyContent="flex-end">
            <Button variantColor="teal" mt={5} type="submit" ml="auto">
              Submit
            </Button>
          </Flex>
        </FormControl>
      </Stack>
    </Stack>
  )
}

export default CreateAccount
