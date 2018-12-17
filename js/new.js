function initMap(){
    
    
}
const baseURL = "https://trulysendit.herokuapp.com/"
if(localStorage.getItem('_token')==null){
    document.location.href='login.html';
 }


 function getLocation() {
     
    if (navigator.geolocation) {
     return navigator.geolocation.getCurrentPosition(showPosition);
    } else {
     console.log(
     "Geolocation is not supported by this browser.");
    }
  }
  
  function showPosition(position) {
    getReverseGeocodingData(position.coords.latitude,position.coords.longitude);
  }



const erroutput = document.querySelector('#errors')
let btn = document.querySelector('#submit');
btn.addEventListener('click', e => {
    e.preventDefault()
    errors = []
    let pickup_address = document.querySelector('#pickup_address').value
    let destination_address = document.querySelector('#dest').value
    let weight = document.querySelector('#weight').value
    let quantity = document.querySelector('#qty').value
    let recipient_email = document.querySelector('#remail').value
    let phone = document.querySelector('#rtel').value
    let recipient_name = document.querySelector('#rname').value
    let desc=document.querySelector('#desc').value
    if(is_valid_email(recipient_email)===false){
        errors.push('recipient email is invalid')
    }
    if (pickup_address.length<3 ) {
        errors.push('pickup_address should be atleast 4 characters long')
    }
    if (phone.length < 9) {
        errors.push('phone number should be atleast  10 characters')
    }
   
   if (recipient_name.length<4){
    errors.push('recipient name should atleast 4 characters long')
}
if (destination_address.length<3){
    errors.push('destination_address should atleast 4 characters long')
}
  
if(desc.length<5){
    errors.push('description should be atleast 6 charcters long')
}


    if (errors.length > 0) {

        errors.forEach(err => {
            display_erors(err);

            clear_errors();

        })
    } else {
        document.querySelector("#loading").classList.add("spinner-1");
        data = {
            "pickup_address": pickup_address,
            "destination_address": destination_address,
            "recipient_name":recipient_name,
            "recipient_phone_number":phone,
            "recipient_email":recipient_email,
            "quantity":parseInt(quantity),
            "parcel_description":desc,
            "weight":parseInt(weight)
        }
        createParcel(data)
    }






    e.preventDefault()

})


function is_valid_email(pickup_address) {
    var re = /\S+@\S+\.\S+/;
    return re.test(pickup_address);


}
function createParcel(data) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization','Bearer '+localStorage.getItem('_token'))
    fetch(baseURL + "parcels", {
        method: "POST",body: JSON.stringify(data), headers: headers
    })
        .then(response => 
            response.json()
            ).catch(err=>console.log(err)            )
        .then(jsondata => {
            document.querySelector("#loading").classList.remove("spinner-1");
            console.log(jsondata);
            
            if (jsondata['status']==="success") {
                document.location.href=`details.html?message=Parcel Created Successfully&parcel=${jsondata['parcel']}`;
            } else {
                display_erors(jsondata['message'])
                setTimeout(() => {

                }, 1000);
                clear_errors()
            }


        }).catch(err=>console.log(err)
        )

}

function display_erors(err) {
    err.toLowerCase();
    erroutput.innerHTML += `
    <li class=errlist>${err}</li>
    `
}

function clear_errors() {
    setTimeout(() => {
        erroutput.innerHTML = "";
    }, 4000);

}


function getReverseGeocodingData(lat, lng) {
    var latlng = new google.maps.LatLng(lat, lng);
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({ 'latLng': latlng }, function (results, status) {
        if (status !== google.maps.GeocoderStatus.OK) {
            alert(status);
        }
        if (status == google.maps.GeocoderStatus.OK) {
            console.log(results);
            let address = (results[0].formatted_address);
            document.querySelector('#pickup_address').value=address;
            return address;
        }else{
            document.querySelector('#pickup_address').value="Please Pick and address";
        }
    });
}