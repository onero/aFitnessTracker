import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'aft-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output()
  sidenavToggle = new EventEmitter<void>();

  constructor() { }

  ngOnInit() {
  }

  onToggleSidenav() {
    this.sidenavToggle.emit();
  }

}
