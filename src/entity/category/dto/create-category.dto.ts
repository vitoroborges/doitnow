import { IsArray, IsNotEmpty, IsString } from 'class-validator';
import { Task } from 'src/entity/task/entities/task.entity';

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsArray()
  @IsNotEmpty()
  @IsString({ each: true })
  taskId: Task[];
}
