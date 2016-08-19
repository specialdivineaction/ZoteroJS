// @flow

import { ResourceCommand } from '../resource-command';
import { ZoteroItemField } from '../../fields/zotero-item-field';

/*:: import { ZoteroAccount } from '../../zotero-account';*/

/**
 * Retrieves a listing of all available fields, optionally for the given zotero item type
 * @extends ResourceCommand
 */
class GetCreatorFieldsCommand extends ResourceCommand {
  /**
   * @inheritdoc
   */
  getUrl(baseUrl/*: string*/)/*: string*/ {
    let url = super.getUrl(baseUrl);
    return `${url}/creatorFields`;
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
   * @param {Promise.<ZoteroItemFieldDTO[]>} respone
   * @return {Promise.<ZoteroItemField[]>}
   */
  handleResponse(response/*: Promise<any>*/)/*: Promise<ZoteroItemField[]>*/ {
    return super.handleResponse(response).then(dtos => dtos.map(dto => new ZoteroItemField(dto)));
  }
}

export { GetCreatorFieldsCommand };
