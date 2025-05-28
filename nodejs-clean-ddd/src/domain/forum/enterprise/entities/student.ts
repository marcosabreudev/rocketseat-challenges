import { Entity } from "@/core/entitites/entity";
import { UniqueEntityId } from "@/core/entitites/unique-entity-id";

interface StudentProps {
  name: string;
}

export class Student extends Entity<StudentProps> {
  static create(props: StudentProps, id?: UniqueEntityId) {
    const student = new Student(props, id);

    return student;
  }
}
