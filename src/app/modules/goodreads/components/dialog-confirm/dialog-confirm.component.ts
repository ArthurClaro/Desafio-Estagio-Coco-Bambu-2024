
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

  showDialog() {
    this.visible = true;
  }

  value!: number;

  values = new FormControl<string[] | null>(null);
  max = 3;

  text?: string;

  constructor(private messageService: MessageService) { }

  show() {
    this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Successfully evaluated' });
  }
  showErro() {
    this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Missing values' });
  }

  checked: boolean = false;
  @Output() confirm = new EventEmitter<any>(); // Emissor de evento para enviar os dados ao componente pai


  logValue() {
    if (this.value == null || !this.checked || this.values.value == null || this.text == null) {
      console.log('Erro detectado:', this.value, this.checked, this.values.value, this.text);
      this.showErro();

    } else {
      this.show();
      setTimeout(() => {
        const array = {
          favorite: this.checked, // Será true somente se o checkbox estiver marcado
          range: this.value,
          tags: this.values.value,
          notes: this.text
        };

        console.log(array);
        // Emite os dados do formulário para o componente pai
        this.confirm.emit(array);
        this.visible = false; // Fecha o diálogo após o envio

        document.body.style.overflow = 'auto'; // ou document.body.classList.remove('p-dialog-open');

      }, 1000)
    }
  }
  onDialogHide() {
    document.body.style.overflow = 'auto'; // Reseta o estilo do body
  }

}


// https://primeng.org/chips
// https://primeng.org/rating
// https://primeng.org/dialog
// https://primeng.org/inputtextarea
// https://primeng.org/toast