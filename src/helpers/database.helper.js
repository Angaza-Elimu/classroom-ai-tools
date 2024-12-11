const { MongoClient } = require('mongodb');
const mongoose = require('mongoose');

class DatabaseHelper {
    constructor(dbType, config) {
        this.dbType = dbType;
        this.config = config;

        if (dbType === 'mongodb') {
            // use global mongodb client
            this.client = global.mongoClient;
        }
        // } else if (dbType === 'dynamodb') {
        //     this.client = new DynamoDBClient(config);
        // } else if (dbType === 'firebase') {
        //     this.firebaseApp = initializeApp(config);
        //     this.db = getFirestore(this.firebaseApp);
        // } else {
        //     throw new Error('Unsupported database type');
        // }
    }

    async connect() {
        if (this.dbType === 'mongodb') {
            await this.client.connect();
            this.db = this.client.db(this.config.dbName);
        }
    }

    async disconnect() {
        if (this.dbType === 'mongodb') {
            await this.client.close();
        }
    }

    async insert(collectionName, data) {
        console.log('Inserting data:', data);
        if (this.dbType === 'mongodb') {
            return await this.db.collection(collectionName).insertOne(data);
        } else if (this.dbType === 'dynamodb') {
            const params = {
                TableName: collectionName,
                Item: data
            };
            return await this.client.send(new PutItemCommand(params));
        } else if (this.dbType === 'firebase') {
            const colRef = collection(this.db, collectionName);
            return await addDoc(colRef, data);
        }
    }

    async find(collectionName, queryObj) {
        if (this.dbType === 'mongodb') {
            return await this.db.collection(collectionName).find(queryObj).toArray();
        } else if (this.dbType === 'dynamodb') {
            const params = {
                TableName: collectionName,
                Key: queryObj
            };
            return await this.client.send(new GetItemCommand(params));
        } else if (this.dbType === 'firebase') {
            const colRef = collection(this.db, collectionName);
            const q = query(colRef, where(queryObj.field, '==', queryObj.value));
            const querySnapshot = await getDocs(q);
            return querySnapshot.docs.map(doc => doc.data());
        }
    }
}

module.exports = DatabaseHelper;
