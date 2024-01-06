import { User } from './user.interface';

export interface Comment {
  _id: string;
  text: string;
  parent?: Comment;
  user: User;
  createdAt: string;
  updatedAt: string;
}

export interface CreateComment {
  text: string;
  userId: string;
  parentId?: string;
}
