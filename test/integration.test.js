var chai = require('chai'),
chaiHttp = require('chai-http');
const { request, expect } = chai
const app = require("../app")
const db = require('../Model/db')
chai.use(chaiHttp);


const todo = require('../Model/toDo')
const users = require('../Model/user');
const { util } = require('chai');

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
                this.currentTest.token = (await users.login('nicke', 'nickechai')).token
                this.currentTest.list = await todo.create('chores', this.currentTest.user._id)
                resolve()
            }, 200);
        })
    })

    it("should add a task", async function () {
 

        await todo.add('clean house', this.test.list._id, this.test.user._id)
        
        let tasks = await todo.getTasksByListId(this.test.list._id)
        expect(tasks.length).to.equal(1)
    })

    it("should get a todolist", async function () {

        let list = JSON.stringify(this.test.list)
        chai.request(app)
        .get(`/list/${this.test.list._id}`)
        .set("Content-Type", "application/json")
        .set('token',`Bearer ${this.test.token}`)
        .end((err, res) => {
            
            expect(JSON.stringify(res.body)).to.equal(list)
            expect(res).to.be.json
            expect(res).to.have.status(200)
            
        })

    })

    it("should get a todolists' tasks", async function () {

        await todo.add('clean house1', this.test.list._id, this.test.user._id)

        chai.request(app)
        .get(`/tasks/${this.test.list._id}`)
        .set("Content-Type", "application/json")
        .set('token',`Bearer ${this.test.token}`)
        .end((err, res) => {
            
            expect(res).to.be.json
            expect(res).to.have.status(200)
            expect(res.body.length).to.equal(1)
            
        })
    })

    it("should delete a task", async function () {

        let task = await todo.add('water plants2', this.test.list._id, this.test.user._id)

        chai.request(app)
        .delete(`/tasks/${task._id}`)
        .set("Content-Type", "application/json")
        .set('token',`Bearer ${this.test.token}`)
        .end((err, res) => {
            
            expect(res).to.have.status(200)
            expect(res.body).to.equal('deleted')
        })  
    })

    it("should set a task to true (done)", async function () {

        let task = await todo.add('water plants', this.test.list._id)

        chai.request(app)
        .patch(`/tasks/check/${task._id}`)
        .set("Content-Type", "application/json")
        .set('token',`Bearer ${this.test.token}`)
        .send({
            checked: true
        })
        .end((err, res) => {

            expect(res).to.have.status(200)
            expect(res.body).to.equal('updated')
        })  
    })

    it("should set a task as urgent (true)", async function () {

        let task = await todo.add('water plants', this.test.list._id)

        chai.request(app)
        .patch(`/tasks/urgent/${task._id}`)
        .set("Content-Type", "application/json")
        .set('token',`Bearer ${this.test.token}`)
        .send({
            urgent: true
        })
        .end((err, res) => {

            expect(res).to.have.status(200)
            expect(res.body).to.equal('updated')
        })  
    })

    it("should add a task to a list", async function () {

        let listId = this.test.list._id
        chai.request(app)
        .post(`/tasks/${this.test.list._id}`)
        .set("Content-Type", "application/json")
        .set('token',`Bearer ${this.test.token}`)
        .send({
            title: 'title'
        })
        .end(async (err, res) => {
            expect(res).to.have.status(200)
            expect(res.body.title).to.equal('title')
            expect(res.body.listId.toString()).to.equal(listId.toString())
            
        })
        
    })

    it("should edit a list title", async function () {

        chai.request(app)
        .patch(`/list/${this.test.list._id}`)
        .set("Content-Type", "application/json")
        .set('token',`Bearer ${this.test.token}`)
        .send({
            title: 'newTitle'
        })
        .end((err, res) => {

            expect(res).to.have.status(200)
            expect(res.body).to.equal('updated')
        })  
    })

    it("should add several tasks to a list and sort by created, updated and paginate", async function () {
        
        
        await todo.add('1', this.test.list._id, this.test.user._id)
        await todo.add('2', this.test.list._id, this.test.user._id)
        let task = await todo.add('3', this.test.list._id, this.test.user._id)
        await todo.add('4', this.test.list._id, this.test.user._id)
        await todo.add('5', this.test.list._id, this.test.user._id)
        await todo.add('6', this.test.list._id, this.test.user._id)

        await todo.setCheck(task._id, true)


 
        chai.request(app)
        .post(`/list/${this.test.list._id}/1`)
        .set("Content-Type", "application/json")
        .set('token',`Bearer ${this.test.token}`)
        .send({
            sortStyle: 'created',
            sortBy: 1
        })
        .end((err, res) => {
       
           expect(res.body.length).to.equal(3)
           expect(res.body[0].title).to.equal('1')
        })


        chai.request(app)
        .post(`/list/${this.test.list._id}/2`)
        .set("Content-Type", "application/json")
        .set('token',`Bearer ${this.test.token}`)
        .send({
            sortStyle: 'created',
            sortBy: -1
        })
        .end((err, res) => {
           
           expect(res.body.length).to.equal(3)
           expect(res.body[2].title).to.equal('1')
        })

   
        chai.request(app)
        .post(`/list/${this.test.list._id}/1`)
        .set("Content-Type", "application/json")
        .set('token',`Bearer ${this.test.token}`)
        .send({
            sortStyle: 'updated',
            sortBy: -1
        })
        .end((err, res) => {
           expect(res.body.length).to.equal(3)
           expect(res.body[0].title).to.equal('3')
        })

        chai.request(app)
        .post(`/list/${this.test.list._id}/1`)
        .set("Content-Type", "application/json")
        .set('token',`Bearer ${this.test.token}`)
        .send({
            sortStyle: 'updated',
            sortBy: 1
        })
        .end((err, res) => {
        
           expect(res.body.length).to.equal(3)
           expect(res.body[0].title).to.equal('clean house')
        })
    })

    it('should remove a user and all its recordings in the database', async function () {
        let current = await todo.getAllByOwnerId(this.test.user._id)

        chai.request(app)
        .delete(`/user/`)
        .set("Content-Type", "application/json")
        .set('token',`Bearer ${this.test.token}`)
        .end(async (err, res) => {
          
            let history = await todo.getAllByOwnerId(this.test.user._id)
            let user1 = await users.findUser('nicke')

            expect(user1).to.equal(null)
            expect(history).to.not.equal(current)
            expect(history.lists.length).to.equal(0)
            expect(history.tasks.length).to.equal(0)
            expect(res.body.msg).to.equal('User has been deleted')
           
        })
            
    })
})