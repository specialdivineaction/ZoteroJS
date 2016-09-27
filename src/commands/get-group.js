// @flow

import { ResourceCommand } from './resource-command';
import { ZoteroGroup } from '../zotero-group';

/*:: import { ZoteroAccount } from '../zotero-account';*/

/**
 * Retrieves all groups of whom this account is a member
 * @extends ResourceCommand
 */
class GetGroupCommand extends ResourceCommand {
  /*:: groupId: string;*/

  /**
   * @param {ZoteroAccount} account
   * @param {string} groupId
   */
  constructor(account/*: ZoteroAccount*/, groupId/*: string*/) {
    super(account);

    /** @type {string} */
    this.groupId = groupId;
  }

  /**
   * @inheritdoc
   */
  getUrl(baseUrl/*: string*/)/*: string*/ {
    let url = super.getUrl(baseUrl);
    return `${url}/groups/${this.groupId}`;
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
   * @param {Promise.<ZoteroGroupDTO>} response
   * @return {Promise.<ZoteroGroup>}
   */
  handleResponse(response/*: Promise<any>*/)/*: Promise<ZoteroGroup>*/ {
    return super.handleResponse(response).then(group => new ZoteroGroup(group));
  }
}

export { GetGroupCommand };
