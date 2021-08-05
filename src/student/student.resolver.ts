import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateStudentInput } from './inputs/create-student.input';
import { GetStudentInput } from './inputs/get-student.input';
import { Student } from './student.entity';
import { StudentService } from './student.service';
import { StudentType } from './student.type';

@Resolver((of) => StudentType)
export class StudentResolver {
  constructor(private studentService: StudentService) {}

  @Query((returns) => [StudentType])
  async students(): Promise<Student[]> {
    return this.studentService.getStudents();
  }

  @Query((returns) => StudentType)
  async student(
    @Args('getStudentInput') getStudentInput: GetStudentInput,
  ): Promise<Student> {
    return this.studentService.getStudent(getStudentInput);
  }

  @Mutation((returns) => StudentType)
  async createStudent(
    @Args('createStudentInput') createStudentInput: CreateStudentInput,
  ): Promise<Student> {
    return this.studentService.createStudent(createStudentInput);
  }
}
