import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  template: `
    <p>profile works!</p>
    <button
      class="py-1 px-4 rounded-full bg-zinc-50 text-zinc-700 font-bold hover:bg-zinc-50/80 transition disabled:bg-zinc-50/40"
      (click)="logout()"
    >
      Logout
    </button>
  `,
  styles: ``,
})
export class ProfileComponent {
  constructor(private userService: UserService) {}

  logout() {
    this.userService.removeUserFromStorage();
  }
}
