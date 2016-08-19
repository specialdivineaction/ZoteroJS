// @flow

import { ResourceCommand } from '../resource-command';
import { ZoteroCreatorRole } from '../../fields/zotero-creator-role';

/*:: import { ZoteroItemType } from '../../fields/zotero-item-type';*/
/*:: import { ZoteroAccount } from '../../zotero-account';*/

/**
 * Retrieves a listing of all available fields, optionally for the given zotero item type
 * @extends ResourceCommand
 */
class GetItemCreatorRolesCommand extends ResourceCommand {
  /*:: itemType: ZoteroItemType;*/

  /**
   * @param {ZoteroAccount} account
   * @param {ZoteroItemType} itemType
   */
  constructor(account/*: ZoteroAccount*/, itemType/*: ZoteroItemType*/) {
    super(account);
    this.itemType = itemType;
  }

  /**
   * @inheritdoc
   */
  getUrl(baseUrl/*: string*/)/*: string*/ {
    let url = super.getUrl(baseUrl);
    return `${url}/itemTypeCreatorTypes`;
  }

  /**
   * @inheritdoc
   */
  configureRequest(request/*: Object*/)/*: Object*/ {
    request = super.configureRequest(request);
    request.method = 'GET';
    request.query.itemType = this.itemType.id;

    return request;
  }

  /**
   * @override
   * @param {Promise.<ZoteroCreatorTypeDTO[]>} respone
   * @return {Promise.<ZoteroCreatorRole[]>}
   */
  handleResponse(response/*: Promise<any>*/)/*: Promise<ZoteroCreatorRole[]>*/ {
    return super.handleResponse(response).then(dtos => dtos.map(dto => new ZoteroCreatorRole(dto)));
  }
}

export { GetItemCreatorRolesCommand };
