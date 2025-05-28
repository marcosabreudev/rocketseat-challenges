import { AnswerQuestionUseCase } from "./answer-question";
import { AnswersRepository } from "../repositories/answers-repository";
import { Answer } from "../../enterprise/entities/answer";

class AnswersLocalRepository implements AnswersRepository {
  async create(answer: Answer) {
    return;
  }
}

test("create an aswer", async () => {
  const sut = new AnswersLocalRepository();
  const answerQuestion = new AnswerQuestionUseCase(sut);

  const answer = await answerQuestion.execute({
    instructorId: "1",
    questionId: "1",
    content: "New answer",
  });

  expect(answer.content).toBe("New answer");
});
