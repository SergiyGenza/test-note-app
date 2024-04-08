import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/common/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  public isOpen: boolean = false;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
  ) { }

  public loginForm = this.fb.group({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  })
  
  public onSubmit(): void {
    const { email, password } = this.loginForm.value;
    if (email && password) {
      this.authService.login(email, password);
    }
  }
}
