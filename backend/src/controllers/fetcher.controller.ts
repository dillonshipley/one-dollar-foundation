// Uncomment these imports to begin using these cool features!

// import {inject} from '@loopback/core';

import {get} from '@loopback/rest';

export class FetcherController {
  @get('/hello1')
  hello(): string {
    return 'Hello world!';
  }
}

