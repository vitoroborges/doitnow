import { Type } from "class-transformer";
import { IsString } from "class-validator";
import { Category } from "src/entity/category/entities/category.entity";

export class CreateTaskDto {
    @IsString()
    name: string;

    @IsString()
    description: string;

    @Type(() => Category)
    category: Category;
}
