const getEvData = async () => {
  let Companyname = document.getElementById("input_name").value;
  //console.log(Companyname);
  let url;
  let api_data;
  let array_data;
  if(Companyname!=''){
     url = `/api/V1/Evdata?Maker=${Companyname}`;
  }
  const api = await fetch(url);
 
  if(api.ok){
    api_data = await api.json();
    
    array_data = api_data.EvData;
    console.log(array_data);
 }
 else{
  alert("HTTP-Error: " + api.text);
 }
 

  res_buildEVTable();

  function res_buildEVTable() {
    var table = document.getElementById("res_indexTable");
    var count=0;
    table.innerHTML = "";
    for (var i = 0; i < array_data.length; i++) {
      count+=array_data[i].milesDriven;
      var row = `<tr>
                        <td id="td">${array_data[i].make}</td>
                        <td id="td">${array_data[i].type}</td>
                        <td id="td">${array_data[i].milesDriven}</td>
                        </tr>`;
      table.innerHTML += row;
    }
    var row = `<tr>
    <td id="td"></td>
    <td id="td"></td>
    <td id ="td"><h4><b>${count/array_data.length}</b></h4></td>
    </tr>`
    table.innerHTML +=row;
  }
};


const getauthors = async () => {
  let start_year = document.getElementById("start_year").value;
  let end_year = document.getElementById("end_year").value;
  let range = document.getElementById("director_range").value;
  let url;
  let array_data;
  let api_data;

  if (start_year == ''  || range == '' || end_year == '')
  {
    alert('Somethings not right')
    url = `/api/V1/all`
  }
  else{
    var rangenum = Number(range);
    //var datetopass = new Date(start_year);
    //var ISostring = datetopass.toISOString();
    //console.log(typeof datetopass);
    url = `/api/V1/specifics?Syear=${start_year}&Eyear=${end_year}&Range=${range}`
  }
  const api = await fetch(url);

 if(api.ok){
    api_data = await api.json();
    array_data = api_data.result;
    console.log(array_data);
 }
 else{
  alert("HTTP-Error: " + api.text);
 }
  //connecting to frontend

  /*making table*/

  res_buildTable();

  function res_buildTable() {
    var table = document.getElementById("res_myTable");
    table.innerHTML = "";
    for (var i = 0; i < array_data.length; i++) {
      var row = `<tr>
                        <td id="td">${array_data[i].licensePlate}</td>
                        <td id="td">${array_data[i].make}</td>
                        <td id="td">${array_data[i].type}</td>
                        <td id="td">${array_data[i].date}</td>
                        <td id="td">${array_data[i].milesDriven}</td>
                        </tr>`;
      table.innerHTML += row;
    }
  }
};

