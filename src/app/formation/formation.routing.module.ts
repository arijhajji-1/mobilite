import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormationManagement } from './FormationManagement/formation.component';
import { CreateFormationComponent } from './create-formation/create-formation.component';
import { UpdateFormationComponent } from './update-formation/update-formation.component';

const routes: Routes = [
    {path:'formation', component: FormationManagement},
    {path:'createFormation',component:CreateFormationComponent},
    {path:'editFormation/:id',component:UpdateFormationComponent}
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormationRoutingModule { }