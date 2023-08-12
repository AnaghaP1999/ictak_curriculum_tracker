import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
import { EditrequirementComponent } from 'app/editrequirement/editrequirement.component';
import { FacultydashboardComponent } from 'app/facultydashboard/facultydashboard.component';
import { AuthGuard } from 'app/auth.guard';
import { RoleGuard } from 'app/role.guard';
import { UserroleGuard } from 'app/userrole.guard';
import { AddresponseComponent } from 'app/addresponse/addresponse.component';


export const AdminLayoutRoutes: Routes = [
    
    { path: 'dashboard',      component: DashboardComponent, canActivate: [AuthGuard, RoleGuard] },
    { path: 'edit-requirement/:id',        component: EditrequirementComponent, canActivate: [AuthGuard, RoleGuard] },
    {path:'facultydashboard',component:FacultydashboardComponent, canActivate: [AuthGuard, UserroleGuard]},
    {path:'add-response/:id',component:AddresponseComponent, canActivate: [AuthGuard, UserroleGuard]},
];
