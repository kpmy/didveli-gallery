import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import {Item} from '../assets/model/item.schema';
import {Observable, of, throwError} from 'rxjs';
import { IpcRenderer } from 'electron';


@Injectable()
export class AppService {
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
  getItems(): Observable<Item[]> {
    return of(this.ipc.sendSync('get-items')).pipe(
      catchError((error: any) => throwError(error.json))
    );
  }

  addItem(item: Item): Observable<Item[]> {
    return of(
      this.ipc.sendSync('add-item', item)
    ).pipe(catchError((error: any) => throwError(error.json)));
  }

  deleteItem(item: Item): Observable<Item[]> {
    return of(
      this.ipc.sendSync('delete-item', item)
    ).pipe(catchError((error: any) => throwError(error.json)));
  }
}
