import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { USER_OVERVIEW_LINKS } from '../../consts/user-overview-links';
import { BehaviorSubject, filter, Subject, Subscriber, Subscription } from 'rxjs';

@Component({
  selector: 'app-user-tabs',
  templateUrl: './user-tabs.component.html',
  styleUrl: './user-tabs.component.css'
})
export class UserTabsComponent implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }

  selectedTabIndex = 0;

  links = USER_OVERVIEW_LINKS;
  private routes: any[] = [];

  ngOnInit(): void {
    this.routes = this.links.map(link => link.link);

    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(() => {
      this.updateSelectedTabIndex();
    });

    this.updateSelectedTabIndex();
  }

  onTabChange(index: number) {
    this.router.navigate([`${this.routes[index]}`]);
  }

  updateSelectedTabIndex(): void {
    const currentUrl = this.router.url;
    const findRoute = this.routes.find(route => currentUrl.includes(route));

    this.selectedTabIndex = findRoute ? this.routes.indexOf(findRoute) : 0;
  }

}
