# NgdsToolkit

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.0.2. This package is a library of common Angular tools intended for use in the BCParks Digital Services branch.

### Developer Notes

To contribute to this library, fork the main repository and push contributrions to your fork. Create PRs to merge with the main repository from your fork.

To create a new release of the library on npm, create a Github release. Ensure the version tag is valid `semver`, ie `v1.2.3`.

The `Publish to NPM` Github Action will automatically publish the library to `@digitalspace/ngds-toolkit`: https://www.npmjs.com/package/@digitalspace/ngds-toolkit

## Local development

To develop for this library locally, it helps to run a separate project that uses the library as a dependency to test how the library is consumed. You cannot run library components on their own. 

1. Clone the library and a dependent project to your workspace.
2. Navigate to your library root folder and run `yarn build` at least once. This will generate the `/dist` folder.
3. Navigate to `/dist/ngds-toolkit/` now that the `/dist` folder has been created.
4. Run `yarn link` to generate a symlink to `@digitalspace/ngds-toolkit`
5. Navigate back to the root folder of the library project and run `yarn build --watch`. This will build the library to the dist folder with every change.
5. Navigate to the dependent project root folder and run `yarn link @digitalspace/ngds-toolkit`. This will link the local version of the library to your `node_modules`.
6. Run `yarn add @digitalspace/ngds-toolkit` to install the local library.
7. Ensure `preserveSymlinks: true` has been added to `angular.json` of the dependent project.
```
"architect": {
        ...
        "build": {
          ...
          "options": {
            ...
            "preserveSymlinks": true,
```
8. Run `yarn start` from the dependent project's root folder. If done correctly, any local changes to the library will be reflected in the project, though a page refresh is necessary for them to take effect. The `auto-reload` feature of Angular does not work the same as it does for changes to the dependent project - probably because no files within the project actually change when the library is updated.

## Forced auto-reload

You can force the `auto-reload` behaviour by adding the `paths` object to the `tsconfig.json` file in the dependent project. Note: this change is unaffected by symlinks and will break the dependent project if it is committed and used outside the local environment.

in `tsconfig.json`:

```
{
  "compilerOptions": {
    ...
    "paths": {
      "@digitalspace/ngds-toolkit": [
        "<relative-path-to-library>"
        
      ],
      "@angular/*": [
        "./node_modules/@angular/*"
      ]
      ...
    },
  }
}
```

where `<relative-path-to-library>` might look like this: `"../ngds-toolkit/dist/ngds-toolkit"`.

## Consuming the package from npm

To switch from local library to npm package, follow these steps:

1. Break the symlink in your dependent project by running `yarn unlink @digitalspace/ngds-toolkit`.
2. Uninstall your local version of the library by running `yarn remove @digitalspace/ngds-toolkit`.
3. Install from npm by running `yarn add @digitalspace/ngds-toolkit`

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
