import { Injectable } from '@angular/core';
import { IpcRenderer } from 'electron';
import {Observable, of, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Service} from '../../assets/model/service.schema';

@Injectable({
  providedIn: 'root'
})
export class ServiceInfoService {

  private readonly ipc: IpcRenderer | undefined = void 0;

  constructor() {
    if (window.require) {
      try {
        this.ipc = window.require('electron').ipcRenderer;
      } catch (e) {
        throw e;
      }
    } else {
      console.warn('Electron\'s IPC was not loaded');
    }
  }

  getServices(): Observable<Service[]> {
    return of(this.ipc.sendSync('get-services')).pipe(
      catchError((error: any) => throwError(error.json))
    );
  }

  addItem(service: Service): Observable<Service[]> {
    return of(
      this.ipc.sendSync('add-service', service)
    ).pipe(catchError((error: any) => throwError(error.json)));
  }

  deleteItem(service: Service): Observable<Service[]> {
    return of(
      this.ipc.sendSync('delete-service', service)
    ).pipe(catchError((error: any) => throwError(error.json)));
  }
}
