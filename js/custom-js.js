  let nav = $(".navbar");
  let oTop = $('#header-text-section').offset().top;
  $(window).scroll(function () {

      if (nav.offset().top + nav.outerHeight(true) > oTop || $(document).width() < 1199) {
          whiteNav();
      } else {
          nav.removeClass("white-nav");
          $("#logo-image").attr("src", "img/LogoWhite.svg");
          $("#millenial-image").attr("src", "img/MillenialWhite.svg");
          nav.addClass("animatedFadeNav");
      }
  });

  $('#toggle-hamburger').click(() => whiteNav());


  function whiteNav() {
      nav.addClass("white-nav");
      nav.removeClass("animatedFadeNav");
      $("#logo-image").attr("src", "img/LogoOrange.svg");
      $("#millenial-image").attr("src", "img/MillenialOrange.svg");
  }


  $(document).ready(() => $('.js-example-basic-single').select2());

  $(document).ready(() => $('.js-example-basic-multiple').select2());

  $('#js-example-basic-hide-search-multi').select2();

  $('#js-example-basic-hide-search-multi').on('select2:opening select2:closing', function (event) {
      var $searchfield = $(this).parent().find('.select2-search__field');
      $searchfield.prop('disabled', true);
  });

  $('#zvanje').select2({

      tags: true,
      tokenSeparators: [',', ' '],
      maximumSelectionLength: 3,

      "language": {
          "noResults": function () {
              return "Unesite najviše 3 zvanja";
          },
          "maximumSelected": function () {
              return "Maksimalan broj zvanja je 3!";
          }
      },
      tokenSeparators: [",", "  "],
      escapeMarkup: function (markup) {
          return markup;
      }

  });

  $('#job-categories').select2({

      maximumSelectionLength: 3,

      "language": {
          "noResults": function (e) {
              return `Unesite najviše ${e.maximum} kategorije`;
          },
          "maximumSelected": function (e) {
              return `Moguće je izabrati najviše ${e.maximum} kategorije!`;
          }
      },
      tokenSeparators: [",", "  "],
      escapeMarkup: function (markup) {
          return markup;
      }

  });




  // =========================== form validation ================================

  const form = document.getElementById('new_user_form');
  const name = document.getElementById('name');
  const surname = document.getElementById('surname');
  const gender = document.getElementById('gender');
  //select
  const date = document.getElementById('date');
  const month = document.getElementById('month');
  const year = document.getElementById('year');


  const state = document.getElementById('state');
  const city = document.getElementById('city');
  const zip = document.getElementById('zip');
  //   const state = document.getElementById('state');
  //   const state = document.getElementById('state');
  //   const state = document.getElementById('state');

  function isEmpty(element) {
      return (element.value.length >= 2 ? true : false);
  }

  function removeInvaild(element) {
      element.classList.remove('invalid-input');
      $(element).attr('data-original-title', '');
      $(element).tooltip('hide');

  }

  form.addEventListener('submit', (e) => {
      e.preventDefault();
      let isOk = true;

      //name validate
      if (!isEmpty(name)) {
          showError(name, 'Unesite vaše ime');
          return;
      } else {
          removeInvaild(name);
      }

      //surname validate
      if (!isEmpty(surname)) {
          showError(surname, 'Unesite vaše prezime')
          return;
      } else {
          removeInvaild(surname);
      }



      //   if (gender.value == 0) {
      //       showError(gender, "Odaberite pol");
      //       return;
      //   } else {
      //       removeInvaild(gender);
      //   }

      const checkboxes = document.getElementsByClassName('select-main');

      //   console.log(checkboxes);

      for (let item of checkboxes) {
          if (item.value == 0) {
              console.log('ja' + item.id)
              let message = '';
              switch (item.id) {
                  case 'gender':
                      message = 'Odaberite Vaš pol!'
                      break;
                  case 'date':
                      message = 'Odaberite datum!'
                      break;
                  case 'month':
                      message = 'Odaberite mjesec!'
                      break;
                  case 'year':
                      message = 'Odaberite godinu!'
                      break;
                  case 'state':
                      message = 'Odaberite državu!'
                      break;
                  case 'driving-licence':
                      message = 'Odaberite tip vozačke dozvole!'
                      break;
              }
              showError(item.nextSibling, message);
              return;
          } else {
              removeInvaild(item.nextSibling);
          }
      }

  })

  function validateSelectElements() {

  }


  function showError(element, message) {
      element.classList.add('invalid-input');

      $(element).attr('data-original-title', message)

      $(element).tooltip('show');

      $(element).on('shown.bs.tooltip', function () {
          element.scrollIntoView({
              behavior: "smooth",
              block: "center",
          });
      })
  }