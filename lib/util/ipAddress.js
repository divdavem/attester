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

var os = require('os');

var defaultAddresses = {
    'IPv6': '::1',
    'IPv4': '127.0.0.1'
};

module.exports = function (addressFamily) {
    var networkInterfaces = os.networkInterfaces();
    for (var networkName in networkInterfaces) {
        var addresses = networkInterfaces[networkName];
        for (var i = 0, l = addresses.length; i < l; i++) {
            var curAddress = addresses[i];
            if (curAddress.family == addressFamily && !curAddress.internal) {
                return curAddress.address;
            }
        }
    }
    return defaultAddresses[addressFamily];
};