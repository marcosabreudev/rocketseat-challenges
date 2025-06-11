import { InMemoryQuestionsRepository } from 'teste/repositories/in-memory-questions-repository'
import { makeQuestion } from 'teste/factories/make-question'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'
import { SearchQuestionBySlugUseCase } from './search-question-by-slug'
import { InMemoryQuestionAttachmentsRepository } from 'teste/repositories/in-memory-question-attachments-repository'

let inMemoryQuestionAttachmentsRepository: InMemoryQuestionAttachmentsRepository
let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: SearchQuestionBySlugUseCase

describe('Search Question By Slug Use Case', () => {
  beforeEach(() => {
    inMemoryQuestionAttachmentsRepository =
      new InMemoryQuestionAttachmentsRepository()
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository(
      inMemoryQuestionAttachmentsRepository,
    )
    sut = new SearchQuestionBySlugUseCase(inMemoryQuestionsRepository)
  })

  it('should be able to search a question by slug', async () => {
    const newQuestion = makeQuestion({
      title: 'Example Question',
    })
    await inMemoryQuestionsRepository.create(newQuestion)

    const result = await sut.execute({ slug: 'example-question' })

    expect(result.value).toMatchObject({
      question: expect.objectContaining({
        title: newQuestion.title,
      }),
    })
  })

  it('should thow an error when search question where not exists', async () => {
    const response = await sut.execute({ slug: '' })

    expect(response.value).toBeInstanceOf(ResourceNotFoundError)
  })
})
