import { InMemoryAnswersRepository } from 'teste/repositories/in-memory-answers-repository'
import { FetchQuestionAnswersUseCase } from './fetch-question-answers'
import { makeAnswer } from 'teste/factories/make-answer'
import { UniqueEntityId } from '@/core/entitites/unique-entity-id'
import { InMemoryAnswerAttachmentsRepository } from 'teste/repositories/in-memory-answer-attachments-repository'

let inMemoryAnswerAttachmentsRepository: InMemoryAnswerAttachmentsRepository
let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: FetchQuestionAnswersUseCase

describe('Fetch Question Answers Use Case', () => {
  beforeEach(() => {
    inMemoryAnswerAttachmentsRepository =
      new InMemoryAnswerAttachmentsRepository()
    inMemoryAnswersRepository = new InMemoryAnswersRepository(
      inMemoryAnswerAttachmentsRepository,
    )
    sut = new FetchQuestionAnswersUseCase(inMemoryAnswersRepository)
  })

  it('should be able to list all question answers', async () => {
    for (let i = 1; i <= 3; i++) {
      await inMemoryAnswersRepository.create(
        makeAnswer({
          questionId: new UniqueEntityId('question-1'),
        }),
      )
    }

    const answers = await sut.execute({
      questionId: 'question-1',
      page: 1,
    })

    expect(answers.value?.answers).toHaveLength(3)
  })

  it('should be able to list paginated question answers', async () => {
    for (let i = 1; i <= 23; i++) {
      await inMemoryAnswersRepository.create(
        makeAnswer({
          questionId: new UniqueEntityId('question-1'),
        }),
      )
    }

    const answers = await sut.execute({
      questionId: 'question-1',
      page: 2,
    })

    expect(answers.value?.answers).toHaveLength(3)
  })
})
