# Steps to reproduce `nx` module federation

## `nx` workspace creation

`npx create-nx-workspace angular-nx-module-federation` (Will be created a new workspace `angular-nx-module-federation`. When it asks you what type of workspace you want use, choose `angular` and name angular application as `host`)

`nx generate @nrwl/angular:app remote` (to generate a new angular project in the `nx` workspace)

## module federation installation

Module federation is a `webpack` tool that allows you to federate modules. Since you can't get direct access to the `webpack` configuration files by default. You can inject `webpack` configuration into the existing `angular` project. An easy way to do it is to use `@angular-architects/module-federation` tool. It injects `webpack` configuration and creates a boilerplate for the module federation configuration.

`cd host`

`ng add @angular-architects/module-federation --project host --port 4200`

`cd ../remote`

`ng add @angular-architects/module-federation --project host --port 4201`

## module federation configuration

Inside the `/remote/webpack.config.js` in the `ModuleFederationPlugin` secion:
```javascript
  name: "remote",
  filename: "remoteEntry.js",
  exposes: {
      './Header': './apps/remote/src/app/header/header.component.ts',
      // the header component was created by command `nx generate @nrwl/angular:component header --project remote`
  }, 
```

Inside the `/host/webpack.config.js` in the `ModuleFederationPlugin` secion:
```javascript
  name: "host",
  filename: "remoteEntry.js",
  
  remotes: {
    "remote": "http://localhost:4201/remoteEntry.js",
  },
```

## module federation usage

To load newly create header component, you should create a wrapper component and clear `component.html` file, and load remote component inside `component.ts` file.

`nx generate @nwrl/angular:component header-wrapper --project host`

Clear `header-wrapper.component.html`.

Inside `header-wrapper.component.ts` file:

```typescript
import { loadRemoteModule } from '@angular-architects/module-federation';
import {
  Component,
  ComponentFactoryResolver,
  OnInit,
  ViewContainerRef,
} from '@angular/core';

@Component({
  selector: 'angular-nx-mf-workspace-header-wrapper',
  templateUrl: './header-wrapper.component.html',
  styleUrls: ['./header-wrapper.component.scss'],
})
export class HeaderWrapperComponent implements OnInit {
  constructor(
    private cfr: ComponentFactoryResolver,
    private vcref: ViewContainerRef
  ) {}

  async ngOnInit() {
    const { HeaderComponent } = await loadRemoteModule({
      remoteEntry: 'http://localhost:4201/remoteEntry.js',
      type: 'module',
      exposedModule: './Header',
    });

    const componentRef = this.vcref.createComponent(
      this.cfr.resolveComponentFactory(HeaderComponent)
    );
  }
}

```

## run projects

`nx serve remote`

`nx serve host`
