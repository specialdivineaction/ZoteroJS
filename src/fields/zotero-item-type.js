// @flow

import { GetItemCreatorRolesCommand } from '../commands/fields/get-item-creator-roles';
import { GetItemFieldsCommand } from '../commands/fields/get-item-fields';
import { GetItemTemplateCommand } from '../commands/fields/get-item-template';

/*:: import { ZoteroItemField } from './zotero-item-field';*/
/*:: import { ZoteroCreatorRole } from './zotero-creator-role';*/
/*:: import { ZoteroAccount } from '../zotero-account';*/
/*:: import { ZoteroExecutor } from '../zotero-executor';*/
/*:: import { ZoteroItemTypeDTO } from '../zotero-api';*/

/**
 * Wrapper class for an item type id and label.
 */
class ZoteroItemType {
  /*:: account: ZoteroAccount;*/
  /*:: executor: ZoteroExecutor;*/
  /*:: id: string;*/
  /*:: label: string;*/

  /**
   * @param {ZoteroAccount} account
   * @param {ZoteroExecutor} executor
   * @param {ZoteroItemTypeDTO} dto
   */
  constructor(account/*: ZoteroAccount*/, executor/*: ZoteroExecutor*/, dto/*: ZoteroItemTypeDTO*/) {
    this.account = account;
    this.executor = executor;

    /**
     * An identifier for this item type
     * @type {string}
     */
    this.id = dto.itemType;

    /**
     * A human-readable label for this item type
     * @type {string}
     */
    this.label = dto.localized;
  }

  /**
   * Retrieves a list of available data fields for this item type.
   * @return Promise.<ZoteroItemField[]>
   */
  getFields()/*: Promise<ZoteroItemField[]>*/ {
    let command = new GetItemFieldsCommand(this.account, this);
    return this.executor.submit(command);
  }

  /**
   * Retrieves a template object for this item type.
   * @deprecated This seems like a poor API decision and is only supported since it is available.
   * @return {Promise.<object>}
   */
  getTemplate()/*: Promise<Object>*/ {
    let command = new GetItemTemplateCommand(this.account, this);
    return this.executor.submit(command);
  }

  /**
   * Retrieves a list of available creator roles for this item type
   * @return Promise.<ZoteroCreatorRole[]>
   */
  getCreatorRoles()/*: Promise<ZoteroCreatorRole[]>*/ {
    let command = new GetItemCreatorRolesCommand(this.account, this);
    return this.executor.submit(command);
  }
}

export { ZoteroItemType };
