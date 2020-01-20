import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { AuthService } from '../../../auth/providers/auth.service';
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

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  onToggleSidenav() {
    this.sidenavToggle.emit();
  }

  onLogout() {
    this.authService.logout();
  }

  get route() {
    return AppRoutes;
  }

}
