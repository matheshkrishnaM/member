import { Component, OnInit,ViewChild } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { RegisterComponent } from './register/register.component';
import { ApiService } from './services/api.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { RouterLinkWithHref } from '@angular/router';
import { SubmitClaimComponent } from './submit-claim/submit-claim.component';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'memberPortal';
  displayedColumns: string[] = ['name','dob','contact','DependName1','DependDOB1','DependName2','DependDOB2','action'];
  regs:any;
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog:MatDialog,private api:ApiService,private http:HttpClient){
    
  }
  ngOnInit(): void {
    this.getApiRegisteration();
  }
  openDialog() {
    this.dialog.open(RegisterComponent, {
     width:'30%'
    }).afterClosed().subscribe(val=>{
      if(val==='save'){
        this.getApiRegisteration();
      }
    })
  }
  editMember(row:any){
    this.dialog.open(RegisterComponent,{
      width:'30%',
      data:row
    }).afterClosed().subscribe(val=>{
      if(val==='update'){
        this.getApiRegisteration();
      }
    })
  }
  getApiRegisteration(){
    this.api.getRegister()
    .subscribe({
      next:(res)=>{
        this.dataSource =new MatTableDataSource(res);
        this.dataSource.paginator= this.paginator;
        this.dataSource.sort =this.sort;
      },
      error:(err)=>{
        alert("error while ")
      }
    })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  submitClaim(row:any){
    this.dialog.open(SubmitClaimComponent,{
      width:'30%',
      data:row
    }).afterOpened().subscribe(val=>{
      let response=this.http.get("http://localhost:3000/registeration");
      response.subscribe((data)=>this.regs=response);
    })
  }
}
