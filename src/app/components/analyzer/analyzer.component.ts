import { Component, OnInit } from '@angular/core';

import { ParserService } from '../../services/parser.service';
import { TransferService } from '../../services/transfer.service';
import { EnrichmentLink, Results } from '../../interfaces';

@Component({
    selector: 'analyzer',
    templateUrl: './analyzer.component.html',
    styleUrls: ['./analyzer.component.less']
})
export class AnalyzerComponent implements OnInit {
    externalAnalysisEngines: EnrichmentLink[] = [];
    results: Results = {};

    constructor(
        public parser: ParserService,
        private transfer: TransferService
    ) { }

    ngOnInit() {
        this.externalAnalysisEngines = this.transfer.getValue('enrichmentLinks');

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
