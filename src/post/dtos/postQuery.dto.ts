export class PostQueryDto {
  sortBy?: string;
  sort?: 'asc' | 'desc';
  take?: number;
  includeComments?: string;
}
