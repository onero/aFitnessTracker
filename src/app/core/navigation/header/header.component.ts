import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'aft-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  private $authenticated: Subscription;

  @Output()
  sidenavToggle = new EventEmitter<void>();

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.$authenticated = this.authService.$authenticated.subscribe(authenticated => {
      this.isAuthenticated = authenticated;
    });
  }

  onToggleSidenav() {
    this.sidenavToggle.emit();
  }

  ngOnDestroy() {
    this.$authenticated.unsubscribe();
  }

}
