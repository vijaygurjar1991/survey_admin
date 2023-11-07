import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser'

@Injectable({
  providedIn: 'root'
})
export class MetaService {

  constructor(private title: Title) {

  }

  setTitle(title: string, hidePrefix = false) {
    if (hidePrefix) {
      this.title.setTitle(title);
    } else {
      this.title.setTitle('Performance Auditions - ' + title);
    }
  }
}
