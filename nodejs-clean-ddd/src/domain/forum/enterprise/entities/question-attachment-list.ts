import { WatchedList } from '@/core/entitites/watched-list'
import { QuestionAttachment } from './question-attachment'

export class QuestionAttachmentList extends WatchedList<QuestionAttachment> {
  compareItems(a: QuestionAttachment, b: QuestionAttachment): boolean {
    return a.attachmentId === b.attachmentId
  }
}
