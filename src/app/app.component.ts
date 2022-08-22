import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'XperTuto.com : Angular setValue and patchValue';

  tagsForm: FormGroup = new FormGroup({});

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.initializeForm();
  }

  initializeForm(): void {
    this.tagsForm = this.formBuilder.group({
      webSite: new FormControl('', Validators.required),
      tags: this.formBuilder.array([
        this.formBuilder.group({
          technologie: '',
          nb_tutorials: '',
        })
      ]),
    });
  }

  setFormControlValue(): void {
    const website = 'XperTuto';
    this.tagsForm.get('webSite')?.setValue(website);
  }

  setFormGroupValue(): void {
    const tagsFormGroupValues = {
      webSite: 'www.XperTuto.com',
      tags: [
        {
          technologie: 'Angular',
          nb_tutorials: '100',
        },
        {
          technologie: 'NodeJs',
          nb_tutorials: '100',
        }
      ]
    }

    this.setArrayForm(tagsFormGroupValues.tags);
    this.tagsForm.setValue(tagsFormGroupValues);
  }

  setFormArrayValue(): void {
    const tagsFormArrayValues = [
      {
        technologie: 'Typescript',
        nb_tutorials: '200',
      }
    ]

    this.setArrayForm(tagsFormArrayValues);
    this.tagsForm.get('tags')?.setValue(tagsFormArrayValues);
  }


  patchFormControlValue(): void {
    const website = 'XperTuto';
    this.tagsForm.get('webSite')?.patchValue(website);
  }

  patchFormGroupValue(): void {
    const tagsFormGroupValues = {
      tags: [
        {
          technologie: 'Angular',
          nb_tutorials: '100',
        }
      ]
    }

    this.setArrayForm(tagsFormGroupValues.tags);
    this.tagsForm.patchValue(tagsFormGroupValues);
  }

  patchFormArrayValue(): void {
    const tagsFormArrayValues = [
      {
        nb_tutorials: '200',
      }
    ]

    this.setArrayForm(tagsFormArrayValues);
    this.tagsForm.get('tags')?.patchValue(tagsFormArrayValues,{onlySelf: false, emitEvent: false});
  }



  setArrayForm(formArray: any[]): void {
    this.tags.clear();
    formArray.forEach(model => {
      this.tags.push(this.formBuilder.group(model));
    })
  }

  newTag(): FormGroup {
    return this.formBuilder.group({
      technologie: '',
      nb_tutorials: '',
    })
  }

  get tags(): FormArray {
    return this.tagsForm.get("tags") as FormArray
  }

  addTags(): void {
    this.tags.push(this.newTag());
  }

  removeTag(tagIndex: number): void {
    this.tags.removeAt(tagIndex);
  }
}
