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
                
                const task = await todoCollection.insert({
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
                
                const docs = await todoList.find({})
               
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
                
                const docs = await todoCollection.update(
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
    updateList: (id, title) => {
   
        return new Promise(async (resolve, reject) => {
            try {
                
                const docs = await todoList.update(
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
                const list = await todoList.remove(
                    {
                        _id: id
                    }
                )
                if(list == undefined) {
                    resolve('undefined')
                }
                const tasks = await todoCollection.remove(
                    {
                        listId: id
                    },
                    {
                        multi: true
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
                const docs = await todoCollection.remove(
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
                const docs = await todoCollection.remove(
                    {
                        listId: id
                    },
                    {
                        multi: true
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
    }
}