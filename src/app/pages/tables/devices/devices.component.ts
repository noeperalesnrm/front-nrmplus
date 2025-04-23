import { Component } from '@angular/core';
import { ServerDataSource } from 'ng2-smart-table';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'ngx-smart-table',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.scss'],
})
export class DevicesComponent {

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
    },
  };

  source: ServerDataSource;

  constructor(http: HttpClient) {
    this.source = new ServerDataSource(http, { 
      endPoint: 'https://api.nrm.com.mx/api/devices/pag', 
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
