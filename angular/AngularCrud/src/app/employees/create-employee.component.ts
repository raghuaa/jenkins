import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Employee } from '../models/employee.model';
import { Department } from '../models/department.model';
// Import EmployeeService
import { EmployeeService } from './employee.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {

  @ViewChild('employeeForm') public createEmployeeForm: NgForm;
  panelTitle: string;
  previewPhoto = false;
  employee: Employee ;
  departments: Department[] = [
    { id: 1, name: 'Help Desk' },
    { id: 2, name: 'HR' },
    { id: 3, name: 'IT' },
    { id: 4, name: 'Payroll' }
  ];

  constructor(private _employeeService: EmployeeService,
              private _router: Router,
              private _route: ActivatedRoute) {
   }

  togglePhotoPreview() {
    this.previewPhoto = !this.previewPhoto;
  }

  ngOnInit(): void {
    this._route.paramMap.subscribe(parameterMap => {
      const id = +parameterMap.get('id');
      this.getEmployee(id);
    });
  }

  private getEmployee(id: number) {
    if(id === 0) {
      this.employee = {
        id: null,
        name: null,
        gender: null,
        contactPreference: null,
        phoneNumber: null,
        email: '',
        dateOfBirth: null,
        department: 'select',
        isActive: null,
        photoPath: null
      };
      this.panelTitle= 'Create Employee';
      this.createEmployeeForm.reset();
    } else {
      this.panelTitle= 'Edit Employee';
      this._employeeService.getEmployee(id).subscribe(
        (employee) => this.employee = employee,
        (err: any) => console.log(err)
      );
    }
  }
  saveEmployee(): void {
    if(this.employee.id == null) {
    this._employeeService.addEmployee(this.employee).subscribe(
      (data: Employee) => {
        // log the employee object after the post is completed
        console.log(data);
        this.createEmployeeForm.reset();
        this._router.navigate(['list']);
      },
      (error: any) => { console.log(error); }
    );
  } else {
    this._employeeService.updateEmployee(this.employee).subscribe(
      () => {
        // log the employee object after the post is completed
        this.createEmployeeForm.reset();
        this._router.navigate(['list']);
      },
      (error: any) => { console.log(error); }
    );
  }
  }

  

  
}
