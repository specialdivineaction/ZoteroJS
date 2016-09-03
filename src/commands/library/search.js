// @flow

import { LibraryResourceCommand } from './library-resource-command';
import { ZoteroItem } from '../../zotero-item';

/*:: import { ZoteroLibrary } from '../../zotero-library';*/

/**
 * Retrieves a specific item by id from the given library.
 * @extends LibraryResourceCommand
 */
class LibraryItemSearchCommand extends LibraryResourceCommand {
  /*:: query: string;*/
  /*:: recursive: boolean;*/

  /**
   * @param {ZoteroLibrary} library
   * @param {boolean} recursive
   */
  constructor(library/*: ZoteroLibrary*/, query/*: string*/, recursive/*: boolean*/ = false) {
    super(library);

    /** @type {string} */
    this.query = query;

    /** @type {boolean} */
    this.recursive = recursive;
  }

  /**
   * @inheritdoc
   */
  getUrl(baseUrl/*: string*/)/*: string*/ {
    let url = super.getUrl(baseUrl);
    url += '/items';
    if (!this.recursive) {
      url += '/top';
    }
    return url;
  }

  /**
   * @inheritdoc
   */
  configureRequest(request/*: Object*/)/*: Object*/ {
    request = super.configureRequest(request);
    request.method = 'GET';
    request.query.q = this.query;
    request.query.include = 'citation'
    return request;
  }

  /**
   * @override
   * @param {Promise.<ZoteroItemDTO[]>} response
   * @return {Promise.<ZoteroItem[]>}
   */
  handleResponse(response/*: Promise<any>*/)/*: Promise<ZoteroItem[]>*/ {
    return super.handleResponse(response).then((dtos) => dtos.map((dto) => new ZoteroItem(this.library, dto)));
  }
}

export { LibraryItemSearchCommand };
