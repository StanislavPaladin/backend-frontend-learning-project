

function goToAccount(e) {
  let link = `${localStorage.getItem('name')}`;
  console.log(link);
  location.href = `/account/${link}`
}