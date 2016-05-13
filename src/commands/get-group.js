import { ResourceCommand } from './resource-command';
import { ZoteroGroup } from '../zotero-group';

/**
 * Retrieves all groups of whom this account is a member
 * @extends ResourceCommand
 */
class GetGroupCommand extends ResourceCommand {
  /**
   * @param {ZoteroAccount} account
   * @param {string} groupId
   */
  constructor(account, groupId) {
    super(account);

    /** @type {string} */
    this.groupId = groupId;
  }

  /**
   * @inheritdoc
   */
  getUrl(baseUrl) {
    let url = super.getUrl(baseUrl);
    return `${url}/groups/${this.groupId}`;
  }

  /**
   * @inheritdoc
   */
  configureRequest(request) {
    request = super.configureRequest(request);
    request.method = 'GET';
    return request;
  }

  /**
   * @inheritdoc
   */
  handleResponse(response) {
    return super.handleResponse(response).then((group) => new ZoteroGroup(group));
  }
}

export { GetGroupCommand };
