// @flow

import { LibraryResourceCommand } from './library-resource-command';
import { ZoteroItem } from '../../zotero-item';

/*:: import { ZoteroLibrary } from '../../zotero-library';*/

/**
 * Retrieves a specific item by id from the given library.
 * @extends LibraryResourceCommand
 */
class GetItemCommand extends LibraryResourceCommand {
  /*:: itemId: string;*/

  /**
   * @param {ZoteroLibrary} library
   * @param {string} id Identifier of item to retrieve.
   */
  constructor(library/*: ZoteroLibrary*/, id/*: string*/) {
    super(library);

    /**
     * Identifier of item to retrieve.
     * @type {string}
     */
    this.itemId = id;
  }

  /**
   * @inheritdoc
   */
  getUrl(baseUrl/*: string*/)/*: string*/ {
    let url = super.getUrl(baseUrl);
    return `${url}/items/${this.itemId}`;
  }

  /**
   * @inheritdoc
   */
  configureRequest(request/*: Object*/)/*: Object*/ {
    request = super.configureRequest(request);
    request.method = 'GET';
    request.query.include = 'citation,data'
    return request;
  }

  /**
   * @override
   * @param {Promise.<ZoteroItemDTO>} response
   * @return {Promise.<ZoteroItem>}
   */
  handleResponse(response/*: Promise<any>*/)/*: Promise<ZoteroItem>*/ {
    return super.handleResponse(response).then((dto) => new ZoteroItem(this.library, dto));
  }
}

export { GetItemCommand };
