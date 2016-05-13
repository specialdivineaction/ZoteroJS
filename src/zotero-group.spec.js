import { ZoteroGroup } from './zotero-group';

describe('ZoteroGroup', function () {
  const TEST_DTO = {
    id: 498909,
    version: 2,
    links: {
      self: {
        href: 'https://api.zotero.org/groups/498909',
        type: 'application/json'
      },
      alternate: {
        href: 'https://www.zotero.org/groups/zotj_unittests',
        type: 'text/html'
      }
    },
    meta: {
      created: '2016-03-15T19:01:24Z',
      lastModified: '2016-03-15T19:02:29Z',
      numItems: 0
    },
    data: {
      id: 498909,
      version: 2,
      name: 'ZotJ UnitTests',
      owner: 2536190,
      type: 'PublicClosed',
      description: '<p>This group contains a crafted bibliography designed for use in unit testing the ZoteroJ Java SDK.</p>',
      url: '',
      libraryEditing: 'members',
      libraryReading: 'all',
      fileEditing: 'members'
    }
  };

  it('should populate fields correctly', function () {
    let group = new ZoteroGroup(TEST_DTO);
    group.id.should.equal(498909);
    group.version.should.equal(2);
    group.numItems.should.equal(0);
    let created = new Date(Date.UTC(2016, 2, 15, 19, 1, 24))
    group.created.getTime().should.equal(created.getTime());
    let modified = new Date(Date.UTC(2016, 2, 15, 19, 2, 29));
    group.modified.getTime().should.equal(modified.getTime());
    group.name.should.equal('ZotJ UnitTests');
    group.description.should.equal('<p>This group contains a crafted bibliography designed for use in unit testing the ZoteroJ Java SDK.</p>')
    group.url.should.equal('');
    group.ownerId.should.equal(2536190);
  });
});
