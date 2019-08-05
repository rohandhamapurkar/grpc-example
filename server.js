var PROTO_PATH = __dirname + '/calculator.proto';

var grpc = require('grpc');
var protoLoader = require('@grpc/proto-loader');
var packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true
    });
var calculator = grpc.loadPackageDefinition(packageDefinition).calculator;

function multiply(call, callback) {
    let multiplicationResult = call.request.num1 * call.request.num2;
    callback(
        null,
        { result: multiplicationResult }
    );
}

/*
Starts an RPC server that receives requests for the Calculator service
*/
function main() {
    var server = new grpc.Server();
    server.addService(
        calculator.CalculatorService.service,
        { multiply: multiply }
    );
    server.bind(
        '0.0.0.0:50051',
        grpc.ServerCredentials.createInsecure()
    );
    server.start();
}

main();