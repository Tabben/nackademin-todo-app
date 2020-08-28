const { todoCollection } = require('./db')

// var todoCollection = database.create ({
//     filename: __dirname + '/Data/todo',
//     timestampData: true,
//     autoload: true
// })

module.exports = {
    add: function (title) {
       
        return new Promise(async (resolve, reject) => {
            try {
                
                const docs = todoCollection.insert(
                    {
                        title: title,
                        checked: false
                    }
                )
               
                resolve(docs)
            } catch (error) {
                reject(error)
            }
        })
    },

    getAll: () => {
        return new Promise(async (resolve, reject) => {
            try {
                
                const docs = todoCollection.find(
                    {}
                )
               
                resolve(docs)
            } catch (error) {
                reject(error)
            }
        })
    },

    getNote: (id) => {
        let noteId = id
        return new Promise(async (resolve, reject) => {
            try {
                
                const docs = todoCollection.find(
                    {
                        _id: id
                    }
                )
               
                resolve(docs)
            } catch (error) {
                reject(error)
            }
        })
    },

    update: (id, title, checked) => {
        return new Promise(async (resolve, reject) => {
            try {
                
                const docs = todoCollection.update(
                    {
                        _id: id
                    },
                    {
                        $set: {
                            title: title,
                            checked: checked
                        }
                    },
                    {}
                )
               
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
                        $set: {
                            checked: checked
                        }
                    },
                    {}
                )
               
                resolve(docs)
            } catch (error) {
                reject(error)
            }
        })
    },

    delete: (id) => {
        return new Promise(async (resolve, reject) => {
            try {
                const docs = todoCollection.remove(
                    {
                        _id: id
                    }
                )
                resolve(docs)
            } catch (error) {
                reject(error)
            }
        })
    },

    sortCreated: (value) => {
        let sortBy = value;
        return new Promise( async (resolve, reject) => {
            try {
                const sorted = todoCollection.find({}).sort({createdAt: sortBy}).exec()
                
                resolve(sorted)
            } catch (error) {
                reject(error)
            }
        })
        
    },

    sortUpdated: (value) => {
        let sortBy = value;

        
    },

    pagination: (page, sortBy, sortStyle) => {

        let limit = 3;
        let skip = (page-1) * limit

        if(sortStyle == 'created') {
            return new Promise( async (resolve, reject) => {
                try {
                   const sorted = todoCollection.find({})
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