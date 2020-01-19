import { AppRoutes } from './../../routes.enum';
import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'aft-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  private $authenticated: Subscription;

  @Output()
  closeSidenav = new EventEmitter<void>();

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.$authenticated = this.authService.$authenticated.subscribe(authenticated => {
      this.isAuthenticated = authenticated;
    });
  }

  ngOnDestroy() {
    this.$authenticated.unsubscribe();
  }

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
