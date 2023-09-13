import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ContactserviceService } from 'src/service/contactservice.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  contactForm!: FormGroup

  constructor(private contactservice: ContactserviceService) {

  }
  ngOnInit(): void {

    this.contactForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      company: new FormControl('', [Validators.required]),
      designation: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required]),
      mailid: new FormControl('', [Validators.required]),
      country: new FormControl('', [Validators.required]),
      howdidyoucometoknowforyou: new FormControl('', [Validators.required]),
      message: new FormControl('', [Validators.required]),

    });
  }
  submitContactDetails() {
    if (this.contactForm.valid) {
      console.log(this.contactForm.value);

    }
    const contactData = this.contactForm.value
    this.contactservice.addContactData(contactData).subscribe((data:any) => {
          console.log(data,'contact data');
          
    })
    this.contactForm.reset()
  }
}
