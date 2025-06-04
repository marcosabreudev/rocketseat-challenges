import { InMemoryQuestionCommentsRepository } from 'teste/repositories/in-memory-question-comments-repository'
import { FetchQuestionComments } from './fetch-question-comments'
import { makeQuestionComment } from 'teste/factories/make-question-comment'
import { UniqueEntityId } from '@/core/entitites/unique-entity-id'

let inMemoryQuestionCommentsRepository: InMemoryQuestionCommentsRepository
let sut: FetchQuestionComments

describe('Fetch Question Comments', () => {
  beforeEach(() => {
    inMemoryQuestionCommentsRepository =
      new InMemoryQuestionCommentsRepository()
    sut = new FetchQuestionComments(inMemoryQuestionCommentsRepository)
  })

  it('should be able to fetch all comments from a question', async () => {
    for (let i = 1; i <= 3; i++) {
      inMemoryQuestionCommentsRepository.create(
        makeQuestionComment({
          questionId: new UniqueEntityId('question-1'),
        }),
      )
    }

    const { questionComments } = await sut.execute({
      questionId: 'question-1',
      page: 1,
    })

    expect(questionComments).toHaveLength(3)
  })

  it('should be able to fetch paginated comments from a question', async () => {
    for (let i = 1; i <= 22; i++) {
      inMemoryQuestionCommentsRepository.create(
        makeQuestionComment({
          questionId: new UniqueEntityId('question-1'),
        }),
      )
    }

    const { questionComments } = await sut.execute({
      questionId: 'question-1',
      page: 2,
    })

    expect(questionComments).toHaveLength(2)
  })
})
