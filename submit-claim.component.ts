import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ApiService } from '../services/api.service';


@Component({
  selector: 'app-submit-claim',
  templateUrl: './submit-claim.component.html',
  styleUrls: ['./submit-claim.component.css']
})
export class SubmitClaimComponent implements OnInit {

  displayedColumns: string[] = ['name','dob','DependName1','DependDOB1','DependName2','DependDOB2','action'];
  constructor(private formBuilder:FormBuilder,private api:ApiService ,@Inject(MAT_DIALOG_DATA) public submitClaim:any,private submitRef:MatDialogRef<SubmitClaimComponent>,private http:HttpClient) { }
  submitForm !: FormGroup;
  regs:any;

  ngOnInit() {
    
    this.api.getRegister1(this.submitClaim.id)
    .subscribe({next:(data)=>this.regs=data});

    this.submitForm  =this.formBuilder.group({
      submitName:['',Validators.required],
      submitDOB:['',Validators.required],
      dateOfAdmission:['',Validators.required],
      dateOfDischarge:['',Validators.required],
      Amount:['',Validators.required],
    
     
  }) ;
 
  }

   
}
