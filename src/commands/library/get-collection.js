// @flow

import { LibraryResourceCommand } from './library-resource-command';
import { ZoteroCollection } from '../../zotero-collection';

/*:: import { ZoteroLibrary } from '../../zotero-library';*/

/**
 * Retrieves a collection by ID from the given library
 * @extends LibraryResourceCommand
 */
class GetCollectionCommand extends LibraryResourceCommand {
  /*:: collectionId: string;*/

  /**
   * @param {ZoteroLibrary} library
   * @param {string} id Identifier of collection to retrieve.
   */
  constructor(library/*: ZoteroLibrary*/, id/*: string */) {
    super(library);

    /**
     * Identifier of collection to retrieve.
     * @type {string}
     */
    this.collectionId = id;
  }

  /**
   * @inheritdoc
   */
  getUrl(baseUrl/*: string */)/*: string */ {
    let url = super.getUrl(baseUrl);
    return `${url}/collections/${this.collectionId}`;
  }

  /**
   * @inheritdoc
   */
  configureRequest(request/*: Object*/)/*: Object*/ {
    request = super.configureRequest(request);
    request.method = 'GET';
    return request;
  }

  /**
   * @override
   * @param Promise.<ZoteroCollectionDTO> response
   * @return Promise.<ZoteroCollection>
   */
  handleResponse(response/*: Promise<any>*/)/*: Promise<ZoteroCollection>*/ {
    return super.handleResponse(response).then((dto) => new ZoteroCollection(this.library, dto));
  }
}

export { GetCollectionCommand };
