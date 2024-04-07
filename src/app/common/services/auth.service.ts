import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar'; 

const user = {
  email: 'user@gmail.com',
  password: 'password',
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userSubject: BehaviorSubject<boolean>;

  constructor(
    private router: Router,
    private _snackBar: MatSnackBar,
  ) {
    const userFromLocalStorage = localStorage.getItem('note app user');
    this.userSubject = new BehaviorSubject<boolean>(!!userFromLocalStorage);
  }

  public login(email: string, password: string): void {
    if (email === user.email && password === user.password) {
      this.openSnackBar('Successful login', 'Ok')
      this.userSubject.next(true);
      this.router.navigate(['board']);
      localStorage.setItem('note app user', JSON.stringify(email));
    } else {
      this.openSnackBar('Invalid data', 'Ok')
    }
  }

  public logout(): void {
    localStorage.removeItem('note app user');
    this.userSubject.next(false);
    this.router.navigate(['login']);
  }

  public isAuthorized(): boolean {
    return this.userSubject.getValue();
  }

  private openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

}
