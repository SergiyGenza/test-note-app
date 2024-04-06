import { Component } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { AuthService } from 'src/app/common/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  public isOpen: boolean = false;
  public hide = true;

  constructor(
    private authService: AuthService
  ) { }

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  })

  public checkForErrorsIn(): string {
    if (this.form.hasError('required')) {
      return 'You must enter a value';
    }
    return this.form.hasError('email') ? 'Not a valid email' : '';
  }

  public onSubmit(): void {
    const { email, password } = this.form.value;
    this.authService.login(email, password);
  }
}
