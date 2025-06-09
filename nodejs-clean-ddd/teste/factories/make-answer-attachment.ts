import { UniqueEntityId } from '@/core/entitites/unique-entity-id'
import {
  AnswerAttachment,
  AnswerAttachmentProps,
} from '@/domain/forum/enterprise/entities/answer-attachment'

export function makeAnswerAttachment(
  override: Partial<AnswerAttachmentProps> = {},
  id?: UniqueEntityId,
) {
  const answerAttachment = AnswerAttachment.create(
    {
      answerId: new UniqueEntityId('1'),
      attachmentId: new UniqueEntityId(),
      ...override,
    },
    id,
  )

  return answerAttachment
}
