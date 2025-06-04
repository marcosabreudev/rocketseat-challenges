/* eslint-disable @typescript-eslint/ban-types */
import { Either, error, success } from '@/core/either'
import { AnswersRepository } from '../repositories/answers-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { NotAllowedError } from './errors/not-allowed-error'

interface DeleteAnswerUseCaseRequest {
  answerId: string
  authorId: string
}

type DeleteAnswerUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {}
>

export class DeleteAnswerUseCase {
  constructor(private answersRespotiry: AnswersRepository) {}

  async execute({
    answerId,
    authorId,
  }: DeleteAnswerUseCaseRequest): Promise<DeleteAnswerUseCaseResponse> {
    const answer = await this.answersRespotiry.findById(answerId)

    if (!answer) {
      return error(new ResourceNotFoundError())
    }

    if (answer.authorId.toString() !== authorId) {
      return error(new NotAllowedError())
    }

    await this.answersRespotiry.delete(answer)

    return success({})
  }
}
