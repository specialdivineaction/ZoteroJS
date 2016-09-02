// @flow
import { ZoteroLibrary } from './zotero-library';
/*:: import { ZoteroExecutor } from './zotero-executor';*/
/*:: import { ZoteroGroup } from './zotero-group';*/
import { GetGroupCommand } from './commands/get-group';
import { GetGroupsCommand } from './commands/get-groups';

class ZoteroAccount {
  /*:: id: string;*/
  /*:: authToken: ?string;*/
  /*:: executor: ZoteroExecutor;*/

  /**
   * @param id the unique identifier for this account
   * @param token API authorization token for this account
   * @param executor executor service for performing commands
   */
  constructor(id/*: string*/, token/*: ?string*/, executor/*: ZoteroExecutor*/) {
    this.id = id;
    this.authToken = token;
    this.executor = executor;
  }

  /**
   * @return {ZoteroLibrary} The default library for this account.
   */
  getUserLibrary()/*: ZoteroLibrary*/ {
    return new ZoteroLibrary(this);
  }

  /**
   * @return {Promise.<ZoteroGroup[]>} All groups to whom this account is a member
   */
  getGroups()/*: Promise<ZoteroGroup[]>*/ {
    let command = new GetGroupsCommand(this);
    return command.execute();
  }

  /**
   * Fetch a group by ID
   * @return {Promise.<ZoteroGroup>}
   */
  getGroup(id/*: string*/)/*: Promise<ZoteroGroup>*/ {
    let command = new GetGroupCommand(this, id);
    return command.execute();
  }

  /**
   * @param  {ZoteroGroup} group
   * @return {ZoteroLibrary} The library associated with the given group.
   */
  getLibrary(group/*: ZoteroGroup*/)/*: ZoteroLibrary*/ {
    return new ZoteroLibrary(this, group);
  }

  /**
   * Authenticates the given request configuration with the stored athorization token (if available)
   * @param  {object} request
   * @return {object} Updated request configuration
   */
  authenticate(request/*: Object*/)/*: Object*/ {
    if (this.authToken) {
      // HACK Zotero server doesn't handle HTTP headers properly; send as query params instead
      // request.headers['Authorization'] = `Bearer ${this.authToken}`;
      request.query.key = this.authToken;
    }

    return request;
  }
}

export { ZoteroAccount };
