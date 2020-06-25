import {
  map as _observableMap,

  catchError as _observableCatch,
} from "rxjs/operators";
import {
  Observable,
  throwError as _observableThrow
} from "rxjs";
import { Injectable, Inject, Optional, InjectionToken } from "@angular/core";
import { HttpClient, HttpHeaders, HttpResponse, HttpResponseBase } from '@angular/common/http';

export const API_BASE_URL = new InjectionToken<string>("API_BASE_URL");

export interface IEmployeeClient {
  get(): Observable<any>;
  create(command: CreateEmployeeCommand): Observable<any>;
  get2(id: number): Observable<any>;
  update(command: UpdateEmployeeCommand): Observable<any>;
  delete(id: number): Observable<any>;
}

@Injectable({
  providedIn: "root",
})
export class EmployeeClient implements IEmployeeClient {
  private http: HttpClient;
  private baseUrl: string;
  protected jsonParseReviver:
    | ((key: string, value: any) => any)
    | undefined = undefined;

  constructor(
    @Inject(HttpClient) http: HttpClient,
    @Optional() @Inject(API_BASE_URL) baseUrl?: string
  ) {
    this.http = http;
    this.baseUrl = baseUrl ? baseUrl : "";
  }

  get(): Observable<any> {
    let url = this.baseUrl + "/api/employees";
    url = url.replace(/[?&]$/, "");


    return this.http
      .request("get", url).pipe(
        _observableMap((data: any) => {
          return data;
        }), _observableCatch(error => {
          return _observableThrow(error);
        })
      );
  }


  create(command: CreateEmployeeCommand): Observable<any> {
    let url = this.baseUrl + "/api/employees";
    url = url.replace(/[?&]$/, "");

    const content = JSON.stringify(command);


    return this.http
      .request("post", url, {
        body: content,
        observe: "response",
        responseType: "json",
        headers: new HttpHeaders({
          "Content-Type": "application/json",
          "Accept": "application/json"
        })
      }).pipe(
        _observableMap((data: any) => {
          return data;
        }), _observableCatch(error => {
          return _observableThrow(error);
        })
      );
  }


  get2(id: number): Observable<EmployeeDto> {
    let url = this.baseUrl + "/api/employees/{id}";
    if (id === undefined || id === null)
      throw new Error("The parameter 'id' must be defined.");
    url = url.replace("{id}", encodeURIComponent("" + id));
    url = url.replace(/[?&]$/, "");

    return this.http
      .request("get", url).pipe(
        _observableMap((data: EmployeeDto) => {
          return data;
        }), _observableCatch(error => {
          return _observableThrow(error);
        })
      )
  }


  update(command: UpdateEmployeeCommand): Observable<any> {
    let url = this.baseUrl + "/api/employees";

    const content = JSON.stringify(command);


    return this.http
      .request("put", url, {
        body: content,
        observe: "response",
        responseType: "json",
        headers: new HttpHeaders({
          "Content-Type": "application/json",
          "Accept": "application/json"
        })
      }).pipe(
        _observableMap((data: any) => {
          return data;
        }), _observableCatch(error => {
          return _observableThrow(error);
        })
      );
  }

  delete(id: number): Observable<any> {
    let url = this.baseUrl + "/api/employees/{id}";
    if (id === undefined || id === null)
      throw new Error("The parameter 'id' must be defined.");
    url = url.replace("{id}", encodeURIComponent("" + id));
    url = url.replace(/[?&]$/, "");

    return this.http
      .request("delete", url).pipe(
        _observableMap((data: any) => {
          return data;
        }), _observableCatch(error => {
          return _observableThrow(error);
        })
      );
  }
}

export class CreateEmployeeCommand implements ICreateEmployeeCommand {

  id: number;
  firstName: string | undefined;
  lastName: string | undefined;
  email: string | undefined;
  phoneNumber: string | undefined;
  mobile: string | undefined;
  isActive: boolean;

  constructor(data?: ICreateEmployeeCommand) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(_data?: any) {
    if (_data) {
      this.id = _data["id"];
      this.firstName = _data["firstName"];
      this.lastName = _data["lastName"];
      this.email = _data["email"];
      this.phoneNumber = _data["phoneNumber"];
      this.mobile = _data["mobile"];
      this.isActive = _data["isActive"];
    }
  }

  static fromJS(data: any): CreateEmployeeCommand {
    data = typeof data === "object" ? data : {};
    let result = new CreateEmployeeCommand();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === "object" ? data : {};
    data["id"] = this.id;
    data["firstName"] = this.firstName;
    data["lastName"] = this.lastName;
    data["email"] = this.email;
    data["phoneNumber"] = this.phoneNumber;
    data["mobile"] = this.mobile;
    data["isActive"] = this.isActive;
    return data;
  }
}

export interface ICreateEmployeeCommand {
  id: number;
  firstName: string | undefined;
  lastName: string | undefined;
  email: string | undefined;
  phoneNumber: string | undefined;
  mobile: string | undefined;
  isActive: boolean;
}

export class UpdateEmployeeCommand implements IUpdateEmployeeCommand {
  id?: number;
  firstName?: string | undefined;
  lastName?: string | undefined;
  email?: string | undefined;
  phoneNumber?: string | undefined;
  mobile?: string | undefined;
  isActive?: boolean;

  constructor(data?: IUpdateEmployeeCommand) {
    if (data) {
      for (let property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(_data?: any) {
    if (_data) {
      this.id = _data["id"];
      this.firstName = _data["firstName"];
      this.lastName = _data["lastName"];
      this.email = _data["email"];
      this.phoneNumber = _data["phoneNumber"];
      this.mobile = _data["mobile"];
      this.isActive = _data["isActive"];
    }
  }

  static fromJS(data: any): UpdateEmployeeCommand {
    data = typeof data === "object" ? data : {};
    let result = new UpdateEmployeeCommand();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === "object" ? data : {};
    data["id"] = this.id;
    data["firstName"] = this.firstName;
    data["lastName"] = this.lastName;
    data["email"] = this.email;
    data["phoneNumber"] = this.phoneNumber;
    data["mobile"] = this.mobile;
    data["isActive"] = this.isActive;

    return data;
  }
}

export interface IUpdateEmployeeCommand {
  id: number;
  firstName: string | undefined;
  lastName: string | undefined;
  email: string | undefined;
  phoneNumber: string | undefined;
  mobile: string | undefined;
  isActive: boolean;
}

export class EmployeeDto implements IEmployeeDto {
  id: number;
  firstName: string | undefined;
  lastName: string | undefined;
  email: string | undefined;
  phoneNumber: string | undefined;
  mobile: string | undefined;
  isActive: boolean;

  constructor(data?: IEmployeeDto) {
    if (data) {
      for (let property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(_data?: any) {

    if (_data) {
      this.id = _data["id"];
      this.firstName = _data["firstName"];
      this.lastName = _data["lastName"];
      this.email = _data["email"];
      this.phoneNumber = _data["phoneNumber"];
      this.mobile = _data["mobile"];
      this.isActive = _data["isActive"];

    }
  }

  static fromJS(data: any): EmployeeDto {
    data = typeof data === "object" ? data : {};
    let result = new EmployeeDto();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === "object" ? data : {};
    data["id"] = this.id;
    data["firstName"] = this.firstName;
    data["lastName"] = this.lastName;
    data["email"] = this.email;
    data["phoneNumber"] = this.phoneNumber;
    data["mobile"] = this.mobile;
    data["isActive"] = this.isActive;
    return data;
  }
}

export interface IEmployeeDto {
  id: number;
  firstName: string | undefined;
  lastName: string | undefined;
  email: string | undefined;
  phoneNumber: string | undefined;
  mobile: string | undefined;
  isActive: boolean;
}


