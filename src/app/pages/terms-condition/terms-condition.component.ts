import { Component } from '@angular/core';
import { DataService } from 'src/app/service/data.service';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { responseDTO } from 'src/app/types/responseDTO';
import { ChangeDetectorRef } from '@angular/core';
import swal from 'sweetalert2';
import { UtilsService } from 'src/app/service/utils.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-terms-condition',
  templateUrl: './terms-condition.component.html',
  styleUrls: ['./terms-condition.component.css']
})
export class TermsConditionComponent {
  public Editor = ClassicEditor;
  constructor(public themeService: DataService, private cdr: ChangeDetectorRef, private util: UtilsService) {
    this.baseUrl = environment.baseURL;
  }
  files: File[] = [];
  id: number = 0;
  name: any;
  description: any;
  image: any
  centerId: any;
  baseUrl = '';

  onRemove(event: any) { // Use 'any' as the event type
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }

  ngOnInit(): void {
    this.getTermsConditions()
    this.centerId = this.util.getCenterId();
  }

  userId: any;

  getTermsConditions() {
    this.userId = this.util.getUserId()
    this.themeService.GetTermsConditions(this.userId).subscribe((data: any) => {
      console.log("data", data)
      this.name = data.name;
      this.id = data.id
      this.description = data.description
      this.image = data.image
      this.cdr.detectChanges();
    });
  }
  postData() {

    if (!this.validateSurvey()) {
      this.util.showError('Please fill all required fields.');
      return;
    }

    const dataToSend = {
      id: this.id,
      name: this.name,
      description: this.description,
      image: this.image,
      centerId: this.centerId
    };
    console.log("dataToSend", dataToSend)
    this.themeService.CreateTermsConditions(dataToSend).subscribe(
      response => {
        console.log('Response from server:', response);
        // swal.fire('', response, 'success');
        this.util.showSuccess(response);
        // Handle response based on the server behavior
      },
      error => {
        this.util.showError('error');
        console.error('Error occurred while sending POST request:', error);
        // Handle error, if needed
      }
    );
  }
  onSelect(event: any) {
    const file = event.addedFiles && event.addedFiles.length > 0 ? event.addedFiles[0] : null;

    if (file) {
      this.files.push(file); // Store the selected file
      this.uploadImage(file); // Trigger upload after selecting the file
    }
  }

  uploadImage(file: File): void {

    this.themeService.uploadImageAboutUs(file, this.userId).subscribe(
      (response: String) => {
        console.log('Upload successful:', response);
        this.image = response
        // Handle response from the image upload
        // You may want to retrieve the URL or any other relevant information from the response
      },
      (error) => {
        console.error('Error occurred while uploading:', error);
        // Handle error
      }
    );
  }

  information: any[] = [];
  title: boolean = true
  descriptioninfo: boolean = true

  validateSurvey(): boolean {
    this.title = !!this.name && this.name.trim().length > 0;
    this.descriptioninfo = !!this.description && this.description.trim().length > 0;

    // You might want to return whether all fields are valid
    return (
      this.title &&
      this.descriptioninfo
    );
  }

}
