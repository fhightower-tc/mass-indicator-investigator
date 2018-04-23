import { Injectable } from '@angular/core';

function matchAll(regexp: RegExp, text) {
  var matches = [];
  text.replace(regexp, function() {
    var arr = ([]).slice.call(arguments, 0);
    var extras = arr.splice(-2);
    arr.index = extras[0];
    arr.input = extras[1];
    matches.push(arr[0]);
  });
  return matches.length ? matches : null;
};

@Injectable()
export class ParserService {
    private regexes: Array<{
        regex: RegExp,
        type: string
    }> = [
        {
            regex: /\b(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\b/g,
            type: "address"
        },
        {
            regex: /[a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])/gi,
            type: "emailaddress"
        },
        {
            regex: /\b([a-fA-F\d]{32})\b/g,
            type: "file-md5"
        },
        {
            regex: /\b([a-fA-F\d]{40})\b/g,
            type: "file-sha1"
        },
        {
            regex: /\b([a-fA-F\d]{64})\b/g,
            type: "file-sha256"
        },
        {
            regex: /\b((?:(?!-)[a-zA-Z0-9-]{0,62}[a-zA-Z0-9]\.)+(?!exe|php|dll|doc|docx|txt|rtf|odt|xls|xlsx|ppt|pptx|bin|pcap|ioc|pdf|mdb|asp|html|xml|jpg|png|lnk|log|vbs|lco|bat|shell|quit|pdb|vbp|bdoda|bsspx|save|cpl|wav|tmp|close|ico|ini|sleep|run|scr|jar|jxr|apt|w32|css|js|xpi|class|apk|rar|zip|hlp|tmp|cpp|crl|cfg|cer|plg|tmp|lxdns|cgi|dat($|\r\n)|gif($|\r\n)|xn$)(?:xn--[a-zA-Z0-9]{2,22}|[a-zA-Z]{2,13}))/gi,
            type: "host"
        },
        {
            regex: /\b(https?|sftp|ftp|file):\/\/[-a-zA-Z0-9+&@#/%?=~_|!:.;'*$()\\;]*[-a-zA-Z0-9+&@#/%?=~+|\.]/g,
            type: "url"
        }
    ];
    public indicators: Array<{
      type: string,
      indicator: string
    }> = [];

  constructor() { }

  parse(text) {
    for (var i = this.regexes.length - 1; i >= 0; i--) {
      let _this = this;
      var indicators = new Set(matchAll(this.regexes[i].regex, text)) || new Set();

      indicators.forEach(function(indicator) {
        _this.indicators.push({
          type: _this.regexes[i].type,
          indicator: indicator
        });
      });
    }
  }

}
