import { Component } from '@angular/core';
import { ServerDataSource } from 'ng2-smart-table';
import { HttpClient } from '@angular/common/http';
import { formatDate } from '@angular/common';

@Component({
  selector: 'ngx-smart-table',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent {

  settings = {
    noDataMessage: 'No hay datos disponibles',
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
        valuePrepareFunction: (value: string) => {
          //return new Date(value).toLocaleDateString();
          return value === 'M' ? 'Hombre' : 'Mujer';
        },
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
      createdAt: {
        title: 'Fecha Alta',
        valuePrepareFunction: (value: string) => {
          return formatDate(value,'dd/MM/yyyy','en-MX');
        },
      },
      updatedAt: {
        title: 'Última Act',
        valuePrepareFunction: (value: string) => {
          return formatDate(value,'dd/MM/yyyy','en-MX');
        },
      },
    },
  };

  source: ServerDataSource;

  constructor(http: HttpClient) {
    this.source = new ServerDataSource(http, { 
      endPoint: 'http://34.58.102.219:8080/api/users/pag', 
      dataKey: 'data.rows', 
      pagerPageKey: 'offset', 
      pagerLimitKey: 'limit', 
      totalKey: 'data.count'
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
