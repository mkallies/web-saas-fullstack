import React, { useEffect, useState } from 'react'
import { Heading, Stack, Text } from '@chakra-ui/core'
import { Router } from '@reach/router'
import { API } from 'aws-amplify'
import Layout from '../../components/layout'
import { AddNote } from '../../features/notes/add-note'
import { Details } from '../../features/notes/details'
import { Link as GatsbyLink } from 'gatsby'

const Notes = props => {
  console.log({ notes: props })

  const [notes, setNotes] = useState([])

  useEffect(() => {
    fetchNotes()
  }, [])

  const fetchNotes = async () => {
    try {
      const notes = await API.get('notes', '/notes', null)
      setNotes(notes)
    } catch (error) {
      console.log({ error })
    }
  }

  return (
    <Stack>
      <Heading>Notes</Heading>
      <Stack>
        {notes.map(note => (
          <Stack
            as={GatsbyLink}
            to={`/notes/${note.noteId}`}
            key={note.noteId}
            border="1px solid white"
            p={3}
          >
            <Text>{note.content}</Text>

            <Text>Created At: {note.createdAt}</Text>
          </Stack>
        ))}
      </Stack>
    </Stack>
  )
}

const HomePage = () => {
  return (
    <Layout>
      <Router basepath="/notes">
        <Details path="/:id" />
        <AddNote path="/add" />
        <Notes path="/" />
      </Router>
    </Layout>
  )
}

export default HomePage
