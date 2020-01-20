import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { AuthAction } from 'src/app/auth/state/auth.actions';
import { AuthState } from './../../../auth/state/auth.state';
import { AppRoutes } from './../../routes.enum';

@Component({
  selector: 'aft-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output()
  sidenavToggle = new EventEmitter<void>();

  @Select(AuthState.isAuthenticated) $isAuthenticated: Observable<boolean>;

  constructor(private store: Store) { }

  ngOnInit() {
  }

  onToggleSidenav() {
    this.sidenavToggle.emit();
  }

  onLogout() {
    this.store.dispatch(new AuthAction.Logout());
  }

  get route() {
    return AppRoutes;
  }

}
