import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListBookComponent } from './board/list-book/list-book.component';
import { LoginComponent } from './home/login/login.component';
import { RegisterComponent } from './home/register/register.component';
import { SaveBookComponent } from "./board/save-book/save-book.component";
import { AuthGuard } from "./guard/auth.guard";

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'signUp',
    component: RegisterComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'listBook',
    component: ListBookComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'registerBook',
    component: SaveBookComponent,
    canActivate: [AuthGuard],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
