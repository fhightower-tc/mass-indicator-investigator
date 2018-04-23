import { Component, OnInit } from '@angular/core';

import { ParserService } from '../../services/parser.service';

@Component({
  selector: 'analyzer',
  templateUrl: './analyzer.component.html',
  styleUrls: ['./analyzer.component.less']
})
export class AnalyzerComponent implements OnInit {
    externalAnalysisEngines: Array<{
        name: string,
        link: string
    }> = [];
    results: {
        [key: string]: {
          [key: string]: {
            a: string,
            b: string
          }
        }
    } = {};

  constructor(public parser: ParserService) { }

  ngOnInit() {
    this.externalAnalysisEngines = [{
        name: '1',
        link: 'abc'
    }, {
        name: '2',
        link: 'abc'
    }];

    for (var i = this.parser.indicators.length - 1; i >= 0; i--) {
      let engineResults: {
          [key: string]: {
            a: string,
            b: string
          }
        } = {};
      for (var j = this.externalAnalysisEngines.length - 1; j >= 0; j--) {
        engineResults[this.externalAnalysisEngines[j].name] = {
            a: 'test a',
            b: 'test b'
          };
      }

      this.results[this.parser.indicators[i].indicator] = engineResults;
    }
  }

}
