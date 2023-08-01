import { EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { Component, ElementRef, Input, Output, ViewChild } from '@angular/core';
import { Subject, Subscription, debounceTime } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: [],
})
export class SearchBoxComponent implements OnInit, OnDestroy {
  private debouncer = new Subject<string>();
  private debouncerSuscription?: Subscription;

  @Output()
  public onValue = new EventEmitter<string>();

  /* @Output()
  public onDebounce = new EventEmitter<string>(); */

  @Input()
  public placeholder: string = '';

  @Input()
  public initialValue: string = '';

  ngOnInit(): void {
    this.debouncerSuscription = this.debouncer
      .pipe(debounceTime(300))
      .subscribe((value) => {
        this.emitValue(value);
      });
  }
  ngOnDestroy(): void {
    this.debouncerSuscription?.unsubscribe();
  }

  emitValue(value: string) {
    this.onValue.emit(value);
    // console.log(newTag);

    /* this.tagInput.nativeElement.value = ''; */
  }
  onKeyPress(searchTerm: string) {
    this.debouncer.next(searchTerm);
  }
}
