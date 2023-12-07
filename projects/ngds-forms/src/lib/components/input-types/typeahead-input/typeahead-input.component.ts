import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, Input, Renderer2, TemplateRef, ViewChild } from '@angular/core';
import { NgdsInput } from '../ngds-input.component';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'ngds-typeahead-input',
  templateUrl: './typeahead-input.component.html',
  styleUrls: ['../../../../../assets/styles/styles.scss']
})
export class NgdsTypeaheadInput extends NgdsInput implements AfterViewInit {
  // The minimum length that must be typed before suggestion dropdown appears. If 0, dropdown opens on select.
  @Input() typeaheadMinLength: number = 0;

  @ViewChild('defaultListTemplate') defaultListTemplate: TemplateRef<any>;
  @ViewChild('typeaheadInput') typeaheadInput: ElementRef;
  @ViewChild('typeaheadContainer') typeaheadContainer: ElementRef;

  // Current value to display in the typeahead input.
  protected currentDisplay;

  // Close the typeahead text entry if it is not active - looks nicer.
  protected isOpen = new BehaviorSubject<boolean>(false);

  // If true, control update follows model change. If false, model update follows control change.
  private editByModel: boolean;

  constructor(
    private cd: ChangeDetectorRef,
    private renderer: Renderer2
  ) {
    super();
    // Listen for click events that happen outside of the input. The typeahead text entry should close when the input loses focus, but unfortunately the blur event occurs before any changes are captured, so when selecting from the dropdown, the select is missed if the input closes itself first. 
    this.renderer.listen('window', 'mousedown', (e: Event) => {
      if (!this.typeaheadContainer.nativeElement.contains(e.target)) {
        this.preBlurEvent();
      }
    })
  }

  ngAfterViewInit(): void {
    this.isOpen.next(true);
    this.subscriptions.add(this.control.valueChanges.subscribe(() => {
      if (!this.editByModel) {
        this.isOpen.next(true);
        this.matchInputToControl();
      }
    }))
    this.isOpen.next(false);
    this.cd.detectChanges();
  }

  // Fires when user clicks outside the input, or when they pick something from the dropdown
  preBlurEvent() {
    if (this.multiselect) {
      this.currentDisplay = null;
      this.isOpen.next(false);
    } else {
      this.matchInputToControl();
    }
  }

  // Fires when item is clicked in the dropdown
  selected() {
    if (this.multiselect) {
      this.currentDisplay = null;
    }
    this.preBlurEvent();
  }

  // Control was updated programmatically; update the UI model to reflect.
  matchInputToControl() {
    if (this.multiselect) {
      this.currentDisplay = null;
    }
    this.currentDisplay = this.getDisplayByValue(this.control?.value);
  }

  resetClicked() {
    this.control.reset();
    this.matchInputToControl();
    this.isOpen.next(false);
  }

  selectAll() {
    this.multiselectAll();
    this.isOpen.next(false);
  }

  // User interacted with the UI model; update the control to reflect.
  matchControlToInput() {
    this.editByModel = true;
    let matchList = [];
    for (const item of this.selectionListItems) {
      matchList.push({ value: item?.value || item, matcher: item?.display || item?.value || item })
    }
    let match = matchList.find((e) => {
      if (this.currentDisplay?.indexOf(e.matcher) > -1) {
        return e;
      }
      return;
    });
    if (match) {
      this.updateValue(match.value);
      this.control.markAsDirty();
      this.control.updateValueAndValidity();
    } else {
      this.updateValue(null);
    }
    this.editByModel = false;
  }

  // Get the dropdown list template
  getTemplate() {
    if (this.selectionListTemplate) {
      return this.selectionListTemplate;
    }
    return this.defaultListTemplate;
  }

  // Highlight the portion of the option that has been typed in
  getHighlightedMatch(item, query) {
    query = query.join(' ');
    let display = item.value;
    if (display.toLocaleLowerCase().indexOf(query) > -1) {
      const left_str = display.substring(0, display.toLocaleLowerCase().indexOf(query));
      const highlight_str = display.substring(display.toLocaleLowerCase().indexOf(query), display.toLocaleLowerCase().indexOf(query) + query.length)
      const right_str = display.substring(display.toLocaleLowerCase().indexOf(query) + query.length);
      return '<div>' + left_str + `<strong>` + highlight_str + '</strong>' + right_str + '</div>';
    }
    else
      return '<div>' + display + '</div>';
  }

  openDropdown() {
    if (!this.isDisabled) {
      this.isOpen.next(true);
      this.typeaheadInput.nativeElement.focus();
      this.typeaheadInput.nativeElement.dispatchEvent(new Event(
        'input',
        {
          bubbles: true,
          cancelable: true
        }
      ));
    }
  }

}
