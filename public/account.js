document.getElementById("account-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const carnum = e.target.carnum.value;
    const account = e.target.account.value;
    try {
      const response = await axios.post("/account", { carnum, account });
      const data = response.data;
      if(data === "success") {
        alert("계좌 등록이 완료 되었습니다.");
        location.href = "/";
      }
      else if(data === "fail") {
        alert("로그인을 해주시기 바랍니다.");
        location.href = "/login";
      }
      else if (data === "notcarnum") {
        alert("자동차 번호가 다릅니다.")
      }
    } catch (err) {
      console.error(err);
    }
    e.target.carnum.value = "";
    e.target.account.value = "";
  });