import { Component, Input, OnInit, signal } from '@angular/core';
import { WriteCommentComponent } from '../write-comment/write-comment.component';
import { Comment } from '../../interfaces';
import { DatePipe, NgClass } from '@angular/common';
import { CommentService } from '../../services/comment.service';
import { UserService } from '../../services/user.service';
import { LikeService } from '../../services/like.service';

@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [WriteCommentComponent, DatePipe, NgClass],
  template: `
    <li class="pt-10 pb-4 border-b border-zinc-800">
      <div class="flex gap-x-4">
        <div class="relative w-10">
          <img
            class="w-10 h-10 rounded-full absolute top-0 left-0 ring-8 ring-zinc-900 bg-zinc-900"
            [src]="comment.user.photo"
            alt=""
          />
          <div class="h-full border-s border-zinc-600 ms-5"></div>
        </div>
        <div class="flex-1">
          <div class="flex text-sm">
            <p class="flex-1 font-bold text-white">{{ comment.user.name }}</p>
            <time class="text-zinc-600">
              {{ comment.createdAt | date : 'short' }}
            </time>
          </div>
          <p class="text-zinc-400 leading-loose">
            {{ comment.text }}
          </p>
          <div class="text-sm text-zinc-600 mt-2 flex gap-x-8 items-center">
            <button
              class="group hover:text-blue-400 flex items-center justify-center gap-x-2 transition"
              (click)="nestedComments().length && onClickComments()"
            >
              <span
                class="w-8 h-8 flex items-center justify-center group-hover:bg-blue-400/20 rounded-full transition"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="w-5 h-5"
                >
                  <path
                    d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
                  />
                </svg>
              </span>
              {{ nestedComments().length }}
            </button>
            <button
              class="group hover:text-red-400 flex items-center justify-center gap-x-2 transition"
              [ngClass]="{ 'text-red-400': commentLiked }"
              (click)="toggleLike()"
            >
              <span
                class="w-8 h-8 flex items-center justify-center group-hover:bg-red-400/20 rounded-full transition"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-5 h-5"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M12.0122 5.57169L10.9252 4.48469C8.77734 2.33681 5.29493 2.33681 3.14705 4.48469C0.999162 6.63258 0.999162 10.115 3.14705 12.2629L11.9859 21.1017L11.9877 21.0999L12.014 21.1262L20.8528 12.2874C23.0007 10.1395 23.0007 6.65711 20.8528 4.50923C18.705 2.36134 15.2226 2.36134 13.0747 4.50923L12.0122 5.57169ZM11.9877 18.2715L16.9239 13.3352L18.3747 11.9342L18.3762 11.9356L19.4386 10.8732C20.8055 9.50635 20.8055 7.29028 19.4386 5.92344C18.0718 4.55661 15.8557 4.55661 14.4889 5.92344L12.0133 8.39904L12.006 8.3918L12.005 8.39287L9.51101 5.89891C8.14417 4.53207 5.92809 4.53207 4.56126 5.89891C3.19442 7.26574 3.19442 9.48182 4.56126 10.8487L7.10068 13.3881L7.10248 13.3863L11.9877 18.2715Z"
                    fill="currentColor"
                  />
                </svg>
              </span>
              {{ totalLikes }}
            </button>
            <button
              class="ml-auto flex items-center justify-center gap-x-2 text-zinc-300 border border-zinc-300/20 hover:border-purple-400 hover:text-purple-400 hover:bg-purple-400/20 py-1.5 px-3 transition rounded-full"
              (click)="onClickReply()"
            >
              Reply
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                class="w-5 h-5"
              >
                <path
                  d="M10.3623 15.529L8.94804 16.9432L3.99829 11.9934L8.94804 7.0437L10.3623 8.45791L7.86379 10.9564H16.0018C18.2109 10.9564 20.0018 12.7472 20.0018 14.9564V16.9564H18.0018V14.9564C18.0018 13.8518 17.1063 12.9564 16.0018 12.9564H7.78965L10.3623 15.529Z"
                  fill="currentColor"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      @if (showComments()) {
      <div class="flex gap-x-4">
        <div class="w-10">
          <div class="h-full border-s border-zinc-600 ms-5"></div>
        </div>
        <ul class="flex-1 mb-6">
          @if (showReply()) {
          <li>
            <app-write-comment
              placeholder="Write your response..."
              buttonText="Send"
              (formSubmitted)="createReply($event)"
            ></app-write-comment>
          </li>
          } @for (comments of nestedComments(); track $index) {
          <app-comment [comment]="comments"></app-comment>
          }
        </ul>
      </div>
      }
    </li>
  `,
  styles: ``,
})
export class CommentComponent implements OnInit {
  showComments = signal(false);
  showReply = signal(false);
  nestedComments = signal<Comment[]>([]);
  totalLikes!: number;
  commentLiked = false;

  private userId!: string;
  private commentId!: string;

  // nestedCommentsEffect = effect(() => {
  //   if (this.showComments()) {
  //     this.getNestedComments();
  //   }
  // });

  @Input() comment!: Comment;

  constructor(
    private commentService: CommentService,
    private userService: UserService,
    private likeService: LikeService
  ) {}

  ngOnInit(): void {
    const userId = this.userService.getUserFromStorage()?._id;
    if (!userId) {
      throw new Error('User does not exist');
    }
    this.userId = userId;
    this.commentId = this.comment._id;

    this.getNestedComments();

    this.likeService
      .getTotalLikesOfComment(this.commentId)
      .subscribe((data) => {
        this.totalLikes = data.likes;
      });

    this.likeService
      .checkCommentLiked({
        commentId: this.commentId,
        userId: this.userId,
      })
      .subscribe((data) => {
        if (data) {
          this.commentLiked = true;
        }
      });
  }

  onClickComments() {
    this.showComments.set(!this.showComments());
    this.showReply.set(false);
  }

  onClickReply() {
    this.showReply.set(!this.showReply());
    this.showComments.set(true);
  }

  getNestedComments() {
    this.commentService.getComments(this.comment._id).subscribe((comments) => {
      this.nestedComments.set(comments);
    });
  }

  createReply({ text }: { text: string }) {
    this.commentService
      .createComment({
        text,
        userId: this.userId,
        parentId: this.commentId,
      })
      .subscribe((createdComment) => {
        console.log('[created comment]:', createdComment);
        console.log([createdComment, ...this.nestedComments()])
        this.nestedComments.set([createdComment, ...this.nestedComments()]);
      });
  }

  toggleLike() {
    const dto = {
      commentId: this.commentId,
      userId: this.userId,
    };
    if (this.commentLiked) {
      this.likeService.unlikeComment(dto).subscribe(() => {
        this.totalLikes--;
        this.commentLiked = false;
      });
    } else {
      this.likeService.likeComment(dto).subscribe(() => {
        this.totalLikes++;
        this.commentLiked = true;
      });
    }
  }
}
