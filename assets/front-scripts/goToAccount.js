// let goToAccBtn = document.getElementById('account');

// goToAccBtn.addEventListener('click', async function (e) {
  // e.preventDefault();
  function goToAccount () {
    let link = `${localStorage.getItem('name')}`;
    console.log(link);
    location.href = `/account/${link}`
  }



// })