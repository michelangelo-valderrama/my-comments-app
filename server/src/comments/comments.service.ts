import { Injectable } from '@nestjs/common';
import { CreateCommentDto, UpdateCommentDto } from './dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Comment } from './schemas/comment.schema';

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Comment.name) private commentModel: Model<Comment>,
  ) {}

  create(createCommentDto: CreateCommentDto) {
    const createdComment = this.commentModel.create({
      text: createCommentDto.text,
      parent: createCommentDto.parentId || null,
      user: createCommentDto.userId,
    });
    return createdComment.then((doc) => doc.populate(['user', 'parent']));
  }

  findAll() {
    return this.commentModel.find().populate(['user', 'parent']).exec();
  }

  getByParentId(parentId?: string) {
    return this.commentModel
      .find({
        parent: parentId || null,
      })
      .populate(['user', 'parent'])
      .sort({ createdAt: -1 })
      .exec();
  }

  findOne(id: number) {
    return `This action returns a #${id} comment`;
  }

  update(id: string, updateCommentDto: UpdateCommentDto) {
    this.commentModel.findByIdAndUpdate(id, updateCommentDto);
  }

  remove(id: number) {
    return `This action removes a #${id} comment`;
  }
}
