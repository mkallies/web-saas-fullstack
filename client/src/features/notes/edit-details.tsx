import React from 'react'
import {
  Link,
  Button,
  Stack,
  Input,
  Text,
  FormControl,
  FormLabel,
  FormErrorMessage,
} from '@chakra-ui/core'
import { useFormik } from 'formik'
import { API } from 'aws-amplify'
import { s3Upload } from '../../utils/aws-fns'
import { navigate } from '@reach/router'

type EditDetailsProps = {
  content: string
  note: any
}

const formatFilename = (str: string) => {
  return str.replace(/^\w+-/, '')
}

export const EditDetails = ({ content, note }: EditDetailsProps) => {
  const formik = useFormik({
    initialValues: {
      content,
      file: null,
    },
    onSubmit: async values => {
      console.log({ values })
      try {
        const attachment = values.file ? await s3Upload(values.file) : null

        await API.put('notes', `/notes/${note.noteId}`, {
          body: {
            content: values.content,
            attachment: attachment || note.attachment,
          },
        })
      } catch (error) {
        console.log({ error })
      }
    },
  })

  const handleFileChange = (event: any) => {
    formik.setFieldValue('file', event.target.files[0])
  }

  const handleDelete = async () => {
    try {
      await API.del('notes', `/notes/${note.noteId}`, null)
      navigate('/')
    } catch (error) {
      console.error(error)
    }
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
        {note.attachment && (
          <Stack>
            <Text>Attachment</Text>
            <Link isExternal href={note.attachmentUrl}>
              {formatFilename(note.attachment)}
            </Link>
          </Stack>
        )}
        <FormLabel htmlFor="attachment">Attachment</FormLabel>
        <Input id="attachment" type="file" onChange={handleFileChange} />
        <Button variantColor="teal" mt={5} type="submit">
          Save
        </Button>
      </FormControl>

      <Button variantColor="red" onClick={handleDelete}>
        Delete
      </Button>
    </Stack>
  )
}
