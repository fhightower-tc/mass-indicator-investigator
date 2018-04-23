import { Component, OnInit } from '@angular/core';

import { MainComponent } from '../../main.component';
import { ParserService } from '../../services/parser.service';

@Component({
  selector: 'importer',
  templateUrl: './importer.component.html',
  styleUrls: ['./importer.component.less']
})
export class ImporterComponent implements OnInit {
    text: string = '';

  constructor(private parser: ParserService, private main: MainComponent) { }

  ngOnInit() {
  }

  parseIndicators() {
      this.parser.parse(this.text);
      this.main.goTo('analyze');
  }

}
