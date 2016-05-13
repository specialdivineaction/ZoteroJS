import { LibraryResourceCommand } from './library-resource-command';
import { ZoteroCollection } from '../zotero-collection';

/**
 * Retrieves a collection by ID from the given library
 * @extends LibraryResourceCommand
 */
class GetCollectionsCommand extends LibraryResourceCommand {
  /**
   * @inheritdoc
   */
  getUrl(baseUrl) {
    let url = super.getUrl(baseUrl);
    return `${url}/collections`;
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
   * @param Promise.<ZoteroCollectionDTO[]> response
   * @return Promise.<ZoteroCollection[]>
   */
  handleResponse(response) {
    return super.handleResponse(response).then((dtos) => dtos.map((dto) => new ZoteroCollection(this.library, dto)));
  }
}

export { GetCollectionsCommand };
