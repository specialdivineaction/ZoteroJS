// @flow

import { ResourceCommand } from '../resource-command';
import { ZoteroItemField } from '../../fields/zotero-item-field';

/*:: import { ZoteroItemType } from '../../fields/zotero-item-type';*/
/*:: import { ZoteroAccount } from '../../zotero-account';*/

/**
 * Retrieves a listing of all available fields, optionally for the given zotero item type
 * @extends ResourceCommand
 */
class GetItemFieldsCommand extends ResourceCommand {
  /*:: itemType: ?ZoteroItemType;*/

  /**
   * @param {ZoteroAccount} account
   * @param {ZoteroItemType} [itemType]
   */
  constructor(account/*: ZoteroAccount*/, itemType/*: ?ZoteroItemType*/) {
    super(account);
    this.itemType = itemType;
  }

  /**
   * @inheritdoc
   */
  getUrl(baseUrl/*: string*/)/*: string*/ {
    let url = super.getUrl(baseUrl);
    return this.itemType ? `${url}/itemTypeFields` : `${url}/itemFields`;
  }

  /**
   * @inheritdoc
   */
  configureRequest(request/*: Object*/)/*: Object*/ {
    request = super.configureRequest(request);
    request.method = 'GET';

    if (this.itemType) {
      request.query.itemType = this.itemType.id;
    }

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

export { GetItemFieldsCommand };
