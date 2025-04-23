import { Component, OnInit } from '@angular/core';
import { ApiService } from '../answers/catalogs.service';
import { ServerDataSource } from 'ng2-smart-table';
import { HttpClient } from '@angular/common/http';
import { formatDate } from '@angular/common';
import { NbToastrService } from '@nebular/theme';

@Component({
  selector: 'ngx-smart-table',
  templateUrl: './answers.component.html',
  styleUrls: ['./answers.component.scss'],
})
export class AnswersComponent implements OnInit {

  forms: any[] = []; // Lista de formularios
  questions: any[] = []; // Lista de preguntas (dependiente del formulario seleccionado)
  selectedForm: any = null;
  selectedQuestion: any = null;

  settings = {
    noDataMessage: 'No hay datos disponibles con los valores seleccionados',
    actions: false,
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
      id: {
        title: 'ID',
        type: 'string',
      },
      answer: {
        title: 'Respuesta',
        type: 'string',
      },
      email: {
        title: 'E-mail',
        type: 'string',
      },
      name: {
        title: 'Nombre',
        type: 'string',
      },
      last_name: {
        title: 'Apellido Paterno',
        type: 'string',
      },
      surname: {
        title: 'Apellido Materno',
        type: 'string',
      },
      birthdate: {
        title: 'Fecha de Nacimiento',
        //type: 'dateString',
        valuePrepareFunction: (value: string) => {
          //return new Date(value).toLocaleDateString();
          return formatDate(value,'dd/MM/yyyy','en-MX');
        },
      },
      gender: {
        title: 'Género',
        type: 'string',
        /*valuePrepareFunction: (value: string) => {
          //return new Date(value).toLocaleDateString();
          return value === 'M' ? 'Hombre' : 'Mujer';
        },*/
      },
      phone: {
        title: 'Teléfono',
        type: 'string',
      },
      generation: {
        title: 'Generación',
        type: 'string',
      },
      postal_code: {
        title: 'CP',
        type: 'string',
      },
      suburb: {
        title: 'Colonia',
        type: 'string',
      },
      municipality: {
        title: 'Del / Mun',
        type: 'string',
      },
      city: {
        title: 'Ciudad',
        type: 'string',
      },
      state: {
        title: 'Estado',
        type: 'string',
      },
      ip: {
        title: 'IP',
        type: 'string',
      },
      isp: {
        title: 'ISP',
        type: 'string',
      },
      country: {
        title: 'País',
        type: 'string',
      },
      screen_resolution: {
        title: 'Resolución',
        type: 'string',
      },
      color_depth: {
        title: 'Prof Color',
        type: 'string',
      },
      lang: {
        title: 'Idioma',
        type: 'string',
      },
      timezone: {
        title: 'Huso Horario',
        type: 'string',
      },
      cpu_cores: {
        title: 'Procesadores',
        type: 'string',
      },
      device_memory: {
        title: 'Memoria',
        type: 'string',
      },
      network_type: {
        title: 'Tipo de Red',
        type: 'string',
      },
      is_mobile: {
        title: 'Móvil',
        type: 'string',
      },
      hardware_vendor: {
        title: 'Fabricante Hardware',
        type: 'string',
      },
      hardware_model: {
        title: 'Modelo Hardware',
        type: 'string',
      },
      hardware_name: {
        title: 'Hardware',
        type: 'string',
      },
      device_type: {
        title: 'Tipo Dispositivo',
        type: 'string',
      },
      platform_vendor: {
        title: 'Fabricante Plataforma',
        type: 'string',
      },
      platform_name: {
        title: 'Plataforma',
        type: 'string',
      },
      platform_version: {
        title: 'Versión Plataforma',
        type: 'string',
      },
      browser_vendor: {
        title: 'Fabricante Navegador',
        type: 'string',
      },
      browser_name: {
        title: 'Navegador',
        type: 'string',
      },
      browser_version: {
        title: 'Versión Navegador',
        type: 'string',
      },
      hardware_rank: {
        title: 'Ranking Hardware',
        type: 'string',
      },
      is_tablet: {
        title: 'Tableta',
        type: 'string',
      },
      screen_width_px: {
        title: 'Ancho Pantalla',
        type: 'string',
      },
      screen_height_px: {
        title: 'Alto Pantalla',
        type: 'string',
      },
      has_touch_screen: {
        title: 'Touch',
        type: 'string',
      },
      has_camera: {
        title: 'Cámara',
        type: 'string',
      },
      is_tv: {
        title: 'TV',
        type: 'string',
      },
      is_smartphone: {
        title: 'Smartphone',
        type: 'string',
      },
      is_small_screen: {
        title: 'Pantalla pequeña',
        type: 'string',
      },
      has_nfc: {
        title: 'NFC',
        type: 'string',
      },
      hardware_family: {
        title: 'Familia Hardware',
        type: 'string',
      },
      oem: {
        title: 'OEM',
        type: 'string',
      },
      is_screen_foldable: {
        title: '¿Se dobla?',
        type: 'string',
      },
      platform_rank: {
        title: 'Ranking Plataforma',
        type: 'string',
      },
      has_geo_location: {
        title: 'Geolocalización',
        type: 'string',
      },
      is_email_browser: {
        title: 'Navegador Email',
        type: 'string',
      },
      is_emulating_device: {
        title: 'Emulador',
        type: 'string',
      },
      is_crawler: {
        title: 'Web Crawler',
        type: 'string',
      },
      is_ia: {
        title: 'IA',
        type: 'string',
      },
      device_id: {
        title: 'Device ID',
        type: 'string',
      },
      createdAt: {
        title: 'Fecha Alta',
        valuePrepareFunction: (value: string) => {
          return formatDate(value,'dd/MM/yyyy','en-MX');
        },
      },
    },
  };

  source: ServerDataSource;

  constructor(private api: ApiService, private http: HttpClient, private toastr: NbToastrService) {
    this.source = new ServerDataSource(http, { 
      endPoint: 'https://api.nrm.com.mx/api/useranswers/pag', 
      dataKey: 'data.rows', 
      pagerPageKey: 'offset', 
      pagerLimitKey: 'limit', 
      totalKey: 'data.count',
      //filterFieldKey: '#field#',
    });
  }

  ngOnInit() {
    this.loadForms();
  }

  // Carga los formularios desde la API
  loadForms() {
    this.api.get<any[]>('forms').subscribe({
      next: (data) => (this.forms = data),
      error: () => this.toastr.danger('Error al cargar formularios', 'Error'),
    });
  }

  // Cuando se selecciona un formulario, carga sus preguntas
  onFormSelect(formId: any) {
    this.selectedForm = formId;
    this.selectedQuestion = null; // Resetear pregunta seleccionada
    this.api.get<any[]>(`questions?form_id=${formId}`).subscribe({
      next: (data) => (this.questions = data),
      error: () => this.toastr.danger('Error al cargar preguntas', 'Error'),
    });
  }

  // Cuando se selecciona una pregunta, actualiza la tabla con las respuestas
  onQuestionSelect(questionId: any) {
    this.selectedQuestion = questionId;
    /*this.source.setFilter([
      { field: 'form_id', search: this.selectedForm },
      { field: 'question_id', search: questionId },
    ]);*/
    this.source = new ServerDataSource(this.http, { 
      endPoint: 'https://api.nrm.com.mx/api/useranswers/pag?form_id='+this.selectedForm+'&question_id='+questionId, 
      dataKey: 'data.rows', 
      pagerPageKey: 'offset', 
      pagerLimitKey: 'limit', 
      totalKey: 'data.count',
    });
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }
}
