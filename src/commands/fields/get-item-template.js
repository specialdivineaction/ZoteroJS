// @flow

import { ResourceCommand } from '../resource-command';

/*:: import { ZoteroItemType } from '../../fields/zotero-item-type';*/
/*:: import { ZoteroAccount } from '../../zotero-account';*/

/**
 * Retrieves a template DTO for the given item type
 * @deprecated This seems like a poor API decision and is only supported since it is available.
 * @extends ResourceCommand
 */
class GetItemTemplateCommand extends ResourceCommand {
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
    return `${url}/items/new`;
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
}

export { GetItemTemplateCommand };
