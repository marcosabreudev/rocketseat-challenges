import { QuestionCommentsRepository } from "../repositories/question-comments-repository";
import { QuestionComment } from "../../enterprise/entities/question-comment";

interface FetchQuestionCommentsRequest {
  questionId: string;
  page: number;
}

interface FetchQuestionCommentsResponse {
  questionComments: QuestionComment[];
}

export class FetchQuestionComments {
  constructor(private questionCommentsRepository: QuestionCommentsRepository) {}

  async execute({
    questionId,
    page,
  }: FetchQuestionCommentsRequest): Promise<FetchQuestionCommentsResponse> {
    const questionComments =
      await this.questionCommentsRepository.findManyByQuestionId(questionId, {
        page,
      });

    return {
      questionComments,
    };
  }
}
