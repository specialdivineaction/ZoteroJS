// @flow

import { ResourceCommand } from '../resource-command';
import { ZoteroItemType } from '../../fields/zotero-item-type';

/*:: import { ZoteroExecutor } from '../../zotero-executor';*/
/*:: import { ZoteroAccount } from '../../zotero-account';*/

/**
 * Retrieves a listing of all available zotero item types
 * @extends ResourceCommand
 */
class GetItemTypesCommand extends ResourceCommand {
  /*:: executor: ZoteroExecutor;*/

  /**
   * @param {ZoteroAccount} account
   * @param {ZoteroExecutor} executor
   */
  constructor(account/*: ZoteroAccount*/, executor/*: ZoteroExecutor*/) {
    super(account);
    this.executor = executor;
  }

  /**
   * @inheritdoc
   */
  getUrl(baseUrl/*: string*/)/*: string*/ {
    let url = super.getUrl(baseUrl);
    return `${url}/itemTypes`;
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
   * @param {Promise.<ZoteroItemTypeDTO[]>} respone
   * @return {Promise.<ZoteroItemType[]>}
   */
  handleResponse(response/*: Promise<any>*/)/*: Promise<ZoteroItemType[]>*/ {
    return super.handleResponse(response).then(dtos => dtos.map(dto => new ZoteroItemType(this.account, this.executor, dto)));
  }
}

export { GetItemTypesCommand };
