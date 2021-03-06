import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { AssignStudentsToLessonInput } from './inputs/assign-students-to-lessons.input';
import { Lesson } from './lesson.entity';
import { CreateLessonInput } from './inputs/create-lesson.input';
import { GetLessonInput } from './inputs/get-lesson.input';
import { LessonService } from './lesson.service';
import { LessonType } from './lesson.type';
import { StudentService } from 'src/student/student.service';
import { Student } from 'src/student/student.entity';

@Resolver((of) => LessonType)
export class LessonResolver {
  constructor(
    private lessonService: LessonService,
    private studentService: StudentService,
  ) {}

  @Query((returns) => [LessonType])
  async lessons(): Promise<Lesson[]> {
    return this.lessonService.getLessons();
  }

  @Query((returns) => LessonType)
  async lesson(@Args('getLessonInput') id: GetLessonInput): Promise<Lesson> {
    return this.lessonService.getLesson(id);
  }

  @Mutation((returns) => LessonType)
  async createLesson(
    @Args('createLessonInput') createLessonInput: CreateLessonInput,
  ): Promise<Lesson> {
    return this.lessonService.createLesson(createLessonInput);
  }

  @Mutation((returns) => LessonType)
  async assignStudentsToLesson(
    @Args('assignStudentsToLessonInput')
    assignStudentsToLessonInput: AssignStudentsToLessonInput,
  ): Promise<Lesson> {
    const { lessonId, studentIds } = assignStudentsToLessonInput;
    return this.lessonService.assignStudentsToLesson(lessonId, studentIds);
  }

  @ResolveField()
  async students(@Parent() lesson: Lesson): Promise<Student[]> {
    return this.studentService.getManyStudent(lesson.students);
  }
}
