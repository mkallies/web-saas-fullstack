import React, { useState, useEffect } from 'react'
import { Stack, Spinner } from '@chakra-ui/core'
import { API, Storage } from 'aws-amplify'
import { EditDetails } from './edit-details'

/**
 *
 * Multiple states:
 * Fetching a note
 * Error fetching a note
 *
 * Saving a note
 * Error saving a note
 *
 * Deleting a note
 * Error deleting a note
 *
 */

export const Details = props => {
  console.log({ details: props })

  const [note, setNote] = useState()
  const [content, setContent] = useState()
  const { id } = props

  const loadNote = async () => {
    try {
      const note = await API.get('notes', `/notes/${id}`, null)
      const { content, attachment } = note

      if (attachment) {
        note.attachmentUrl = await Storage.vault.get(attachment)
      }

      setContent(content)
      setNote(note)
    } catch (error) {
      console.log({ error })
    }
  }

  useEffect(() => {
    loadNote()
  }, [id])

  console.log({ content, note })

  return (
    <Stack>
      {note ? (
        <EditDetails content={content} note={note} />
      ) : (
        <Spinner size="xl" />
      )}
    </Stack>
  )
}
