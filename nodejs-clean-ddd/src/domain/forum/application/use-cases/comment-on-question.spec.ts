import { InMemoryQuestionCommentsRepository } from 'teste/repositories/in-memory-question-comments-repository'
import { CommentOnQuestionUseCase } from './comment-on-question'
import { InMemoryQuestionsRepository } from 'teste/repositories/in-memory-questions-repository'
import { makeQuestion } from 'teste/factories/make-question'
import { InMemoryQuestionAttachmentsRepository } from 'teste/repositories/in-memory-question-attachments-repository'

let inMemoryQuestionAttachmentsRepository: InMemoryQuestionAttachmentsRepository
let inMemoryQuestionCommentsRepository: InMemoryQuestionCommentsRepository
let inMemoryQuestionsRepositor: InMemoryQuestionsRepository
let sut: CommentOnQuestionUseCase

describe('Comment On Question', () => {
  beforeEach(() => {
    inMemoryQuestionAttachmentsRepository =
      new InMemoryQuestionAttachmentsRepository()
    inMemoryQuestionCommentsRepository =
      new InMemoryQuestionCommentsRepository()
    inMemoryQuestionsRepositor = new InMemoryQuestionsRepository(
      inMemoryQuestionAttachmentsRepository,
    )
    sut = new CommentOnQuestionUseCase(
      inMemoryQuestionCommentsRepository,
      inMemoryQuestionsRepositor,
    )
  })

  it('should be able to comment on a question', async () => {
    const question = makeQuestion()
    await inMemoryQuestionsRepositor.create(question)
    await sut.execute({
      authorId: 'author-1',
      questionId: question.id.toString(),
      content: 'Comment question content',
    })

    expect(inMemoryQuestionCommentsRepository.items[0].content).toBe(
      'Comment question content',
    )
  })
})
