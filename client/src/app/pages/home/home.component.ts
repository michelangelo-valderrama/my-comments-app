import { Component, OnInit, signal } from '@angular/core';
import { CommentComponent } from '../../components/comment/comment.component';
import { CommentService } from '../../services/comment.service';
import { Comment } from '../../interfaces';
import { WriteCommentComponent } from '../../components/write-comment/write-comment.component';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommentComponent, WriteCommentComponent],
  template: `
    <h1 class="text-xl font-bold text-zinc-50">Home</h1>
    <article class="mt-10 mb-20 max-w-screen-sm mx-auto">
      <app-write-comment (formSubmitted)="createComment($event)"></app-write-comment>
      <ol class=>
        @for (comment of comments(); track $index) {
        <app-comment [comment]="comment"></app-comment>
        }
      </ol>
    </article>
  `,
  styles: ``,
})
export class HomeComponent implements OnInit {
  comments = signal<Comment[]>([]);

  constructor(
    private commentService: CommentService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.getComments();
  }

  getComments() {
    this.commentService.getComments().subscribe((comments) => {
      this.comments.set(comments);
    });
  }

  createComment({ text }: { text: string }) {
    const userId = this.userService.getUserFromStorage()?._id;
    if (!userId) return;
    this.commentService
      .createComment({
        text,
        userId,
      })
      .subscribe((createdComment) => {
        console.log(createdComment)
        this.comments.set([createdComment, ...this.comments()]);
      });
  }
}
