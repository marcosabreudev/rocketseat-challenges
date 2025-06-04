import { faker } from "@faker-js/faker";
import { UniqueEntityId } from "@/core/entitites/unique-entity-id";
import {
  Question,
  QuestionProps,
} from "@/domain/forum/enterprise/entities/question";

export function makeQuestion(
  override: Partial<QuestionProps> = {},
  id?: UniqueEntityId
) {
  const question = Question.create(
    {
      authorId: new UniqueEntityId("1"),
      title: faker.lorem.sentence(),
      content: faker.lorem.text(),
      ...override,
    },
    id
  );

  return question;
}
