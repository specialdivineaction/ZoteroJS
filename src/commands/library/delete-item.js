// @flow

import { LibraryResourceCommand } from './library-resource-command';

/*:: import { ZoteroLibrary } from '../../zotero-library';*/

/**
 * Retrieves a specific item by id from the given library.
 * @extends LibraryResourceCommand
 */
class DeleteLibraryItemCommand extends LibraryResourceCommand {
  /*:: key: string;*/
  /*:: version: number;*/

  /**
   * @param {ZoteroLibrary} library
   * @param {string} key
   * @param {integer} version
   */
  constructor(library/*: ZoteroLibrary*/, key/*: string*/, version/*: number*/) {
    super(library);

    if (!key || !version) {
      throw new Error('key and version are required for deletion');
    }

    /** @type {string} */
    this.key = key;

    /** @type {integer} */
    this.version = version;
  }

  /**
   * @inheritdoc
   */
  getUrl(baseUrl/*: string*/)/*: string*/ {
    let url = super.getUrl(baseUrl);
    return `${url}/items/${this.key}`;
  }

  /**
   * @inheritdoc
   */
  configureRequest(request/*: Object*/)/*: Object*/ {
    request = super.configureRequest(request);
    request.method = 'DELETE';
    request.headers['If-Unmodified-Since-Version'] = this.version;
    return request;
  }
}

export { DeleteLibraryItemCommand };
