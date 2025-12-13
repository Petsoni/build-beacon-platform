import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginLayout } from './login-layout/login-layout';
import { WebsiteLayout } from './website-layout/website-layout';
import { SignUpLayout } from './sign-up-layout/sign-up-layout';
import { UserGuard } from '../_core/guard/user-guard';

const routes: Routes = [
  {
    path: 'login',
    component: LoginLayout,
  },
  {
    path: 'sign-up',
    component: SignUpLayout,
  },
  {
    path: '',
    component: WebsiteLayout,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('../_features/website/website-module').then((m) => m.WebsiteModule),
        canActivate: [UserGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LayoutsRoutingModule {}
