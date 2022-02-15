import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LoginRoutes } from './login.routing';
import { ChartistModule } from 'ng-chartist';


@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    ChartistModule,
    RouterModule.forChild(LoginRoutes)
  ],
  declarations: []
})
export class LoginModule {}