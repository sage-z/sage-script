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
  .option('-v --version', 'get version')
  .option('-s --silent', 'hide all messages', false)
  .option('-m --mini-list', 'display a compacted list without formatting')
  .option('-f --force', 'force actions')
  .option('--disable-logs', 'do not write logs')
  .option('-n --name <name>', 'set a <name> for script')
  .option('-i --instances <number>', 'launch [number] instances (for networked app)(load balanced)')
  .option('--parallel <number>', 'number of parallel actions (for restart/reload)')
  .option('-l --log [path]', 'specify entire log file (error and out are both included)')
  .option('-o --output <path>', 'specify out log file')
  .option('-e --error <path>', 'specify error log file')
  .option('-p --pid <pid>', 'specify pid file')
  .option('-k --kill-timeout <delay>', 'delay before sending final SIGKILL signal to process')
  .option('--listen-timeout <delay>', 'listen timeout on application reload')
  .option('--max-memory-restart <memory>', 'specify max memory amount used to autorestart (in octet or use syntax like 100M)')
  .option('--restart-delay <delay>', 'specify a delay between restarts (in milliseconds)')
  .option('--env <environment_name>', 'specify environment to get specific env variables (for JSON declaration)')
  .option('--log-type <type>', 'specify log output style (raw by default, json optional)')
  .option('-x --execute-command', 'execute a program using fork system')
  .option('--max-restarts [count]', 'only restart the script COUNT times')
  .option('-u --user <username>', 'define user when generating startup script')
  .option('--uid <uid>', 'run target script with <uid> rights')
  .option('--gid <gid>', 'run target script with <gid> rights')
  .option('--cwd <path>', 'run target script as <username>')
  .option('--hp <home path>', 'define home path when generating startup script')
  .option('--service-name <name>', 'define service name when generating startup script')
  .option('-c --cron <cron_pattern>', 'restart a running process based on a cron pattern')
  .option('-w --write', 'write configuration in local folder')
  .option('--interpreter-args <arguments>', 'interpret options (alias of --node-args)')
  .option('--log-date-format <date format>', 'add custom prefix timestamp to logs')
  .option('-a --update-env', 'update environment on restart/reload (-a <=> apply)')
  .option('--source-map-support', 'force source map support')
  .option('--only <application-name>', 'with json declaration, allow to only act on one application')
  .option('--disable-source-map-support', 'force source map support')
  .option('--merge-logs', 'merge logs from different instances but keep error and out separated')
  .option('--watch [paths]', 'watch application folder for changes', function(v, m) { m.push(v); return m;}, [])
  .option('--ignore-watch <folders|files>', 'folder/files to be ignored watching, should be a specific name or regex - e.g. --ignore-watch="test node_modules \"some scripts\""')
  .option('--node-args <node_args>', 'space delimited arguments to pass to node in cluster mode - e.g. --node-args="--debug=7001 --trace-deprecation"')
  .option('--no-color', 'skip colors')
  .option('--no-vizion', 'start an app without vizion feature (versioning control)')
  .option('--no-autorestart', 'start an app without automatic restart')
  .option('--no-treekill', 'Only kill the main process, not detached children')
  .option('--no-pmx', 'start an app without pmx')
  .option('--no-automation', 'start an app without pmx')
  .option('--trace', 'enable transaction tracing with km')
  .option('--disable-trace', 'disable transaction tracing with km')
  .option('--attach', 'attach logging after your start/restart/stop/reload')
  .option('--sort <field_name:sort>', 'sort process according to field\'s name')
  .option('--v8', 'enable v8 data collecting')
  .option('--event-loop-inspector', 'enable event-loop-inspector dump in pmx')
  .option('--deep-monitoring', 'enable all monitoring tools (equivalent to --v8 --event-loop-inspector --trace)')
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
  // Function checks if --no-daemon option is present,
  // and starts daemon in the same process if it does not exists
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
// Helper function to fail when unknown command arguments are passed
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

/**
 * Module specifics
 */
commander.command('install [module|git:// url|json]')
  .alias('module:install')
  .option('--v1', 'install module in v1 manner (do not use it)')
  .option('--safe [time]', 'keep module backup, if new module fail = restore with previous')
  .description('install or update a module (or a set of modules) and run it forever')
  .action(function(plugin_name, opts) {
    if (opts.v1)
      commander.v1 = true;
    if (opts.safe)
      commander.safe = opts.safe;
  });

commander.command('uninstall <module>')
  .alias('module:uninstall')
  .description('stop and uninstall a module')
  .action(function(plugin_name) {
  });


commander.command('publish')
  .alias('module:publish')
  .description('Publish the module you are currently on')
  .action(function() {
  });

commander.command('set [key] [value]')
  .description('sets the specified config <key> <value>')
  .action(function(key, value) {
  });

commander.command('get [key]')
  .description('get value for <key>')
  .action(function(key) {
  });

commander.command('conf [key] [value]')
  .description('get / set module config values')
  .action(function(key, value) {
  });

commander.command('config <key> [value]')
  .description('get / set module config values')
  .action(function(key, value) {
  });

commander.command('unset <key>')
  .description('clears the specified config <key>')
  .action(function(key) {
  });

//
// Keymetrics CLI integratio
//
commander.command('link [secret] [public] [name]')
  .alias('interact')
  .option('--info-node [url]', 'set url info node')
  .description('linking action to keymetrics.io - command can be stop|info|delete|restart')
  .action(function() {
    
  });

commander.command('unlink')
  .description('linking action to keymetrics.io - command can be stop|info|delete|restart')
  .action(function() {
    
  });


commander.command('open')
  .description('open dashboard in browser')
  .action(function(name) {
  });

commander.command('register')
  .description('create an account on keymetrics')
  .action(function(name) {
  });

commander.command('login')
  .description('login to keymetrics and link current PM2')
  .action(function(name) {
  });

//
// Web interface
//
commander.command('web')
  .description('launch a health API on ' + cst.WEB_IPADDR + ':' + cst.WEB_PORT)
  .action(function() {
    console.log('Launching web interface on ' + cst.WEB_IPADDR + ':' + cst.WEB_PORT);

  });

//
// Save processes to file
//
commander.command('dump')
  .alias('save')
  .description('dump all processes for resurrecting them later')
  .action(failOnUnknown(function() {
    
  }));

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
    // Check if it does not forget to close fds from RPC
    process.exit(cst.ERROR_EXIT);
  });

//
// 如果没有参数，则显示帮助
//
if (process.argv.length == 2) {
  commander.parse(process.argv);
  commander.outputHelp();
  // Check if it does not forget to close fds from RPC
  process.exit(cst.ERROR_EXIT);
}