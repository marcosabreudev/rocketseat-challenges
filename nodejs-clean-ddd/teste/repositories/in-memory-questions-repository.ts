import { PaginationParams } from "@/core/repositories/pagination-params";
import { QuestionsRepository } from "@/domain/forum/application/repositories/questions-repository";
import { Question } from "@/domain/forum/enterprise/entities/question";

export class InMemoryQuestionsRepository implements QuestionsRepository {
  public items: Question[] = [];

  async create(question: Question) {
    this.items.push(question);
  }

  async findBySlug(slug: string) {
    const question = this.items.find((item) => item.slug.value === slug);

    if (!question) {
      return null;
    }

    return question;
  }

  async findById(id: string) {
    const question = this.items.find((item) => item.id.toValue() === id);

    if (!question) {
      return null;
    }

    return question;
  }

  async delete(question: Question) {
    const itemIndex = this.items.findIndex((item) => item.id === question.id);

    this.items.splice(itemIndex, 1);
  }

  async save(question: Question) {
    const itemIndex = this.items.findIndex((item) => item.id === question.id);

    this.items[itemIndex] = question;
  }

  async findAllByAuthorId(authorId: string) {
    const questions = this.items.filter(
      (item) => item.authorId.toValue() === authorId
    );

    if (!questions) {
      return null;
    }

    return questions;
  }

  async findManyRecent({ page }: PaginationParams) {
    const questions = this.items
      .sort((a, b) => b.createdAt?.getTime() - a.createdAt?.getTime())
      .slice((page - 1) * 20, page * 20);

    return questions;
  }
}
