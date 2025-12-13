import { Component, Input } from '@angular/core';
import { ButtonDirective } from 'primeng/button';
import { Card } from 'primeng/card';
import { Divider } from 'primeng/divider';
import { Tag } from 'primeng/tag';
import { DefaultAccountModel } from '../../../_core/models/default-account.model';
import { TbIconComponent } from '../../../_shared/tb-icon/tb-icon';
import { BrowserModule } from '@angular/platform-browser';
import { NgClass } from '@angular/common';
import { DeveloperProjectModel } from '../../../_core/models/developer-project.model';
import { DashboardDeveloperModel } from '../../../_core/models/dashboard-developer.model';

@Component({
  standalone: true,
  selector: 'dev-explore-card',
  template: `
    <p-card class="w-full overflow-hidden">
      <div class="flex items-start justify-between w-full">
        <div class="flex items-center justify-center gap-4">
          <!-- <img
            class="rounded-full w-11 h-11"
            src="https://pbs.twimg.com/profile_images/1980277199077793792/R7eU_k6d_400x400.jpg"
            alt="Profile image"
          /> -->
          <div class="flex flex-col gap-1">
            <h6 class="font-semibold">
              {{ developer.user.name }}
            </h6>
            <p
              class="inline-flex items-center justify-start gap-2"
              [ngClass]="{ '!text-gray-400': developer.user.username == null }"
            >
              <tb-icon iconName="BrandX" />
              @if(developer.user.username != null) {
              <a
                [href]="'http://x.com/' + developer.user.username"
                target="_blank"
                class="underline"
                >&commat;{{ developer.user.username }}</a
              >
              } @else { Not connected }
            </p>
          </div>
        </div>
        @if(isNewDeveloper()) {
        <p-tag severity="info">
          <tb-icon iconName="Sparkles" />
          <span class="hidden md:block lg:block">New here</span>
        </p-tag>
        }
      </div>
      <p-divider />
      <div class="flex justify-between items-center">
        <div class="flex items-start justify-center">
          <tb-icon iconName="BrandStripe" />
          <p>{{ developer.developerProject?.title }}</p>
        </div>
        <button pButton text size="small">
          {{ developer.developerProject?.status }}
          <tb-icon iconName="HeartHandshake" />
        </button>
      </div>
    </p-card>
  `,
  imports: [Card, TbIconComponent, Divider, ButtonDirective, NgClass, Tag],
})
export class DevExploreCardComponent {
  @Input() developer: DashboardDeveloperModel;

  isNewDeveloper() {
    const today = new Date();
    const threeDaysAgo = new Date();
    threeDaysAgo.setDate(today.getDate() - 3);

    today.setHours(0, 0, 0, 0);
    threeDaysAgo.setHours(0, 0, 0, 0);

    return new Date(this.developer.user.createdAt).getTime() > threeDaysAgo.getTime();
  }
}
