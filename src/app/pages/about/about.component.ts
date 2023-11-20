import { Component } from '@angular/core';
import { DataService } from 'src/app/service/data.service';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { responseDTO } from 'src/app/types/responseDTO';
import { ChangeDetectorRef } from '@angular/core';
import swal from 'sweetalert2';
declare var Dropzone: any;

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {
  public Editor = ClassicEditor;
  constructor(public themeService: DataService, private cdr: ChangeDetectorRef) { }
  files: File[] = [];
  id: number = 0;
  name: any;
  description: any;
  image: any
  onSelect(event: any) { // Use 'any' as the event type
    console.log(event);
    this.files.push(...event.addedFiles);
  }

  onRemove(event: any) { // Use 'any' as the event type
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }

  ngOnInit(): void {
    this.getAboutus();

  }

  userId: any;

  getAboutus() {
    this.userId = localStorage.getItem("userId");
    this.themeService.GetAboutUs(this.userId).subscribe((data: any) => {
      console.log("data", data)
      this.name = data.name;
      this.id = data.id
      this.description = data.description
      this.image = data.image
      this.cdr.detectChanges();
    });
  }
  postData() {
    const dataToSend = {
      id: this.id,
      name: this.name,
      description: this.description,
      image: this.image
    };
    console.log("dataToSend", dataToSend)
    this.themeService.CreateAboutUs(dataToSend).subscribe(
      response => {
        console.log('Response from server:', response);
        swal.fire('', response, 'success');
        // Handle response based on the server behavior
      },
      error => {
        console.error('Error occurred while sending POST request:', error);
        swal.fire('', error, 'error');
        // Handle error, if needed
      }
    );
  }

}