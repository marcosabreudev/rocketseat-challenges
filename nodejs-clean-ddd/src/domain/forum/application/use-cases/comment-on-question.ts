import { UniqueEntityId } from '@/core/entitites/unique-entity-id'
import { QuestionComment } from '../../enterprise/entities/question-comment'
import { QuestionCommentsRepository } from '../repositories/question-comments-repository'
import { QuestionsRepository } from '../repositories/questions-repository'
import { Either, error, success } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'

interface CommentQuestionOnUseCaseRequest {
  questionId: string
  authorId: string
  content: string
}

type CommentQuestionOnUseCaseReturn = Either<
  ResourceNotFoundError,
  {
    commentQuestion: QuestionComment
  }
>

export class CommentOnQuestionUseCase {
  constructor(
    private questionCommentsRepository: QuestionCommentsRepository,
    private questionsRepository: QuestionsRepository,
  ) { }

  async execute({
    questionId,
    authorId,
    content,
  }: CommentQuestionOnUseCaseRequest): Promise<CommentQuestionOnUseCaseReturn> {
    const question = await this.questionsRepository.findById(questionId)

    if (!question) {
      return error(new ResourceNotFoundError())
    }

    const commentQuestion = QuestionComment.create({
      authorId: new UniqueEntityId(authorId),
      questionId: new UniqueEntityId(questionId),
      content,
    })

    await this.questionCommentsRepository.create(commentQuestion)

    return success({
      commentQuestion,
    })
  }
}
