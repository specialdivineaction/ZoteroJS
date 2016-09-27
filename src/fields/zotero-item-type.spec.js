import { ZoteroClient } from '../zotero-client';
import { ZoteroCreatorRole } from './zotero-creator-role';
import { ZoteroItemType } from './zotero-item-type';
import { ZoteroItemField } from './zotero-item-field';
import { expect } from 'chai';

describe('ZoteroItemType', function () {
  const client = new ZoteroClient();
  const account = client.getAnonymousAccount();
  const itemType = new ZoteroItemType(account, client.executor, {
    itemType: 'book',
    localized: 'Book'
  });

  this.timeout(4000);

  describe('#getFields', function () {
    it('should get a list of fields for the item', function () {
      let fieldsP = itemType.getFields();
      expect(fieldsP).to.be.ok;
      return fieldsP.then(fields => {
        fields.should.be.an('array');
        fields.should.not.be.empty;
        fields.every(field => field.should.be.an.instanceof(ZoteroItemField));
      });
    });
  });

  describe('#getTemplate', function () {
    it('should get a template object for the item', function () {
      let templateP = itemType.getTemplate();
      expect(templateP).to.be.ok;
      return templateP.then(template => {
        template.should.be.ok;
        template.should.contain.all.keys([
          'creators',
          'title',
          'edition',
          'volume',
          'series'
        ]);
      });
    });
  });

  describe('#getCreatorRoles', function () {
    it('should get a list of roles for the item', function () {
      let rolesP = itemType.getCreatorRoles();
      expect(rolesP).to.be.ok;
      return rolesP.then(roles => {
        roles.should.be.an('array');
        roles.should.not.be.empty;
        roles.every(role => role.should.be.an.instanceof(ZoteroCreatorRole));
      });
    });
  });

});
