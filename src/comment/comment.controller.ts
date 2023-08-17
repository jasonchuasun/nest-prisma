import { Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Post } from '@nestjs/common';
import { CommentService } from './comment.service';
import { Prisma } from '@prisma/client';
import { PostService } from '../post/post.service';

@Controller('comment')
export class CommentController {
  constructor(
    private readonly commentService: CommentService,
    private readonly postService: PostService
  ) {}
  
  @Get()
  async finAll() {
    const comments = await this.commentService.findAll();

    await this.checkIfCommentsExists(comments)

    return comments
  }

  async checkIfCommentsExists(comments: Comment[]): Promise<void>{
    if (comments.length == 0 ) {
      throw new NotFoundException("No post found")
    }
  }

  @Get('/:id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const post = await this.commentService.findOne({id})

    await this.checkIfCommentExists(post)

    return post
  }

  async checkIfCommentExists(comment): Promise<void>{
    if (!comment) {
      throw new NotFoundException("No comment found")
    }
  }
  
  @Post('/:postId')
  async create(@Body() data:Prisma.CommentCreateInput, @Param('postId', ParseIntPipe) postId: number) {
    const { body } = data

    const userId = 1;

    await this.checkIfPostExists(postId)

    const comment = await this.commentService.create({
      body,
      userId,
      postId
    })
    
    return comment
  }

  async checkIfPostExists(postId: number): Promise<void> {
    const post = await this.postService.findOne({id: postId})

    if (!post) {
      throw new NotFoundException("No post found")
    }
  }

  @Delete('/:id')
  async delete(@Param('id', ParseIntPipe) id: number): Promise<string> {
    
    const comment = await this.commentService.findOne({id})

    await this.checkIfCommentExists(comment)
    
    await this.commentService.delete({ id })

    return 'Successfully deleted'
  }
}
