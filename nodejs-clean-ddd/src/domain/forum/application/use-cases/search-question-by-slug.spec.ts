import { InMemoryQuestionsRepository } from "teste/repositories/in-memory-questions-repository";
import { SearchQuestionBySlugUseCase } from "./search-question-by-slug";
import { makeQuestion } from "teste/factories/make-question";

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let sut: SearchQuestionBySlugUseCase;

describe("Search Question By Slug Use Case", () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
    sut = new SearchQuestionBySlugUseCase(inMemoryQuestionsRepository);
  });

  it("should be able to search a question by slug", async () => {
    const newQuestion = makeQuestion({
      title: "Example Question",
    });
    await inMemoryQuestionsRepository.create(newQuestion);

    const { question } = await sut.execute({ slug: "example-question" });

    expect(question.id).toEqual(newQuestion.id);
  });

  it("should thow an error when search question where not exists", async () => {
    await expect(() => sut.execute({ slug: "" })).rejects.toBeInstanceOf(Error);
  });
});
