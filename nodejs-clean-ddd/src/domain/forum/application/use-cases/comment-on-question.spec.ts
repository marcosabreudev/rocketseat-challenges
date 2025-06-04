import { InMemoryQuestionCommentsRepository } from "teste/repositories/in-memory-question-comments-repository";
import { CommentOnQuestionUseCase } from "./comment-on-question";
import { InMemoryQuestionsRepository } from "teste/repositories/in-memory-questions-repository";
import { makeQuestion } from "teste/factories/make-question";
import { UniqueEntityId } from "@/core/entitites/unique-entity-id";

let inMemoryQuestionCommentsRepository: InMemoryQuestionCommentsRepository;
let inMemoryQuestionsRepositor: InMemoryQuestionsRepository;
let sut: CommentOnQuestionUseCase;

describe("Comment On Question", () => {
  beforeEach(() => {
    inMemoryQuestionCommentsRepository =
      new InMemoryQuestionCommentsRepository();
    inMemoryQuestionsRepositor = new InMemoryQuestionsRepository();
    sut = new CommentOnQuestionUseCase(
      inMemoryQuestionCommentsRepository,
      inMemoryQuestionsRepositor
    );
  });

  it("should be able to comment on a question", async () => {
    const question = makeQuestion();
    await inMemoryQuestionsRepositor.create(question);
    const { commentQuestion } = await sut.execute({
      authorId: "author-1",
      questionId: question.id.toString(),
      content: "Comment question content",
    });

    expect(commentQuestion.id).toBeTruthy();
    expect(inMemoryQuestionCommentsRepository.items[0].content).toBe(
      "Comment question content"
    );
  });
});
