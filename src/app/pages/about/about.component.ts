import { Component } from '@angular/core';
import { DataService } from 'src/app/service/data.service';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { responseDTO } from 'src/app/types/responseDTO';
declare var Dropzone: any;

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {
  public Editor = ClassicEditor;
  constructor(public themeService: DataService) { }
  files: File[] = [];

  onSelect(event: any) { // Use 'any' as the event type
    console.log(event);
    this.files.push(...event.addedFiles);
  }

  onRemove(event: any) { // Use 'any' as the event type
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }

  ngOnInit(): void {
    this.getAboutus()
  }

  userId: number;
  question: { name: string, description: string }[] = [];

  getAboutus() {
    this.themeService.GetAboutUs(this.userId).subscribe({
      next: (resp: responseDTO[]) => {
        console.log('Response:', resp);
        // Map the response to the desired format
        this.question = resp.map(item => ({ name: item.name, description: item.description }));
      },
      error: (err) => console.log("An Error occurred while fetching question types", err)
    });
  }

}