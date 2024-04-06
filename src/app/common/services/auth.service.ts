import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

const user = {
  email: 'user@gmail.com',
  password: 'password',
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userSubject: BehaviorSubject<boolean>;

  constructor(private router: Router) {
    const userFromLocalStorage = localStorage.getItem('note app user');
    this.userSubject = new BehaviorSubject<boolean>(!!userFromLocalStorage);
  }

  public login(email: string | null | undefined, password: string | null | undefined): void {
    if (email === user.email && password === user.password) {
      console.log('success');
      this.userSubject.next(true);
      this.router.navigate(['board']);
      localStorage.setItem('note app user', JSON.stringify(email));
    } else {
      console.log('invalid data');
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

}
