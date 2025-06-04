import { Either, Error, error, Success, success } from './either'

function doSomething(shouldSuccess: boolean): Either<string, string> {
  if (shouldSuccess) {
    return success('success')
  } else {
    return error('error')
  }
}

describe('Either class', () => {
  it('should return success', async () => {
    const result = doSomething(true)

    expect(result).toBeInstanceOf(Success)
  })

  it('should return error', async () => {
    const result = doSomething(false)

    expect(result).toBeInstanceOf(Error)
  })
})
