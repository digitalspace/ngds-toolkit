import { UntypedFormControl } from '@angular/forms';
import { NgdsPicklistInput } from './picklist-input/picklist-input.component';

// Exercises the focus/open interlock directly (no bootstrap dropdown render): the
// component is constructed with stub deps and bsDropdown is stubbed, so show()/hide()
// only record that they were called. Guards the sibling-overlap regression — closing
// a dropdown makes bootstrap hand focus back to its own trigger, and the trigger's
// (focus) handler reopened it, leaving two sibling dropdowns open at once
// (bcgov/reserve-rec-public#746).
describe('NgdsDropdown (focus/open interlock)', () => {
  let component: any;
  let shown: number;
  let hidden: number;

  beforeEach(() => {
    shown = 0;
    hidden = 0;
    const cdrStub: any = { detectChanges: () => {}, markForCheck: () => {} };
    // renderer.listen is called in the NgdsDropdown constructor; return a no-op
    // unlisten fn. Bootstrap only inits on _isInputInitialized, never triggered.
    const rendererStub: any = { listen: () => () => {} };
    component = new NgdsPicklistInput(cdrStub, rendererStub);
    component.control = new UntypedFormControl('');
    component.bsDropdown = {
      show: () => { shown++; },
      hide: () => { hidden++; },
      update: () => {},
    };
  });

  it('opens when the trigger is focused', () => {
    component.dropdownFocus();

    expect(component.isOpen).toBe(true);
    expect(shown).toBe(1);
  });

  it('does not reopen when the close hands focus back to the trigger', () => {
    component.dropdownFocus();
    expect(component.isOpen).toBe(true);

    // dropdownBlur() closes the menu; bootstrap focuses the trigger while hiding,
    // which re-enters dropdownFocus() before dropdownBlur() has returned.
    component.bsDropdown.hide = () => {
      hidden++;
      component.dropdownFocus();
    };

    component.dropdownBlur();

    expect(component.isOpen).toBe(false);
    expect(hidden).toBe(1);
    expect(shown).toBe(1);
  });

  it('still opens on a fresh focus after a close has finished', () => {
    component.dropdownFocus();
    component.dropdownBlur();
    expect(component.isOpen).toBe(false);

    component.dropdownFocus();

    expect(component.isOpen).toBe(true);
    expect(shown).toBe(2);
  });
});
