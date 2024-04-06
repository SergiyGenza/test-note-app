import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Noteapp';
  public show: boolean = true;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.shohHeder();
  }

  private shohHeder() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const url = this.router.url;
        this.show = !/(login)/.test(url);
      }
    });
  }

}
