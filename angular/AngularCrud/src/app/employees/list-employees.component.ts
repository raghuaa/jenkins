import { Component, OnInit } from '@angular/core';
// import Employee Model
import { Employee } from '../models/employee.model';
import { Router, ActivatedRoute } from '@angular/router';
import { ResolvedEmployeeList } from './resolved-employeelist.model';


@Component({
  selector: 'app-list-employees',
  templateUrl: './list-employees.component.html',
  styleUrls: ['./list-employees.component.css']
})
export class ListEmployeesComponent implements OnInit {
  employees: Employee[];
  filteredEmployees: Employee[];
  error: string;
  private _searchTerm: string;
  // We are binding to this property in the view template, so this
  // getter is called when the binding needs to read the value
  get searchTerm(): string {
    return this._searchTerm;
  }

  // This setter is called everytime the value in the search text box changes
  set searchTerm(value: string) {
    this._searchTerm = value;
    this.filteredEmployees = this.filterEmployees(value);
  }
  constructor(
    private _router: Router,
    private _route: ActivatedRoute) {
    // resolvedData can either be a string or Employee[]
    const resolvedData: string | Employee[] = this._route.snapshot.data['employeeList'];

    // If the resolver completed without errors resolvedData is an Employee[]
    if (Array.isArray(resolvedData)) {
      this.employees = resolvedData;
    } else {
      this.error = resolvedData;
    }
    if (this._route.snapshot.queryParamMap.has('searchTerm')) {
      this.searchTerm = this._route.snapshot.queryParamMap.get('searchTerm');
    } else {
      this.filteredEmployees = this.employees;
    }

  }

  // Call the getEmployees() service method of EmployeeService
  // using the private variable _employeeService
  ngOnInit() {

  }

  filterEmployees(searchString: string) {
    return this.employees.filter(employee =>
      employee.name.toLowerCase().indexOf(searchString.toLowerCase()) !== -1);
  }

  onDeleteNotification(id: number) {
    const i = this.filteredEmployees.findIndex(e => e.id === id);
    if (i !== -1) {
      this.filteredEmployees.splice(i, 1);
    }
  }

}
