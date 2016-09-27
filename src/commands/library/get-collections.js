// @flow

import { LibraryResourceCommand } from './library-resource-command';
import { ZoteroCollection } from '../../zotero-collection';

/*:: import { ZoteroLibrary } from '../../zotero-library';*/

/**
 * Retrieves a collection by ID from the given library
 * @extends LibraryResourceCommand
 */
class GetCollectionsCommand extends LibraryResourceCommand {
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
    url += '/collections';
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
   * @param Promise.<ZoteroCollectionDTO[]> response
   * @return Promise.<ZoteroCollection[]>
   */
  handleResponse(response/*: Promise<any>*/)/*: Promise<ZoteroCollection[]>*/ {
    return super.handleResponse(response).then(dtos => dtos.map(dto => new ZoteroCollection(this.library, dto)));
  }
}

export { GetCollectionsCommand };
