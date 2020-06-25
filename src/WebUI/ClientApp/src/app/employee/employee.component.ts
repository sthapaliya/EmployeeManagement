import { Component, TemplateRef, OnInit } from '@angular/core';
import { ToasterService } from '../toaster/toaster.service';
import {
  EmployeeDto,
  EmployeeClient,
  CreateEmployeeCommand,
  UpdateEmployeeCommand,
} from '../EmployeeManagement-api';
import { faPlus, faEllipsisH, faRecycle, faEdit } from '@fortawesome/free-solid-svg-icons';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-employee-component',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  vModel: any = {
    id: 0,
    firstName: null,
    lastName: null,
    email: null,
    phoneNumber: null,
    mobile: null,
    isActive: false

  }
  mode = "list"
  vm: any;
  selectedEmployee: EmployeeDto;
  deleteEmployeeModalRef: BsModalRef;

  faPlus = faPlus;
  faEllipsisH = faEllipsisH;
  faRecycle = faRecycle;
  faEdit = faEdit;

  constructor(private employeeClient: EmployeeClient,
    private modalService: BsModalService, private toaster: ToasterService,
    private activatedRoute: ActivatedRoute, private router: Router) {




    employeeClient.get().subscribe(
      result => {
        this.vm = result;
      },
      error => console.error(error)
    );
  }

  ngOnInit() {
    this.vModel.id = 0;
    this.activatedRoute.queryParams.subscribe(params => {
      this.mode = params['mode'] === undefined ? 'list' : params['mode'];
    });
  }

  newEmployeeAdd(): void {
    this.mode = 'create'
    this.resetModel();

  }

  resetModel(): void {
    this.vModel.id = 0;
    this.vModel.firstName = null;
    this.vModel.lastName = null;
    this.vModel.email = null;
    this.vModel.phoneNumber = null;
    this.vModel.mobile = null;
    this.vModel.isActive = false;
  }


  newEmployeeCancelled(): void {
    this.mode = 'list'
    this.resetModel();
  }


  onError = (error: any) => {
    const errors = error.error.errors;
    let errorList: any = [];

    for (let key in errors) {
      if (errors.hasOwnProperty(key)) {
        errorList.push(errors[key][0])
      }
    }

    this.toaster.show('warning', 'Info!', errorList.join(','));
  };



  onSubmit(): void {

    if (this.vModel.id === 0) {

      this.employeeClient.create({
        firstName: this.vModel.firstName,
        lastName: this.vModel.lastName,
        email: this.vModel.email,
        phoneNumber: this.vModel.phoneNumber,
        mobile: this.vModel.mobile,
        isActive: this.vModel.isActive
      } as CreateEmployeeCommand).subscribe(
        result => {
          this.vModel.id = result.body;
          this.vm.push({
            id: this.vModel.id,
            firstName: this.vModel.firstName,
            lastName: this.vModel.lastName,
            email: this.vModel.email,
            phoneNumber: this.vModel.phoneNumber,
            mobile: this.vModel.mobile,
            isActive: this.vModel.isActive
          });
          this.toaster.show('success', 'Info!', 'Employee created successfully.');
          this.mode = "list"
        },
        this.onError
      );
    }
    else {
      this.employeeClient.update({
        id: this.vModel.id,
        firstName: this.vModel.firstName,
        lastName: this.vModel.lastName,
        email: this.vModel.email,
        phoneNumber: this.vModel.phoneNumber,
        mobile: this.vModel.mobile,
        isActive: this.vModel.isActive
      } as UpdateEmployeeCommand).subscribe(
        (result) => {

          console.log(result)

          for (let i = 0, l = this.vm.length; i < l; i++) {
            if (this.vm[i].id === this.vModel.id) {
              this.vm[i].firstName = this.vModel.firstName;
              this.vm[i].lastName = this.vModel.lastName;
              this.vm[i].email = this.vModel.email;
              this.vm[i].phoneNumber = this.vModel.phoneNumber;
              this.vm[i].mobile = this.vModel.mobile;
              this.vm[i].isActive = this.vModel.isActive;
              break;
            }
          }
          this.toaster.show('success', 'Info!', 'Employee updated successfully.');
          this.mode = "list"
        },
        this.onError

      );
    }
  }




  confirmDeleteEmployee(template: TemplateRef<any>, item: any) {
    this.selectedEmployee = item;
    this.deleteEmployeeModalRef = this.modalService.show(template);
  }

  editEmployee(id: number): void {
    this.employeeClient.get2(id)
      .subscribe((data: EmployeeDto) => {
        this.vModel.id = data.id;
        this.vModel.firstName = data.firstName;
        this.vModel.lastName = data.lastName;
        this.vModel.email = data.email;
        this.vModel.phoneNumber = data.phoneNumber;
        this.vModel.mobile = data.mobile;
        this.vModel.isActive = data.isActive;
        this.mode = "edit";
      }, this.onError);
  }

  deleteEmployeeConfirmed(): void {
    this.employeeClient.delete(this.selectedEmployee.id).subscribe(
      () => {
        this.deleteEmployeeModalRef.hide();
        this.vm = this.vm.filter(t => t.id !== this.selectedEmployee.id)
        this.selectedEmployee = null;
        this.toaster.show('success', 'Info!', 'Employee deleted successfully.');
      },
      this.onError
    );
  }
}
