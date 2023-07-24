document.getElementById("car-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const carnum = e.target.carnum.value;

  try {
    await axios.post("/car", { carnum });
  } catch (err) {
    console.error(err);
  }
  e.target.carnum.value = "";
});
