import { InMemoryQuestionsRepository } from 'teste/repositories/in-memory-questions-repository'
import { makeQuestion } from 'teste/factories/make-question'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'
import { SearchQuestionBySlugUseCase } from './search-question-by-slug'
import { Success } from '@/core/either'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: SearchQuestionBySlugUseCase

describe('Search Question By Slug Use Case', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new SearchQuestionBySlugUseCase(inMemoryQuestionsRepository)
  })

  it('should be able to search a question by slug', async () => {
    const newQuestion = makeQuestion({
      title: 'Example Question',
    })
    await inMemoryQuestionsRepository.create(newQuestion)

    const result = await sut.execute({ slug: 'example-question' })

    if (result instanceof Success) {
      expect(result.value.question).toEqual(newQuestion)
    }
  })

  it('should thow an error when search question where not exists', async () => {
    const response = await sut.execute({ slug: '' })

    expect(response.value).toBeInstanceOf(ResourceNotFoundError)
  })
})
