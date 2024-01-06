import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto, UpdateCommentDto } from './dto';
import { toMongoObjectId } from 'src/utils';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  create(@Body() createCommentDto: CreateCommentDto) {
    return this.commentsService.create(createCommentDto);
  }

  @Get()
  getByParentId(@Query() params: { parentId?: string }) {
    try {
      const { parentId } = params;
      const mongoId = parentId
        ? toMongoObjectId({ value: parentId, key: 'parentId' }).toString()
        : undefined;
      return this.commentsService.getByParentId(mongoId);
    } catch (error) {
      console.error('[comments] getByParentId() error.', error);
      return error;
    }
  }

  @Patch(':id')
  updateById(
    @Param('id') id: string,
    @Body() updateCommentDto: UpdateCommentDto,
  ) {
    try {
      return this.commentsService.update(
        toMongoObjectId({ value: id, key: 'id' }).toString(),
        updateCommentDto,
      );
    } catch (error) {
      console.error('[comments] updateById error.');
      return error;
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commentsService.remove(+id);
  }
}
