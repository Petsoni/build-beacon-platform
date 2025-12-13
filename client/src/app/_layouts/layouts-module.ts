import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WebsiteLayout } from './website-layout/website-layout';
import { RouterOutlet } from '@angular/router';
import { LayoutsRoutingModule } from './layouts-routing-module';
import { SharedModule } from '../_shared/shared-module';
import { LoginLayout } from './login-layout/login-layout';
import { InputGroup } from 'primeng/inputgroup';
import { InputGroupAddon } from 'primeng/inputgroupaddon';
import { SignUpLayout } from './sign-up-layout/sign-up-layout';

@NgModule({
  declarations: [WebsiteLayout, LoginLayout, SignUpLayout],
  imports: [
    CommonModule,
    RouterOutlet,
    LayoutsRoutingModule,
    SharedModule,
    InputGroup,
    InputGroupAddon,
  ],
})
export class LayoutsModule {}
