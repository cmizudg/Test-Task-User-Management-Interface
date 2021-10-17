import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

import { UserService } from './services/user.service';
import { DummyDataService } from './services/dummy-data.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(DummyDataService),
  ],
  providers: [UserService]
})
export class CoreModule { }
