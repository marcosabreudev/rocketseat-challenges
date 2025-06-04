import { InMemoryQuestionsRepository } from "teste/repositories/in-memory-questions-repository";
import { FetchRecentQuestionsUseCase } from "./fetch-recent-questions";
import { makeQuestion } from "teste/factories/make-question";

let inMemoryQuestionsRespository: InMemoryQuestionsRepository;
let sut: FetchRecentQuestionsUseCase;

describe("Fetch Recent Questions Use Case", () => {
  beforeEach(() => {
    inMemoryQuestionsRespository = new InMemoryQuestionsRepository();
    sut = new FetchRecentQuestionsUseCase(inMemoryQuestionsRespository);
  });

  it("should be able to fetch recent questions", async () => {
    await inMemoryQuestionsRespository.create(
      makeQuestion({ createdAt: new Date(2022, 0, 20) })
    );
    await inMemoryQuestionsRespository.create(
      makeQuestion({ createdAt: new Date(2022, 0, 18) })
    );
    await inMemoryQuestionsRespository.create(
      makeQuestion({ createdAt: new Date(2022, 0, 23) })
    );

    const { questions } = await sut.execute({
      page: 1,
    });

    expect(questions).toEqual([
      expect.objectContaining({ createdAt: new Date(2022, 0, 23) }),
      expect.objectContaining({ createdAt: new Date(2022, 0, 20) }),
      expect.objectContaining({ createdAt: new Date(2022, 0, 18) }),
    ]);
  });

  it("should be able to fetch paginated recent questions", async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryQuestionsRespository.create(makeQuestion());
    }

    const { questions } = await sut.execute({
      page: 2,
    });

    expect(questions).toHaveLength(2);
  });
});
