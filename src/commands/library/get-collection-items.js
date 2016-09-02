// @flow

import { LibraryResourceCommand } from './library-resource-command';
import { ZoteroItem } from '../../zotero-item';

/*:: import { ZoteroCollection } from '../../zotero-collection';*/

/**
 * Retrieves a specific item by id from the given library.
 * @extends LibraryResourceCommand
 */
class GetCollectionItemsCommand extends LibraryResourceCommand {
  /*:: collection: ZoteroCollection;*/
  /*:: recursive: boolean;*/

  /**
   * @param {ZoteroCollection} collection
   * @param {boolean} recursive
   */
  constructor(collection/*: ZoteroCollection*/, recursive/*: boolean*/ = false) {
    super(collection.library);

    /** @type {ZoteroCollection} */
    this.collection = collection;

    /** @type {boolean} */
    this.recursive = recursive;
  }

  /**
   * @inheritdoc
   */
  getUrl(baseUrl/*: string*/)/*: string*/ {
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
  configureRequest(request/*: Object*/)/*: Object*/ {
    request = super.configureRequest(request);
    request.method = 'GET';
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

export { GetCollectionItemsCommand };
