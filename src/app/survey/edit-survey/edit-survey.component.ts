import { Component } from '@angular/core';

@Component({
  selector: 'app-edit-survey',
  templateUrl: './edit-survey.component.html',
  styleUrls: ['./edit-survey.component.css']
})
export class EditSurveyComponent {
  tags: string[] = [];
  tagInput: string = '';

  onKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.addTag();
    }
  }

  addTag() {
    if (this.tagInput.trim() !== '' && !this.tags.includes(this.tagInput)) {
      this.tags.push(this.tagInput);
      this.tagInput = '';
    }
  }

  removeTag(tag: string) {
    this.tags = this.tags.filter((t) => t !== tag);
  }

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
