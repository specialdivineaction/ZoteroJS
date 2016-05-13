import { GetItemCommand } from './commands/get-item';
import { GetLibraryItemsCommand } from './commands/get-library-items';
import { GetCollectionCommand } from './commands/get-collection';
import { GetCollectionsCommand } from './commands/get-collections';
import { GetSubCollectionsCommand } from './commands/get-subcollections';

/**
 * Zotero items are stored in libraries, of which there are two types: user and group.
 */
class ZoteroLibrary {
  /**
   * @param  {ZoteroAccount} account
   * @param  {ZoteroGroup} group
   */
  constructor(account, group) {
    /**
     * Library type: 'user' or 'group'
     * @type {string}
     */
    this.type = group ? "group" : "user";

    /** @type {ZoteroAccount} */
    this.account = account;

    /**
     * The inherited account or group identifier for this library depending on the type
     * @type {string}
     */
    this.id = group ? group.id : account.id;

    // TODO these need to come from somewhere
    /**
     * Inherited from group or defaults to -1 if a user library
     * @type {integer}
     */
    this.version = group ? group.version : -1;

    /**
     * Inherited from group name or defaults to 'User library for ${id}' if a user library
     * @type {string}
     */
    this.name = group ? group.name : `User library for ${this.id}`;
  }

  /**
   * Retrieve all items from the Zotero Library API
   * @return {Promise.<ZoteroItem[]>}
   */
  getItems() {
    let command = new GetLibraryItemsCommand(this);
    return command.execute();
  }

  getAllItems() {
    let command = new GetLibraryItemsCommand(this, true);
    return command.execute();
  }

  /**
   * Retrieve an item by ID from the Zotero Library API
   * @param  {string} id
   * @return {Promise.<ZoteroItem>}
   */
  getItem(id) {
    let command = new GetItemCommand(this, id);
    return command.execute();
  }

  /**
   * Retrieve all collections
   * @return {Promise.<ZoteroCollection[]>}
   */
  getCollections() {
    let command = new GetCollectionsCommand(this);
    return command.execute();
  }

  /**
   * Retrieve a collection by ID from the Zotero Library API
   * @param  {string} id
   * @return {Promise.<ZoteroCollection>}
   */
  getCollection(id) {
    let command = new GetCollectionCommand(this, id);
    return command.execute();
  }

  /**
   * Retrieve sub-collections from a collection identified by the given ID
   * @param  {string} parentId
   * @return {Promise.<ZoteroCollection[]>}
   */
  getSubCollections(parentId) {
    let command = new GetSubCollectionsCommand(this, parentId);
    return command.execute();
  }

}

export { ZoteroLibrary };
