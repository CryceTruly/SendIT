const baseURL="http://127.0.0.1:3000/api/v2/";
if(localStorage.getItem('_token')==null){
    document.location.href='../login.html?message=you need to log in first';
 }
 if(localStorage.getItem('is_admin')===true){
    document.location.href='../index.html?message=you cannot access that';
 }
document.querySelector("tbody").classList.add("spinner-1");
headers=new Headers()
headers.append('Content-Type', 'application/json');
headers.append('authorization','Bearer '+localStorage.getItem('_token'));
allparcels = null;
fetch(baseURL + "parcels", {
    method: "GET", headers: headers
})
    .then(response => response.json())
    .then(data => {
        console.log(data);
        
      allparcels=data.parcels;
          document.querySelector("tbody").classList.remove("spinner-1");
          document.querySelector('#total').textContent=`${data.parcels.length}`;

          cancelled=0;
          delivered=0;
          in_transit=0;
          pending=0;
        data.parcels.forEach(parcel=>{

            if(parcel['status']=='cancelled'){
                cancelled+=1;
            }
            if(parcel['status']=='order_placed'){
                pending+=1;
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
            <td><a href=../details.html?parcel=${parcel.parcel_id}><i class="fa fa-long-arrow-right"></i></a></td>
            <td><a href="../editorder.html?order=${parcel.parcel_id}"><i class="fa fa-pencil"></i></a></td>
        </tr>
            `
            
        })
        document.querySelector('#can').textContent=`${cancelled}`;
        document.querySelector('#del').textContent=`${delivered}`;
        document.querySelector('#in').textContent=`${in_transit}`;
        document.querySelector('#pen').textContent=`${pending}`;

        document.querySelector('.container2').addEventListener('click',filterToCancelled)
        document.querySelector('.container3').addEventListener('click',filterToDelivered)
        document.querySelector('.container5').addEventListener('click',filterToPending)
        document.querySelector('.container4').addEventListener('click',filterToIntransit)
        document.querySelector('.container1').addEventListener('click',function(){
            document.location.reload();
        })
       
      
       
       


    })


    function formatDate(date){
        return date.split('00')[0];
    }

    function filterToCancelled(){
        document.querySelector('tbody').innerHTML="";
        document.querySelector('tbody').classList.add('spinner-1');
        allparcels.forEach(parcel=>{
        if(parcel['status']=='cancelled'){
            document.querySelector('tbody').innerHTML+=`
            <tr>
            <td>${parcel.parcel_id}</td>
            <td>${parcel.sender_email}</td>
            <td>${parcel.pickup_address}</td>
            <td>${parcel.destination_address}</td>
            <td>${formatDate(parcel.placed)}</td>
            <td><a href=../details.html?parcel=${parcel.parcel_id}><i class="fa fa-long-arrow-right"></i></a></td>
            <td><a href="../editorder.html?order=${parcel.parcel_id}"><i class="fa fa-pencil"></i></a></td>
        </tr>
            `
        
            }
            setTimeout(() => {
                document.querySelector('tbody').classList.remove('spinner-1');
            }, 1000);
        
        })

    }
    
    function filterToDelivered(){
        document.querySelector('tbody').innerHTML="";
        document.querySelector('tbody').classList.add('spinner-1');
        allparcels.forEach(parcel=>{
        if(parcel['status']=='delivered'){
            document.querySelector('tbody').innerHTML+=`
            <tr>
            <td>${parcel.parcel_id}</td>
            <td>${parcel.sender_email}</td>
            <td>${parcel.pickup_address}</td>
            <td>${parcel.destination_address}</td>
            <td>${formatDate(parcel.placed)}</td>
            <td><a href=../details.html?parcel=${parcel.parcel_id}><i class="fa fa-long-arrow-right"></i></a></td>
            <td><a href="../editorder.html?order=${parcel.parcel_id}"><i class="fa fa-pencil"></i></a></td>
        </tr>
            `
        
            }
            setTimeout(() => {
                document.querySelector('tbody').classList.remove('spinner-1');
            }, 1000);
        
        })

    }
    function filterToIntransit(){
        document.querySelector('tbody').innerHTML="";
        document.querySelector('tbody').classList.add('spinner-1');
        allparcels.forEach(parcel=>{
        if(parcel['status']=='in_transit'){
            document.querySelector('tbody').innerHTML+=`
            <tr>
            <td>${parcel.parcel_id}</td>
            <td>${parcel.sender_email}</td>
            <td>${parcel.pickup_address}</td>
            <td>${parcel.destination_address}</td>
            <td>${formatDate(parcel.placed)}</td>
            <td><a href=../details.html?parcel=${parcel.parcel_id}><i class="fa fa-long-arrow-right"></i></a></td>
            <td><a href="../editorder.html?order=${parcel.parcel_id}"><i class="fa fa-pencil"></i></a></td>
        </tr>
            `
        
            }
            setTimeout(() => {
                document.querySelector('tbody').classList.remove('spinner-1');
            }, 1000);
        
        })

    }

    function filterToPending(){
        document.querySelector('tbody').innerHTML="";
        document.querySelector('tbody').classList.add('spinner-1');
        allparcels.forEach(parcel=>{
        if(parcel['status']=='order_placed'){
            document.querySelector('tbody').innerHTML+=`
            <tr>
            <td>${parcel.parcel_id}</td>
            <td>${parcel.sender_email}</td>
            <td>${parcel.pickup_address}</td>
            <td>${parcel.destination_address}</td>
            <td>${formatDate(parcel.placed)}</td>
            <td><a href=../details.html?parcel=${parcel.parcel_id}><i class="fa fa-long-arrow-right"></i></a></td>
            <td><a href="../editorder.html?order=${parcel.parcel_id}"><i class="fa fa-pencil"></i></a></td>
        </tr>
            `
        
            }
            setTimeout(() => {
                document.querySelector('tbody').classList.remove('spinner-1');
            }, 1000);
        
        })

    }

