const deleteBtn = document.querySelectorAll('.admin-delete-btn');




deleteBtn.forEach(item => item.addEventListener('click', async function (e) {
    e.preventDefault();
    const link = item.parentElement.getAttribute('href');
    console.log(link);
    let product = JSON.stringify({
        alias: link
    });
    let request = new XMLHttpRequest();
    await request.open("DELETE", "/deleteProduct/:id", true);
    await request.setRequestHeader("Content-Type", "application/json");
    await request.send(product);

    setTimeout(function(){
        window.location.href = `/products`;
      }, 100);
}))