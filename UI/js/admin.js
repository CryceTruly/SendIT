const baseURL="https://trulysendit.herokuapp.com/api/v2/";
headers=new Headers()
document.querySelector("tbody").classList.add("spinner-1");
headers.append('Content-Type', 'application/json');
headers.append('authorization','Bearer '+localStorage.getItem('_token'))
fetch(baseURL + "parcels", {
    method: "GET", headers: headers
})
    .then(response => response.json())
    .then(data => {
        document.querySelector("tbody").classList.remove("spinner-1");
        
    data.parcels.forEach(parcel=>{
        
        
        document.querySelector('tbody').innerHTML+=`
        <tr>
        <td>${parcel.parcel_id}</td>
        <td>${parcel.sender_email}</td>
        <td>${parcel.pickup_address}</td>
        <td>${parcel.destination_address}</td>
          <td>${parcel.placed}</td>
          <td><a href="../editorder.html?order=${parcel.parcel_id}" class="button">Update</a></td>
      </tr>
        `
        
    })
      
       
       


    })
