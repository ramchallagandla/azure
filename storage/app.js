var Tablestorage = require('./src/tablestorage');
var utils = require('./src/utility');

var tblStorage = new Tablestorage("rchazurestorage", "Ayerxl78bvIyxcPLKrMnxOfxPQMlQsF7ONttzKNC9rXyFcgWSl3MybkJ/LUz1tzF3SrIsd05bHblEx5+Gy5YLw==", 'person');
tblStorage.top(100);

//tblStorage.createTable('person');



// tblStorage.insertOrMergePerson({
//     PartitionKey: {'_':'personRam'},
//     RowKey: {'_': '1'},
//     firstName: 'Ram',
//     lastName: 'Challagandla',
//     middleName: 'B',
//     email: 'test@outlook.com'
// });