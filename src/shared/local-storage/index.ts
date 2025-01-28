import { IMockLocalStorage, ILocaleStorageGet } from "./interface"

export const mockLocalStorage: IMockLocalStorage = {
  get<T>(args: ILocaleStorageGet<T>): T {
    const readValue = localStorage.getItem(args.key)
    if (!readValue) throw new Error("Failed to read property from mockLocaleStorage")

    const modifyReadValue = args.parse ? JSON.parse(readValue) : readValue

    return args.validate ? args.validate(modifyReadValue) : modifyReadValue
  },

  add<T>(key: string, value: T) {
    localStorage.setItem(key, JSON.stringify(value))
  },

  clear() {
    localStorage.clear()
  },
}
