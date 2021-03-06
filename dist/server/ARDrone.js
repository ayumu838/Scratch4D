"use strict";

var _cylon = require("cylon");

var _cylon2 = _interopRequireDefault(_cylon);

var _socket = require("socket.io");

var _socket2 = _interopRequireDefault(_socket);

var _net = require("net");

var _net2 = _interopRequireDefault(_net);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_cylon2.default.api("http", {
	host: '127.0.0.1',
	port: '3001',
	ssl: false,
	auth: false
});

_cylon2.default.robot({
	name: "Scratch4D",
	connections: {
		ardrone: { adaptor: 'ardrone', port: '192.168.1.1' }
	},

	devices: {
		drone: { driver: 'ardrone' }
	},

	work: function work(my) {
		var server = _net2.default.createServer();
		var io = (0, _socket2.default)(server);
		server.listen(3003);

		io.on("connection", function (socket) {
			my.drone.on("takeoff", function (event) {
				console.log("takeoff");
				socket.emit("takeoff");
			});
			my.drone.on("landing", function (event) {
				console.log("landing");
				socket.emit("landing");
			});
			my.drone.on("landed", function (event) {
				console.log("landed");
				socket.emit("landed");
			});
			my.drone.on("hovering", function (event) {
				console.log("hovering");
				socket.emit("hovering");
			});
			my.drone.on("flying", function (event) {
				console.log("flying");
				socket.emit("flying");
			});
		});
	}
}).start();