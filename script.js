const menuToggle = document.querySelector('.toggle input');
const nav = document.querySelector('nav ul ');

menuToggle.addEventListener('click', function () {
  nav.classList.toggle('slide');
});

//API//

function cari() {
  $('#list').html('');
  $.ajax({
    url: 'http://omdbapi.com',
    type: 'get',
    dataType: 'json',
    data: {
      'apikey': '271ab1b1',
      's': $('#input').val()
    },
    success: function (result) {
      if (result.Response == 'True') {
        let movies = result.Search;

        $.each(movies, function (i, data) {
          $('#list').append(`
          <div class="col-md-3">
          <div class="card" >
              <img src="`+ data.Poster +`" class="card-img-top" alt="...">
              <div class="card-body">
              <h5 class="card-title">`+ data.Title +`</h5>
              <h6 class="card-subtitle mb-2 text-muted">`+ data.Year +`</h6>
              <a href="#" class="card-link see-detail" data-bs-toggle="modal" data-bs-target="#exampleModal" data-id=" `+ data.imdbID +`">Lihat detail</a>
            </div>
          </div>
          </div>
          `)
        })
        $('#input').val('');
      } else {
        $('#list').html(`
        <div class="col">
        <h1 class="text-center">` + result.Error + `</h1>
        </div>
        
        `)
      }
    }
  })
}

$('#cari').on('click', function () {
  cari();
 
  })

$('#input').on('keyup', function (e) {
  if (e.which  === 13) {
    cari();
  }
})

$('#list').on('click', '.see-detail ', function () {
  $.ajax({
    url: 'http://omdbapi.com',
    type: 'get',
    dataType: 'json',
    data: {
      'apikey': '271ab1b1',
      'i': $(this).data('id')
    },
    success: function (movie) {
      if (movie.Response == 'True') {
        $('.modal-body').html(`
        <div class="container-fluid">
        <div class="row">
        <div class="col-md-4">
        <img src=" `+ movie.Poster +`" class="img-fluid">
        </div>
        <div class="col-md-8">
        <ul class="list-group">
          <li class="list-group-item"><h3>`+ movie.Title +`</h3></li>
          <li class="list-group-item"><span>Release: </span>`+ movie.Year + `</li>
          <li class="list-group-item"><span>Language: </span>`+ movie.Language +`</li>
          <li class="list-group-item"><span>Genre: </span>`+ movie.Genre +`</li>
          <li class="list-group-item"><span>Cast: </span>`+ movie.Actors+`</li>
          <li class="list-group-item"><span>Length: </span>`+ movie.Runtime +`</li>
          <li class="list-group-item"><h3>Plot: </h3>`+ movie.Plot +`</li>
        </ul>
        </div>
        </div>
        </div>
        `)
      }
    }
    })
  })
