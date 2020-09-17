var chai = require('chai')
const { expect } = chai
const db = require('../Model/db')
 
const todo = require('../Model/toDo')
const users = require('../Model/user')

describe("This test should create a todolist then add some tasks", async () => {

    beforeEach(async function () {

        await db.connect()
       
            return new Promise(async (resolve) => {
                const username = 'nicke'
                const password = 'nickechai'
                const role = 'admin'
               
                await users.addUser(username, password, role)
                setTimeout(async  () => {
                    this.currentTest.user = await users.findUser('nicke')
                    this.currentTest.list = await todo.create('chores', this.currentTest.user._id)
                    resolve()
                }, 500);
            })
        
        
    
    })

    it('should create a user', async function () {

        expect(this.test.user.username).to.equal('nicke')
    })

    it('should create a list', async function () {

        expect(this.test.list.ownerId.toString()).to.equal(this.test.user._id.toString())
    })

    it('should delete a user and its lists and tasks', async function () {
        await users.deleteUser(this.test.user._id)

        let user = await users.findUser('nicke')

        expect(user).to.equal(null)

        await todo.deleteUserData(this.test.user._id)

        let list = await todo.getListById(this.test.list._id)

        expect(list).to.equal(null)
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

    it("should create multiple todolists and add tasks to them", async function () {
           
        let anotherList = await todo.create('Groceries', this.test.user._id)

        let task1 = await todo.add("dishes", this.test.list._id)
        let task2 = await todo.add("Water the plants", this.test.list._id)
        let task3 =await todo.add("patatas", anotherList._id)
        let task4 =await todo.add("tomatoes", anotherList._id)

        expect(anotherList._id.toString()).to.equal(task3.listId.toString() && task4.listId.toString())
        expect(this.test.list._id.toString()).to.equal(task1.listId.toString() && task2.listId.toString())
        expect(this.test.user._id.toString()).to.equal(this.test.list.ownerId.toString() && anotherList.ownerId.toString())
    })

    it("should mark a task as urgent", async function () {
        let task = await todo.add('Feed the dog', this.test.list._id)

        await todo.setUrgent(task._id, true)
        let urgentTask = await todo.getTaskById(task._id)
        
        expect(urgentTask.urgent).to.equal(true)

    })
})