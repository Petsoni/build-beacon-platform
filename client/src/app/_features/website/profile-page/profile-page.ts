import { AfterViewInit, Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserManagementService } from '../../../_core/services/logic/user-management-service';
import { AuthService } from '../../../_core/services/auth/auth-service';
import { DevelopersManagementService } from '../../../_core/services/logic/developers-management-service';
import { ProjectStatusEnum } from '../../../_core/models/enums/project-status.enum';
import { DeveloperProjectModel } from '../../../_core/models/developer-project.model';

@Component({
  selector: 'profile-page',
  standalone: false,
  templateUrl: './profile-page.html',
  styleUrl: './profile-page.css',
})
export class ProfilePage implements AfterViewInit {
  public userManagementService = inject(UserManagementService);
  private authService = inject(AuthService);
  private developersManagementService = inject(DevelopersManagementService);

  visible = signal(false);
  projectStatusOptions: any[] = Object.entries(ProjectStatusEnum).map((enumEntry) => {
    return {
      status: enumEntry[1],
    };
  });

  userProfileForm = new FormGroup({
    name: new FormControl(null, Validators.required),
    username: new FormControl(null, Validators.required),
    email: new FormControl(null, [Validators.required, Validators.email]),
    emailVerified: new FormControl(null),
    // image: new FormControl(null),
    projectForm: new FormGroup({
      id: new FormControl(null, Validators.required),
      title: new FormControl(null, Validators.required),
      status: new FormControl(null, Validators.required),
      link: new FormControl(null),
    }),
  });

  ngAfterViewInit() {
    this.userProfileForm.patchValue(this.userManagementService.currentUser());
    this.userProfileForm.controls.projectForm.patchValue(
      this.userManagementService.currentUser().currentProject
    );
  }

  sendVerificationEmail() {
    this.authService.sendVerificationEmail(this.userManagementService.currentUser().email);
  }

  updateUsername() {
    this.developersManagementService.updateUsername(
      this.userProfileForm.controls.username.value,
      this.userManagementService.currentUser().id
    );
  }

  updateProjectDetails() {
    this.developersManagementService.updateProjectDetails(
      this.userProfileForm.controls.projectForm.value as DeveloperProjectModel
    );
  }

  showMessage() {
    this.visible.set(true);

    setTimeout(() => {
      this.visible.set(false);
    }, 3000);
  }
}
