import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WebsiteRoutingModule } from './website-routing-module';
import { ExplorePage } from './explore-page/explore-page';
import { DevExploreCardComponent } from './components/dev-explore-card';
import { InputText } from 'primeng/inputtext';
import { InputGroup } from 'primeng/inputgroup';
import { InputGroupAddon } from 'primeng/inputgroupaddon';
import { TbIconComponent } from '../../_shared/tb-icon/tb-icon';
import { Select } from 'primeng/select';
import { Tag } from 'primeng/tag';
import { Tooltip } from 'primeng/tooltip';
import { ProfilePage } from './profile-page/profile-page';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../_shared/shared-module';
import { Divider } from 'primeng/divider';
import { MessageModule } from 'primeng/message';

@NgModule({
  declarations: [ExplorePage, ProfilePage],
  imports: [
    CommonModule,
    SharedModule,
    WebsiteRoutingModule,
    DevExploreCardComponent,
    InputText,
    InputGroup,
    InputGroupAddon,
    TbIconComponent,
    Select,
    Tag,
    Tooltip,
    FormsModule,
    ReactiveFormsModule,
    Divider,
    MessageModule,
  ],
})
export class WebsiteModule {}
