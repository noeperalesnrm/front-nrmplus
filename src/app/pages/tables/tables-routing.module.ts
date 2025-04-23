import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TablesComponent } from './tables.component';
import { SmartTableComponent } from './smart-table/smart-table.component';
import { TreeGridComponent } from './tree-grid/tree-grid.component';
import { DevicesComponent } from './devices/devices.component';
import { UsersComponent } from './users/users.component';
import { AnswersComponent } from './answers/answers.component';
import { FormulariosComponent } from './formularios/formularios.component';

const routes: Routes = [{
  path: '',
  component: TablesComponent,
  children: [
    {
      path: 'forms',
      component: FormulariosComponent,
    },
    {
      path: 'answers',
      component: AnswersComponent,
    },
    {
      path: 'users',
      component: UsersComponent,
    },
    {
      path: 'devices',
      component: DevicesComponent,
    },
    {
      path: 'smart-table',
      component: SmartTableComponent,
    },
    {
      path: 'tree-grid',
      component: TreeGridComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TablesRoutingModule { }

export const routedComponents = [
  TablesComponent,
  FormulariosComponent,
  AnswersComponent,
  UsersComponent,
  DevicesComponent,
  SmartTableComponent,
  TreeGridComponent,
];
