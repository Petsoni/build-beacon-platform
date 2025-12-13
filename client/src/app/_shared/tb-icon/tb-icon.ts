import {Component, Input} from '@angular/core';
import {NgIcon} from '@ng-icons/core';

@Component({
  standalone: true,
  selector: 'tb-icon',
  imports: [
    NgIcon
  ],
  template: `
    <ng-icon [name]="'tabler'+iconName" size="24" [class]="class"></ng-icon>
  `,
  styles: `
    :host {
      display: flex;
    }

    .xl {
      width: 3rem;
      height: 3rem;
    }
  `
})
export class TbIconComponent {
  /**@Note Go to https://tabler.io/icons for all icon names*/
  @Input() iconName: string;
  /**@Note Used for icon size: xs, sm, lg, xl */
  @Input() class: string;
}
