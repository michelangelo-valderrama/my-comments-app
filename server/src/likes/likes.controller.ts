import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { LikesService } from './likes.service';
import { CreateLikeDto, DeleteLikeDto } from './dto';

@Controller('likes')
export class LikesController {
  constructor(private readonly likesService: LikesService) {}

  @Post()
  async createLike(@Body() createLikeDto: CreateLikeDto) {
    await this.likesService.createLike(createLikeDto);
    return {
      liked: 'Done',
    };
  }

  @Delete()
  async deleteLike(@Body() deleteLikeDto: DeleteLikeDto) {
    await this.likesService.deleteLike(deleteLikeDto);
    return {
      unliked: 'Done',
    };
  }

  @Get('user/:userId')
  getLikesByUser(@Param('userId') userId: string) {
    return this.likesService.getLikesByUser(userId);
  }

  @Get()
  getLikeByFilter(@Query('u') userId: string, @Query('c') commentId: string) {
    return this.likesService.getLikeByFilter({ userId, commentId });
  }

  @Get('comments/:commentId')
  getLikesByCommentId(
    @Param('commentId') commentId: string,
    @Query('total') total: boolean = false,
  ) {
    const options = { total };
    return this.likesService.getLikesByCommentId(commentId, options);
  }

  @Get('users/:userId')
  getLikesByUserId(@Param('userId') userId: string) {
    return this.likesService.getLikesByUserId(userId);
  }
}
