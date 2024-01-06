import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Comment, CreateComment } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  constructor(private http: HttpClient) {}

  getComments(parentId?: string) {
    let url = `${environment.API_URL}/comments`;
    if (parentId) {
      url += `?parentId=${parentId}`;
    }
    return this.http.get<Comment[]>(url);
  }

  createComment({ text, userId, parentId }: CreateComment) {
    return this.http.post<Comment>(`${environment.API_URL}/comments`, {
      text,
      userId,
      parentId,
    });
  }

  addLikeToComment(id: string) {
    return this.http.post<Comment>(
      `${environment.API_URL}/comments/${id}/like`,
      {}
    );
  }
}
