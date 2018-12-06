const baseURL="http://127.0.0.1:3000/api/v2/";
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
          document.querySelector('#total').textContent=`${data.parcels.length}`;

          cancelled=0;
          delivered=0;
          in_transit=0;
        data.parcels.forEach(parcel=>{

            if(parcel['status']=='cancelled'){
                cancelled+=1;
            }
            if(parcel['status']=='in_transit'){
                in_transit+=1;
            }
            if(parcel['status']=='delivered'){
                delivered+=1;
            }
            
            document.querySelector('tbody').innerHTML+=`
            <tr>
            <td>${parcel.parcel_id}</td>
            <td>${parcel.sender_email}</td>
            <td>${parcel.pickup_address}</td>
            <td>${parcel.destination_address}</td>
            <td>${formatDate(parcel.placed)}</td>
            <td><a href=../details.html?parcel=${parcel.parcel_id} class="button">Details</a></td>
            <td><a href="../editorder.html?order=${parcel.parcel_id}" class="button">Update</a></td>
        </tr>
            `
            
        })

        document.querySelector('#can').textContent=`${cancelled}`;
        document.querySelector('#del').textContent=`${delivered}`;
        document.querySelector('#in').textContent=`${in_transit}`;
      
       
       


    })


    function formatDate(date){
        return date.split('00')[0];
    }
    