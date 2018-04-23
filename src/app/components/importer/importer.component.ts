import { Component, OnInit } from '@angular/core';

import { MainComponent } from '../../main.component';
import { ParserService } from '../../services/parser.service';
import { EnrichmentLink } from '../../interfaces';
import { TransferService } from '../../services/transfer.service';

@Component({
    selector: 'importer',
    templateUrl: './importer.component.html',
    styleUrls: ['./importer.component.less']
})
export class ImporterComponent implements OnInit {
    text: string = '';
    enrichmentLinks: EnrichmentLink[];
    selectedEnrichmentLinks: string[];

    constructor(
        private parser: ParserService,
        private main: MainComponent,
        private transfer: TransferService
    ) { }

    ngOnInit() {
        this.enrichmentLinks = [{
            name: 'test',
            link: 'abc'
        }];
    }

    private handleSelectedEnrichmentLinks() {
        let selectedLinks: EnrichmentLink[] = [];
        for (var i = this.selectedEnrichmentLinks.length - 1; i >= 0; i--) {
            selectedLinks.push({
                name: this.selectedEnrichmentLinks[i].split(": ")[0],
                link: this.selectedEnrichmentLinks[i].split(": ")[1]
            });
        }
        this.transfer.setValue('enrichmentLinks', selectedLinks);
    }

    nextStep() {
        this.handleSelectedEnrichmentLinks();
        this.parser.parse(this.text);
        this.main.goTo('analyze');
    }

}
