import { ZoteroLibrary } from './zotero-library';
import { GetGroupCommand } from './commands/get-group';
import { GetGroupsCommand } from './commands/get-groups';

class ZoteroAccount {
  /**
   * @param {string} id the unique identifier for this account
   * @param {string} token API authorization token for this account
   * @param {ZoteroExecutor} executor executor service for performing commands
   */
  constructor(id, token, executor) {
    this.id = id;
    this.authToken = token;
    this.executor = executor;
  }

  /**
   * @return {ZoteroLibrary} The default library for this account.
   */
  getUserLibrary() {
    return new ZoteroLibrary(this);
  }

  /**
   * @return {Promise.<ZoteroGroup[]>} All groups to whom this account is a member
   */
  getGroups() {
    let command = new GetGroupsCommand(this);
    return command.execute();
  }

  /**
   * Fetch a group by ID
   * @return {Promise.<ZoteroGroup>}
   */
  getGroup(id) {
    let command = new GetGroupCommand(this, id);
    return command.execute();
  }

  /**
   * @param  {ZoteroGroup} group
   * @return {ZoteroLibrary} The library associated with the given group.
   */
  getLibrary(group) {
    return new ZoteroLibrary(this, group);
  }

  /**
   * Authenticates the given request configuration with the stored athorization token (if available)
   * @param  {object} request
   * @return {object} Updated request configuration
   */
  authenticate(request) {
    if (this.authToken) {
      // HACK Zotero server doesn't handle HTTP headers properly; send as query params instead
      // request.headers['Authorization'] = `Bearer ${this.authToken}`;
      request.query['key'] = this.authToken;
    }

    return request;
  }
}

export { ZoteroAccount };
