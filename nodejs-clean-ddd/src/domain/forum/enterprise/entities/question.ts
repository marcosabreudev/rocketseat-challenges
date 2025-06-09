/* eslint-disable @typescript-eslint/adjacent-overload-signatures */
import dayjs from 'dayjs'
import { UniqueEntityId } from '@/core/entitites/unique-entity-id'
import { Option } from '@/core/types/optional'
import { Slug } from './value-objects/slug'
import { AggregateRoot } from '@/core/entitites/aggregate-root'
import { QuestionAttachmentList } from './question-attachment-list'

export interface QuestionProps {
  authorId: UniqueEntityId
  bestAnswerId?: UniqueEntityId
  title: string
  content: string
  slug: Slug
  attachments: QuestionAttachmentList
  createdAt: Date
  updatedAt?: Date
}

export class Question extends AggregateRoot<QuestionProps> {
  get authorId() {
    return this.props.authorId
  }

  get bestAnswerId() {
    return this.props.bestAnswerId
  }

  get title() {
    return this.props.title
  }

  get content() {
    return this.props.content
  }

  get slug() {
    return this.props.slug
  }

  get attachments() {
    return this.props.attachments
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  get isNew(): boolean {
    return dayjs().diff(this.createdAt, 'days') <= 3
  }

  private touch() {
    this.props.updatedAt = new Date()
  }

  set title(title: string) {
    this.props.title = title
    this.props.slug = Slug.createFromText(title)
    this.touch()
  }

  set content(content: string) {
    this.props.content = content
    this.touch()
  }

  set attachments(attachments: QuestionAttachmentList) {
    this.props.attachments = attachments
    this.touch()
  }

  set bestAnswerId(answerId: UniqueEntityId | undefined) {
    this.props.bestAnswerId = answerId
    this.touch()
  }

  static create(
    props: Option<QuestionProps, 'createdAt' | 'slug' | 'attachments'>,
    id?: UniqueEntityId,
  ) {
    const question = new Question(
      {
        ...props,
        slug: props.slug ?? Slug.createFromText(props.title),
        attachments: props.attachments ?? new QuestionAttachmentList(),
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return question
  }
}
