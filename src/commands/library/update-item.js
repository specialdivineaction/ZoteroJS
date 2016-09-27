// @flow

import { LibraryResourceCommand } from './library-resource-command';

/*:: import { ZoteroLibrary } from '../../zotero-library';*/

/**
 * Retrieves a specific item by id from the given library.
 * @extends LibraryResourceCommand
 */
class UpdateLibraryItemCommand extends LibraryResourceCommand {
  /*:: item: Object;*/

  /**
   * @param {ZoteroLibrary} library
   * @param {Object} item
   */
  constructor(library/*: ZoteroLibrary*/, item/*: Object*/) {
    super(library);

    if (!item.key) {
      throw new Error('item does not have a key');
    }

    /** @type {Object} */
    this.item = item;
  }

  /**
   * @inheritdoc
   */
  getUrl(baseUrl/*: string*/)/*: string*/ {
    let url = super.getUrl(baseUrl);
    return `${url}/items/${this.item.key}`;
  }

  /**
   * @inheritdoc
   */
  configureRequest(request/*: Object*/)/*: Object*/ {
    request = super.configureRequest(request);
    request.method = 'PUT';
    request.data = this.item;
    return request;
  }

  /**
   * @override
   * @param {Promise} response
   * @return {Promise.<String>}
   */
  handleResponse(response/*: Promise<any>*/)/*: Promise<string>*/ {
    return super.handleResponse(response).then(() => this.item.key);
  }
}

export { UpdateLibraryItemCommand };
