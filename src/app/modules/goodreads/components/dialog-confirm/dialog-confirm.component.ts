
import { Component, EventEmitter, Output } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { RatingModule } from 'primeng/rating';

import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ChipsModule } from 'primeng/chips';

import { InputTextareaModule } from 'primeng/inputtextarea';
import { FloatLabelModule } from 'primeng/floatlabel';

import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { RippleModule } from 'primeng/ripple';

import { CheckboxModule } from 'primeng/checkbox';

@Component({
  selector: 'app-dialog-confirm',
  standalone: true,
  imports: [ToastModule, CheckboxModule, RippleModule, DialogModule, ButtonModule, FormsModule, RatingModule, ChipsModule, ReactiveFormsModule, FloatLabelModule, InputTextareaModule],
  templateUrl: './dialog-confirm.component.html',
  providers: [MessageService],
  styleUrl: './dialog-confirm.component.scss'
})
export class DialogConfirmComponent {
  visible: boolean = false;
  pi: string | undefined;
  value!: number;
  values = new FormControl<string[] | null>(null);
  max = 3;
  text?: string;

  showDialog() {
    this.visible = true;
  }

  constructor(private messageService: MessageService) { }

  show() {
    this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Successfully evaluated' });
  }
  showErro() {
    this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Missing values' });
  }

  checked: boolean = false;
  @Output() confirm = new EventEmitter<any>();


  logValue() {
    if (this.value == null || !this.checked || this.values.value == null || this.text == null) {
      this.showErro();

    } else {
      this.show();
      setTimeout(() => {
        const array = {
          favorite: this.checked,
          range: this.value,
          tags: this.values.value,
          notes: this.text
        };

        this.confirm.emit(array);
        this.visible = false;

        document.body.style.overflow = 'auto';

      }, 1000)
    }
  }
  onDialogHide() {
    document.body.style.overflow = 'auto';
  }

}