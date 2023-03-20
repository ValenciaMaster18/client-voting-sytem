import { Component } from '@angular/core';
import { ReactiveFormsModule,FormGroup, FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-add-apprentices',
  templateUrl: './add-apprentices.component.html',
  styleUrls: ['./add-apprentices.component.scss']
})
export class AddApprenticesComponent {
  miForm: FormGroup;

  constructor(
    private controles: FormBuilder
  ){
    this.miForm = this.controles.group(
      {
        id:['', [Validators.required]],
        name:['', [Validators.required]],
        email:['', [Validators.required, Validators.email]],
        password:['', [
          Validators.required,
          Validators.maxLength(16),
          Validators.minLength(8)
        ]],
        createdAt:['', [Validators.required]]
      }
    )
  }
  submit(): void{
    console.log(this.miForm.value)
    this.miForm.reset()
  }
}
