var azure = require('azure-storage');
var utils = require('./utility')
var Storage = require('./storage');

class TableStorage extends Storage {

  constructor(accountname, accesskey, tableName) {
    super(accountname, accesskey);
    this.tableName = tableName;
  }

  get tableSvc() {
    var retryOperations = new azure.ExponentialRetryPolicyFilter();
    return azure.createTableService(this.accountName, this.accessKey).withFilter(retryOperations);
  }

  createTable() {
    this.tableSvc.createTableIfNotExists(this.tableName, function (error, result, response) {
      if (!error) {
        utils.print(`Table: ${result.TableName} created ${result.created}`);
      }
      else {
        utils.print(error);

      }
    });
  }

  insertOrMergeEntity(person) {
    this.tableSvc.insertOrMergeEntity(this.tableName, person, function (error, result, response) {
      if (!error) {
        utils.print(`Entity inserted successuflly. ETag: ${result['.metadata'].etag}`)
      }
      else {
        utils.print(error);
      }
    });
  }

  insertEntities(entities) {
    let batch = new azure.TableBatch();
    entities.forEach((entity) => batch.insertOrReplaceEntity(entity, { echoContent: true }));

    this.tableSvc.executeBatch(this.tableName, batch, (error, result, response) => {
      if (!error) {
        utils.print(`Entity inserted successuflly. ${JSON.stringify(response.body.value)}`);
      }
      else {
        utils.print(JSON.stringify(error));
      }
    });
  }

  top(rows) {
    let query = new azure.TableQuery()
      .select()
      .top(rows);

    this.tableSvc.queryEntities(this.tableName, query, null, (error, result, response) => {
        if (!error) {
          utils.print(`Data: ${JSON.stringify(response.body.value)}`);
        }
        else {
          utils.print(JSON.stringify(error));
        }
      });
    
  }
}


module.exports = TableStorage;