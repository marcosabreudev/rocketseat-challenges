import { Question } from '../../enterprise/entities/question'
import { QuestionsRepository } from '../repositories/questions-repository'

interface SearchQuestionBySlugUseCaseRequest {
  slug: string
}

interface SearchQuestionBySlugUseCaseResponse {
  question: Question
}

export class SearchQuestionBySlugUseCase {
  constructor(private questionsRepository: QuestionsRepository) {}

  async execute({
    slug,
  }: SearchQuestionBySlugUseCaseRequest): Promise<SearchQuestionBySlugUseCaseResponse> {
    const question = await this.questionsRepository.findBySlug(slug)

    if (!question) {
      throw new Error('Question not found')
    }

    return { question }
  }
}
