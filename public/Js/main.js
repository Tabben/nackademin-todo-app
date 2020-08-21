document.addEventListener('DOMContentLoaded', async (event) => {   
    localStorage.setItem('currPage', 1);
        load()
})
document.addEventListener('click', async (event) => {

    let currPage = localStorage.getItem('currPage');
    const totalPages = localStorage.getItem('maxPages')

    // console.log('currPage: ' + currPage)
    // console.log('totalPages: ' + totalPages)

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
            load()
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

        let title = document.getElementById('newTitle').value

        let data = {
            title: title
        }

        const post = {
            method: 'POST', 
            headers: {
                'Content-type': 'application/json' },
            body: JSON.stringify(data)
        }

        await fetch('/', post)
        .then(res => console.log(res))
        .then(data => load())
        .catch(err => console.log(err))
    }

    if(event.target.textContent == 'Created at') {
        
        let sortBy = event.target.name

        let data = {
            sortBy: sortBy
        }
        console.log()
        const options = {
            method: 'POST', 
            headers: {
                'Content-type': 'application/json' },
            body: JSON.stringify(data)
        }

        await fetch('/sortCreated', options)
        .then(res => res.text())
        .then(data => {

            let created = document.getElementById('created' + currPage)
            if(event.target.name > 0) {
                created.name = -1
            } else {
                created.name = 1
            }
          
 
            fillPage(data)
        })
        .catch(err => console.log(err))
        
    }

    if(event.target.textContent == 'Updated at') {

        let sortBy = event.target.name

        let data = {
            sortBy: sortBy
        }

        const options = {
            method: 'POST', 
            headers: {
                'Content-type': 'application/json' },
            body: JSON.stringify(data)
        }

        await fetch('/sortUpdated', options)
        .then(res => res.text())
        .then(data => {

            let updated = document.getElementById('updated' + currPage)
            if(event.target.name > 0) {
                updated.name = -1
            } else {
                updated.name = 1
            }

            fillPage(data)
        })
        .catch(err => console.log(err))
        
    }

    if(event.target.textContent == 'Next') {

        let currTable = document.getElementById('table' + currPage);
        currTable.style.display = 'none'
        
        currPage++;

        localStorage.setItem('currPage', currPage);
    
        let newTable = document.getElementById('table' + currPage)
        newTable.style.display = 'block'

        let next = document.getElementById('next')
        let prev = document.getElementById('prev')
        if(currPage < totalPages) {
            next.disabled = false;
        } else {
            next.disabled = true;
        }
        if(currPage == 1) {
            prev.disabled = true
        } else {
            prev.disabled = false;
        }
    }

    if(event.target.textContent == 'Back') {

        let currTable = document.getElementById('table' + currPage);
        currTable.style.display = 'none'
        
        currPage--;

        localStorage.setItem('currPage', currPage);

        
    
        let newTable = document.getElementById('table' + currPage)
        newTable.style.display = 'block'

        let next = document.getElementById('next')
        let prev = document.getElementById('prev')
        if(currPage < totalPages) {
            
            next.disabled = false;
        } else {

            next.disabled = true;
        }
        if(currPage == 1) {
            
            prev.disabled = true;
        } else {

            prev.disabled = false;
        }
    }
    console.log(currPage)
})

async function load() {
    await fetch('/all', {method: 'GET'})
    .then(res => res.text())
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

    const limit = 5
    localStorage.setItem('limit', 5);
    localStorage.setItem('dataLength', data.length);
    let num = 0
    for(let page = 1; page <= Math.ceil(data.length/limit); page++) {
        
        localStorage.setItem('maxPages', page)
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

        aCreated.setAttribute('id', 'created'+page)
        aUpdated.setAttribute('id', 'updated'+page)

        td1.textContent = 'Done'
        td2.textContent = 'To-Do'
        td3.appendChild(aCreated)
        td4.appendChild(aUpdated)

        trDesc.appendChild(td1)
        trDesc.appendChild(td2)
        trDesc.appendChild(td3)
        trDesc.appendChild(td4)

        table.appendChild(trDesc)
        table.setAttribute('id', 'table'+page)

        for(let note = num; note < data.length; note++) {
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
            if((num/limit) == page) {
                break;
            }
        }
        if(page > 1) {
            table.style.display = 'none'
        }
        notes.append(table)
        
    }
    if(num > 4) {
        let next = document.createElement('button')
        let prev = document.createElement('button')

        next.setAttribute('value', '2')
        prev.setAttribute('value', '1')

        next.setAttribute('id', 'next')
        prev.setAttribute('id', 'prev')

        next.textContent = 'Next'
        prev.textContent = 'Back'

        notes.append(prev)
        notes.append(next)

        if(data.length/limit >= 1) {

            let prev = document.getElementById('prev')
            prev.disabled = true;
        }

        if(data.length/limit <= 1) {
            let next = document.getElementById('next')
            next.disabled = true;
        }


    }
} 

