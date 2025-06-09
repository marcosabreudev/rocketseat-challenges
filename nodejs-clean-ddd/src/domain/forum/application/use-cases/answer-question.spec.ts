import { InMemoryAnswersRepository } from 'teste/repositories/in-memory-answers-repository'
import { AnswerQuestionUseCase } from './answer-question'
import { InMemoryAnswerAttachmentsRepository } from 'teste/repositories/in-memory-answer-attachments-repository'

let inMemoryAnswersRepository: InMemoryAnswersRepository
let inMemoryAnswerAttachmentsRepository: InMemoryAnswerAttachmentsRepository
let sut: AnswerQuestionUseCase

describe('Create Answer', () => {
  beforeEach(() => {
    inMemoryAnswerAttachmentsRepository =
      new InMemoryAnswerAttachmentsRepository()
    inMemoryAnswersRepository = new InMemoryAnswersRepository(
      inMemoryAnswerAttachmentsRepository,
    )
    sut = new AnswerQuestionUseCase(inMemoryAnswersRepository) // system under test
  })

  it('should be able to create an answer', async () => {
    const answer = await sut.execute({
      instructorId: '1',
      questionId: '1',
      content: 'New answer',
      attachmentIds: ['1', '2'],
    })

    expect(inMemoryAnswersRepository.items[0]).toBe(answer.value?.answer)
  })
})
