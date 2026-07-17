import { UntypedFormControl } from '@angular/forms';
import { NgdsTypeaheadInput } from './typeahead-input.component';

// These exercise the option-list logic directly (no bootstrap dropdown render):
// the component is constructed with stub deps and its methods are called against
// hand-set state. They guard the three regressions fixed alongside the
// duplicate/stale-row work: de-dup by value, empty-list clearing, and the
// min-length gate on focus.
describe('NgdsTypeaheadInput (option list)', () => {
  let component: any;

  beforeEach(() => {
    const cdrStub: any = { detectChanges: () => {}, markForCheck: () => {} };
    // renderer.listen is called in the NgdsDropdown constructor; return a no-op
    // unlisten fn. Bootstrap only inits on _isInputInitialized, never triggered.
    const rendererStub: any = { listen: () => () => {} };
    component = new NgdsTypeaheadInput(cdrStub, rendererStub);
    // A real control keeps isDisabled false (getDisabledState treats a missing
    // control as disabled) so focus/blur paths behave as they do at runtime.
    component.control = new UntypedFormControl('');
  });

  describe('onSelectionListItemsChange (de-dup)', () => {
    it('drops duplicate options sharing the same value (no repeated rows on reopen)', () => {
      component._displayedSelectionListItems.next([
        { value: '0001', display: 'British Columbia' },
        { value: '0001', display: 'British Columbia' },
        { value: '0002', display: 'Alberta' },
      ]);

      component.onSelectionListItemsChange();

      expect(component.matchList.length).toBe(2);
      expect(component.matchList.map((m: any) => m.value)).toEqual(['0001', '0002']);
    });

    it('keeps options with a shared display but distinct values (no silent data loss)', () => {
      component._displayedSelectionListItems.next([
        { value: '0001', display: 'Vancouver' },
        { value: '0002', display: 'Vancouver' },
      ]);

      component.onSelectionListItemsChange();

      // De-dup keys on value, not display, so both remain selectable.
      expect(component.matchList.length).toBe(2);
      expect(component.matchList.map((m: any) => m.value)).toEqual(['0001', '0002']);
    });
  });

  describe('updateDisplayedSelectionListItems (empty clears)', () => {
    it('clears the displayed list when the option set becomes empty', () => {
      component._displayedSelectionListItems.next([{ value: '0001', display: 'British Columbia' }]);
      component._selectionListItems.next([]);

      component.updateDisplayedSelectionListItems();

      expect(component.displayedSelectionListItems).toEqual([]);
    });
  });

  describe('showAllItems (min-length gate on focus)', () => {
    beforeEach(() => {
      component.refinedListItems = [];
      component.matchList = [
        { value: '0001', display: 'British Columbia', matcher: 'british columbia' },
        { value: '0002', display: 'Alberta', matcher: 'alberta' },
      ];
    });

    it('does not populate the list on focus when input is shorter than typeaheadMinLength', () => {
      component.typeaheadMinLength = 3;
      component.currentDisplay = '';

      component.showAllItems();

      expect(component.refinedListItems.length).toBe(0);
      expect(component.preventOpening).toBe(true);
    });

    it('populates the full list on focus once the min length is met', () => {
      component.typeaheadMinLength = 3;
      component.currentDisplay = 'abc';

      component.showAllItems();

      expect(component.refinedListItems.length).toBe(2);
      expect(component.preventOpening).toBe(false);
    });

    it('caps the rendered options at optionsLimit', () => {
      component.optionsLimit = 1;
      component.currentDisplay = '';

      component.showAllItems();

      expect(component.refinedListItems.length).toBe(1);
    });
  });

  describe('dependent-list swap (e.g. activity list after collection change)', () => {
    it('shows only the new option set after the source list is replaced', () => {
      // Collection A's activities.
      component._displayedSelectionListItems.next([
        { value: 'a1', display: 'Hike A' },
        { value: 'a2', display: 'Swim A' },
      ]);
      component.onSelectionListItemsChange();
      component.currentDisplay = '';
      component.showAllItems();
      expect(component.refinedListItems.map((r: any) => r.value)).toEqual(['a1', 'a2']);

      // Collection changes -> a completely different activity set.
      component._displayedSelectionListItems.next([{ value: 'b1', display: 'Climb B' }]);
      component.onSelectionListItemsChange();
      component.showAllItems();

      // No rows from the previous collection remain.
      expect(component.refinedListItems.map((r: any) => r.value)).toEqual(['b1']);
    });
  });
});
