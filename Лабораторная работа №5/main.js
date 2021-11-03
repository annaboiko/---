document.getElementById('myBtn').addEventListener('click', getData);

function getData() {
    

    fetch('https://randomuser.me/api/?results=100')
        .then(res => res.json())
        .then(data => {
            

            let author = data.results;
            

            let output = "<h2><center>User Data</center></h2>";

            
            author.forEach(function (lists) {
                output += `
                <div class="container">
                    <div class="card mt-4 bg-light">
                        <ul class="list-group">
                            <li class="list-group-item"><h2>Name: ${lists.name.first}, Surname: ${lists.name.last} </h2></li> 
                            <li class="list-group-item"><img src="${lists.picture.large}"></li>
                            <li class="list-group-item">Gender: ${lists.gender}</li>
                            <li class="list-group-item">Country: ${lists.location.country}, City: ${lists.location.city} </li>
                            <li class="list-group-item">Email ID: ${lists.email}</li>
                            <li class="list-group-item">DOB: ${lists.dob.date}</li>
                            <li class="list-group-item">Age: ${lists.dob.age}</li>
                            <li class="list-group-item">Phone Number: ${lists.cell}</li>
                        </ul>
                    </div>
                </div> `;
            });

            document.getElementById('output').innerHTML = output;

        });
};


window.onload = function() {
    let preloader = document.getElementById('preloader');
    preloader.classList.add('hide-preloader');
    setInterval(function() {
          preloader.classList.add('preloader-hidden');
    }, 990);
}