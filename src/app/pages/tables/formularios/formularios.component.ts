import { ApiService } from './formscatalogs.service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbToastrService, NbGlobalPhysicalPosition } from '@nebular/theme';
import { Console } from 'console';
import { LocalDataSource } from 'ng2-smart-table';

@Component({
  selector: 'app-formularios',
  templateUrl: './formularios.component.html',
  styleUrls: ['./formularios.component.scss']
})
export class FormulariosComponent {
  formGroup: FormGroup;
  name: string;
  valido: boolean;
  selectedFile: File | null = null;
  previewImage: string | ArrayBuffer | null = null;
  minQuestions = 2;
  minAnswers = 3;

  // Configuración de la tabla de preguntas
  questionsSource = new LocalDataSource();
  tableSettings = {
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      text: {
        title: 'Pregunta',
        type: 'string',
        validation: {
          required: true,
        },
        filter: false,
      },
      answer1: {
        title: 'Respuesta 1',
        type: 'string',
        validation: {
          required: true,
        },
        filter: false,
      },
      answer2: {
        title: 'Respuesta 2',
        type: 'string',
        validation: {
          required: true,
        },
        filter: false,
      },
      answer3: {
        title: 'Respuesta 3',
        type: 'string',
        validation: {
          required: true,
        },
        filter: false,
      },
      answer4: {
        title: 'Respuesta 4',
        type: 'string',
        filter: false,
      },
      answer5: {
        title: 'Respuesta 5',
        type: 'string',
        filter: false,
      },
    },
    noDataMessage: 'No hay preguntas agregadas',
  };

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private toastr: NbToastrService,
  ) {
    this.formGroup = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  onValueSett(event: Event): void {
    //console.log('NAME: '+this.name);
    const input = event.target as HTMLInputElement;
    this.name = input.value;
    //console.log('EVENT: '+input.value);
    //console.log('NAME: '+this.name);
  }

  // Maneja la selección de archivo de imagen
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];

      // Validar tamaño (2MB máximo)
      if (file.size > 2 * 1024 * 1024) {
        this.showError('Archivo demasiado grande', 'El tamaño máximo permitido es 2MB');
        return;
      }

      // Validar tipo
      const validTypes = ['image/jpeg', 'image/png', 'image/tiff'];
      if (!validTypes.includes(file.type)) {
        this.showError('Formato no válido', 'Solo se permiten JPG, PNG o TIFF');
        return;
      }

      this.selectedFile = file;

      // Mostrar previsualización
      const reader = new FileReader();
      reader.onload = () => this.previewImage = reader.result;
      reader.readAsDataURL(file);
    }
  }

  // Valida el formulario completo antes de enviar
  async validateForm(): Promise<boolean> {
    this.valido = false;
    try {
      // Validar nombre e imagen
      //console.log("NAME["+this.name+"]");
      if (this.name == undefined || this.name == null || this.name.length<5) {
        this.showError('Campos requeridos', 'El nombre del formulario es obligatorio, al menos 5 caracteres.');
        return false;
      }

      //console.log('Validó nombre del form');
      if (!this.selectedFile) {
        this.showError('Imagen requerida', 'Debe cargar una imagen para el formulario');
        return false;
      }

      //console.log('Validó imagen');
      // Validar preguntas
      await this.questionsSource.getAll().then((questions: any[]) => {
        if (questions.length < this.minQuestions) {
          this.showError('Preguntas insuficientes', `Debe agregar al menos ${this.minQuestions} preguntas`);
          return false;
        }

        //console.log('Validó preguntas');
        for (const question of questions) {
          const answers = [
            question.answer1,
            question.answer2,
            question.answer3,
          ].filter(a => !!a); // Filtra respuestas vacías

          if (answers.length < this.minAnswers) {
            this.showError('Respuestas insuficientes', 'Cada pregunta debe tener al menos 3 respuestas');
            return false;
          }
          
          //console.log('Validó respuestas ');
        }

        this.valido = true;
        //console.log('Validó todo ');
        return true;
      });
    } catch (error) {
      console.error('Error en validación:', error);
      this.showError('Error de validación', 'Inténtalo nuevamente');
      return false;
    }
  }

  // Envía el formulario a la API
  async onSubmit(): Promise<void> {
    //console.log('NAME: '+this.name);
    //console.log('Validación: A');
    const isValid = await this.validateForm();
    //console.log('Validación: [' + isValid+"] valido["+this.valido+"]");
    if(this.valido){
      //console.log('Pasó la validación');

      const form_req = {
        name:  this.name,
        type: "M"
      };

      //console.log('Antes del POST a forms [' + JSON.stringify(form_req)+ ']');

      this.api.post('forms', form_req).subscribe({
        next: (data) => {
    
          //console.log('Response del POST a forms [' + JSON.stringify(data)+ ']');

          this.questionsSource.getAll().then((questions: any[]) => {
            let quest_req = {};
            console.log(JSON.stringify(questions));
            for (const question of questions) {

              quest_req = {
                form_id:  data['id'],
                text:  question.text,
                type: "M"
              };

              //console.log('Antes del POST a questions [' + JSON.stringify(quest_req)+ ']');
              this.api.post('questions', quest_req).subscribe({
                next: (dataQ) => {

                  //console.log('Response del POST a questions [' + JSON.stringify(dataQ)+ ']');

                  if(question.answer1.length > 0){

                    let answer_req_1 = {
                      form_id:  data['id'],
                      question_id:  dataQ['id'],
                      text:  question.answer1,
                      type: "M"
                    };

                    //console.log('Antes del POST a answers [' + JSON.stringify(answer_req_1)+ ']');
                    this.api.post('answers', answer_req_1).subscribe({
                      next: (dataA1) => {
                        //console.log('Response del POST a answers [' + JSON.stringify(dataA1)+ ']');
                      },
                      error: (err) => this.showError('Error al crear respuesta 1', err),
                    });
                  }

                  if(question.answer2.length > 0){
                   
                    let answer_req_2 = {
                      form_id:  data['id'],
                      question_id:  dataQ['id'],
                      text:  question.answer1,
                      type: "M"
                    };

                    //console.log('Antes del POST a answers [' + JSON.stringify(answer_req_2)+ ']');
                    this.api.post('answers', answer_req_2).subscribe({
                      next: (dataA2) => {
                        //console.log('Response del POST a answers [' + JSON.stringify(dataA2)+ ']');
                      },
                      error: (err) => this.showError('Error al crear respuesta 2', err),
                    });
                  }

                  if(question.answer3.length > 0){
                    
                    let answer_req_3 = {
                      form_id:  data['id'],
                      question_id:  dataQ['id'],
                      text:  question.answer1,
                      type: "M"
                    };

                    //console.log('Antes del POST a answers [' + JSON.stringify(answer_req_3)+ ']');
                    this.api.post('answers', answer_req_3).subscribe({
                      next: (dataA3) => {
                        //console.log('Response del POST a answers [' + JSON.stringify(dataA3)+ ']');
                      },
                      error: (err) => this.showError('Error al crear respuesta 3', err),
                    });
                  }

                  if(question.answer4.length > 0){
                    
                    let answer_req_4 = {
                      form_id:  data['id'],
                      question_id:  dataQ['id'],
                      text:  question.answer1,
                      type: "M"
                    };

                    //console.log('Antes del POST a answers [' + JSON.stringify(answer_req_4)+ ']');
                    this.api.post('answers', answer_req_4).subscribe({
                      next: (dataA4) => {
                        //console.log('Response del POST a answers [' + JSON.stringify(dataA4)+ ']');
                      },
                      error: (err) => this.showError('Error al crear respuesta 4', err),
                    });
                  }

                  if(question.answer5.length > 0){
                    
                    let answer_req_5 = {
                      form_id:  data['id'],
                      question_id:  dataQ['id'],
                      text:  question.answer1,
                      type: "M"
                    };

                    //console.log('Antes del POST a answers [' + JSON.stringify(answer_req_5)+ ']');
                    this.api.post('answers', answer_req_5).subscribe({
                      next: (dataA5) => {
                        //console.log('Response del POST a answers [' + JSON.stringify(dataA5)+ ']');
                      },
                      error: (err) => this.showError('Error al crear respuesta 5', err),
                    });
                  }


                  //this.showSuccess('Pregunta creado con éxito');
                  //this.resetForm();
                },
                error: (err) => this.showError('Error al crear pregunta', err),
              });
              quest_req = {};
            }
      
          });

          this.showSuccess('Formulario creado con éxito');
          this.resetForm();
        },
        error: (err) => this.showError('Error al crear formulario', err),
      });
    }
  }

  // Resetea el formulario
  resetForm(): void {
    this.formGroup.reset();
    this.selectedFile = null;
    this.previewImage = null;
    this.questionsSource.empty();
  }

  // Helpers para notificaciones
  private showSuccess(message: string): void {
    this.toastr.success(message, 'Éxito', {
      position: NbGlobalPhysicalPosition.TOP_RIGHT,
      duration: 3000,
    });
  }

  private showError(title: string, error?: any): void {
    const message = error?.error?.message || error?.message || error || 'Error desconocido';
    this.toastr.danger(message, title, {
      position: NbGlobalPhysicalPosition.TOP_RIGHT,
      duration: 5000,
    });
  }
}