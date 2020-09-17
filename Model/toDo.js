const mongoose = require('mongoose')

const list = new mongoose.Schema({
    title: String,
    ownerId: String
})

const task = new mongoose.Schema({
    title: String,
    checked: Boolean,
    urgent: Boolean,
    listId: String,
    ownerId: mongoose.Schema.Types.ObjectId,
})

const todoCollection = mongoose.model('todoCollection', task)
const todoList = mongoose.model('todoList', list)

module.exports = {

    create: (title, ownerId) => {
        return new Promise(async (resolve, reject) => {
            try {
                const list = {title: title, ownerId: ownerId}
                const insert = await todoList.create(list)
                
                resolve(insert)
            } catch (error) {
                reject(error)
            }
        })
    },
    add: (title, listId, ownerId) => {
       
        return new Promise(async (resolve, reject) => {
            try {
                
                const task = {
                    title: title,
                    checked: false,
                    urgent: false,
                    listId: listId,
                    ownerId: ownerId
                }
                const insert = await todoCollection.create(task)
                
                // console.log(1)
                resolve(insert)
            } catch (error) {
                // console.log(2)
                reject(error)
            }
        })
    },
    getAllLists: () => {
        return new Promise(async (resolve, reject) => {
            try {
                
                const docs = await todoList.find()
               
                resolve(docs)
            } catch (error) {
                reject(error)
            }
        })
    },
    getListById: (id) => {
        return new Promise(async (resolve, reject) => {
            try {
                
                const docs = await todoList.findOne({_id: id})
               
                resolve(docs)
            } catch (error) {
                reject(error)
            }
        })
    },
    getTaskById: (id) => {
        return new Promise(async (resolve, reject) => {
            try {
                
                const docs = await todoCollection.findOne({_id: id})
               
                resolve(docs)
            } catch (error) {
                reject(error)
            }
        })
    },
    getAllByOwnerId: (id) => {
        return new Promise(async (resolve, reject) => {
            try {
                const docs = await todoList.find({ownerId: id})
               
                resolve(docs)
            } catch (error) {
                reject(error)
            }
        })
    },
    getTasksByListId: (id) => {
        return new Promise(async (resolve, reject) => {
            try {
                
                const docs = await todoCollection.find({listId: id})
               
                resolve(docs)
            } catch (error) {
                reject(error)
            }
        })
    },
    setCheck: (id, checked) => {
   
        return new Promise(async (resolve, reject) => {
            try {
                
                const docs = await todoCollection.updateOne(
                    {
                        _id: id
                    },
                    {
                        $set: 
                        {
                            checked: checked
                        }
                    }                 
                    ,
                    {}
                )
                
                resolve('updated')
            } catch (error) {
                reject(error)
            }
        })
    },
    setUrgent: (id, urgent) => {
   
        return new Promise(async (resolve, reject) => {
            try {
                
                const docs = await todoCollection.updateOne(
                    {
                        _id: id
                    },
                    {
                        $set: 
                        {
                            urgent: urgent
                        }
                    }                 
                    ,
                    {}
                )
                
                resolve('updated')
            } catch (error) {
                reject(error)
            }
        })
    },
    updateList: (id, title) => {
   
        return new Promise(async (resolve, reject) => {
            try {
                
                const docs = await todoList.updateOne(
                    {
                        _id: id
                    },
                    {
                        $set: 
                        {
                            title: title
                        }
                    }                 
                    ,
                    {}
                )
                
                resolve('updated')
            } catch (error) {
                reject(error)
            }
        })
    },
    deleteList: (id) => {
        return new Promise(async (resolve, reject) => {
            try {
                const list = await todoList.deleteOne(
                    {
                        _id: id
                    }
                )
                if(list == undefined) {
                    resolve('undefined')
                }
                const tasks = await todoCollection.deleteMany(
                    {
                        listId: id
                    }
                )
                
                resolve('deleted')
            } catch (error) {
                reject(error)
            }
        })
    },
    deleteTask: (id) => {
        
        return new Promise(async (resolve, reject) => {
            try {
                const docs = await todoCollection.deleteOne(
                    {
                        _id: id
                    }
                    
                )
                resolve('deleted')
            } catch (error) {
                reject(error)
            }
        })
    },
    deleteListTasks: (id) => {
        
        return new Promise(async (resolve, reject) => {
            try {
                const docs = await todoCollection.deleteMany(
                    {
                        listId: id
                    }
                )
                resolve('deleted')
            } catch (error) {
                reject(error)
            }
        })
    },
    pagination: (listId, page, sortBy, sortStyle) => {

        let limit = 3;
        let skip = (page-1) * limit

        if(sortStyle == 'created') {
            
            return new Promise( async (resolve, reject) => {
                try {
                    const sorted = await todoCollection.find({
                        listId: listId
                    })
                    .sort({createdAt: sortBy})
                    .skip(skip)
                    .limit(limit)
                    .exec()
                    resolve(sorted)
                } catch (error) {
                    reject(error)
                }
            })
        } else if (sortStyle == 'updated') {
            return new Promise( async (resolve, reject) => {
                try {
                   const sorted = await todoCollection.find({})
                    .sort({updatedAt: sortBy})
                    .skip(skip)
                    .limit(limit)
                    .exec()
                    resolve(sorted)
                } catch (error) {
                    reject(error)
                }
            })
        } else {
            return new Promise( async (resolve, reject) => {
                try {
                   const sorted = await todoCollection.find({})
                    .sort({updatedAt: sortBy})
                    .skip(skip)
                    .limit(limit)
                    .exec()
                    resolve(sorted)
                } catch (error) {
                    reject(error)
                }
            })
        }
    },
    deleteUserData: (userId) => {
        return new Promise( async (resolve, reject) => {
            try {
                const lists = await todoList.deleteMany({ownerId: userId})
                const tasks = await todoCollection.deleteMany({ownerId: userId})
                resolve('User data was deleted!')
            } catch (error) {
                reject(error)
            }
        })
    }
}