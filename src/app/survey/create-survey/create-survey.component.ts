import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';



@Component({
  selector: 'app-create-survey',
  templateUrl: './create-survey.component.html',
  styleUrls: ['./create-survey.component.css'],
 
})
export class CreateSurveyComponent {

  constructor(private modalService: NgbModal) {}
  openFullscreen(content: any) {
		this.modalService.open(content, { fullscreen: true });
	}

  items = ['Item 1', 'Item 2', 'Item 3', 'Item 4'];

  onDrop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.items, event.previousIndex, event.currentIndex);
  }

}