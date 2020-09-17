document.addEventListener('DOMContentLoaded', async (event) => {   
    
    if(!localStorage.getItem('sortStyle')) {
        localStorage.setItem('sortStyle', 'none')
        localStorage.setItem('sortBy', 1)
    }
    localStorage.setItem('currPage', 1);

})
document.addEventListener('click', async (event) => {

    let currPage = localStorage.getItem('currPage');
    const totalPages = localStorage.getItem('pages');
    let sortBy = localStorage.getItem('sortBy')
    let sortStyle = localStorage.getItem('sortStyle')

    // console.log('currPage: ' + currPage)
    // console.log('totalPages: ' + totalPages)
    let currentUser = sessionStorage.getItem('token')
    let target = event.target
    let targetGrandpa = target.parentNode.parentNode
    let targetParent = target.parentNode
    let parentId = targetParent.id
    let grandpaId = targetParent.parentNode.id
    let index = Array.prototype.indexOf.call(targetParent.parentNode.children, targetParent)

    if(target.textContent == '[X]'){
        
        
        const remove = {
            method: 'DELETE', 
            headers: {
                'Content-type': 'application/json',
                'token': currentUser
            }
        }
        
        await fetch(`/tasks/${parentId}`, remove)
        .then(res => res.text())
        .then(log => {
            console.log(log)
            if(log != 'Unauthorized') {
                let data = JSON.parse(log)
                
                targetGrandpa.removeChild(targetParent)
                
            }
            
            
        })
        .catch(err => console.log(err))
        
    }
    
    if(target.textContent == 'Edit'){

        const get = {
            method: 'GET', 
            headers: {
                'Content-type': 'application/json',
                'token': currentUser
            }
        }
        fetch(`/todo/note/${parentId}`, get)
        .then(res => res.text())
        .then(response => {
            console.log(response)
            let div = document.getElementById('editPage')
            let data = JSON.parse(response)
            let title = document.createElement('input')
            title.setAttribute('id', 'title')
            title.setAttribute('value', data[0].title)
            
            let btn = document.createElement('button')
            btn.setAttribute('id', 'edit')
            btn.textContent = ('Update task')
            btn.setAttribute('value', index)

            let currId = document.createElement('input')
            currId.setAttribute('id', 'currId')
            currId.setAttribute('value', parentId)
            currId.style.display = 'none'

            div.appendChild(currId)
            div.appendChild(title)
            div.appendChild(btn) 
        })
        .catch(err => console.log(err))
        
    }

    if(target.id == 'edit'){
        
        let done = document.getElementById('check' + target.value).checked
        let title = document.getElementById('title').value
        let currId = document.getElementById('currId').value
        console.log(done)
        
        const data = {
            title: title,
            checked: done
        }

        const put = {
            method: 'PUT', 
            headers: {
                'Content-type': 'application/json',
                'token': currentUser
            },
            body: JSON.stringify(data) 
        }
        
        await fetch(`/todo/${currId}`, put)
        .then(res => {
            load()
        })
        .catch(err => console.log(err))
       
    }

    if(target.type == 'checkbox') {

        let inputGrandPaIndex =Array.prototype.indexOf.call(targetParent.parentNode.parentNode.children, targetParent.parentNode)
        let done = document.getElementById('check' + inputGrandPaIndex).checked

        const data = {
            checked: done
        }
        const patch = {
            method: 'PATCH', 
            headers: {
                'Content-type': 'application/json',
                'token': currentUser
            },
            body: JSON.stringify(data) 
        }
        
        await fetch(`/tasks/check/${grandpaId}`, patch)
        .then(res => console.log(res))
        .catch(err => console.log(err))
    }
    // if(target.name == 'urgent') {

    //     let inputGrandPaIndex =Array.prototype.indexOf.call(targetParent.parentNode.parentNode.children, targetParent.parentNode)
    //     let done = document.getElementById('urgent' + inputGrandPaIndex).checked

    //     const data = {
    //         checked: done
    //     }
    //     const patch = {
    //         method: 'PATCH', 
    //         headers: {
    //             'Content-type': 'application/json',
    //             'token': currentUser
    //         },
    //         body: JSON.stringify(data) 
    //     }
        
    //     await fetch(`/tasks/urgent/${grandpaId}`, patch)
    //     .then(res => console.log(res))
    //     .catch(err => console.log(err))
    // }

    if(target.id == 'addNew') {
        let btn = document.getElementById('addNew')
        
        let newTask = document.getElementById('newTask')

        let label = document.createElement('label')
        label.setAttribute('for', 'title')
        label.textContent = 'What task has to be done?'

        let title = document.createElement('input')
        title.setAttribute('type', 'text')
        title.setAttribute('name', 'title')
        title.setAttribute('id', 'newTitle')

        let newBtn = document.createElement('button')
        newBtn.setAttribute('id', 'addNewTask')
        newBtn.textContent = 'Add task'

        newTask.appendChild(label)
        newTask.appendChild(title)
        newTask.appendChild(newBtn)

        btn.style.display = 'none'
    }

    if(target.id == 'addNewTask') {

        let title = document.getElementById('newTitle').value

        let data = {
            title: title
        }

        const post = {
            method: 'POST', 
            headers: {
                'Content-type': 'application/json',
                'token': currentUser
            },
            body: JSON.stringify(data)
        }

        await fetch(`/tasks/${listId}`, post)
        .then(res => console.log(res))
        .then(data => load())
        .catch(err => console.log(err))
    }
    
    if(target.classList.value == 'pages') {
       
        localStorage.setItem('currPage', target.name)
        currPage = localStorage.getItem('currPage')
        let data = {
            sortBy: sortBy,
            sortStyle: sortStyle
        }
        const post = {
            method: 'POST', 
            headers: {
                'Content-type': 'application/json',
                'token': currentUser
            },
            body: JSON.stringify(data)
        }

        await fetch(`/todo/page/${currPage}`, post)
        .then(res => res.text())
        .then(data => {

            let created = document.getElementById('created')
            if(event.target.name > 0) {
                created.name = -1
            } else {
                created.name = 1
            }
            localStorage.setItem('sortStyle', 'created')
            
            fillPage(data)
        })
        .catch(err => console.log(err))
        console.log(sortStyle)
            console.log(sortBy)
            console.log(currPage)
    }

    if(target.textContent == 'Created at') {
        
        sortBy = event.target.name
        localStorage.setItem('sortBy', sortBy)
        localStorage.setItem('sortStyle', 'created')
        sortStyle = localStorage.getItem('sortStyle')

        let data = {
            sortBy: sortBy,
            sortStyle: sortStyle
        }
        
        const options = {
            method: 'POST', 
            headers: {
                'Content-type': 'application/json',
                'token': currentUser
            },
            body: JSON.stringify(data)
        }

        await fetch(`/todo/page/${currPage}`, options)
        .then(res => res.text())
        .then(data => {

            let created = document.getElementById('created')
            if(event.target.name > 0) {
                created.name = -1
            } else {
                created.name = 1
            }
 
            fillPage(data)
        })
        .catch(err => console.log(err))
        
    }

    if(target.textContent == 'Updated at') {

        sortBy = event.target.name
        localStorage.setItem('sortBy', sortBy)
        localStorage.setItem('sortStyle', 'updated')
        sortStyle = localStorage.getItem('sortStyle')
        
        let data = {
            sortBy: sortBy,
            sortStyle: sortStyle
        }
        
        const options = {
            method: 'POST', 
            headers: {
                'Content-type': 'application/json',
                'token': currentUser
            },
            body: JSON.stringify(data)
        }

        await fetch(`/todo/page/${currPage}`, options)
        .then(res => res.text())
        .then(data => {

            let updated = document.getElementById('updated')
            if(event.target.name > 0) {
                updated.name = -1
            } else {
                updated.name = 1
            }
  
            fillPage(data)
        })
        .catch(err => console.log(err))
        
    }

    if(target.name == 'switchL') {
        document.getElementById('register').style.display = "none"
        document.getElementById('login').style.display = "block"
    } else if (target.name == 'switchR') {
        document.getElementById('register').style.display = "block"
        document.getElementById('login').style.display = "none"
    }

    if(target.id == 'registerUser') {
        const username = document.getElementById('regUsername').value
        const password = document.getElementById('regPassword').value
        const role = document.getElementById('role').value

        event.preventDefault()

        if(username.length > 1 && password.length > 1) {
            const data = {
                username: username,
                password: password,
                role:role
            }
    
            const post = {
                method: 'POST', 
                headers: {
                    'Content-type': 'application/json' },
                body: JSON.stringify(data)
            }
    
            await fetch('user/register', post)
            .then(res => res.text())
            .then(data => console.log(data))
            .catch(err => console.log(err))
        } else {
            alert('Enter required fields!')
        }
        
    }

    if(target.id == 'loginUser') {
        const username = document.getElementById('loginUsername').value
        const password = document.getElementById('loginPassword').value
        event.preventDefault()
        if(username.length > 1 && password.length > 1) {
            const data = {
                username: username,
                password: password
            }
    
            const post = {
                method: 'POST', 
                headers: {
                    'Content-type': 'application/json' 
                },
                body: JSON.stringify(data)
            }
    
            await fetch('user/login', post)
            .then(res => res.text())
            .then(data => {
                let val = JSON.parse(data)

                if(val['token'] != undefined) {
                    sessionStorage.setItem('token', 'Bearer '+ val['token'])
                    console.log(sessionStorage.getItem('token'))
                    document.getElementById('authenticated').style.display = 'block'
                    document.getElementById('login').style.display = 'none'
                    document.getElementById('register').style.display = 'none'

                    load()
                } else {
                    console.log('Authentication went wrong')
                }
            })
            .catch(err => console.log(err))
        } else {
            alert('Enter required fields!')
        }

        
    }

})

async function load() {
    const currPage = localStorage.getItem('currPage')
    let sortBy = localStorage.getItem('sortBy')
    let sortStyle = localStorage.getItem('sortStyle')
    console.log("sortstyle: " + sortStyle)
    console.log("sortby: " +sortBy)
    let data = {
        sortBy: sortBy,
        sortStyle: sortStyle
    }
    console.log()
    const post = {
        method: 'POST', 
        headers: {
            'Content-type': 'application/json',
            'token': sessionStorage.getItem('token')
        },
        body: JSON.stringify(data)
    }
    const get = {
        method: 'GET', 
        headers: {
            'Content-type': 'application/json',
            'token': sessionStorage.getItem('token')
        }
    }
    await fetch('/todo/all', get)
    .then(res => res.text())
    .then(val => {
        let data = JSON.parse(val)
        const pages = Math.ceil(data.length/3)
        localStorage.setItem('pages', pages)
        localStorage.setItem('limit', 3);
        localStorage.setItem('dataLength', data.length);
    })
    .catch(err => console.log(err))
    
    await fetch(`/todo/page/${currPage}`, post)
    .then(res => res.text(res))
    .catch(error => console.log(error))
    .then(val => fillPage(val))
    .catch(err => console.log(err))
}

async function fillPage(val) {

    const notes = document.getElementById('notes')
    
    if(notes.children.length > 0) {
        notes.textContent = ''
        document.getElementById('newTask').textContent = ''
    }

    let data = JSON.parse(val)


    let num = 0
        let div = document.createElement('div')
        let table = document.createElement('table')
        let trDesc = document.createElement('tr')
        let td1 = document.createElement('td')
        let td2 = document.createElement('td')
        let td3 = document.createElement('td')
        let td4 = document.createElement('td')

        let aUpdated = document.createElement('a')
        let aCreated = document.createElement('a')

        aUpdated.textContent = 'Updated at'
        aUpdated.style.color = 'blue'
        aCreated.textContent = 'Created at'
        aCreated.style.color = 'blue'

        if(data[0].createdAt > data[data.length-1].createdAt) {
            aCreated.setAttribute('name', '1')
        } else {
            aCreated.setAttribute('name', '-1')
        }

        if(data[0].updatedAt > data[data.length-1].updatedAt) {
            aUpdated.setAttribute('name', '1')
        } else {
            aUpdated.setAttribute('name', '-1')
        }

        aCreated.setAttribute('id', 'created')
        aUpdated.setAttribute('id', 'updated')

        td1.textContent = 'Done'
        td2.textContent = 'To-Do'
        td3.appendChild(aCreated)
        td4.appendChild(aUpdated)

        trDesc.appendChild(td1)
        trDesc.appendChild(td2)
        trDesc.appendChild(td3)
        trDesc.appendChild(td4)

        table.appendChild(trDesc)
        table.setAttribute('id', 'table')

        for(let note = num; note < data.length; note++) {
            let tr = document.createElement('tr')
            let tdChecked = document.createElement('td')
            let tdTitle = document.createElement('td')
            let tdCreated = document.createElement('td')
            let tdUpdated = document.createElement('td')
            let tdDelete = document.createElement('td')
            let tdEdit = document.createElement('td')
            let checkbox = document.createElement('input')
            checkbox.setAttribute('id', 'check'+ (num+1))
            checkbox.setAttribute('type', 'checkbox')

            if(data[note].checked){
                checkbox.setAttribute('checked', true)
            }

            tdChecked.append(checkbox)
            tdTitle.append(data[note].title)
            tdCreated.append(data[note].createdAt)
            tdUpdated.append(data[note].updatedAt)
            tdDelete.append('[X]')
            tdEdit.append('Edit')
            tr.setAttribute('id', data[note]._id)
            tr.appendChild(tdChecked)
            tr.appendChild(tdTitle)
            tr.appendChild(tdCreated)
            tr.appendChild(tdUpdated)
            tr.appendChild(tdEdit)
            tr.appendChild(tdDelete)
            table.appendChild(tr)
            
            num++
        }
        div.append(table)
        notes.append(div)
        
        const pages = localStorage.getItem('pages')

        for(let page = 1; page <= pages; page++) {
            let a = document.createElement('a')
            a.setAttribute('name', page)
            a.setAttribute('class', 'pages')
            a.style.color = 'blue'
            a.textContent = `   ${page}    `
            notes.append(a)
        }
        let log = document.createElement('div')
        let logout = document.createElement('a')
        logout.setAttribute('name', 'logout')
        log.append(logout)
        notes.append(log)
} 

