import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatSidenavContainer } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements AfterViewInit {
  @ViewChild(MatSidenavContainer) drawer?: MatSidenavContainer = undefined;
  ngAfterViewInit(): void {
    if(this.drawer){
      this.drawer.open();
    }
  }
  title = 'app';
}
