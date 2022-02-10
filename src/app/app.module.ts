
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { AppRoutes } from './app.routing';
import { AppComponent } from './app.component';

import { FlexLayoutModule } from '@angular/flex-layout';
import { FullComponent } from './layouts/full/full.component';
import { AppHeaderComponent } from './layouts/full/header/header.component';
import { AppSidebarComponent } from './layouts/full/sidebar/sidebar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DemoMaterialModule } from './demo-material-module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { SharedModule } from './shared/shared.module';
import { SpinnerComponent } from './shared/spinner.component';


import { ParteService } from '../services/parte.service';
import { ClienteService } from '../services/cliente.service';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAnalyticsModule } from '@angular/fire/analytics';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { environment } from '../environments/environment';


@NgModule({
  declarations: [
    AppComponent,
    FullComponent,
    AppHeaderComponent,
    SpinnerComponent,
    AppSidebarComponent
  ],
  imports: [   
    BrowserModule,
    BrowserAnimationsModule,
    DemoMaterialModule,
    FormsModule,
    FlexLayoutModule,
    HttpClientModule,
    SharedModule,
    Ng2SmartTableModule,
    RouterModule.forRoot(AppRoutes, { relativeLinkResolution: 'legacy' }),

    //firebase
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAnalyticsModule,
    AngularFirestoreModule,
    AngularFireStorageModule
  ],
  providers: [
    ParteService,
    ClienteService,
    {
      provide: LocationStrategy, useClass: PathLocationStrategy    
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
