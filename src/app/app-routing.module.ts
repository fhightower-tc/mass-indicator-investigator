import { NgModule } from '@angular/core';
import {
    RouterModule,
    Routes
}
from '@angular/router';
import { MainComponent } from './main.component';
import { AnalyzerComponent } from './components/analyzer/analyzer.component';
import { SpacesBaseService } from 'spaces-ng';

const routes: Routes = [{
    path: '',
    component: MainComponent,
    resolve: {base: SpacesBaseService},
  }, {
    path: 'index.html',
    component: MainComponent,
    resolve: {base: SpacesBaseService},
  }, {
    path: 'analyze',
    component: AnalyzerComponent,
    resolve: {base: SpacesBaseService},
  }];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
