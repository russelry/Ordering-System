const { ObjectId, GridFSBucket } = require('mongodb')
const { getDbInstance } = require('../lib/mongo')
const { extractValidFields } = require('../lib/validation')

const pizzaSchema = {
    comboType: { required: true },
    name: { required: true },
    ingredients: { required: true },
    cost: { required: true }
}
exports.pizzaSchema = pizzaSchema

exports.insertNewPizza = async function insertNewPizza(newPizza) {
    const db = getDbInstance()
    const collection = db.collection('pizzas')
    const pizza = extractValidFields(newPizza, pizzaSchema)
    const result = await collection.insertOne(pizza)
    return result.insertedId
}

exports.getAllPizzas = async function getAllPizzas() {
    const db = getDbInstance()
    const collection = db.collection("pizzas")
    const pizzas = await collection.find().toArray();
    return pizzas;
}

exports.getPizzaById = async function getPizzaById(id) {
    const db = getDbInstance()
    const collection = db.collection("pizzas")
    try {
        const pizza = await collection.find({
            _id: new ObjectId(id)
        }).toArray()
        return pizza[0]
    } catch (e) {
        return null
    }
}

exports.updatePizzaById = async function updatePizzaById(pizza, id) {
    const pizzaValues = {
        comboType: pizza.comboType,
        name: pizza.name,
        ingredients: pizza.ingredients,
        cost: pizza.cost
    }
    console.log("PIZZA VALUE")
    console.log(pizzaValues)
    const db = getDbInstance()
    const collection = db.collection("pizzas")
    try {
        const result = await collection.replaceOne(
            { _id: new ObjectId(id), },
            pizzaValues
        )
        console.log("Matched Count" + result.matchedCount)
        return result.matchedCount > 0;
    } catch (e) {
        console.log(e)
        return null
    }
}

exports.deletePizzaById = async function deletePizzaById(id) {
    const db = getDbInstance()
    const collection = db.collection("pizzas")
    const count = await collection.deleteOne({
        _id: new ObjectId(id)
    })
    return count.deletedCount > 0
}

exports.getPizzasByTopping = async function getPizzasByTopping(topping, pizzaArray) {
    const pizzas = [];
    for(var i = 0; i < pizzaArray.length(); i++) {
        for(var j = 0; j < pizzaArray[i].ingredients.length(); j++) {
            if(topping == pizzaArray[i].ingredients[j]) {
                pizzas.append(pizzaArray[i])
                break;
            }
        }
    }
    return pizzas;
}