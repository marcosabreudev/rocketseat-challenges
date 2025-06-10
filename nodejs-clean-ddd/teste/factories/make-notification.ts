import { faker } from '@faker-js/faker'
import { UniqueEntityId } from '@/core/entitites/unique-entity-id'
import {
  Notification,
  NotificationProps,
} from '@/domain/notification/enterprise/entitites/notification'

export function makeNotification(
  override: Partial<NotificationProps> = {},
  id?: UniqueEntityId,
) {
  const notification = Notification.create(
    {
      recipientId: new UniqueEntityId(),
      title: faker.lorem.sentence(4),
      content: faker.lorem.sentence(),
      ...override,
    },
    id,
  )

  return notification
}
