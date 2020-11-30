'use strict';

const fs       = require('fs');
const config   = require('config');
const mongodb  = require('mongodb');
const cfg      = config.get('mongo') || {};

let bucket, client, db;

(async () => {
    client = await mongodb.MongoClient.connect(
        'mongodb://' + (cfg.user ? `${cfg.user}:${cfg.pass}@` : '') + `${cfg.host}:${cfg.port}`,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    );
    db = await client.db(config.get('mongo.database'));
    bucket = new mongodb.GridFSBucket(db, {
        bucketName: 'attachments'
    });
})().then(() => {
    console.log('[MongoDB] Connected with success.');
}).catch((err) => {
    console.log('[MongoDB] Error at connect:', err);
    if (client) {
        client.close();
    }
});

module.exports.objectId = async (id) => {
    return await new mongodb.ObjectID(id);
};

module.exports.objectIdWithTimestamp = async (timestamp) => {
    if (typeof (timestamp) === 'string') {
        timestamp = new Date(timestamp);
    }
    const hexSeconds = Math.floor(timestamp / 1000).toString(16);
    return await this.objectId(hexSeconds + '0000000000000000');
};

module.exports.find = async (collection, query, options = {}) => {
    if (config.get('debug')) {
        console.log('[DEBUG] MongoDB Find:', collection, query, options);
    }
    try {
        return await db.collection(collection).find(query, options).toArray();
    } catch (err) {
        console.error('[MongoDB] Error:', err.message);
        return null;
    }
};

module.exports.findOne = async (collection, query = {}, options = {}) => {
    if (config.get('debug')) {
        console.log('[DEBUG] MongoDB Find:', collection, query, options);
    }
    try {
        return await db.collection(collection).findOne(query, options);
    } catch (err) {
        console.error('[MongoDB] Error:', err.message);
        return null;
    }
};

module.exports.insert = async (collection, data) => {
    if (config.get('debug')) {
        console.log('[DEBUG] MongoDB Insert:', collection, data);
    }
    try {
        return await db.collection(collection).insertOne(data);
    } catch (err) {
        console.error('[MongoDB] Error:', err.message);
        return null;
    }
};

module.exports.update = async (collection, query, data) => {
    if (config.get('debug')) {
        console.log('[DEBUG] MongoDB Update:', collection, query, data);
    }
    try {
        return await db.collection(collection).updateOne(query, data);
    } catch (err) {
        console.error('[MongoDB] Error:', err.message);
        return null;
    }
};

module.exports.delete = async (collection, query) => {
    if (config.get('debug')) {
        console.log('[DEBUG] MongoDB Delete:', collection, query);
    }
    try {
        return await db.collection(collection).deleteOne(query);
    } catch (err) {
        console.error('[MongoDB] Error:', err.message);
        return null;
    }
};

module.exports.fileUpload = async (path) => {
    const readStream = fs.createReadStream(path);
    const uploadStream = await bucket.openUploadStream(path);
    uploadStream.on('error', (err) => {
        console.error('[MongoDB] Error:', err);
    });
    return await readStream.pipe(uploadStream);
};

module.exports.fileDownload = async (id) => {
    const data = [];
    if (config.get('debug')) {
        console.log('[DEBUG] MongoDB fileDownload:', id);
    }
    const chunks = await this.find(
        'attachments.chunks',
        { files_id: await this.objectId(id) },
        { sort: [['n', 'asc']] }
    );
    for (const c in chunks) {
        data.push(chunks[c].data.buffer);
    }
    return await Buffer.concat(data);
};
