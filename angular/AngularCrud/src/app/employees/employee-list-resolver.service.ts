import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable , of} from 'rxjs';
import { Injectable } from '@angular/core';
import { EmployeeService } from './employee.service';
import { ResolvedEmployeeList } from './resolved-employeelist.model';

import { catchError } from 'rxjs/operators/catchError';
import { map } from 'rxjs/operators/map';
import { Employee } from '../models/employee.model';

@Injectable()
export class EmployeeListResolverService implements Resolve<Employee[] | string> {
    constructor(private _employeeService: EmployeeService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Employee[] | string> {
        return this._employeeService.getEmployees()
            .pipe(catchError((err: any) => of((err)))
            );
    }
}