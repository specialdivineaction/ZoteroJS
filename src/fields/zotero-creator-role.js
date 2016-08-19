// @flow

/*:: import { ZoteroCreatorTypeDTO } from '../zotero-api';*/

/**
 * Wrapper class for a creator role
 */
class ZoteroCreatorRole {
  /*:: role: string;*/
  /*:: label: string;*/

  /**
   * @param {ZoteroCreatorTypeDTO} dto
   */
  constructor(dto/*: ZoteroCreatorTypeDTO*/) {
    /**
     * A machine identifier for this role
     * @type {string}
     */
    this.role = dto.creatorType;

    /**
    * A human-readable label for this role
    * @type {string}
    */
    this.label = dto.localized;
  }
}

export { ZoteroCreatorRole };
