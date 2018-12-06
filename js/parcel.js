const urlParams = new URLSearchParams(window.location.search);
const current_item=urlParams.get('parcel')
const baseURL="http://127.0.0.1:3000/api/v2/";
headers=new Headers()
document.querySelector(".oneleft").classList.add("spinner-1");
headers.append('Content-Type', 'application/json');
headers.append('authorization','Bearer '+localStorage.getItem('_token'))
fetch(baseURL + `parcels/${current_item}`, {
    method: "GET", headers: headers
})
    .then(response => response.json())
    .then(data => {
        console.log(data);
        
      document.querySelector(".new").innerHTML=`          Created                  ${data.created}`;
      document.querySelector(".id").innerHTML=`Order #${data.parcel_id}`;
          document.querySelector(".oneleft").classList.remove("spinner-1");
          document.querySelector(".oneleft").innerHTML=`
          
          <h4><strong>Pick Up Location Address</strong></h4>
          <p>${data.pickup_address}</p>

          <h4><strong>Destination Address</strong></h4>
          <span> ${data.destination_address}</span>

          <h4><strong>Estimated Distance</strong></h4>
          <span> ${data.distance} km</span>
  

          <h4><strong>Description</strong></h4>
          <span> ${data.parcel_description}</span>

        

          <h4>Current Location</h4>
          <p>${data.current_location}</p>

          <h4>Status</h4>
          <p>${data.status}</p>

          <h4>Total Weight</h4>
          <span>${data.weight} kg</span>

          <h4>Sender Address</h4>
          <span>${data.sender_email}</span>
          <h4>Recipient Address</h4>
          <span>${data.recipient_email}</span>

          <h4>Total Price</h4>
          <span>${data.price} USD</span>

          </div>


          <div class="row first">
          <div class="column">
             <button class="button" id=printbtn onclick=printOrder()>Print Order</button>
              <button class="button" id=cancelbtn onclick=cancelOrder("${data.status}")>Cancel Order</button>
              <button class="button" id=deletebtn onclick=deleteOrder(${data.parcel_id})>Delete Order</button>
              <button class="button btn-info"><a href=changedest.html?parcel=${data.parcel_id}>Change Destination Address</a></button>
          </div>
      </div>
          `
         
        
      
       
       


    })

function cancelOrder(status){
    console.log(status);
    
   
    
    if(status==='cancelled'){
        alert('order already cancelled')
        return false;
    }
    let userinput=confirm('are you sure you want to cancel this order?')
    if(userinput){
        fetch(baseURL +`parcels/${current_item}/cancel`, {
            method: "PUT", headers: headers
        })
            .then(response => response.json())
            .then(jsondata => {
                document.querySelector("body").classList.remove("spinner-1");     
                alert('item cancelled')
                document.location.href='profile.html';
    
    
            })
        
        
    }
    
    
}


function deleteOrder(id){
    let userinput=confirm('are you sure you want to delete this order?')
    if(userinput){
        fetch(baseURL +`parcels/${current_item}/delete`, {
            method: "DELETE", headers: headers
        })
            .then(response => response.json())
            .then(jsondata => {
                document.querySelector("body").classList.remove("spinner-1");     
                alert('item deleted')
                document.location.href='profile.html';
    
    
            }).catch(err=>console.log(err)
            )
        
        
    }

}

function printOrder(){
    document.querySelector(".first").innerHTML=`<hr>
    <i><b>SendIT</b> parcel delivery services</i>
    `;
    var printContents = document.getElementById('printsection').innerHTML;
    var originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;

    window.print();

    document.body.innerHTML = originalContents;
}