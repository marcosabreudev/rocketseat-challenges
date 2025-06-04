import { faker } from "@faker-js/faker";
import { UniqueEntityId } from "@/core/entitites/unique-entity-id";
import {
  QuestionComment,
  QuestionCommentProps,
} from "@/domain/forum/enterprise/entities/question-comment";

export function makeQuestionComment(
  override: Partial<QuestionCommentProps> = {},
  id?: UniqueEntityId
) {
  const questionComment = QuestionComment.create(
    {
      questionId: new UniqueEntityId("1"),
      authorId: new UniqueEntityId("1"),
      content: faker.lorem.sentence(),
      ...override,
    },
    id
  );

  return questionComment;
}
