import { Component } from '@angular/core';
import { LocalDataSource, ServerDataSource } from 'ng2-smart-table';

import { SmartTableData } from '../../../@core/data/smart-table';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'ngx-smart-table',
  /*template: `
    <ng2-smart-table [settings]="settings" [source]="source"></ng2-smart-table>
  `,*/
  templateUrl: './smart-table.component.html',
  styleUrls: ['./smart-table.component.scss'],
})
export class SmartTableComponent {

  settings = {
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

  /*
  source: LocalDataSource = new LocalDataSource();

  constructor(private service: SmartTableData) {
    const data = this.service.getDatosExternos();
    this.source.load(data);
  }
  */
  source: ServerDataSource;

  constructor(http: HttpClient) {
    this.source = new ServerDataSource(http, { 
      endPoint: 'http://34.58.102.219:8080/api/devices/pag', 
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
