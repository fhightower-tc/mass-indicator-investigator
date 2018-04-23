import { Injectable } from '@angular/core';

import {
    SpacesMessagesService,
} from 'spaces-ng/';

import { TcGroupService } from 'threatconnect-ng';

import { EnrichmentLink } from '../interfaces';

@Injectable()
export class TransferService {
    private enrichmentLinks: EnrichmentLink[];

    constructor(
        private messages: SpacesMessagesService,
        private tcGroup: TcGroupService,
    ) { }

    setValue(valueName: string, value: any) {
        this[valueName] = value;
    }

    getValue(valueName: string) {
        return this[valueName];
    }
}
