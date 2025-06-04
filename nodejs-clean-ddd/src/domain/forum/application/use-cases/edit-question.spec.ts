import { InMemoryQuestionsRepository } from 'teste/repositories/in-memory-questions-repository'
import { EditQuestionUseCase } from './edit-question'
import { makeQuestion } from 'teste/factories/make-question'
import { UniqueEntityId } from '@/core/entitites/unique-entity-id'
import { NotAllowedError } from './errors/not-allowed-error'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: EditQuestionUseCase

describe('Edit Question', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new EditQuestionUseCase(inMemoryQuestionsRepository)
  })

  it('should be able to edit a question', async () => {
    const newQuestion = makeQuestion(
      {
        authorId: new UniqueEntityId('author-1'),
      },
      new UniqueEntityId('question-1'),
    )

    await inMemoryQuestionsRepository.create(newQuestion)

    await sut.execute({
      authorId: newQuestion.authorId.toValue(),
      questionId: newQuestion.id.toValue(),
      title: 'New Title Edited',
      content: 'New content edited',
    })

    expect(inMemoryQuestionsRepository.items[0]).toMatchObject({
      title: 'New Title Edited',
      content: 'New content edited',
    })
  })

  it('should not be able to edit a question from another user', async () => {
    const newQuestion = makeQuestion(
      {
        authorId: new UniqueEntityId('author-1'),
      },
      new UniqueEntityId('question-1'),
    )

    await inMemoryQuestionsRepository.create(newQuestion)

    const response = await sut.execute({
      authorId: 'author-2',
      questionId: newQuestion.id.toValue(),
      title: 'New Question Title',
      content: 'New question content',
    })

    expect(response.value).toBeInstanceOf(NotAllowedError)
  })
})
