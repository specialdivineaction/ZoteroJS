// @flow

import { ResourceCommand } from './resource-command';
import { ZoteroGroup } from '../zotero-group';

/*:: import { ZoteroAccount } from '../zotero-account';*/

/**
 * Retrieves all groups of whom this account is a member
 * @extends ResourceCommand
 */
class GetGroupsCommand extends ResourceCommand {
  /*:: userId: string;*/

  /**
   * @param {ZoteroAccount} account
   */
  constructor(account/*: ZoteroAccount*/) {
    super(account);

    /**
     * ID of account.
     * @type {string}
     */
    this.userId = account.id;
  }

  /**
   * @inheritdoc
   */
  getUrl(baseUrl/*: string*/)/*: string*/ {
    let url = super.getUrl(baseUrl);
    return `${url}/users/${this.userId}/groups`;
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
   * @param {Promise.<ZoteroGroupDTO[]>} response
   * @return {Promise.<ZoteroGroup[]>}
   */
  handleResponse(response/*: Promise<any>*/)/*: Promise<ZoteroGroup[]>*/ {
    return super.handleResponse(response).then((groups) => groups.map((group) => new ZoteroGroup(group)));
  }
}

export { GetGroupsCommand };
