import { Injectable } from '@angular/core';

import {
    SpacesLoggingService,
    SpacesMessagesService
} from 'spaces-ng';
import { TcExchangeDbService } from 'threatconnect-ng';

@Injectable()
export class DatastoreService {
    public domain: string = 'organization'
    public typeName: string = 'massIndicatorEnrichments';

    constructor(
        private exchangeDB: TcExchangeDbService,
        private logging: SpacesLoggingService,
        private messages: SpacesMessagesService
    ) {}

    public getEntries(searchCommand: string) {
        this.exchangeDB.read(this.domain, this.typeName, searchCommand)
            .subscribe(
                response => {
                    let entries: Array<{
                        name: string;
                        link: string;
                    }>;
                    for (var i = response.hits.hits.length - 1; i >= 0; i--) {
                        entries.push({
                            name: response.hits.hits[i]._source.name,
                            link: response.hits.hits[i]._source.link
                        });
                    }

                    return entries;
                },
                err => {
                  this.logging.error('Error', err);
                  this.messages.showError('Failed', 'Unable to retrieve the entries from the datastore: ' + err);
                }
            );
    }

    public save(searchCommand: string, linkName: string, link: string) {
        let jsonifiedNoteText = JSON.parse('{"name": "' + linkName + '", "link": "' + link + '"}');

        this.exchangeDB.create(this.domain, this.typeName, searchCommand, jsonifiedNoteText)
                .subscribe(
                    response => {
                        this.messages.showSuccess('Success', 'Entry saved');
                        // if an entry is being updated, simply update the note's text rather than adding a new entry
                        if (searchCommand !== '') {
                            // for (var i = this.notes.length - 1; i >= 0; i--) {
                            //     if (this.notes[i].id === searchCommand) {
                            //         this.notes[i].text = noteText
                            //         break;
                            //     }
                            // }
                        } else {
                            // this.notes.push({
                            //     'text': noteText,
                            //     'id': response._id,
                            // });
                        }
                    },
                    err => {
                        this.logging.error('Error', err);
                        this.messages.showError('Failed', 'Unable to save entry in the datastore: ' + err);
                    }
                );
    }

    public delete(entryID: string) {
        this.exchangeDB.delete(this.domain, this.typeName, entryID)
                .subscribe(
                    response => {
                        this.messages.showSuccess('Success', 'Entry deleted');
                        // for (var i = this.notes.length - 1; i >= 0; i--) {
                        //     // remove the note from the list of notes
                        //     if (this.notes[i].id === noteId) {
                        //         this.notes.splice(i, 1);
                        //         break;
                        //     }
                        // }
                    },
                    err => {
                        this.logging.error('Error', err);
                        this.messages.showError('Failed', 'Unable to delete entry from the datastore: ' + err);
                    }
                );
    }
}