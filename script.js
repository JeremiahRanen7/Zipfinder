document.querySelector("#zip").addEventListener("submit", getLocationInfo);
document.querySelector("body").addEventListener("click", deleteLocation);

function getLocationInfo(e) {
  const zipCode = document.querySelector("#zipcode").value;
  fetch(`http://api.zippopotam.us/us/${zipCode}`)
    .then((response) => {
      if (response.status != 200) {
        showIcon("remove");
        document.querySelector("#output").innerHTML = `
                <article class="message is-danger">
                <div class="message-body">
                   Invalid Zip Code , Please enter a valid zip code
                </div>
                </article>
            `;
        throw Error(response.statusText);
      } else {
        showIcon("check");
        return response.json();
      }
    })
    .then((data) => {
      console.log(data);
      let output = "";
      data.places.forEach(place =>{
        output += `
        <article class="message is-info">
            <div class="message-header">
                <p>Location Info</p>
                <button class="delete" aria-label="delete"></button>
            </div>
            <div class="message-body">
                <ul>
                  <li><strong>City:</strong> ${place['place name']}</li>
                 <li><strong>City:</strong> ${place['state']}</li>
                  <li><strong>City:</strong> ${place['longitude']}</li>
                  <li><strong>City:</strong> ${place['latitude']}</li>
                </ul>
            </div>
        </article>
        `;
      });
      document.querySelector("#output").innerHTML = output;
    })
    .catch(err=>console.log(err));

  e.preventDefault();
}

function showIcon(icon){
    document.querySelector(".icon-remove").style.display="none";
    document.querySelector(".icon-check").style.display="none";
    document.querySelector(`.icon-${icon}`).style.display="inline-flex";
}

function deleteLocation(e){
    if(e.target.className=="delete"){
        document.querySelector(".message").remove();
        document.querySelector("#zipcode").value="";
        document.querySelector(".icon-check").remove();
    }
}