import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from '../../shared/models/user';
import { AccountService } from 'src/app/account/account.service.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  currentUser$: Observable<IUser>;
  isAdmin$: Observable<boolean>;

  constructor(private accountService: AccountService) { }

  ngOnInit() {
    this.currentUser$ = this.accountService.currentUser$;
    this.isAdmin$ = this.accountService.isAdmin$;
  }

  logout() {
    this.accountService.logout();
  }

}
