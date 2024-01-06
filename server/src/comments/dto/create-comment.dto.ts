import { Transform, Type } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Types } from 'mongoose';
import { toMongoObjectId } from 'src/utils';

export class CreateCommentDto {
  @IsString()
  @IsNotEmpty()
  text: string;

  @IsNotEmpty()
  @Type(() => Types.ObjectId)
  @Transform(toMongoObjectId)
  userId: Types.ObjectId;

  @IsString()
  @IsOptional()
  parentId?: string;
}
