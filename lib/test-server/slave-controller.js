/*
 * Copyright 2015 Amadeus s.a.s.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var util = require("util");
var events = require("events");
var crypto = require("crypto");
var url = require("url");
var number = 0;

var SlaveController = function () {
    number++;
    this.id = number + "-" + new Buffer(crypto.pseudoRandomBytes(8)).toString("hex");
    this.slave = null;
};

util.inherits(SlaveController, events.EventEmitter);

SlaveController.prototype.getURL = function (slaveURL) {
    var parsedUrl = url.parse(slaveURL, true);
    delete parsedUrl.search;
    parsedUrl.query.controller = this.id;
    return url.format(parsedUrl);
};

SlaveController.prototype.attach = function (slave) {
    console.log("controller "+ this.id+" attached to slave " + slave.toString());
    if (this.slave) {
        // this controller was already attached to a slave, let's disconnect the
        // previous one
        console.log("disconnecting previous slave from controller "+ this.id+": " + this.slave.toString());
        this.slave.disconnect(); // FIXME: check that this does everything we expect (removing the slave from arrays... not loosing current task)
    }
    slave.controller = this;
    this.slave = slave;
};

SlaveController.prototype.stopWaiting = function () {
    this.emit('stop-waiting');
}

module.exports = SlaveController;
