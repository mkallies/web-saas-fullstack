import React from 'react'
import {
  Stack,
  Flex,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Button,
  Input,
} from '@chakra-ui/core'
import { useFormik } from 'formik'
import { API } from 'aws-amplify'
import { s3Upload } from '../../utils/aws-fns'

export const AddNote = props => {
  console.log({ addnote: props })

  const formik = useFormik({
    initialValues: {
      content: '',
      file: null,
    },
    onSubmit: async values => {
      console.log({ values })
      try {
        const attachment = values.file ? await s3Upload(values.file) : null

        await API.post('notes', '/notes', {
          body: { content: values.content, attachment },
        })
      } catch (error) {
        console.log({ error })
      }
    },
  })

  const handleFileChange = (event: any) => {
    formik.setFieldValue('file', event.target.files[0])
  }

  return (
    <Stack>
      <FormControl as="form" onSubmit={formik.handleSubmit}>
        <FormLabel htmlFor="content">Content</FormLabel>
        <Input
          id="content"
          value={formik.values.content}
          onChange={formik.handleChange}
          type="textarea"
        />
        <FormLabel htmlFor="attachment">Attachment</FormLabel>
        <Input id="attachment" type="file" onChange={handleFileChange} />

        <Button variantColor="teal" mt={5} type="submit">
          Submit
        </Button>
      </FormControl>
    </Stack>
  )
}
