export type ILocaleStorageGet<T = unknown> = {
  key: string
  parse?: boolean
  validate?: (value: string) => T
}

export interface IMockLocalStorage {
  get<T>(args: ILocaleStorageGet<T>): T
  add<T>(key: string, value: T): void
  clear(): void
}