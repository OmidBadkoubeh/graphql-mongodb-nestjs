import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateStudentInput {
  @IsString()
  @IsNotEmpty()
  @Field()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  @Field()
  lastName: string;
}
