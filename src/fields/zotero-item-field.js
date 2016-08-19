// @flow

/*:: import { ZoteroItemFieldDTO } from '../zotero-api';*/

/**
 * Wrapper class for an item field name and label.
 */
class ZoteroItemField {
  /*:: id: string;*/
  /*:: label: string;*/

  /**
   * @param {ZoteroItemFieldDTO} dto
   */
  constructor(dto/*: ZoteroItemFieldDTO*/) {
    /**
     * A machine identifier for this field.
     * @type {string}
     */
    this.id = dto.field;

    /**
    * A human-readable label for this field.
    * @type {string}
    */
    this.label = dto.localized;
  }
}

export { ZoteroItemField };
