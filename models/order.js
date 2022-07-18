const { ObjectId, GridFSBucket } = require('mongodb')
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