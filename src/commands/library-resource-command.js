import { ResourceCommand } from './resource-command';

/**
 * Base class for querying resources from within a library
 * @extends ResourceCommand
 */
class LibraryResourceCommand extends ResourceCommand {
  /**
   * @param {ZoteroLibrary} library
   */
  constructor(library) {
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
  getUrl(baseUrl) {
    let url = super.getUrl(baseUrl);
    let typePath = this.library.type === 'user' ? 'users' : 'groups';
    return `${url}/${typePath}/${this.library.id}`;
  }
}

export { LibraryResourceCommand };
