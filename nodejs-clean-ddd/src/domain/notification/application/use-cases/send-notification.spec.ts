import { InMemoryNotificationRepository } from 'teste/repositories/in-memory-notification-repository'
import { SendNotificationUseCase } from './send-notification'

let inMemoryNoficationRepository: InMemoryNotificationRepository
let sut: SendNotificationUseCase

describe('Send Notification', () => {
  beforeEach(() => {
    inMemoryNoficationRepository = new InMemoryNotificationRepository()
    sut = new SendNotificationUseCase(inMemoryNoficationRepository)
  })

  it('should be able to notificate recipient', async () => {
    const nofitication = await sut.execute({
      recipientId: '1',
      title: 'Nofitication',
      content: 'Notificate',
    })

    expect(inMemoryNoficationRepository.items[0].id).toBe(
      nofitication.value?.notification.id,
    )
  })
})
