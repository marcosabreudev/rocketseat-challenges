import { Either, success } from '@/core/either'
import { NotificationRepository } from '../repositories/notification-repository'
import { UniqueEntityId } from '@/core/entitites/unique-entity-id'
import { Notification } from '../../enterprise/entitites/notification'

interface SendNotificationUseCaseRequest {
  recipientId: string
  title: string
  content: string
}

type SendNotificationUseCaseResponse = Either<
  null,
  { notification: Notification }
>

export class SendNotificationUseCase {
  constructor(private notificationRepository: NotificationRepository) { }

  async execute({
    recipientId,
    title,
    content,
  }: SendNotificationUseCaseRequest): Promise<SendNotificationUseCaseResponse> {
    const notification = Notification.create({
      recipientId: new UniqueEntityId(recipientId),
      title,
      content,
    })

    await this.notificationRepository.create(notification)

    return success({
      notification,
    })
  }
}
