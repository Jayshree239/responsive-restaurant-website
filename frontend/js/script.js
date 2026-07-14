fetch("http://localhost:5000/api/menu")
.then(res => res.json())
.then(data => {
  const menuDiv = document.getElementById("menuItems");

  data.forEach(item => {
    menuDiv.innerHTML += `
      <div class="col-md-4 mb-4">
        <div class="card p-3">
          <h5>${item.name}</h5>
          <p>₹${item.price}</p>
          <span class="badge bg-primary">${item.category}</span>
        </div>
      </div>
    `;
  });
});
