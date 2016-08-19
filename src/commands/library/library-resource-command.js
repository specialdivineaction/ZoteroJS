// @flow

import { ResourceCommand } from '../resource-command';

/*:: import { ZoteroLibrary } from '../../zotero-library';*/

/**
 * Base class for querying resources from within a library
 * @extends ResourceCommand
 */
class LibraryResourceCommand extends ResourceCommand {
  /*:: library: ZoteroLibrary;*/

  /**
   * @param {ZoteroLibrary} library
   */
  constructor(library/*: ZoteroLibrary*/) {
    if (!library) {
      throw new Error('No library provided');
    }

    super(library.account);

    /** @type {ZoteroLibrary} */
    this.library = library;
  }

  /**
   * @inheritdoc
   */
  getUrl(baseUrl/*: string*/)/*: string*/ {
    let url = super.getUrl(baseUrl);
    let typePath = this.library.type === 'user' ? 'users' : 'groups';
    return `${url}/${typePath}/${this.library.id}`;
  }
}

export { LibraryResourceCommand };
