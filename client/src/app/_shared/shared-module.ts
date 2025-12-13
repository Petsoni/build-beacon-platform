import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';
import {TbIconComponent} from './tb-icon/tb-icon';
import {Tag} from 'primeng/tag';
import {ButtonDirective} from 'primeng/button';
import {InputText} from 'primeng/inputtext';
import { Navbar } from './navbar/navbar';



@NgModule({
  declarations: [
    Navbar
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterLink,
    TbIconComponent,
    RouterLinkActive,
    Tag,
    ButtonDirective,
    InputText,
  ],
  exports: [
    ReactiveFormsModule,
    FormsModule,
    RouterLink,
    TbIconComponent,
    RouterLinkActive,
    Tag,
    ButtonDirective,
    InputText,
    Navbar,
  ]
})
export class SharedModule { }
