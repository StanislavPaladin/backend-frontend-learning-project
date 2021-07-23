/*т.к. предусмотрена только одна роль - админ, я проверяю пользователя на налчичие токена, и при его наличии - добавляю элементы редактирования*/
export default function adminCheck (){
const editBtn = document.querySelectorAll('.admin-edit-btn');
const deleteBtn = document.querySelectorAll('.admin-delete-btn');
const addBtn = document.querySelectorAll('.admin-add-btn');
const createProduct = document.querySelectorAll('#createProduct-form');
const createPost = document.querySelectorAll('#createPost-form');
if(localStorage.token) {
    let adminTools = [editBtn, deleteBtn, addBtn, createPost, createProduct];
    for (let i = 0; i < adminTools.length; i++) {
        adminTools[i].forEach(item => {
            item.classList.remove('hide')
            item.classList.add('show')
        })
    }
   
} else {
    let adminTools = [editBtn, deleteBtn, addBtn, createPost, createProduct];
    for (let i = 0; i < adminTools.length; i++) {
        adminTools[i].forEach(item => {
            item.classList.remove('show')
        item.classList.add('hide');
        })
    }
}
}
