import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputComponent {
  @Input() label!: string;
  @Input() type?: 'text' | 'password' | 'email';
  @Input() control: FormControl = new FormControl;
  public hide = true;

  public checkForErrorsIn(): string {
    if (this.control.hasError('required')) {
      return 'You must enter a value';
    }
    return this.control.hasError('email') ? 'Not a valid email' : '';
  }
}
