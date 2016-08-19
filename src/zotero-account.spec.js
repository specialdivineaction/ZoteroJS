import { ZoteroClient } from './zotero-client';
import { ZoteroLibrary } from './zotero-library';
import { ZoteroItem } from './zotero-item';
import { ZoteroGroup } from './zotero-group';

describe('ZoteroAccount', function () {
  const client = new ZoteroClient();

  this.timeout(4000);

  describe('(anonymous)', function () {
    // TODO what can we do with an anonymous account?
    // const account = client.getAnonymousAccount();
  });

  describe('(unauthenticated)', function () {
    const accountId = '475425';
    const account = client.getUnauthenticatedAccount(accountId);

    describe('#getUserLibrary', function () {
      it ('should produce a library', function () {
        let library = account.getUserLibrary();
        library.should.be.ok;
        library.should.be.an.instanceof(ZoteroLibrary);
      });
    });

    it('should get library collections', function () {
      let library = account.getUserLibrary();
      let collectionP = library.getCollection('9KH9TNSJ');

      return collectionP.then((collection) => {
        collection.id.should.equal('9KH9TNSJ');
      });
    });
  });

  describe('(authenticated)', function () {
    const accountId = '2536190';
    const authToken = 'kQjCccDZF3GIJigH3c7i5TXe';
    const account = client.getUserAccount(accountId, authToken);

    describe('#getItems', function () {
      it('should get user library items', function () {
        let library = account.getUserLibrary();
        let itemsP = library.getItems();
        return itemsP.then((items) => {
          items.should.be.an('array');
          items.every((item) => item.should.be.an.instanceof(ZoteroItem));
        });
      });
    });

    describe('#getGroups', function () {
      it('should get user groups', function () {
        let groupsP = account.getGroups();
        return groupsP.then((groups) => {
          groups.should.be.an('array');
          // future tests depend on these groups
          groups.should.not.be.empty;
          groups.every((group) => group.should.be.an.instanceof(ZoteroGroup));
        });
      });
    });

    describe('#getGroup', function () {
      it('should get a user group by id', function () {
        const groupId = 498909;
        let groupP = account.getGroup(groupId);
        return groupP.then((group) => {
          group.should.be.an.instanceof(ZoteroGroup);
          group.id.should.equal(groupId);
        });
      });
    });

    describe('#getLibrary', function () {
      it('should return the user library if no group is provided', function () {
        let library = account.getLibrary();
        library.should.be.an.instanceof(ZoteroLibrary);
        library.type.should.equal('user');
      });

      it('should return a group library', function () {
        let groupP = account.getGroup(498909);
        return groupP.then((group) => {
          let library = account.getLibrary(group);
          library.should.be.an.instanceof(ZoteroLibrary);
          library.type.should.equal('group');
          library.id.should.equal(group.id);
        });
      });
    });
  });
});
