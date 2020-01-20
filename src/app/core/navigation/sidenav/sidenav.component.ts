import { Component, EventEmitter, Output } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { AuthAction } from 'src/app/auth/state/auth.actions';
import { AuthState } from 'src/app/auth/state/auth.state';
import { AppRoutes } from './../../routes.enum';

@Component({
  selector: 'aft-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent {

  @Output()
  closeSidenav = new EventEmitter<void>();

  @Select(AuthState.isAuthenticated) $isAuthenticated: Observable<boolean>;

  constructor(private store: Store) { }

  onLogout() {
    this.onClose();
    this.store.dispatch(new AuthAction.Logout());
  }

  private onClose() {
    this.closeSidenav.emit();
  }

  get route() {
    return AppRoutes;
  }

}
