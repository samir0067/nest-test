import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class AddTodoDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(4, { message: '4 lettre minimum' })
  @MaxLength(15)
  name: string;
  @IsString()
  @IsNotEmpty()
  @MinLength(12, { message: '4 lettre minimum' })
  description: string;
}
