import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import {MatDialog, MatDialogRef,MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ɵInjectableAnimationEngine } from '@angular/platform-browser/animations';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm !: FormGroup;
  actionBtn:string="Save"
  constructor(private formBuilder:FormBuilder,private api:ApiService ,@Inject(MAT_DIALOG_DATA) public editData:any,private regeisteraionRef:MatDialogRef<RegisterComponent>) { }

  ngOnInit(): void {
   this.registerForm =this.formBuilder.group({
    name:['',Validators.required],
    email :['',[Validators.required,Validators.email]],
    dob:['',Validators.required],
    address:['',Validators.required],
    pan:['',[Validators.required,Validators.maxLength(10)]],
    contact:['',[Validators.required,Validators.maxLength(10)]],
    state:['',Validators.required],
    country:['',Validators.required],
    DependName1:['',Validators.required],
    DependName2:['',Validators.required],
    DependDOB1:['',Validators.required],
    DependDOB2:['',Validators.required],
   })

   if(this.editData){
    this.actionBtn="Update"
    this.registerForm.controls['name'].setValue(this.editData.name);
    this.registerForm.controls['email'].setValue(this.editData.email);
    this.registerForm.controls['dob'].setValue(this.editData.dob);
    this.registerForm.controls['address'].setValue(this.editData.address);
    this.registerForm.controls['pan'].setValue(this.editData.pan);
    this.registerForm.controls['contact'].setValue(this.editData.contact);
    this.registerForm.controls['state'].setValue(this.editData.state);
    this.registerForm.controls['country'].setValue(this.editData.country);
    this.registerForm.controls['DependName1'].setValue(this.editData.DependName1);
    this.registerForm.controls['DependDOB1'].setValue(this.editData.DependDOB1);
    this.registerForm.controls['DependName2'].setValue(this.editData.DependName2);
    this.registerForm.controls['DependDOB2'].setValue(this.editData.DependDOB2);

   }
  }
  registeration(){
    if(!this.editData){
      if(this.registerForm.valid){
        this.api.postRegister(this.registerForm.value)
        .subscribe({
          next:(res)=>{
            alert("Registeration is Succesfully");
            this.registerForm.reset();
            this.regeisteraionRef.close('save');
          },
          error:()=>{
            alert("error while adding member")
          }
        })
      }
    }else{
      this.updatedata()
    }
  }
  updatedata(){
     this.api.updatedata(this.registerForm.value,this.editData.id).
     subscribe({
      next:(res)=>{
        alert("product updated successfully");
        this.registerForm.reset();
        this.regeisteraionRef.close('update');
      },
      error:()=>{
        alert("error");
      }
     })
  }
}
