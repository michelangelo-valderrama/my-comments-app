import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { CreateLike, DeleteLike, Like } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class LikeService {
  constructor(private http: HttpClient) {}

  likeComment(createLike: CreateLike) {
    return this.http.post<Like>(`${environment.API_URL}/likes`, createLike);
  }

  unlikeComment(deleteLike: DeleteLike) {
    return this.http.delete<Like>(`${environment.API_URL}/likes`, {
      body: deleteLike,
    });
  }

  checkCommentLiked({ commentId, userId }: CreateLike) {
    return this.http.get<Like>(
      `${environment.API_URL}/likes?u=${userId}&c=${commentId}`
    );
  }

  getTotalLikesOfComment(commentId: string) {
    return this.http.get<{ likes: number }>(
      `${environment.API_URL}/likes/comments/${commentId}?total=true`
    );
  }
}
