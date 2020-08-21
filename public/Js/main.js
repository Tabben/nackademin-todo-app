// const functions = require('../../Controller/functions')

document.addEventListener('DOMContentLoaded', async (event) => {   

        await fetch('/all', {method: 'GET'})
        .then(res => res.text())
        .then(val => {
            const notes = document.getElementById('notes')
            let data = JSON.parse(val)
            let table = document.createElement('table')
            let trDesc = document.createElement('tr')
            let td1 = document.createElement('td')
            let td2 = document.createElement('td')
            let td3 = document.createElement('td')
            let td4 = document.createElement('td')

            td1.textContent = 'Done'
            td2.textContent = 'To-Do'
            td3.textContent = 'Created at'
            td4.textContent = 'Updated at'

            trDesc.appendChild(td1)
            trDesc.appendChild(td2)
            trDesc.appendChild(td3)
            trDesc.appendChild(td4)
            table.appendChild(trDesc)
            table.setAttribute('id', 'table')

            let num = 1
            for(let note in data){
                let tr = document.createElement('tr')
                let tdChecked = document.createElement('td')
                let tdTitle = document.createElement('td')
                let tdCreated = document.createElement('td')
                let tdUpdated = document.createElement('td')
                let tdDelete = document.createElement('td')
                let tdEdit = document.createElement('td')

                let checkbox = document.createElement('input')
                checkbox.setAttribute('id', 'check'+num)
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
            notes.append(table)
        })
        .catch(err => console.log(err))
})
document.addEventListener('click', async (event) => {

    let targetGrandpa = event.target.parentNode.parentNode
    let targetParent = event.target.parentNode
    let target = event.target
    let parentId = targetParent.id
    let grandpaId = targetParent.parentNode.id
    let index = Array.prototype.indexOf.call(targetParent.parentNode.children, targetParent)

    if(target.textContent == '[X]'){
        
        targetGrandpa.removeChild(targetParent)
        
        await fetch(`/${parentId}`, {method: 'DELETE'})
        .then(res => res.text())
        .then(log => console.log(log))
        .catch(err => console.log(err))
    }
    
    if(target.textContent == 'Edit'){


        fetch(`/note/${parentId}`, {method: 'GET'})
        .then(res => res.text())
        .then(response => {

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
                'Content-type': 'application/json' },
            body: JSON.stringify(data) 
        }
        
        await fetch(`/${currId}`, put)
        .then(res => {
            console.log(res)
            reload()
        })
        .catch(err => console.log(err))
       
    }

    if(event.target.type == 'checkbox') {

        let inputGrandPaIndex =Array.prototype.indexOf.call(targetParent.parentNode.parentNode.children, targetParent.parentNode)
        let done = document.getElementById('check' + inputGrandPaIndex).checked
        const data = {
            checked: done
        }
        const patch = {
            method: 'PATCH', 
            headers: {
                'Content-type': 'application/json' },
            body: JSON.stringify(data) 
        }

        await fetch(`/${grandpaId}`, patch)
        .then(res => console.log(res))
        .catch(err => console.log(err))
    }

    if(event.target.id == 'addNew') {
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

    if(event.target.id == 'addNewTask') {
        console.log('hej')

        let title = document.getElementById('newTitle').value

        let data = {
            title: title
        }

        console.log(title)
        const post = {
            method: 'POST', 
            headers: {
                'Content-type': 'application/json' },
            body: JSON.stringify(data)
        }

        await fetch('/', post)
        .then(res => console.log(res))
        .then(data => reload())
        .catch(err => console.log(err))
    }
})

function reload() {
    setTimeout( () => {
        window.location.reload(1);
    }, 1000)
}