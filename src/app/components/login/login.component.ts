import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from './../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm = this.dev.group({
    username: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+(?: [a-zA-Z]+)*$/)]],
    password: ['', Validators.required]
  })

  constructor(private dev: FormBuilder, private authService: AuthService, private msgService: MessageService, private router: Router) {}

  get username() {
    return this.loginForm.controls['username'];
  }

  get password() {
    return this.loginForm.controls['password'];
  }

  loginUser() {
    const { username, password } = this.loginForm.value;
    this.authService.getUserByUserName(username as string).subscribe(
      response => {
        if (response.length > 0 && response[0].password === password) {
          sessionStorage.setItem('username', username as string);
          this.router.navigate(['/home']);
          this.msgService.add({ severity: 'success', summary: 'Success', detail: 'Login successfully' });
        } else {
          this.msgService.add({ severity: 'error', summary: 'Error', detail: 'username or password is wrong' });
        }
      },
      error => {
        this.msgService.add({ severity: 'error', summary: 'Error', detail: 'Something went wrong' });
      }

    )
  }
}
