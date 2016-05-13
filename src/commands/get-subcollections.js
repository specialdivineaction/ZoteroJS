import { LibraryResourceCommand } from './library-resource-command';

/**
 * Retrieves all sub-collections belonging to the collection identified by the given ID.
 * @extends LibraryResourceCommand
 */
class GetSubCollectionCommand extends LibraryResourceCommand {
  /**
   * @param {ZoteroLibrary} library
   * @param {string} id Identifier of parent collection from which to retrieve subcollections.
   */
  constructor(library, id) {
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
  getUrl(baseUrl) {
    let url = super.getUrl(baseUrl);
    return `${url}/collections/${this.collectionId}/collections`;
  }

  /**
   * @inheritdoc
   */
  configureRequest(request) {
    request = super.configureRequest(request);
    request.method = 'GET';
    return request;
  }
}

export { GetSubCollectionCommand };
