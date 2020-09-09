var chai = require('chai'),
chaiHttp = require('chai-http');
const { request, expect } = chai
const app = require("../app")

chai.use(chaiHttp);
chai.should()

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

    it("should create a todolist and add a task", async function () {
 

        await todo.add('clean house', this.test.list._id)
        await todo.add('water plants', this.test.list._id)
        
        let tasks = await todo.getTasksByListId(this.test.list._id)
        expect(tasks.length).to.equal(2)
    })

    it("should authorize a user and create a list", async function () {
        

        chai.request(app)
        .post(`/todo/list`)
        .set("Content-Type", "application/json")
        .set('token',`Bearer ${this.test.token}`)
        .send({
            'title': 'title'
        })
        .end((err, res) => {
            const title = res.body.title
     
            expect(title).to.not.equal(null)
            expect(title).to.not.equal(undefined)
            expect(res).to.be.json
            expect(res).to.have.status(200)
            
        })
    })

    it("should get a todolist", async function () {

        let list = JSON.stringify(this.test.list)

        chai.request(app)
        .get(`/todo/list/${this.test.list._id}`)
        .set("Content-Type", "application/json")
        .set('token',`Bearer ${this.test.token}`)
        .end((err, res) => {
            
            expect(JSON.stringify(res.body)).to.equal(list)
            expect(res).to.be.json
            expect(res).to.have.status(200)
            
        })

    })

    it("should get a todolists' tasks", async function () {

        await todo.add('clean house', this.test.list._id)
        await todo.add('water plants', this.test.list._id)

        chai.request(app)
        .get(`/todo/tasks/${this.test.list._id}`)
        .set("Content-Type", "application/json")
        .set('token',`Bearer ${this.test.token}`)
        .end((err, res) => {
            
            expect(res).to.be.json
            expect(res).to.have.status(200)
            expect(res.body.length).to.equal(2)
            
        })
    })

    it("should delete a task", async function () {

        let task = await todo.add('water plants', this.test.list._id)

        chai.request(app)
        .delete(`/todo/tasks/${task._id}`)
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
        .patch(`/todo/tasks/${task._id}`)
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

    it("should add a task to a list", async function () {

        let task = await todo.add('water plants', this.test.list._id)

        chai.request(app)
        .post(`/todo/tasks/${this.test.list._id}`)
        .set("Content-Type", "application/json")
        .set('token',`Bearer ${this.test.token}`)
        .send({
            title: 'title'
        })
        .end((err, res) => {

            expect(res).to.have.status(200)
            expect(res.body.title).to.equal('title')
            expect(res.body.listId).to.equal(this.test.list._id)
        })  
    })
})