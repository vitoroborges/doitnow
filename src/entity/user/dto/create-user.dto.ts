import { Type } from 'class-transformer';
import { IsArray, IsEmail, IsEmpty, IsString } from 'class-validator';
import { Task } from 'src/entity/task/entities/task.entity';

export class CreateUserDto {
  @IsString()
  username: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @Type(() => Task)
  @IsEmpty()
  @IsArray()
  tasks: Task[];
}
