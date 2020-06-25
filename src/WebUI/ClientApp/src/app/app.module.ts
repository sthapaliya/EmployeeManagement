import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { AppComponent } from "./app.component";
import { NavMenuComponent } from "./nav-menu/nav-menu.component";
import { HomeComponent } from "./home/home.component";
import { EmployeeComponent } from "./employee/employee.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ModalModule } from "ngx-bootstrap/modal";
import { MustMatchDirective } from "./helper/must-match.directive";
import { ToasterContainerComponent } from "./toaster/toaster-container.component";
import { ToasterComponent } from "./toaster/toaster.component";
import { CommonModule } from "@angular/common";
import { NgProgressModule } from "ngx-progressbar";
import { NgProgressHttpModule } from "ngx-progressbar/http";

@NgModule({
  declarations: [
    AppComponent,
    MustMatchDirective,
    NavMenuComponent,
    HomeComponent,
    EmployeeComponent,
    ToasterContainerComponent,
    ToasterComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: "ng-cli-universal" }),
    FontAwesomeModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    NgProgressModule.withConfig({
      spinnerPosition: "left",
      color: "#1b6ec2"
    }),
    NgProgressHttpModule,
    RouterModule.forRoot([
      { path: "", component: HomeComponent, pathMatch: "full" },
      { path: "employee", component: EmployeeComponent }

    ]),
    BrowserAnimationsModule,
    ModalModule.forRoot(),
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
