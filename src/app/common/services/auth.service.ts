import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { SnackBarService } from './snackBar.service';

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
    private snackBarService: SnackBarService,
  ) {
    const userFromLocalStorage = localStorage.getItem('note app user');
    this.userSubject = new BehaviorSubject<boolean>(!!userFromLocalStorage);
  }

  public login(email: string, password: string): void {
    if (email === user.email && password === user.password) {
      this.snackBarService.openSnackBar('Successful login', 'Ok')
      this.userSubject.next(true);
      this.router.navigate(['board']);
      localStorage.setItem('note app user', JSON.stringify(email));
    } else {
      this.snackBarService.openSnackBar('Invalid data', 'Ok')
    }
  }

  public logout(): void {
    localStorage.removeItem('note app user');
    this.userSubject.next(false);
    this.router.navigate(['login']);
  }

  public isAuthorized(): Observable<boolean> {
    return this.userSubject.asObservable();
  }
}
