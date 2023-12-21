import { Injectable } from '@angular/core';
import { NbGlobalLogicalPosition, NbGlobalPosition, NbGlobalPositionStrategy, NbIconConfig, NbToastrService } from '@nebular/theme';

@Injectable({
  providedIn: 'root'
})
export class ToasterService {

  constructor(
    private nbToasterService: NbToastrService
  ) { }

  toasterPosition : NbGlobalPosition = NbGlobalLogicalPosition.BOTTOM_END;

  showErrorToaster(iconConfig: NbIconConfig, message: string){
    iconConfig = {
      ...iconConfig, status : "danger",
    }
    this.nbToasterService.show("", message, { ...iconConfig, position :  this.toasterPosition});
  }

  showSuccessToaster(iconConfig: NbIconConfig, message: string){
    iconConfig = {
      ...iconConfig, status : "success",
    }
    this.nbToasterService.show("", message, { ...iconConfig, position :  this.toasterPosition});
  }


}
