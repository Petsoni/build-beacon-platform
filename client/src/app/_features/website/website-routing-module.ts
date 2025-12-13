import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserGuard } from '../../_core/guard/user-guard';
import { ExplorePage } from './explore-page/explore-page';
import { ProfilePage } from './profile-page/profile-page';

const routes: Routes = [
  {
    path: 'explore',
    component: ExplorePage,
  },
  {
    path: 'profile',
    component: ProfilePage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WebsiteRoutingModule {}
