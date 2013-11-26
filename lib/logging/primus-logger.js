/*
 * Copyright 2012 Amadeus s.a.s.
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

var Logger = require('./logger.js');

var levels = {
    'debug': Logger.LEVEL_DEBUG,
    'info': Logger.LEVEL_INFO,
    'warn': Logger.LEVEL_WARN,
    'error': Logger.LEVEL_ERROR
};

module.exports = function (name, instanceId, parent) {
    var logger = new Logger(name, instanceId, parent);
    return function (levelString, msg) {
        var logLevel = levels.hasOwnProperty(levelString) ? levels[levelString] : "info";
        logger.log(logLevel, msg);
    };
};