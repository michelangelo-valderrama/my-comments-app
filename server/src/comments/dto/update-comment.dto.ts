import { IsNumber, IsOptional } from 'class-validator';

export class UpdateCommentDto {
  @IsNumber()
  @IsOptional()
  likes: number;
}
