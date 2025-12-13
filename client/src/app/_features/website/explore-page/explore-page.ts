import { Component, inject, OnInit } from '@angular/core';
import { DevelopersManagementService } from '../../../_core/services/logic/developers-management-service';
import { UserManagementService } from '../../../_core/services/logic/user-management-service';

@Component({
  selector: 'explore-page',
  standalone: false,
  templateUrl: './explore-page.html',
  styleUrl: './explore-page.css',
})
export class ExplorePage implements OnInit {
  filterOptions: any[] = [
    {
      name: 'NDA',
      label: 'NDA',
    },
    {
      name: 'In Development',
      label: 'In Development',
    },
    {
      name: 'Finished',
      label: 'Finished',
    },
    {
      name: 'Finding Ideas',
      label: 'Finding Ideas',
    },
  ];

  public developersService = inject(DevelopersManagementService);
  private userManagementService = inject(UserManagementService);

  ngOnInit() {
    this.developersService.getDevelopersForExplorePage();
  }
}
