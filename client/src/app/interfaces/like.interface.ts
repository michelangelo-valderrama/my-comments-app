export interface Like {
  _id: string;
  user: string;
  comment: string;
}

export interface CreateLike {
  userId: string;
  commentId: string;
}

export interface DeleteLike {
  userId: string;
  commentId: string;
}
