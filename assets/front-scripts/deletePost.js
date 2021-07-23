const deleteBtn = document.querySelectorAll('.admin-delete-btn');




deleteBtn.forEach(item => item.addEventListener('click', async function (e) {
    e.preventDefault();
    const link = item.parentElement.getAttribute('href');
    console.log(link);
    
    let product = JSON.stringify({
        alias: link
    });
    let request = new XMLHttpRequest();
    request.open("DELETE", "/deleteNews/:id", true);
    request.setRequestHeader("Content-Type", "application/json");
    console.log(product, link);
    await request.send(product);

    setTimeout(function(){
        window.location.href = `/news`;
      }, 100);
}))