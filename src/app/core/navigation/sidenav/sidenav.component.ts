import { Component, EventEmitter, Output } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { AuthState } from 'src/app/auth/state/auth.state';
import { AuthService } from '../../../auth/providers/auth.service';
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

  constructor(private authService: AuthService) { }

  onLogout() {
    this.onClose();
    this.authService.logout();
  }

  private onClose() {
    this.closeSidenav.emit();
  }

  get route() {
    return AppRoutes;
  }

}
