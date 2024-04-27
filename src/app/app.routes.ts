import { Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { StudentsComponent } from './students/students.component';
import { ExamsComponent } from './exams/exams.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'students',
        component: StudentsComponent
    },
    {
        path: 'exams',
        component: ExamsComponent
    },
    {
        path: '**',
        component: NotFoundComponent
    }
];
