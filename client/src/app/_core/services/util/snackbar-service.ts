import { inject, Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  private messageService = inject(MessageService);

  /**
   * @Description
   * Shows a success message in the snackbar
   * @param message
   * @param title
   */
  showSuccess(message: string, title: string = 'Done') {
    this.messageService.add({
      severity: 'success',
      summary: title,
      detail: message,
      key: 'global-toast',
    });
  }

  /**
   * @Description
   * Shows an error message in the snackbar
   * @param message
   * @param title
   */
  showError(message: string, title: string = 'Error') {
    this.messageService.add({
      severity: 'error',
      summary: title,
      detail: message,
      key: 'global-toast',
    });
  }

  /**
   * @Description
   * Shows a warning message in the snackbar
   * @param message
   * @param title
   */
  showWarning(message: string, title: string = 'Warning') {
    this.messageService.add({
      severity: 'warn',
      summary: title,
      detail: message,
      key: 'global-toast',
    });
  }

  /**
   * @Description
   * Shows an info message in the snackbar
   * @param message
   * @param title
   */
  showInfo(message: string, title: string = 'Info') {
    this.messageService.add({
      severity: 'info',
      summary: title,
      detail: message,
      key: 'global-toast',
    });
  }
}
