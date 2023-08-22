import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseBoolPipe,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { PostService } from './post.service';
import { Prisma } from '@prisma/client';
import { PostQueryDto } from './dtos/postQuery.dto';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  async findAll(@Query() queryParams: PostQueryDto) {
    const { sortBy, sort, take, includeComments } = queryParams;

    const options = {
      orderBy: { [sortBy || 'title']: sort || 'asc' },
      include: {
        comments: includeComments === 'true',
      },
      take: Number(take) || 10,
    };

    const posts = await this.postService.findAll(options);

    await this.checkIfPostsExist(posts);

    return posts;
  }

  async checkIfPostsExist(posts): Promise<void> {
    if (posts.length == 0) {
      throw new NotFoundException('No post found');
    }
  }

  @Get('/:id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const post = await this.postService.findOne({ id });

    await this.checkIfPostExists(post);

    return post;
  }

  async checkIfPostExists(post): Promise<void> {
    if (!post) {
      throw new NotFoundException('No post found');
    }
  }

  @Post()
  async create(@Body() data: Prisma.PostCreateInput) {
    const { title, body } = data;

    const post = await this.postService.create({
      title,
      body,
      userId: 1,
    });

    return post;
  }

  @Delete('/:id')
  async delete(@Param('id') id: number): Promise<string> {
    const post = await this.postService.findOne({ id: Number(id) });

    await this.checkIfPostExists(post);

    await this.postService.delete({ id: Number(id) });

    return 'Successfully deleted';
  }
}
