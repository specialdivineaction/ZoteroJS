import { LibraryResourceCommand } from './library-resource-command';
import { ZoteroItem } from '../zotero-item';

/**
 * Retrieves a specific item by id from the given library.
 * @extends LibraryResourceCommand
 */
class GetCollectionItemsCommand extends LibraryResourceCommand {
  /**
   * @param {ZoteroCollection} collection
   * @param {boolean} recursive
   */
  constructor(collection, recursive = false) {
    super(collection.library);

    /** @type {ZoteroCollection} */
    this.collection = collection;

    /** @type {boolean} */
    this.recursive = recursive;
  }

  /**
   * @inheritdoc
   */
  getUrl(baseUrl) {
    let url = super.getUrl(baseUrl);
    url += `/collections/${this.collection.id}/items`;
    if (!this.recursive) {
      url += '/top';
    }
    return url;
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
    return super.handleResponse(response).then((dtos) => dtos.map((dto) => new ZoteroItem(this.library, dto)));
  }
}

export { GetCollectionItemsCommand };
