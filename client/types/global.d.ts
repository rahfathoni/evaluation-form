export {}

declare global {
  interface IApiResponse<T> {
    status: string
    result: T
  }
}
