import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/common/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  public isOpen!: boolean;
  public hide = true;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
  ) { }

  public loginForm = this.fb.group({
    email: '',
    password: '',
  })

  public getControlName(name: string): FormControl<any> {
    const control = this.loginForm.get(name) as FormControl;
    name === 'email'
      ? control.addValidators([Validators.required, Validators.email])
      : control.addValidators([Validators.required,]);
    return control;
  }

  public onSubmit(): void {
    const { email, password } = this.loginForm.value;
    if (email && password) {
      this.authService.login(email, password);
    }
  }
}
