import { inject } from "@angular/core";
import { SidebarService } from "./home/sidebar/sidebar.service";
import {  ResolveFn, } from "@angular/router";

export const appResolver: ResolveFn<any> =
    () => {
      return inject(SidebarService).updateList([]);
    };