import { Component } from '@angular/core';
declare var Dropzone: any;

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {
  files: File[] = [];

  onSelect(event: any) { // Use 'any' as the event type
    console.log(event);
    this.files.push(...event.addedFiles);
  }

  onRemove(event: any) { // Use 'any' as the event type
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }
}