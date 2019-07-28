var Airtable = require('airtable');
var base = new Airtable({apiKey: 'keyxjWTbfhVKdNIva'}).base('appYgCzT4je4lJQUb');

base('TestTable').find('recsu46A9fikEkEiq', function(err, record) {
   let id = record.id
    if (err) { console.error(err); return; }
    console.log('Retrieved', typeof(id));
});