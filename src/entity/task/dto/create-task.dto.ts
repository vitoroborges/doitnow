import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsString } from 'class-validator';
import { Category } from 'src/entity/category/entities/category.entity';
import { User } from 'src/entity/user/entities/user.entity';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  description: string;

  @IsArray()
  @IsNotEmpty()
  @IsString({ each: true })
  category: Category[];

  @Type(() => User)
  @IsNotEmpty()
  @IsString()
  user: User;
}
