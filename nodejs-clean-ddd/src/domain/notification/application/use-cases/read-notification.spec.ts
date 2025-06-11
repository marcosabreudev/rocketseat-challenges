import { InMemoryNotificationRepository } from 'teste/repositories/in-memory-notification-repository'
import { ReadNotificationUseCase } from './read-notification'
import { makeNotification } from 'teste/factories/make-notification'
import { NotAllowedError } from '@/core/errors/not-allowed-error'

let inMemoryNotificationRepository: InMemoryNotificationRepository
let sut: ReadNotificationUseCase

describe('Read Notification', () => {
  beforeEach(() => {
    inMemoryNotificationRepository = new InMemoryNotificationRepository()
    sut = new ReadNotificationUseCase(inMemoryNotificationRepository)
  })

  it.todo('should be able to read notification', async () => {
    const notification = makeNotification()

    await inMemoryNotificationRepository.create(notification)

    await sut.execute({
      recipientId: notification.recipientId.toString(),
      notificationId: notification.id.toString(),
    })

    expect(inMemoryNotificationRepository.items[0].readAt).toEqual(
      expect.any(Date),
    )
  })

  it('should not be able to read a notification from another user', async () => {
    const notification = makeNotification()

    await inMemoryNotificationRepository.create(notification)

    const result = await sut.execute({
      recipientId: '1',
      notificationId: notification.id.toString(),
    })

    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
