var chai = require('chai')
const { expect } = chai


const todo = require('../Model/toDo')
const users = require('../Model/user')

describe("This test should create a todolist then add some tasks", async () => {

    beforeEach(async function () {
        return new Promise(async (resolve) => {
            const user = 'nicke'
            const password = 'nickechai'
            const role = 'admin'
            this.currentTest.user =  await users.addUser(user, password, role) 

            setTimeout(async () => {
                this.currentTest.token = (await users.login('nicke', 'nickechai')).token
                let currUser = await users.findUser('nicke') 
                this.currentTest.list = await todo.create('chores', currUser._id)
                resolve();
            }, 500);
        })
    
    })

    it("should add tasks to a todolist", async function () {
 
        await todo.add('clean house', this.test.list._id)
        await todo.add('water plants', this.test.list._id)
        
        let tasks = await todo.getTasksByListId(this.test.list._id)
        expect(tasks.length).to.equal(2)
    })

    it("should delete a todolist and its tasks", async function () {

        await todo.add('clean house', this.test.list._id)
        await todo.add('water plants', this.test.list._id)

        let deletedList = await todo.deleteList(this.test.list._id)

        let tasks = await todo.getTasksByListId(this.test.list._id)
        let list = await todo.getListById(this.test.list_id)

        expect(deletedList).to.equal('deleted')
        expect(tasks.length).to.equal(0)
        expect(list).to.equal(undefined || null)
        
    })

    it("should set a task as done and read a task", async function () {

        let task = await todo.add('clean house', this.test.list._id)
        let obj = {}

        await todo.setCheck(task._id, true)
        let updatedTask = await todo.getTaskById(task._id)

        expect(updatedTask.checked).to.equal(true)
        expect(typeof(updatedTask)).to.equal(typeof(obj))

    })
})