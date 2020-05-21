import { Machine, assign } from 'xstate'

const events = {
  FETCH: 'fetch',
  RETRY: 'retry',
}

const fetchOpts = {
  actions: {
    cacheFetched: assign((_, evt: any) => {
      console.log({ cacheFetched: evt })

      return {
        data: evt.data,
      }
    }),
    cacheError: assign((_, evt: any) => {
      console.log({ cacheError: evt })

      return {
        error: evt.data,
      }
    }),
    removeError: assign({ error: null }),
  },
}

const fetchMachine = Machine(
  {
    id: 'fetch',
    initial: 'idle',
    context: {
      data: undefined,
      error: undefined,
    },
    states: {
      idle: {
        on: { [events.FETCH]: 'loading' },
      },
      loading: {
        entry: 'clearError',
        invoke: {
          src: 'fetchData',
          onDone: {
            target: 'success',
            actions: 'cacheFetched',
          },
          onError: {
            target: 'failure',
            actions: 'cacheError',
          },
        },
      },
      success: {
        entry: 'notifySuccess',
        type: 'final',
      },
      failure: {
        on: {
          [events.RETRY]: 'loading',
        },
      },
    },
  },
  fetchOpts
)

export { fetchMachine, events }
