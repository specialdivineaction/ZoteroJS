import { ResourceCommand } from './resource-command';
import { ZoteroGroup } from '../zotero-group';

/**
 * Retrieves all groups of whom this account is a member
 * @extends ResourceCommand
 */
class GetGroupsCommand extends ResourceCommand {
  /**
   * @param {ZoteroAccount} account
   */
  constructor(account) {
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
  getUrl(baseUrl) {
    let url = super.getUrl(baseUrl);
    return `${url}/users/${this.userId}/groups`;
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
    return super.handleResponse(response).then((groups) => groups.map((group) => new ZoteroGroup(group)));
  }
}

export { GetGroupsCommand };
