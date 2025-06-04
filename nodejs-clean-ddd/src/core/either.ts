// Left
export class Error<E> {
  readonly value: E

  constructor(value: E) {
    this.value = value
  }
}

// Right
export class Success<S> {
  readonly value: S

  constructor(value: S) {
    this.value = value
  }
}

export type Either<E, S> = Error<E> | Success<S>

export const error = <E, S>(value: E): Either<E, S> => {
  return new Error(value)
}

export const success = <E, S>(value: S): Either<E, S> => {
  return new Success(value)
}
