import React, { useMemo, useEffect, useState } from 'react'
import { useMachine } from '@xstate/react'
import { Auth } from 'aws-amplify'
import authMachine, { events } from './auth.machine'
import LS from '../../utils/local-storage'

type UserContext = {
  onLogin: (payload) => {}
  onLogout: () => {}
  onSignup: (payload) => {}
  onPasswordChange: () => {}
  onResetPassword: () => {}
  currentState: any
  send: any
}

const UserContext = React.createContext<UserContext>(undefined)

function UserProvider(props) {
  const [currentState, send] = useMachine(authMachine, {
    context: {
      user: LS.getItem('app:user'),
    },
  })

  const onLoad = async () => {
    try {
      const test = await Auth.currentSession()
      console.log({ test })
    } catch (error) {
      console.log({ userproverr: error })
      if (error !== 'No current user') {
        console.log({ currentSession: error })
      }
    }
  }

  useEffect(() => {
    onLoad()
  }, [])

  const onLogin = ({ email, password }) => {
    send({ type: events.SUBMIT, payload: { email, password } })
  }

  const onLogout = () => {
    send(events.LOG_OUT)
  }

  const onSignup = ({ email, password }) => {
    send({ type: events.SUBMIT, payload: { email, password } })
  }

  const onPasswordChange = () => {}

  const onResetPassword = () => {}

  const value = useMemo(
    () => ({
      currentState,
      send,
      onResetPassword,
      onLogin,
      onLogout,
      onSignup,
      onPasswordChange,
    }),
    [currentState]
  )

  return <UserContext.Provider value={value} {...props} />
}

function useUserService() {
  const userCtx = React.useContext(UserContext)

  if (!userCtx) {
    throw new Error(`useUserService must be used within an UserProvider`)
  }

  return { ...userCtx }
}

export { UserProvider, useUserService }
