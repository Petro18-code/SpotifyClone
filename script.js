function fetchMusic(artist) {
    const section = document.querySelector(`#${artist}`);
    const row = document.querySelector(`#${artist}Section`);
    fetch(`https://striveschool-api.herokuapp.com/api/deezer/search?q=${artist}`)
        .then(response => {
            return response.json()
        })
        .then(pippo => {
            let music = pippo.data
            section.classList.remove("d-none")
            music.slice(0, 4).forEach(element => {
                //console.log(element.artist.name)
                row.innerHTML += `
                <div class='col col-3'>
                  <div class="card">
                    <img src='${element.album.cover_xl}' class="card-img-top img-fluid" alt="">
                    <div class="card-body">
                        <h5 class="card-title">${element.album.title}</h5>
                        <p class="card-text">Duration: ${element.duration}m</p>
                        <button type="button" class="btn btn-primary createListBtn" data-album-id="${element.artist.name}" data-toggle="modal" data-target="#albumModal">Crea Lista</button>
                    </div>
                  </div>
                </div>`;
            });
        })
}

function search() {
    document.querySelectorAll('.col-10 > div').forEach(section => {
        section.classList.add("d-none");
        section.querySelector('.row').innerHTML = ''; // Clear previous results
    });
    let artistSearch = document.getElementById("searchField").value
    fetch(`https://striveschool-api.herokuapp.com/api/deezer/search?q=${artistSearch}`)
        .then(res => {
            return res.json()
        })
        .then(gigio => {
            gigio.data.forEach(song => {
                //console.log(element.artist.name)
                document.getElementById("searchResults").classList.remove("d-none")
                document.querySelector(`#${artistSearch}`).classList.remove("d-none")
                let gigio = document.querySelector(`#${artistSearch}Section`)
                gigio.innerHTML += `
                <div class='col col-3'>
                  <div class="card">
                    <img src='${song.album.cover_xl}' class="card-img-top img-fluid" alt="">
                    <div class="card-body">
                        <h5 class="card-title">${song.album.title}</h5>
                        <p class="card-text">Duration: ${song.duration}m</p>
                    </div>
                  </div>
                </div>`;
            });

        })
}

window.onload = () => {
    fetchMusic("eminem")
    fetchMusic("queen")
    fetchMusic("metallica")
    
    document.addEventListener('click', function(event) {
        if (event.target && event.target.classList.contains('createListBtn')) {
          const albumId = event.target.getAttribute('data-album-id');
          showAlbumList(albumId);
        }
      });
    };
    
    function showAlbumList(albumId) {
        fetch(`https://striveschool-api.herokuapp.com/api/deezer/search?q=${albumId}`)
          .then((response) => response.json())
          .then((album) => {
            const tracks = album.data;
            
            const modalBody = document.getElementById('albumModalBody');
            modalBody.innerHTML = ''; // Clear previous content
      
            tracks.forEach(track => {
              const trackElement = document.createElement('p');
              trackElement.textContent = track.title;
              modalBody.appendChild(trackElement);
            });
          })
          .catch((err) => console.log(err));
      }
      
        showAlbumList("eminem");
        showAlbumList("queen");
        showAlbumList("metallica");
//INPUT MODIFICA URL PER FARE RICERCA RANDOM