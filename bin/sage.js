#!/usr/bin/env node
'use strict';

var semver = require('semver');

if (semver.satisfies(process.versions.node, '>= 5.7.0'))
  require('v8-compile-cache');

process.env.PM2_USAGE = 'CLI';

var cst       = require('../constants.js');

var commander = require('commander');
var chalk     = require('chalk');
var async     = require('async');

var debug     = require('debug')('pm2:cli');
var pkg       = require('../package.json');

// Early detection of silent to avoid printing motd
if (process.argv.indexOf('--silent') > -1 ||
    process.argv.indexOf('-s') > -1) {
  process.env.PM2_DISCRETE_MODE = true;
}

if (process.argv.indexOf('-v') > -1) {
  console.log(pkg.version);
  process.exit(0);
}

commander.version(pkg.version)
  .option('-v --version', '获取版本号')
  .option('-n --name <name>', 'set a <name> for script')
  .option('-l --log [path]', 'specify entire log file (error and out are both included)')
  .option('-o --output <path>', 'specify out log file')
  .option('-e --error <path>', 'specify error log file')
  .option('-p --pid <pid>', 'specify pid file')
  .option('-k --kill-timeout <delay>', 'delay before sending final SIGKILL signal to process')
  .option('--env <environment_name>', 'specify environment to get specific env variables (for JSON declaration)')
  .option('-u --user <username>', 'define user when generating startup script')
  .option('--uid <uid>', 'run target script with <uid> rights')
  .option('--gid <gid>', 'run target script with <gid> rights')
  .option('--cwd <path>', 'run target script as <username>')
  .option('-c --cron <cron_pattern>', 'restart a running process based on a cron pattern')
  .option('--watch [paths]', 'watch application folder for changes', function(v, m) { m.push(v); return m;}, [])
  .usage('[cmd] app');

commander.on('--help', function() {
  console.log('  Basic Examples:');
  console.log('');
  console.log('    Start an app using all CPUs available + set a name :');
  console.log('');
  console.log('');
});

if (process.argv.indexOf('-s') > -1) {
  for(var key in console){
    var code = key.charCodeAt(0);
    if(code >= 97 && code <= 122){
      console[key] = function(){};
    }
  }
}

var _arr = process.argv.indexOf('--') > -1 ? process.argv.slice(0, process.argv.indexOf('--')) : process.argv;

if (_arr.indexOf('log') > -1) {
  process.argv[_arr.indexOf('log')] = 'logs';
}

if (_arr.indexOf('--no-daemon') > -1) {
  //
  // Start daemon if it does not exist
  //
  // 检查是否有 --no-daemon 选项,
  // 如果守护进程不存在，则在同一进程中启动它
  //
  console.log('pm2 launched in no-daemon mode (you can add DEBUG="*" env variable to get more messages)');

}
else if (_arr.indexOf('startup') > -1 || _arr.indexOf('unstartup') > -1) {
  setTimeout(function() {
    commander.parse(process.argv);
  }, 100);
}
else {

}

//
// 传递未知命令参数时，Helper函数失败
//
function failOnUnknown(fn) {
  return function(arg) {
    if (arguments.length > 1) {
      console.log(cst.PREFIX_MSG + '\nUnknown command argument: ' + arg);
      commander.outputHelp();
      process.exit(cst.ERROR_EXIT);
    }
    return fn.apply(this, arguments);
  };
}

/**
 * @todo to remove at some point once it's fixed in official commander.js
 * https://github.com/tj/commander.js/issues/475
 *
 * Patch Commander.js Variadic feature
 */
function patchCommanderArg(cmd) {
  var argsIndex;
  if ((argsIndex = commander.rawArgs.indexOf('--')) >= 0) {
    var optargs = commander.rawArgs.slice(argsIndex + 1);
    cmd = cmd.slice(0, cmd.indexOf(optargs[0]));
  }
  return cmd;
}

//
// Start command
//
commander.command('start <file|json|stdin|app_name|pm_id...>')
  .option('--watch', 'Watch folder for changes')
  .option('--fresh', 'Rebuild Dockerfile')
  .option('--daemon', 'Run container in Daemon mode (debug purposes)')
  .option('--container', 'Start application in container mode')
  .option('--dist', 'with --container; change local Dockerfile to containerize all files in current directory')
  .option('--image-name [name]', 'with --dist; set the exported image name')
  .option('--node-version [major]', 'with --container, set a specific major Node.js version')
  .option('--dockerdaemon', 'for debugging purpose')
  .description('start and daemonize an app')
  .action(function(cmd, opts) {
    console.log('asdf')
  });

commander.command('trigger <proc_name> <action_name> [params]')
  .description('deploy your json')
  .action(function(pm_id, action_name, params) {
    pm2.trigger(pm_id, action_name, params);
  });

//
// Stop specific id
//
commander.command('stop <id|name|all|json|stdin...>')
  .option('--watch', 'Stop watching folder for changes')
  .description('stop a process (to start it again, do pm2 restart <app>)')
  .action(function(param) {
    async.forEachLimit(param, 1, function(script, next) {
      pm2.stop(script, next);
    }, function(err) {
      pm2.speedList(err ? 1 : 0);
    });
  });



commander.command('id <name>')
  .description('get process id by name')
  .action(function(name) {
    pm2.getProcessIdByName(name);
  });

//
// Stop and delete a process by name from database
//
commander.command('delete <name|id|script|all|json|stdin...>')
  .description('stop and delete a process from pm2 process list')
  .action(function(name) {
    if (name == "-") {
      process.stdin.resume();
      process.stdin.setEncoding('utf8');
      process.stdin.on('data', function (param) {
        process.stdin.pause();
        pm2.delete(param, 'pipe');
      });
    } else
      async.forEachLimit(name, 1, function(script, next) {
        pm2.delete(script,'', next);
      }, function(err) {
        pm2.speedList(err ? 1 : 0);
      });
  });


// Stop and delete a process by name from database
//
commander.command('ping')
  .description('ping pm2 daemon - if not up it will launch it')
  .action(function() {
    pm2.ping();
  });

commander.command('update')
  .description('(alias) update in-memory PM2 with local PM2')
  .action(function() {
    pm2.update();
  });

//
// Save processes to file
//
commander.command('send <pm_id> <line>')
  .description('send stdin to <pm_id>')
  .action(function(pm_id, line) {
  });

commander.command('desc <id>')
  .description('(alias) describe all parameters of a process id')
  .action(function(proc_id) {
  });

commander.command('info <id>')
  .description('(alias) describe all parameters of a process id')
  .action(function(proc_id) {
  });

commander.command('show <id>')
  .description('(alias) describe all parameters of a process id')
  .action(function(proc_id) {
  });

//
// List command
//

commander.command('list')
  .alias('ls')
  .description('list all processes')
  .action(function() {
    
  });

commander.command('status')
  .description('(alias) list all processes')
  .action(function() {
    
  });

//
// Log streaming
//
commander.command('logs [id|name]')
  .option('--json', 'json log output')
  .option('--format', 'formated log output')
  .option('--raw', 'raw output')
  .option('--err', 'only shows error output')
  .option('--out', 'only shows standard output')
  .option('--lines <n>', 'output the last N lines, instead of the last 15 by default')
  .option('--timestamp [format]', 'add timestamps (default format YYYY-MM-DD-HH:mm:ss)')
  .option('--nostream', 'print logs without lauching the log stream')
  .description('stream logs file. Default stream all logs')
  .action(function(id, cmd) {
    var Logs = require('../lib/API/Log.js');

    if (!id) id = 'all';

    var line = 15;
    var raw  = false;
    var exclusive = false;
    var timestamp = false;

    if(!isNaN(parseInt(cmd.lines))) {
      line = parseInt(cmd.lines);
    }

    if (cmd.parent.rawArgs.indexOf('--raw') !== -1)
      raw = true;

    if (cmd.timestamp)
      timestamp = typeof cmd.timestamp === 'string' ? cmd.timestamp : 'YYYY-MM-DD-HH:mm:ss';

    if (cmd.out === true)
      exclusive = 'out';

    if (cmd.err === true)
      exclusive = 'err';

  });


//
// Kill
//
commander.command('kill')
  .description('kill daemon')
  .action(failOnUnknown(function(arg) {

  }));

//
// Update repository for a given app
//

commander.command('pull <name> [commit_id]')
  .description('updates repository for a given app')
  .action(function(pm2_name, commit_id) {


  });

//
// Update repository to the next commit for a given app
//
commander.command('forward <name>')
  .description('updates repository to the next commit for a given app')
  .action(function(pm2_name) {

  });


//
// Catch all
//
commander.command('*')
  .action(function() {
    console.log(cst.PREFIX_MSG + '\nCommand not found');
    commander.outputHelp();
    // 检查是否忘记关闭RPC的fds
    process.exit(cst.ERROR_EXIT);
  });

//
// 如果没有参数，则显示帮助
//
if (process.argv.length == 2) {
  commander.parse(process.argv);
  commander.outputHelp();
  // 检查是否忘记关闭RPC的fds
  process.exit(cst.ERROR_EXIT);
}