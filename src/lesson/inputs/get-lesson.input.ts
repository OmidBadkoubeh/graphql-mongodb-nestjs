import { Field, InputType } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';

@InputType()
export class GetLessonInput {
  @IsUUID('4')
  @Field()
  id: string;
}
