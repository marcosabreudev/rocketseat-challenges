import { Either, error, success } from '@/core/either'
import { Question } from '../../enterprise/entities/question'
import { QuestionsRepository } from '../repositories/questions-repository'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'

interface SearchQuestionBySlugUseCaseRequest {
  slug: string
}

type SearchQuestionBySlugUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    question: Question
  }
>

export class SearchQuestionBySlugUseCase {
  constructor(private questionsRepository: QuestionsRepository) { }

  async execute({
    slug,
  }: SearchQuestionBySlugUseCaseRequest): Promise<SearchQuestionBySlugUseCaseResponse> {
    const question = await this.questionsRepository.findBySlug(slug)

    if (!question) {
      return error(new ResourceNotFoundError())
    }

    return success({ question })
  }
}
