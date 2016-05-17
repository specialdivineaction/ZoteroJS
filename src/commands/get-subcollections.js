// @flow

import { LibraryResourceCommand } from './library-resource-command';
import { ZoteroCollection } from '../zotero-collection';

/*:: import { ZoteroLibrary } from '../zotero-library';*/

/**
 * Retrieves all sub-collections belonging to the collection identified by the given ID.
 * @extends LibraryResourceCommand
 */
class GetSubCollectionsCommand extends LibraryResourceCommand {
  /*:: collectionId: string;*/

  /**
   * @param {ZoteroLibrary} library
   * @param {string} id Identifier of parent collection from which to retrieve subcollections.
   */
  constructor(library/*: ZoteroLibrary*/, id/*: string*/) {
    super(library);

    /**
     * Identifier of parent collection from which to retrieve subcollections.
     * @type {string}
     */
    this.collectionId = id;
  }

  /**
   * @inheritdoc
   */
  getUrl(baseUrl/*: string*/)/*: string*/ {
    let url = super.getUrl(baseUrl);
    return `${url}/collections/${this.collectionId}/collections`;
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
   * @param {Promise.<ZoteroCollectionDTO[]>} response
   * @return {Promise.<ZoteroCollection>}
   */
  handleResponse(response/*: Promise<any>*/)/*: Promise<ZoteroCollection[]>*/ {
    return super.handleResponse(response).then((dtos) => dtos.map((dto) => new ZoteroCollection(this.library, dto)));
  }
}

export { GetSubCollectionsCommand };
