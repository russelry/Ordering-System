const { ObjectId, GridFSBucket, ConnectionClosedEvent } = require('mongodb')
const { getDbInstance } = require('../lib/mongo')
const { extractValidFields } = require('../lib/validation')

const orderSchema = {
    customerDetails: { required: true },
    order: { required: true }
}
exports.orderSchema = orderSchema

exports.insertOrder = async function insertOrder(order) {
    const db = getDbInstance()
    const collection = db.collection('orders')
    const pizza = extractValidFields(order, orderSchema)
    const result = await collection.insertOne(order)
    return result.insertedId
}

exports.getAllOrders = async function getAllOrders() {
    const db = getDbInstance()
    const collection = db.collection('orders')
    const orders = await collection.find().toArray()
    return orders
}

exports.getOrderById = async function getOrderById(id) {
    const db = getDbInstance()
    const collection = db.collection("orders")
    try {
        const order = await collection.find({
            _id: new ObjectId(id)
        }).toArray()
        return order[0]
    } catch (e) {
        return null
    }
}

exports.addToOrder = async function addToOrder(item, id) {
    const db = getDbInstance()
    const collection = db.collection("orders")
    try {
        const result = await collection.updateOne(
            { _id: new ObjectId(id) },
            { $push: { order: item.item}}
        )
        console.log("Matched Count " + result.matchedCount)
        return result.matchedCount > 0
    } catch(e) {
        console.log("ERROR " + e)
        return null
    }
}

exports.addCustomerDetails = async function addCustomerDetails(details, id) {
    const db = getDbInstance()
    const collection = db.collection("orders")
    try {
        const result = await collection.updateMany(
            { _id: new ObjectId(id) },
            { $set: 
                {
                    customerDetails: { 
                        name: details.name,
                        phoneNum: details.phoneNum, 
                        address: details.address
                    }
                } 
            }
        )
        console.log("Matched Count " + result.matchedCount)
        return result.matchedCount > 0
    } catch(e) {
        console.log("ERROR " + e)
        return null 
    }
}

exports.deleteOrderById = async function deleteOrderById(id) {
    const db = getDbInstance()
    const collection = db.collection("orders")
    const count = await collection.deleteOne({
        _id: new ObjectId(id)
    })
    return count.deletedCount > 0
}