import React from 'react'
import {
  Stack,
  Heading,
  Input,
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
} from '@chakra-ui/core'
import { useFormik } from 'formik'
import { Auth } from 'aws-amplify'
import { useUserService } from './user.service'

const Confirmation = () => {
  const { onLogin, currentState } = useUserService()

  const formik = useFormik({
    initialValues: {
      email: '',
      confirmationCode: '',
    },
    onSubmit: async values => {
      try {
        const user = await Auth.confirmSignUp(
          values.email,
          values.confirmationCode
        )
        console.log({ user })
      } catch (error) {
        console.log({ error })
      }
    },
  })

  return (
    <Stack width="100%" maxWidth="md">
      <Heading textAlign="center">Confirmation</Heading>
      <Stack mt={5} borderWidth="1px" rounded="md" py={3} px={5}>
        <FormControl my={6} as="form" onSubmit={formik.handleSubmit}>
          <FormLabel htmlFor="email">Email</FormLabel>
          <Input
            variant="flushed"
            type="email"
            id="email"
            onChange={formik.handleChange}
            value={formik.values.email}
          />

          <FormLabel htmlFor="email">Confirmation Code</FormLabel>
          <Input
            variant="flushed"
            type="text"
            id="confirmationCode"
            onChange={formik.handleChange}
            value={formik.values.confirmationCode}
          />
          <Button variantColor="teal" mt={5} type="submit">
            Verify
          </Button>
        </FormControl>
      </Stack>
    </Stack>
  )
}

export default Confirmation
