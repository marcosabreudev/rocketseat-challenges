import { PaginationParams } from '@/core/repositories/pagination-params'
import { AnswersRepository } from '@/domain/forum/application/repositories/answers-repository'
import { Answer } from '@/domain/forum/enterprise/entities/answer'
import { InMemoryAnswerAttachmentsRepository } from './in-memory-answer-attachments-repository'

export class InMemoryAnswersRepository implements AnswersRepository {
  public items: Answer[] = []

  constructor(
    private inMemoryAnswerAttachmentsRepository: InMemoryAnswerAttachmentsRepository,
  ) { }

  async create(answer: Answer) {
    this.items.push(answer)
  }

  async findById(answerId: string) {
    const answer = this.items.find((item) => item.id.toString() === answerId)

    if (!answer) {
      return null
    }

    return answer
  }

  async delete(answer: Answer) {
    const answerIndex = this.items.findIndex((item) => item.id === answer.id)

    this.inMemoryAnswerAttachmentsRepository.deleteManyByAnswerId(
      answer.id.toString(),
    )

    this.items.splice(answerIndex, 1)
  }

  async save(answer: Answer) {
    const answerIndex = this.items.findIndex((item) => item.id === answer.id)

    this.items[answerIndex] = answer
  }

  async findManyByQuestionId(questionId: string, { page }: PaginationParams) {
    const answers = this.items
      .filter((item) => item.questionId.toString() === questionId)
      .slice((page - 1) * 20, page * 20)

    return answers
  }
}
