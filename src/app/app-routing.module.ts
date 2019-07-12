import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {FileuploaderComponent} from './fileuploader/fileuploader.component';

const routes: Routes = [
  {path: '', component: FileuploaderComponent},
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
// @ts-ignore
export class AppRoutingModule { }
