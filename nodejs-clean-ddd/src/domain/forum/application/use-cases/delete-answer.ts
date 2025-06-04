import { AnswersRepository } from "../repositories/answers-repository";

interface DeleteAnswerUseCaseRequest {
  answerId: string;
  authorId: string;
}

export class DeleteAnswerUseCase {
  constructor(private answersRespotiry: AnswersRepository) {}

  async execute({
    answerId,
    authorId,
  }: DeleteAnswerUseCaseRequest): Promise<{}> {
    const answer = await this.answersRespotiry.findById(answerId);

    if (!answer) {
      throw new Error("Answer not found.");
    }

    if (answer.authorId.toString() !== authorId) {
      throw new Error("Unauthorized");
    }

    await this.answersRespotiry.delete(answer);

    return {};
  }
}
