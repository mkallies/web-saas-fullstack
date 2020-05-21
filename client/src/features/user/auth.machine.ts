import { Machine, assign } from 'xstate'
import { Auth } from 'aws-amplify'
// import axios from 'axios'
import LS from '../../utils/local-storage'

interface AuthContext {
  user?: string | null
  error?: any
}

const authStates = {
  init: 'init',
  login: 'login',
  loggedIn: 'loggedIn',
  loggingOut: 'loggingOut',
}

const events = {
  SUBMIT: 'submit',
  LOG_OUT: 'logout',
}

// SERVICES

const login = async (ctx: any, evt: any) => {
  console.log({ login: evt })
  const { email, password } = evt.payload
  return Auth.signIn(email, password)
}

const signup = async (ctx: any, evt: any) => {
  console.log({ signup: evt })
  const { email, password } = evt.payload
  return Auth.signUp(email, password)
}

const logout = async (ctx: any, evt: any) => {
  return Auth.signOut()
}

// OPTIONS

const authOpts = {
  services: {
    login,
    signup,
    logout,
  },
  actions: {
    removeUser: assign(() => {
      LS.setItem('app:user', null)
      return {
        user: undefined,
      }
    }),
    removeError: assign({
      error: null,
    }),
    saveUser: assign((ctx, evt: any) => {
      console.log({ savedUser: evt })
      LS.setItem('app:user', evt.data)

      return {
        user: evt.payload,
      }
    }),
    cacheError: assign((ctx, evt: any) => {
      console.log({ error: evt })

      return {
        error: evt.data?.message,
      }
    }),
    cacheUser: assign((ctx, evt: any) => {
      console.log({ cachedUser: evt })
      LS.setItem('app:user', evt.data)

      return {
        user: evt.payload,
      }
    }),
  },
  guards: {
    isLoggedIn: (ctx: AuthContext) => {
      console.log({ user: ctx.user })
      return Boolean(ctx.user)
    },
    onLoginPage: (ctx: AuthContext) => {
      return window?.location.pathname === '/login'
    },
    onSignupPage: (ctx: AuthContext) => {
      return window?.location.pathname === '/signup'
    },
  },
}

const authMachine = Machine<any>(
  {
    id: 'login',
    initial: 'init',
    context: {
      user: null,
      error: null,
    },
    states: {
      init: {
        on: {
          '': [
            {
              cond: 'isLoggedIn',
              target: 'loggedIn',
            },
            {
              cond: 'onLoginPage',
              target: 'login',
            },
            {
              cond: 'onSignupPage',
              target: 'signup',
            },
          ],
        },
      },
      login: {
        id: 'login',
        initial: 'idle',
        states: {
          idle: {
            on: {
              [events.SUBMIT]: 'fetching',
            },
          },
          fetching: {
            invoke: {
              id: 'auth',
              src: 'login',
              onDone: {
                target: '#loggedIn',
                actions: ['saveUser'],
              },
              onError: {
                target: 'error',
                actions: ['cacheError'],
              },
            },
          },
          error: {
            on: {
              [events.SUBMIT]: 'fetching',
            },
            exit: 'removeError',
          },
        },
      },
      signup: {
        id: 'signup',
        initial: 'idle',
        states: {
          idle: {
            on: {
              [events.SUBMIT]: 'fetching',
            },
          },
          fetching: {
            invoke: {
              id: 'auth',
              src: 'signup',
              onDone: {
                target: '#loggedIn',
                actions: ['cacheUser'],
              },
              onError: {
                target: 'error',
                actions: ['cacheError'],
              },
            },
          },
          error: {
            on: {
              [events.SUBMIT]: 'fetching',
            },
            exit: 'removeError',
          },
        },
      },
      loggedIn: {
        id: 'loggedIn',
        on: {
          [events.LOG_OUT]: 'loggingOut',
        },
      },
      loggingOut: {
        id: 'loggingOut',
        invoke: {
          id: 'logout',
          src: 'logout',
          onDone: {
            target: 'init',
            actions: ['removeUser'],
          },
          onError: {
            target: 'login',
          },
        },
      },
    },
  },
  authOpts
)

export { authStates, events }

export default authMachine
