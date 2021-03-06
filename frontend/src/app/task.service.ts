import { Injectable } from '@angular/core';
import { WebRequestService } from './web-request.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private webReqService: WebRequestService) { }

  //Send a web request to create a list
  createList(title: string){
    return this.webReqService.post('lists', {title});
  }
}
