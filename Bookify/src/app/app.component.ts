import {Component, OnInit} from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'Bookify';
  constructor(private router: Router) { }

  ngOnInit(): void {
    // this.router.events.subscribe((event) => {
    //   if (!(event instanceof NavigationEnd)) {
    //     return;
    //   }
    //   window.scrollTo(0, 0)
    // });
  }

}
