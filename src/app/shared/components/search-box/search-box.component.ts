import { EventEmitter } from '@angular/core';
import { Component, ElementRef, Input, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: [],
})
export class SearchBoxComponent {
  @Output()
  public onValue = new EventEmitter<string>();

  @Input()
  public placeholder: string = '';

  emitValue(value: string) {
    this.onValue.emit(value);
    // console.log(newTag);

    /* this.tagInput.nativeElement.value = ''; */
  }
}
