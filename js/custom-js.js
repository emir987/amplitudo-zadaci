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