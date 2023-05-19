import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app.routing';
import { NavbarModule } from './shared/navbar/navbar.module';
import { FooterModule } from './shared/footer/footer.module';
import { SidebarModule } from './sidebar/sidebar.module';

import { AppComponent } from './app.component';
import { RestService } from './service/rest-service.service';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
    NavbarModule,
    FooterModule,
    SidebarModule,
    AppRoutingModule,
    NgxPaginationModule
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent
  ],
  providers: [RestService],
  bootstrap: [AppComponent]
})
export class AppModule { }
