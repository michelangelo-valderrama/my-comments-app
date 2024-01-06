import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AutosizeModule } from 'ngx-autosize';

@Component({
  selector: 'app-write-comment',
  standalone: true,
  imports: [AutosizeModule],
  template: `
    <form
      class="bg-zinc-800/40 rounded-xl p-6 flex flex-col mt-6 items-end gap-y-6"
      (submit)="formSubmit($event)"
    >
      <textarea
        #comment
        autosize
        name="commentText"
        class="resize-none w-full bg-transparent placeholder:text-xl placeholder:text-zinc-600 focus:ring-0 focus:outline-none text-xl break-words"
        autofocus
        rows="1"
        maxlength="250"
        minlength="1"
        [placeholder]="placeholder"
      ></textarea>
      <button
        class="py-1 px-4 rounded-full bg-zinc-50 text-zinc-700 font-bold hover:bg-zinc-50/80 transition disabled:bg-zinc-50/40"
        [disabled]="!comment.value"
        type="submit"
      >
        {{ buttonText }}
      </button>
    </form>
  `,
  styles: ``,
})
export class WriteCommentComponent {
  @Input() placeholder = 'Write something...';
  @Input() buttonText = 'Create';
  @Output() formSubmitted = new EventEmitter<{ text: string }>();

  formSubmit(event: SubmitEvent) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const commentText = (
      form.elements.namedItem('commentText') as HTMLInputElement
    ).value;
    form.reset();
    this.formSubmitted.emit({ text: commentText });
  }
}
