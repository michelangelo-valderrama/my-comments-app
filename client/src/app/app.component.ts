import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from './components/nav/nav.component';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.sass',
})
export class AppComponent {
  constructor(private userService: UserService) {
    const user = this.userService.getUserFromStorage();
    if (!user) {
      const randomNumber = Math.ceil(Math.random() * 4000 + 1000);
      this.userService
        .createUser({
          name: `user_${randomNumber}`,
          photo:
            'https://pbs.twimg.com/profile_images/1389221169908301832/d7O1DMxr_400x400.jpg',
        })
        .subscribe((newUser) => {
          console.log('[user] created', newUser);
          this.userService.saveUserToStorage(newUser);
        });
    }
  }
}
