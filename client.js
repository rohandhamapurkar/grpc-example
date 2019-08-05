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

function main() {
    var client = new calculator.CalculatorService(
        'localhost:50051',
        grpc.credentials.createInsecure()
    );
    let a = Math.round(Math.random() * 10);
    let b = Math.round(Math.random() * 100);

    let argument = { num1: a, num2: b}
    console.log("Input: ",argument)
    client.multiply(argument, function (err, response) {
        if (err) return console.error(err);
        console.log('Multiplication result: ', response.result);
    });
}

main();