import { ZoteroItem } from './zotero-item';
import { ZoteroCollection } from './zotero-collection';
import { ZoteroLibrary } from './zotero-library';
import ZoteroClient from './index';

describe('ZoteroLibrary', function () {
  const client = new ZoteroClient();

  describe('(authenticated user)', function () {
    const accountId = '2536190';
    const authToken = 'kQjCccDZF3GIJigH3c7i5TXe';
    const account = client.getUserAccount(accountId, authToken);

    describe('user library', function () {
      it('should populate fields correctly', function () {
        let library = new ZoteroLibrary(account);
        library.type.should.equal('user');
        library.account.should.deep.equal(account);
        library.id.should.equal(accountId);

        // TODO update these when we get a version from somewhere...
        library.version.should.equal(-1);
        library.name.should.equal(`User library for ${accountId}`);
      });

      describe('#getItems', function () {
        it('should fetch a list of items', function () {
          let library = account.getUserLibrary();
          let itemsP = library.getItems();

          return itemsP.then((items) => {
            items.should.be.an('array');
            items.every((item) => item.should.be.an.instanceof(ZoteroItem));
          });
        });
      });

      describe('#getCollections', function () {
        it('should fetch a list of collections', function () {
          let library = account.getUserLibrary();
          let collectionsP = library.getCollections();

          return collectionsP.then((collections) => {
            collections.should.be.an('array');
            collections.every((collection) => collection.should.be.an.instanceof(ZoteroCollection));
          });
        });
      });
    });

    describe('group library', function () {
      let groupP = account.getGroups().then((groups) => groups[0]);
      let libraryP = groupP.then((group) => new ZoteroLibrary(account, group));

      it('should populate fields correctly', function () {
        return Promise.all([groupP, libraryP]).then((args) => {
          let [group, library] = args;
          library.type.should.equal('group');
          library.account.should.deep.equal(account);
          library.id.should.equal(group.id);
          library.version.should.equal(group.version);
        });
      });

      describe('#getItems', function () {
        it('should fetch a list of items', function () {
          let itemsP = libraryP.then((library) => library.getItems());

          return itemsP.then((items) => {
            items.should.be.an('array');
            items.every((item) => item.should.be.an.instanceof(ZoteroItem));
          });
        });
      });

      describe('#getCollections', function () {
        it('should fetch a list of collections', function () {
          let collectionsP = libraryP.then((library) => library.getCollections());

          return collectionsP.then((collections) => {
            collections.should.be.an('array');
            collections.every((collection) => collection.should.be.an.instanceof(ZoteroCollection));
          });
        });
      });
    });
  });
});
