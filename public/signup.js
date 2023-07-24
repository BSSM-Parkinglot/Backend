document.getElementById("signup-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;
    const carnum = e.target.carnum.value;
    try {
      const response = await axios.post("/signup", {
        username,
        password,
        carnum,
      });
      const data = response.data;
      if (data === "carnum_fail") {
        alert("이미 등록된 차량번호입니다.");
      }
      else if (data === "user_fail") {
        alert("이미 등록된 이름입니다.");
      }
      else if (data === "success") {
        location.href = "/signup/info";
      }
    } catch (err) {
      console.error(err);
    }
    e.target.username.value = "";
    e.target.password.value = "";
    e.target.carnum.value = "";
  });