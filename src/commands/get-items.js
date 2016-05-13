import { LibraryResourceCommand } from './library-resource-command';
import { ZoteroItem } from '../zotero-item';

/**
 * Retrieves a specific item by id from the given library.
 * @extends LibraryResourceCommand
 */
class GetItemsCommand extends LibraryResourceCommand {
  /**
   * @inheritdoc
   */
  getUrl(baseUrl) {
    let url = super.getUrl(baseUrl);
    return `${url}/items`;
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

export { GetItemsCommand };
