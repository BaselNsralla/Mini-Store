var Deepstream = require( 'deepstream.io' ),
    RethinkDBStorageConnector = require( 'deepstream.io-storage-rethinkdb');

var server = new Deepstream({port:8000})

server.set( 'storage', new RethinkDBStorageConnector( {
  port: 28015,
  host: 'localhost',
  splitChar: '/'
}));


server.start()
