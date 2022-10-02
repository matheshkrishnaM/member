import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }
postRegister(data :any){
  return this.http.post<any>("http://localhost:3000/registeration",data);
}
getRegister(){
  return this.http.get<any>("http://localhost:3000/registeration");
}

updatedata(data:any,id:number){
  return this.http.put<any>("http://localhost:3000/registeration/"+id,data)

}

viewdata(){
  return this.http.get<any>("http://localhost:3000/registeration");
}
getRegister1(id:number){
  return this.http.get<any>("http://localhost:3000/registeration/"+id);
}

}

