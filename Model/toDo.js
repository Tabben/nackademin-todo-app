const { todoCollection, todoList } = require('./db')


module.exports = {

    create: (title, ownerId) => {
        return new Promise(async (resolve, reject) => {
            try {
                const list = await todoList.insert({title: title, ownerId: ownerId})

                resolve(list)
            } catch (error) {
                reject(error)
            }
        })
    },
    add: (title, listId) => {
       
        return new Promise(async (resolve, reject) => {
            try {
                
                const task = todoCollection.insert({
                    title: title,
                    checked: false,
                    urgent: false,
                    listId: listId
                })
                const list = todoList.update(
                {
                    _id: listId,
                },
                {
                    $push: {
                        
                    }
                }
                )
                // console.log(1)
                resolve(task)
            } catch (error) {
                // console.log(2)
                reject(error)
            }
        })
    },
    getAllLists: () => {
        return new Promise(async (resolve, reject) => {
            try {
                
                const docs = todoList.find({})
               
                resolve(docs)
            } catch (error) {
                reject(error)
            }
        })
    },
    getListById: (id) => {
        return new Promise(async (resolve, reject) => {
            try {
                
                const docs = todoList.findOne({_id: id})
               
                resolve(docs)
            } catch (error) {
                reject(error)
            }
        })
    },
    getAllByOwnerId: (id) => {
        return new Promise(async (resolve, reject) => {
            try {
                const docs = todoList.find({ownerId: id})
               
                resolve(docs)
            } catch (error) {
                reject(error)
            }
        })
    },
    getTasksByListId: (id) => {
        return new Promise(async (resolve, reject) => {
            try {
                
                const docs = todoCollection.find({listId: id})
               
                resolve(docs)
            } catch (error) {
                reject(error)
            }
        })
    },
    setCheck: (id, checked) => {
   
        return new Promise(async (resolve, reject) => {
            try {
                
                const docs = todoCollection.update(
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
    deleteList: (id) => {
        return new Promise(async (resolve, reject) => {
            try {
                const list = todoList.remove(
                    {
                        _id: id
                    }
                )
                const tasks = todoCollection.remove(
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
                const docs = todoCollection.remove(
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
    pagination: (listId, page, sortBy, sortStyle) => {

        let limit = 3;
        let skip = (page-1) * limit

        if(sortStyle == 'created') {
            return new Promise( async (resolve, reject) => {
                try {
                    const sorted = todoCollection.find({
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
                   const sorted = todoCollection.find({})
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
                   const sorted = todoCollection.find({})
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
    }
}