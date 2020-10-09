
import { Injectable } from '@angular/core';
import { Employee } from '../models/employee.model';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

// The @Injectable() decorator is used to inject other dependencies
// into this service. As our service does not have any dependencies
// at the moment, we may remove the @Injectable() decorator and the
// service works exactly the same way. However, Angular recomends
// to always use @Injectable() decorator to ensures consistency
@Injectable()
export class EmployeeService {

    baseUrl = 'http://localhost:3000/employees';

    constructor(private httpClient: HttpClient) {
    }

    getEmployees(): Observable<Employee[]> {
        return this.httpClient.get<Employee[]>(this.baseUrl)
            .pipe(catchError(this.handleError));
    }

    //getEmployees(): Employee[] {
    //    return this.listEmployees;
    //}

    //getEmployees(): Observable<Employee[]> {
    //return Observable.of(this.listEmployees).delay(2000);
    //}
    private handleError(errorResponse: HttpErrorResponse) {
        if (errorResponse.error instanceof ErrorEvent) {
            console.error('Client Side Error :', errorResponse.error.message);
        } else {
            console.error('Server Side Error :', errorResponse);
        }
        // return an observable with a meaningful error message to the end user
        return throwError('There is a problem with the service. We are notified & working on it. Please try again later.');
    }
    
    getEmployee(id: number): Observable<Employee> {
        return this.httpClient.get<Employee>(`${this.baseUrl}/${id}`)
            .pipe(catchError(this.handleError));
    }

    addEmployee(employee: Employee): Observable<Employee> {
        /*const maxId = this.listEmployees.reduce(function (e1, e2) {
            return (e1.id > e2.id) ? e1 : e2;
        }).id;
        employee.id = maxId + 1;
        this.listEmployees.push(employee);*/
        return this.httpClient.post<Employee>(this.baseUrl, employee,
            {
                headers: new HttpHeaders({
                    'Content-Type': 'application/json'
                })
            })
            .pipe(catchError(this.handleError));

    }

    // When an update is peformed our server side service does not return anything
    // So we have set the return type to void.
    updateEmployee(employee: Employee): Observable<void> {
        // We are using the put() method to issue a PUT request
        // We are using template literal syntax to build the url to which
        // the request must be issued. To the base URL we are appending
        // id of the employee we want to update. In addition to the URL,
        // we also pass the updated employee object, and Content-Type header
        // as parameters to the PUT method
        return this.httpClient.put<void>(`${this.baseUrl}/${employee.id}`, employee, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        })
            .pipe(catchError(this.handleError));
    }

    deleteEmployee(id: number): Observable<void> {
        return this.httpClient.delete<void>(`${this.baseUrl}/${id}`)
            .pipe(catchError(this.handleError));
    }
}
