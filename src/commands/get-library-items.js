// @flow

import { LibraryResourceCommand } from './library-resource-command';
import { ZoteroItem } from '../zotero-item';

/*:: import { ZoteroLibrary } from '../zotero-library';*/

/**
 * Retrieves a specific item by id from the given library.
 * @extends LibraryResourceCommand
 */
class GetLibraryItemsCommand extends LibraryResourceCommand {
  /*:: recursive: boolean;*/

  /**
   * @param {ZoteroLibrary} library
   * @param {boolean} recursive
   */
  constructor(library/*: ZoteroLibrary*/, recursive/*: boolean*/ = false) {
    super(library);

    /** @type {boolean} */
    this.recursive = recursive;
  }

  /**
   * @inheritdoc
   */
  getUrl(baseUrl/*: string*/)/*: string*/ {
    let url = super.getUrl(baseUrl);
    url += '/items';
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

export { GetLibraryItemsCommand };
