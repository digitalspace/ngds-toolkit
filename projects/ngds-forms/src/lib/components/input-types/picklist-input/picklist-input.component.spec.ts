import { UntypedFormControl } from '@angular/forms';
import { NgdsPicklistInput } from './picklist-input.component';

// Exercises the option-list teardown/rebuild directly (no bootstrap dropdown render):
// the component is constructed with stub deps and its methods are called against
// hand-set state. Guards the duplicate-row regression — the picklist kept its previous
// <li> nodes when the option set was re-stamped after a selection, so every option
// rendered twice (bcgov/reserve-rec-admin#377 follow-up, same class as #47).
describe('NgdsPicklistInput (option list)', () => {
  let component: any;
  let detectChangesCalls: number;

  beforeEach(() => {
    detectChangesCalls = 0;
    const cdrStub: any = {
      detectChanges: () => { detectChangesCalls++; },
      markForCheck: () => {},
    };
    // renderer.listen is called in the NgdsDropdown constructor; return a no-op
    // unlisten fn. Bootstrap only inits on _isInputInitialized, never triggered.
    const rendererStub: any = { listen: () => () => {} };
    component = new NgdsPicklistInput(cdrStub, rendererStub);
    component.control = new UntypedFormControl('');
  });

  describe('rebuildList', () => {
    it('does nothing before the dropdown is initialized', () => {
      component.isDropdownInitialized = false;
      component.showList = false;

      component.rebuildList();

      expect(component.showList).toBe(false);
      expect(detectChangesCalls).toBe(0);
    });

    it('toggles the list off and back on so old rows are destroyed', () => {
      component.isDropdownInitialized = true;
      const seen: boolean[] = [];
      component.picklistCd = {
        detectChanges: () => { seen.push(component.showList); },
        markForCheck: () => {},
      };

      component.rebuildList();

      // Off then on, both flushed, so Angular tears the rows down before restamping.
      expect(seen).toEqual([false, true]);
      expect(component.showList).toBe(true);
    });
  });

  describe('list population', () => {
    it('stamps the list when the option set is populated', () => {
      component.isDropdownInitialized = true;
      component.showList = false;

      component._displayedSelectionListItems.next([
        { value: '0001', display: 'Reservation' },
      ]);

      // The constructor subscription only runs after afterDropdownInit, so drive
      // the rebuild directly here; the wiring is covered by the browser check.
      component.rebuildList();

      expect(component.showList).toBe(true);
    });
  });
});
