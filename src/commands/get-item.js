import { LibraryResourceCommand } from './library-resource-command';
import { ZoteroItem } from '../zotero-item';

/**
 * Retrieves a specific item by id from the given library.
 * @extends LibraryResourceCommand
 */
class GetItemCommand extends LibraryResourceCommand {
  /**
   * @param {ZoteroLibrary} library
   * @param {string} id Identifier of item to retrieve.
   */
  constructor(library, id) {
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
  getUrl(baseUrl) {
    let url = super.getUrl(baseUrl);
    return `${url}/items/${this.itemId}`;
  }

  /**
   * @inheritdoc
   */
  configureRequest(request) {
    request = super.configureRequest(request);
    request.method = 'GET';
    return request;
  }

  /**
   * @override
   * @param {Promise.<ZoteroItemDTO>} response
   * @return {Promise.<ZoteroItem>}
   */
  handleResponse(response) {
    return super.handleResponse(response).then((dto) => new ZoteroItem(this.library, dto));
  }
}

export { GetItemCommand };
