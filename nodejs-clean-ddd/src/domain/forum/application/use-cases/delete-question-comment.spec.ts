import { InMemoryQuestionCommentsRepository } from "teste/repositories/in-memory-question-comments-repository";
import { DeleteQuestionCommentUseCase } from "./delete-question-comment";
import { makeQuestionComment } from "teste/factories/make-question-comment";
import { UniqueEntityId } from "@/core/entitites/unique-entity-id";

let inMemoryQuestionCommentsRepository: InMemoryQuestionCommentsRepository;
let sut: DeleteQuestionCommentUseCase;

describe("Delete Question Comment", () => {
  beforeEach(() => {
    inMemoryQuestionCommentsRepository =
      new InMemoryQuestionCommentsRepository();
    sut = new DeleteQuestionCommentUseCase(inMemoryQuestionCommentsRepository);
  });

  it("should be able to delete a question comment", async () => {
    const answerComment = makeQuestionComment();
    inMemoryQuestionCommentsRepository.create(answerComment);

    expect(inMemoryQuestionCommentsRepository.items).toHaveLength(1);

    await sut.execute({
      authorId: answerComment.authorId.toString(),
      questionCommentId: answerComment.id.toString(),
    });

    expect(inMemoryQuestionCommentsRepository.items).toHaveLength(0);
  });

  it("should be able to delete a question comment", async () => {
    const answerComment = makeQuestionComment({
      authorId: new UniqueEntityId("author-1"),
    });
    inMemoryQuestionCommentsRepository.create(answerComment);

    await expect(
      sut.execute({
        authorId: "author-2",
        questionCommentId: answerComment.id.toString(),
      })
    ).rejects.toBeInstanceOf(Error);
  });
});
