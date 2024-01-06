import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Like } from './schemas';
import { Model, Types } from 'mongoose';
import {
  CreateLikeDto,
  DeleteLikeDto,
  GetLikeFilter,
  UpdateLikeDto,
} from './dto';

@Injectable()
export class LikesService {
  constructor(@InjectModel(Like.name) private likeModel: Model<Like>) {}

  async createLike({ commentId, userId }: CreateLikeDto) {
    const like = await this.likeModel.findOne({
      comment: commentId,
      user: userId,
    });
    if (like) {
      return like;
    }
    return this.likeModel.create({
      comment: commentId,
      user: userId,
    });
  }

  deleteLike({ commentId, userId }: DeleteLikeDto) {
    return this.likeModel.deleteOne({
      comment: commentId,
      user: userId,
    });
  }

  getLikesByUser(userId: string) {
    return this.likeModel
      .find({
        user: userId,
      })
      .populate(['user', 'comment']);
  }

  getLikeByFilter({ commentId, userId }: GetLikeFilter) {
    return this.likeModel.findOne({
      comment: commentId,
      user: userId,
    });
  }

  async getLikesByCommentId(commendId: string, options: any) {
    if (options.total) {
      const result = await this.likeModel
        .aggregate([
          {
            $match: { comment: new Types.ObjectId(commendId) },
          },
          { $count: 'likes' },
        ])
        .exec();
      return result[0] ?? { likes: 0 };
    }
    return this.likeModel.find({
      comment: commendId,
    });
  }

  getLikesByUserId(userId: string) {
    return this.likeModel.find({
      user: userId,
    });
  }
}
