import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthModule } from './auth/auth.module';
import { HeadersModule } from './headers/headers.module';

const routes: Routes = [
  {
    path: 'login', pathMatch: 'full', loadChildren: () => AuthModule
  },
  {
    path: '',redirectTo:'login', pathMatch:'full'
  },
  {
    path: 'headers',
    loadChildren: () => HeadersModule,

  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
