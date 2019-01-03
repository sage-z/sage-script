'use strict';

import Base64 = require('./Hashes/Base64') 
import CRC32 = require('./Hashes/CRC32') 
import MD5 = require('./Hashes/MD5') 
import SHA1 = require('./Hashes/SHA1') 
import SHA256 = require('./Hashes/SHA256') 
import SHA512 = require('./Hashes/SHA512') 


import env = require('./is/env') 
// import type = require('./is/type') 
import business = require('./is/business') 
import random = require('./random')
import Str = require('./patch/String')
import Obj = require('./patch/Object')
import qs = require('./qs')
import Event = require('./Event')
import flieList = require('./flieList')

const tools = {
    Base64,
    CRC32,
    MD5,
    SHA1,
    SHA256,
    SHA512,
    ...env,
    // ...type,
    ...business,
    ...random,
    ...Obj,
    ...Str,
    qs,
    flieList,
    Event
}

export = tools