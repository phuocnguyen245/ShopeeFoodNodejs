const setUserName = () => {
  const changeName = document.querySelector(".btn-login a");
  const currentUser = JSON.parse(window.localStorage.getItem("currentUser"));


  if (!currentUser.username) {
    const getUserName = currentUser.map((currentUser) => currentUser.username);
    if (getUserName === null) {
      changeName.innerText = "Đăng nhập";
    }
    else {
      changeName.innerText = "Đăng xuất " + getUserName;
    }
  }

  changeName.onclick = () => {
    const logout = {
      username: null,
      password: null
    }
    window.localStorage.setItem("currentUser", JSON.stringify(logout));
  }
}
setUserName();
