


/******** Contact-Form-Validation ******/

form.addEventListener('submit',(event) =>{
    event.preventDefault();
    validate();
})


 function validateusername(usernameVal){
       
       usernameVal = usernameVal.trim();
        
     if(usernameVal === ""){
     	setErrorMsg(username,'username cannot be blank');
     }else if(usernameVal.length <= 2){
         setErrorMsg(username,'username with min 3 characters');
     }else{
     	setSuccessMsg(username);
     }
       }

const isvalidEmail = (emailVal) =>{
	var atSymbol = emailVal.indexOf("@");
    if(atSymbol < 1) return false;
    var dot = emailVal.lastIndexOf('.');
    if(dot <= atSymbol +3)return false;
    if(dot === emailVal.length -1)return false;
    return true;
}

function validateemail(emailVal){

      emailVal = emailVal.trim();      

     if(emailVal === ""){
     	setErrorMsg(email,'email cannot be blank');
     }else if(!isvalidEmail(emailVal)){
         setErrorMsg(email,'Not a valid email');
     }else{
     	setSuccessMsg(email);
     }
       }

function validatephone(phoneVal){

      phoneVal = phoneVal.trim();
        
     if(phoneVal === ""){
     	setErrorMsg(phone, 'phone num cannot be blank');
     }else if(phoneVal.length != 10){
        setErrorMsg(phone,'Not a valid phone num');
     }else {
     	setSuccessMsg(phone);
     }
        } 

function setErrorMsg(input, errormsg){
     	const formControl = input.parentElement;
        const small = formControl.querySelector('small');
        formControl.className = "form-group error"
        small.innerHTML = errormsg;
     }
    
function setSuccessMsg(input){
     	const formControl = input.parentElement;
        formControl.className = "form-group success"
        
     }



function validate()
     {
        const usernameVal = document.getElementById('username').value;
        finalSuccessMsg(usernameVal);
     }

function sendcnts  (usernameVal,sRate, count) {

    if(sRate === count)
        {alert('Your details have been taken successfully');
          swal({
               title: "Thank You ! " + usernameVal,
               text: "Thanks for submitting your details",
               icon: "success",
               button: "STAY SAFE !",
               });
         }
    }

    function finalSuccessMsg (usernameVal) {
    
    let formCon = document.getElementsByClassName('form-group');
   
    var count = 2;
    
    for(var i = 0; i < formCon.length ; i++)
    {
        if(formCon[i].className === "form-group success")
            {var sRate = 0 + i ;
             sendcnts(usernameVal,sRate,count);}
         else{
            return false;
            }
    }

    }


/******* Go to Top ********/

var topBtn = document.getElementById("topbtn");
var toptext = document.getElementById("toptext");

window.onscroll = function(){ scrollFunction();}

function scrollFunction(){
	if(document.body.scrollTop > 100 || document.documentElement.scrollTop > 100)
	{
       topBtn.style.display = "block";
       toptext.style.display ="block";
	}
	else{
       topBtn.style.display = "none";
       toptext.style.display = "none";
	}
}

function gototop(){

   document.body.scrollTop = 0;
   document.documentElement.scrollTop = 0;
}

getcases();

var countriesarr = [];
var statesarr = [];
var distarr = [];
var datesarr = [];
var datescount = 5;

function getcases (){
   				fetch('https://api.covid19api.com/summary')
   				.then((data) =>{
                      data.json().then((coronadata) => {;
                       console.log(coronadata.Countries);
                       countriesarr = coronadata.Countries;
                       getworldcovid(coronadata.Countries)
                       uploadcountries(coronadata.Countries);
                   })
   				})
   				.catch((error) =>{
   					console.log(`Error : ${error}`);
   				})

   				fetch('https://api.covid19india.org/data.json')
   				.then((data) =>{
                      data.json().then((coronadata) => {;
                       console.log(coronadata.statewise);
                       statesarr = coronadata.statewise;
                       console.log(coronadata.cases_time_series);
                       datesarr = coronadata.cases_time_series.reverse();
                       initial5dates();
                       uploadstates(coronadata.statewise);
                   })
   				})
   				.catch((error) =>{
   					console.log(`Error : ${error}`);
   				})
    }

    function getworldcovid(worldcountries){

    let worldconfirm = 0,worldcured = 0,worlddeath = 0,worldactive = 0;

     worldcountries.forEach(function (country) {
     let { Country,TotalConfirmed,TotalDeaths,TotalRecovered,NewConfirmed,NewDeaths,NewRecovered } = country;
     let Active = TotalConfirmed - ( TotalDeaths + TotalRecovered );
     worldactive += Active;worldconfirm += TotalConfirmed ; worlddeath += TotalDeaths; worldcured += TotalRecovered;
     
         
     })

    document.getElementById("worldconfirm").innerHTML = worldconfirm;
    document.getElementById("worldactive").innerHTML = worldactive;
    document.getElementById("worldcured").innerHTML = worldcured;
    document.getElementById("worlddeath").innerHTML = worlddeath;
    

    /****** cases counter effect ******/    
     $('.count').counterUp({
                delay: 10,
                time: 3000
            });



   }

function initial5dates(){

    
    let datesString = '';
	for(var i=0;i<5;i++)
	{
        datesString += `<table  class="table table-bordered table-striped text-center daysdata mt-4 mb-4 ml-auto mr-auto">
	    	<tr>
	    	  <th colspan="6"class="text-center">Date & Month</th>
	    	</tr>
	    	<tr id="dateofday" class="norecord"><th colspan="6">${datesarr[i].date}</th>
	    	</tr>
            <tr>
               <th class="dayconfirmed">Daily Confirmed</th>
               <th class="dayrecovered">Daily Recovered</th>
               <th class="daydeaths">Daily Deaths</th>
               <th class="dayconfirmed">Total Confirmed</th>
               <th class="dayrecovered">Total Recovered</th>
               <th class="daydeaths">Total Deaths</th>
           </tr>
           <tr>
                <td class="confirmed">${datesarr[i].dailyconfirmed}</td>
               <td class="recovered">${datesarr[i].dailyrecovered}</td>
               <td class="deaths">${datesarr[i].dailydeceased}</td>
               <td class="confirmed">${datesarr[i].totalconfirmed}</td>
               <td class="recovered">${datesarr[i].totalrecovered}</td>
               <td class="deaths">${datesarr[i].totaldeceased}</td>
           </tr>
           </table><hr>`
            
	}

	
	 document.getElementById("datesdiv").innerHTML =  datesString;
	for(var i=0;i<5;i++)
	{
		document.getElementsByClassName("daysdata")[i].style.display = "block";
	}
	
	
}


function show5dates(){

       let datesString= document.getElementById("datesdiv").innerHTML;

     for(var i=datescount;(i<datescount+5) && (i<datesarr.length);i++)
	{
        datesString += `<table  class="table table-bordered table-striped text-center daysdata mt-4 mb-4 ml-auto mr-auto">
	    	<tr>
	    	  <th colspan="6"class="text-center">Date & Month</th>
	    	</tr>
	    	<tr id="dateofday" class="norecord"><th colspan="6">${datesarr[i].date}</th>
	    	</tr>
            <tr>
               <th class="dayconfirmed">Daily Confirmed</th>
               <th class="dayrecovered">Daily Recovered</th>
               <th class="daydeaths">Daily Deaths</th>
               <th class="dayconfirmed">Total Confirmed</th>
               <th class="dayrecovered">Total Recovered</th>
               <th class="daydeaths">Total Deaths</th>
           </tr>
           <tr>
                <td class="confirmed">${datesarr[i].dailyconfirmed}</td>
               <td class="recovered">${datesarr[i].dailyrecovered}</td>
               <td class="deaths">${datesarr[i].dailydeceased}</td>
               <td class="confirmed">${datesarr[i].totalconfirmed}</td>
               <td class="recovered">${datesarr[i].totalrecovered}</td>
               <td class="deaths">${datesarr[i].totaldeceased}</td>
           </tr>
           </table><hr>`

           

	}

	 
	 document.getElementById("datesdiv").innerHTML =  datesString;
	for(var i=datescount ;(i<datescount+5) && (i<datesarr.length);i++)
	{
		document.getElementsByClassName("daysdata")[i].style.display = "block";
	}
	datescount += 5;
}


function uploadcountries(countries){

	let countriesString = `<tr class="sub_section">
	    		<th>Country</th>
	    		<th>Last updated Time</th>
	    		<th>Total Confirmed</th>
	    		<th>Total Recovered</th>
	    		<th>Total Deaths</th>
	    		<th>Currently Active</th>
	    		<th>New Confirmed</th>
	    		<th>New Recovered</th>
	    		<th>New Deaths</th>
	    	</tr>`;

    if(countries.length === 0)countriesString +=`<th colspan="9" class="norecord">No such Record Found</th>`;

   countries.forEach(function (country, index) {
    let { Country,TotalConfirmed,TotalDeaths,TotalRecovered,NewConfirmed,NewDeaths,NewRecovered } = country;
     let Active = TotalConfirmed - ( TotalDeaths + TotalRecovered );
    
     let dt = new Date(country.Date);
     let date = dt.getDate() + `/` + (dt.getMonth()+1)  + `/` + dt.getFullYear() +` `+dt.getHours()+`:` + dt.getMinutes() + `:` + dt.getSeconds();
     countriesString +=`<tr>
	    		<td class="country">${Country}</td>
	    		<td class="updatetime">${date}</td>
	    		<td class="confirmed">${TotalConfirmed}</td>
	    		<td class="recovered">${TotalRecovered}</td>
	    		<td class="deaths">${TotalDeaths}</td>
	    		<td class="curactive">${Active}</td>
	    		<td class="confirmed">${NewConfirmed}</td>
	    		<td class="recovered">${NewRecovered }</td>
	    		<td class="deaths">${NewDeaths}</td>
	    	</tr>`;
     
    })
    
    document.getElementById("countrydata").innerHTML = countriesString;

}   			

function uploadstates(states){

	let statesString = `<tr class="sub_section">
	    		<th>State</th>
	    		<th>Last updated Time</th>
	    		<th>Total Confirmed</th>
	    		<th>Total Recovered</th>
	    		<th>Total Deaths</th>
	    		<th>Currently Active</th>
	    		<th>New Confirmed</th>
	    		<th>New Recovered</th>
	    		<th>New Deaths</th>
	    	</tr>`;
    
    if(states.length === 0)statesString +=`<th colspan="9" class="norecord">No such Record Found</th>`;
    states.forEach(function (st, index) {
    let {state,lastupdatedtime,confirmed,active,recovered,deaths,deltaconfirmed,deltarecovered,deltadeaths} = st;
    if(state != 'Total'){
     statesString +=`<tr>
	    		<td class="country">${state}</td>
	    		<td class="updatetime">${lastupdatedtime}</td>
	    		<td class="confirmed">${confirmed}</td>
	    		<td class="recovered">${recovered}</td>
	    		<td class="deaths">${deaths}</td>
	    		<td class="curactive">${active}</td>
	    		<td class="confirmed">${deltaconfirmed}</td>
	    		<td class="recovered">${deltarecovered}</td>
	    		<td class="deaths">${deltadeaths}</td>
	    	</tr>`;
    }
    
     
    })

    document.getElementById("statedata").innerHTML = statesString;

}   			
 

function uploaddistricts(districts){

	let distString = `<tr class="sub_section">
	    		<th>District</th>
	    		<th>Total Confirmed</th>
	    		<th>Total Recovered</th>
	    		<th>Total Deaths</th>
	    		<th>Currently Active</th>
	    		<th>New Confirmed</th>
	    		<th>New Recovered</th>
	    		<th>New Deaths</th>
	    	</tr>`;

	 if(districts.length === 0) distString +=`<th colspan="9" class="norecord">No such State Present , 
	 	Select one of the State Present in India's States List</th>`
    
    for(const key in districts)
    {
       	distString +=`<tr>
       	              <td class="country">${key}</td>
       	              <td class="confirmed">${districts[key].confirmed}</td>
	     		<td class="recovered">${districts[key].recovered}</td>
	     		<td class="deaths">${districts[key].deceased}</td>
	     		<td class="curactive">${districts[key].active}</td>
	    		<td class="confirmed">${districts[key].delta.confirmed}</td>
	     		<td class="recovered">${districts[key].delta.recovered}</td>
	     		<td class="deaths">${districts[key].delta.deceased}</td>
	     	</tr>`;
        
    }
    
             
    if(document.getElementById("searchdist").innerHTML === "Click to See All The Districts")
    	distString = '';
   
     document.getElementById("distdata").innerHTML = distString;

}   			
 



  /******* Search for country , state *******/

  function searchname(searchobj,searchValue) {
   
   var searchID = searchobj.id;
   if(searchID === "countrysearch"){
  let searchedcountries = countriesarr.filter(function (country, index) {
    let searchString = country.Country ;

    return searchString.toUpperCase().indexOf(searchValue.trim().toUpperCase()) != -1;
  });
  document.getElementById("countrydata").style.display = "block";
  uploadcountries(searchedcountries);}
   
   else if(searchID === "statesearch"){
   	   let searchedstates = statesarr.filter(function (st, index) {
       let searchString = st.state;
    
    return searchString.toUpperCase().indexOf(searchValue.trim().toUpperCase()) != -1 ;
  });
  document.getElementById("statedata").style.display = "block";
  uploadstates(searchedstates);
   }

}

function showlist(caller){
	if(caller.id === "searchcountry")
	{let searchBtn = document.getElementById("searchcountry");
	let table= document.getElementById("countrydata");
	
	if(searchBtn.innerHTML === "See The Whole List Of Countries")
	{
         table.style.display = "block";
         searchBtn.innerHTML = "Hide The Whole List Of Countries";
	}
	else{
		 table.style.display = "none";
		 searchBtn.innerHTML = "See The Whole List Of Countries";
	}
   }

   else{
		let searchBtn = document.getElementById("searchstate");
	    let table= document.getElementById("statedata");
	if(searchBtn.innerHTML === "See The Whole List Of States")
	{
         table.style.display = "block";
         searchBtn.innerHTML = "Hide The Whole List Of States";
	}
	else{
		 table.style.display = "none";
		 searchBtn.innerHTML = "See The Whole List Of States";
	}
    }
}




function showdist(caller){
         let searchBtn = document.getElementById("searchdist");
         let stategiven = document.getElementById("distsearch").value;
         let statesmall = stategiven.trim().toLowerCase();
         let stateconverted = statesmall.charAt(0).toUpperCase() + statesmall.slice(1)
        
         fetch('https://api.covid19india.org/state_district_wise.json')
   				.then((data) =>{
                      data.json().then((coronadata) => {
                       var distlist = coronadata[stateconverted];console.log(distlist);
                       document.getElementById("distdata").style.display = 'block';
                       if(distlist == undefined){ var empty=[]; uploaddistricts(empty);}
                       else{
                       distarr = distlist.districtData;
                       console.log(distlist.districtData);
                       uploaddistricts(distlist.districtData);}
                   })
   				})
   				.catch((error) =>{
   					console.log(`Error : ${error}`);
   				})

        
	    
	    if(searchBtn.innerHTML === "Click to See All The Districts")
	    {
         
         searchBtn.innerHTML = "Hide The Current List Of Districts";
	     }
	     else{
		 
		 searchBtn.innerHTML = "Click to See All The Districts";
	     }
        

}
