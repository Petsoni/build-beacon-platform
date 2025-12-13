import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { DatePipe } from '@angular/common';
import { provideHttpClient, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NgIconsModule } from '@ng-icons/core';
import * as tablerIcons from '@ng-icons/tabler-icons';
import { ConfirmationService, MessageService } from 'primeng/api';
import { providePrimeNG } from 'primeng/config';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { ConfirmPopup } from 'primeng/confirmpopup';
import { Toast } from 'primeng/toast';
import { BuildBeaconTheme } from '../build-beacon-theme';
import { CoreModule } from './_core/core-module';
import { AuthInterceptor } from './_core/services/interceptors/auth-interceptor';
import { SharedModule } from './_shared/shared-module';
import { TbIconComponent } from './_shared/tb-icon/tb-icon';
import { App } from './app';
import { AppRoutingModule } from './app-routing-module';

@NgModule({
  declarations: [App],
  imports: [
    BrowserModule,
    CoreModule,
    SharedModule,
    AppRoutingModule,
    NgIconsModule.withIcons(tablerIcons),
    Toast,
    ConfirmPopup,
    ConfirmDialog,
    TbIconComponent,
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(withInterceptors([AuthInterceptor]), withInterceptorsFromDi()),
    providePrimeNG({
      overlayAppendTo: 'body',
      ripple: true,
      theme: {
        preset: BuildBeaconTheme,
        options: {
          darkModeSelector: '.build-beacon-dark',
        },
      },
    }),
    JwtHelperService,
    MessageService,
    ConfirmationService,
    DatePipe,
  ],
  bootstrap: [App],
})
export class AppModule {}
