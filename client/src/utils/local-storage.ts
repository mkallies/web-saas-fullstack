import { isEmpty } from './helper-fns'

export declare type LSKeys = 'app:user'

const LS = {
  getItem: (key: LSKeys) => {
    if (!localStorage) return null

    const item = localStorage.getItem(key)

    if (isEmpty(item)) return null

    try {
      return JSON.parse(item)
    } catch (e) {
      if (localStorage[key]) {
        return item
      }

      console.error(`Error fetching key: '${key}' from localStorage`, e)
      return null
    }
  },
  setItem: (key: LSKeys, data: any) => {
    try {
      localStorage.setItem(key, JSON.stringify(data))
    } catch (e) {
      console.error(`Error setting ${key} in localStorage`, e)
    }
  },
  removeItem: (key: LSKeys) => {
    localStorage.removeItem(key)
  },
}

export default LS
