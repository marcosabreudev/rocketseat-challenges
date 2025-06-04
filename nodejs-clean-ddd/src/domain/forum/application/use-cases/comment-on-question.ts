import { UniqueEntityId } from "@/core/entitites/unique-entity-id";
import { QuestionComment } from "../../enterprise/entities/question-comment";
import { QuestionCommentsRepository } from "../repositories/question-comments-repository";
import { QuestionsRepository } from "../repositories/questions-repository";

interface CommentQuestionOnUseCaseRequest {
  questionId: string;
  authorId: string;
  content: string;
}

interface CommentQuestionOnUseCaseReturn {
  commentQuestion: QuestionComment;
}

export class CommentOnQuestionUseCase {
  constructor(
    private questionCommentsRepository: QuestionCommentsRepository,
    private questionsRepository: QuestionsRepository
  ) {}

  async execute({
    questionId,
    authorId,
    content,
  }: CommentQuestionOnUseCaseRequest): Promise<CommentQuestionOnUseCaseReturn> {
    const question = await this.questionsRepository.findById(questionId);

    if (!question) {
      throw new Error("Question not found");
    }

    const commentQuestion = QuestionComment.create({
      authorId: new UniqueEntityId(authorId),
      questionId: new UniqueEntityId(questionId),
      content,
    });

    await this.questionCommentsRepository.create(commentQuestion);

    return {
      commentQuestion,
    };
  }
}
