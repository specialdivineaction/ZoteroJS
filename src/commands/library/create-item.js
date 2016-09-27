// @flow

import { LibraryResourceCommand } from './library-resource-command';
import { ZoteroItem } from '../../zotero-item';

/*:: import { ZoteroLibrary } from '../../zotero-library';*/

/**
 * Retrieves a specific item by id from the given library.
 * @extends LibraryResourceCommand
 */
class CreateLibraryItemCommand extends LibraryResourceCommand {
  /*:: item: Object;*/

  /**
   * @param {ZoteroLibrary} library
   * @param {Object} item
   */
  constructor(library/*: ZoteroLibrary*/, item/*: Object*/) {
    super(library);

    /** @type {Object} */
    this.item = item;
  }

  /**
   * @inheritdoc
   */
  getUrl(baseUrl/*: string*/)/*: string*/ {
    let url = super.getUrl(baseUrl);
    return `${url}/items`;
  }

  /**
   * @inheritdoc
   */
  configureRequest(request/*: Object*/)/*: Object*/ {
    request = super.configureRequest(request);
    request.method = 'POST';
    request.data = [this.item];
    return request;
  }

  /**
   * @override
   * @param {Promise.<ZoteroMultiSaveReportDTO>} response
   * @return {Promise.<ZoteroItem>}
   */
  handleResponse(response/*: Promise<any>*/)/*: Promise<ZoteroItem>*/ {
    return super.handleResponse(response).then(report => {
      let created = null;

      // successful should only ever have zero items (error) or one item (success)
      for (let ix in report.successful) if (report.successful.hasOwnProperty(ix)) {
        created = new ZoteroItem(this.library, report.successful[ix]);
        break;
      }

      if (!created) {
        throw new Error('item could not be created');
      }

      return created;
    });
  }
}

export { CreateLibraryItemCommand };
