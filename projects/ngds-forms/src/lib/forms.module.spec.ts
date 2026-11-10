import { ANIMATION_MODULE_TYPE, EnvironmentInjector, createEnvironmentInjector, importProvidersFrom } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { NgdsFormsModule } from '../public-api';

// Animations belong to the app root. When this module provided them, every
// standalone component importing it got a second animation engine that the
// app never flushes, so pages using ngds inputs stayed in the DOM after the
// router left them (bcgov/reserve-rec-admin#446).
describe('NgdsFormsModule providers', () => {
  it('does not provide its own animation engine', () => {
    const injector = createEnvironmentInjector(
      [importProvidersFrom(NgdsFormsModule)],
      TestBed.inject(EnvironmentInjector),
    );
    expect(injector.get(ANIMATION_MODULE_TYPE, null, { self: true })).toBeNull();
    injector.destroy();
  });
});
