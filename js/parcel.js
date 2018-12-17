const urlParams = new URLSearchParams(window.location.search);
const current_item=urlParams.get('parcel');
const msg=urlParams.get("message");
if(msg){
    document.querySelector("#msgoutput").innerHTML=`
    <li>
        <h4 class="success">${msg}</h4></li>`;

   setTimeout(() => {
    document.querySelector("#msgoutput").innerHTML=``;
   }, 4000);
}
 
 const baseURL = "https://trulysendit.herokuapp.com/";
headers=new Headers()
document.querySelector(".oneleft").classList.add("spinner-1");
headers.append('Content-Type', 'application/json');
headers.append('authorization','Bearer '+localStorage.getItem('_token'));
headers.append('Access-Control-Allow-Origin','*');
headers.append('Access-Control-Allow-Headers','Origin,X-Requested-With,Content-Type,Accept');
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
          <span> ${Math.round(data.distance)} km</span>
          <h4><strong>Estimated Trip Duration</strong></h4>
          <span> ${(getEstimatedTime(data.distance))}</span>
  

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
          <span>${Math.round(data.price)} USD</span>

          

          </div>


          <div class="row first">
          <div class="column">
             <button class="button btn-green" id=printbtn onclick=printOrder()>Print Order</button>
              <button class="button btn-pink" id=cancelbtn onclick=cancelOrder("${data.status}")>Cancel Order</button>
              <button class="button btn-red" id=deletebtn onclick=deleteOrder(${data.status})>Delete Order</button>
              <button class="button btn-info"><a href=changedest.html?parcel=${data.parcel_id}>Edit Destination</a></button>
          </div>
      </div>
          `
         
        
          check_user_actions(data.user_id,localStorage.getItem('user_id'),data.status);
          initMap(data.pickuplat_lng,data.destination_latlng,data.pickup_address,data.destination_address);
          
       
       


    })

  

    // Initialize and add the map
function initMap(v,v2,p1,p2) {
    var options = {
        zoom:8,
        center:v
      }
      
      // New map
      var map = new google.maps.Map(document.getElementById('map'), options);
      
      // Add marker
      var marker = new google.maps.Marker({
        position:v,
        map:map
      });


      //ADD POLYLINES
      var flightPlanCoordinates = [
        v,
        v2
        
      ];
      var flightPath = new google.maps.Polyline({
        path: flightPlanCoordinates,
        geodesic: true,
        strokeColor: '#FF0000',
        strokeOpacity: 1.0,
        strokeWeight: 2
      });

      flightPath.setMap(map);
   
      var infoWindow = new google.maps.InfoWindow({
        content:`${p1}`
      });

      marker.addListener('click', function(){
        infoWindow.open(map, marker);
      });
      
      
    var markers = [
        {
          coords:v,
          content:`${p1}`
        },
        {
          coords:v2,
          content:`${p2}`
        }
    ]
    // Loop through markers
    for(var i = 0;i < markers.length;i++){
        // Add marker
        addMarker(markers[i]);
      }

      // Add Marker Function
      function addMarker(props){
        var marker = new google.maps.Marker({
          position:props.coords,
          map:map,
          //icon:props.iconImage
        });
    
     // Check for customicon
     if(props.iconImage){
        // Set icon image
        marker.setIcon(props.iconImage);
      }

      // Check content
      if(props.content){
        var infoWindow = new google.maps.InfoWindow({
          content:props.content
        });

        marker.addListener('click', function(){
          infoWindow.open(map, marker);
        });
      }
  }

}

function cancelOrder(status){
    console.log(status);
    
   
    
    if(status==='cancelled'){
        document.location.href=`details.html?message=order already cancelled&parcel=${current_item}`;
      
        return false;
    }
    if(status==='in_transit'){
        document.location.href=`details.html?message=order already in transit&parcel=${current_item}`;
      
        return false;
    }
    if(status==='delivered'){
        document.location.href=`details.html?message=order already delivered&parcel=${current_item}`;
         
        return false;
    }
    let userinput=confirm('are you sure you want to cancel this order?')
    if(userinput){
        fetch(baseURL +`parcels/${current_item}/cancel`, {
            method: "PUT", headers: headers
        })
            .then(response => response.json())
            .then(jsondata => {
                console.log(jsondata);
                
                document.querySelector("body").classList.remove("spinner-1");     
                document.location.href=`details.html?message=Parcel Cancelled Successfully&parcel=${current_item}`;
         
    
    
            })
        
        
    }
    
    
}


function deleteOrder(status){
    if(status==='cancelled'){
        document.location.href=`details.html?message=order already cancelled&parcel=${current_item}`;
      
        return false;
    }
    if(status==='in_transit'){
        document.location.href=`details.html?message=order already in transit&parcel=${current_item}`;
      
        return false;
    }
    if(status==='delivered'){
        document.location.href=`details.html?message=order already delivered&parcel=${current_item}`;
         
        return false;
    }
    let userinput=confirm('are you sure you want to delete this order?')
    if(userinput){
        fetch(baseURL +`parcels/${current_item}/delete`, {
            method: "DELETE", headers: headers
        })
            .then(response => response.json())
            .then(jsondata => {
                document.querySelector("body").classList.remove("spinner-1");     

                if(jsondata['parcel_id']){
                 
                    document.location.href='profile.html?message=order deleted';
                }else{
                    document.location.href=`details.html?message=${jsondata['message']}&parcel=${current_item}`;
         
                    
                }
               
    
    
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

    document.location.reload();
}

function check_user_actions(user,owner,status){
    console.log(owner);
    
    if(user!=owner){
      
        document.querySelector(".first").innerHTML=`<hr>
    Logged in as administrator`;
    if(status=='order_placed'||status=='in_transit'){
      
        document.querySelector(".first").innerHTML=`<hr>
    Logged in as administrator
<br>
<br>
    <a class= "button" href=editorder.html?order=${current_item}>Update Present Location</a>
    `;

  
    }
    
    }
}

function getEstimatedTime(distance){
    const speed=50;
    let duration = distance/speed;
    let min=duration.toString().split('.')[1];
    new_min_val='0.'.concat(min)
    
    bmin=new_min_val*60;
    if(parseInt(duration) > 0){
        return parseInt(duration).toString()+"hr "+parseInt(bmin).toString()+"min";

    }
else{
    return parseInt(bmin).toString()+" Minutes";
}

}