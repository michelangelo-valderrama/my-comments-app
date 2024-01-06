import { Transform, Type } from 'class-transformer';
import { IsBoolean, IsNotEmpty } from 'class-validator';
import { Types } from 'mongoose';
import { toMongoObjectId } from 'src/utils';

export class LikeCommentDto {
  @IsNotEmpty()
  @Type(() => Types.ObjectId)
  @Transform(toMongoObjectId)
  userId: string;

  @IsNotEmpty()
  @IsBoolean()
  setLike: boolean;
}
