import { InMemoryAnswerCommentsRepository } from 'teste/repositories/in-memory-answer-comment-repository'
import { InMemoryAnswersRepository } from 'teste/repositories/in-memory-answers-repository'
import { makeAnswer } from 'teste/factories/make-answer'
import { CommentOnAnswerUseCase } from './comment-on-answer'

let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentsRepository
let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: CommentOnAnswerUseCase

describe('Answer On Comment', () => {
  beforeEach(() => {
    inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentsRepository()
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    sut = new CommentOnAnswerUseCase(
      inMemoryAnswerCommentsRepository,
      inMemoryAnswersRepository,
    )
  })

  it('should be able to comment an answer', async () => {
    const answer = makeAnswer()
    await inMemoryAnswersRepository.create(answer)

    const { answerComment } = await sut.execute({
      answerId: answer.id.toString(),
      authorId: 'author-1',
      content: 'New answer comment',
    })

    expect(answerComment.id).toBeTruthy()
    expect(inMemoryAnswerCommentsRepository.items[0].content).toBe(
      'New answer comment',
    )
  })
})
