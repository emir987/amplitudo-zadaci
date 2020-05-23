  $(document).ready(function () {
      $(".dropdown, .btn-group").hover(function () {
          var dropdownMenu = $(this).children(".dropdown-menu");
          if (dropdownMenu.is(":visible")) {
              dropdownMenu.parent().toggleClass("open");
          }
      });
      cvFile.value = null;
  });


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



  // ======================     CV & PROFILE PHOTO =============================
  const cvFile = document.getElementById('cv_file');
  const cvImage = document.getElementById('cv-photo');
  const cvText = document.getElementById('cv-text');
  const profileFile = document.getElementById('profile_file');
  const profileImage = document.getElementById('profile-photo');
  const profileText = document.getElementById('profile-text');
  let isCvValid = false;
  let isProfilValid = false;


  $('#close-cv').click(function () {
      closeCV();
  });

  function closeCV() {
      cvFile.value = null;
      cvText.innerHTML = '<div class="lbl">Dodaj svoj CV</div>(.pdf)(max 2MB)';
      cvText.style.color = "rgb(197, 196, 196)";
      cvImage.src = 'img/cv.png';
      document.getElementById('close-cv').style.display = "none"
  }

  $('#close-profile').click(function () {
      closeProfile();
  });

  function closeProfile() {
      profileFile.value = null;
      profileText.innerHTML = '<div class="lbl">Dodaj svoj CV</div>(.pdf)(max 2MB)';
      profileText.style.color = "rgb(197, 196, 196)";
      profileImage.src = 'img/add_photo.png';
      document.getElementById('close-profile').style.display = "none";
  }


  cvFile.addEventListener("change", function () {
      const file = this.files[0];

      if (file) {
          if (file.size < 2097152) {
              let isExtensionOk = true;
              if (file.type ===
                  "application/vnd.openxmlformats-officedocument.wordprocessingml.document" || file.type === 'application/msword') {
                  cvImage.src = 'img/doc.png';
              } else if (file.type === "application/pdf") {
                  cvImage.src = 'img/pdf.png';
              } else {
                  isExtensionOk = false;
              }
              if (isExtensionOk) {
                  document.getElementById('close-cv').style.display = "block";

                  const date = new Date().toLocaleDateString();
                  const text =
                      `CV je dodat. <div id="cv-upload-time">${date}</div> <div id="cv-name" style="color: rgb(197,196,196)">${file.name}</div>`;
                  cvText.innerHTML = text;
                  cvText.style.color = "rgb(241, 89, 41)";
                  removeInvaild(cvFile);
              } else {
                  cvText.innerHTML = "Dozvoljeni su samo word i pdf formati";
                  cvText.style.color = "red";
                  this.value = null;
              }

          } else {
              cvText.innerHTML = "Maksimalna velicina CV je 2MB";
              cvText.style.color = "red";
              cvImage.src = "img/cv.png";
              this.value = null;
          }
      } else {
          cvText.innerHTML = '<div class="lbl">Dodaj svoj CV</div>(.pdf)(max 2MB)';
          cvText.style.color = "rgb(197, 196, 196)";
          cvImage.src = 'img/cv.png';
          document.getElementById('close-cv').style.display = "none";
          this.value = null;
      }

  });

  function validate_fileupload(fileName) {
      var allowed_extensions = new Array("doc", "docx", "gif");
      var file_extension = fileName.split('.').pop().toLowerCase(); // split function will split the filename by dot(.), and pop function will pop the last element from the array which will give you the extension as well. If there will be no extension then it will return the filename.

      for (var i = 0; i <= allowed_extensions.length; i++) {
          if (allowed_extensions[i] == file_extension) {
              return true; // valid file extension
          }
      }

      return false;
  }


  profileFile.addEventListener("change", function () {
      const file = this.files[0];

      if (file) {
          if (file.size < 2097152) {
              console.log(file.type)
              if (file.type === "image/png" || file.type === "image/jpg") {
                  const reader = new FileReader();
                  reader.addEventListener("load", function () {
                      profileImage.src = reader.result;
                      profileText.innerHTML = "Slika je dodata.";
                      profileText.style.color = "rgb(241, 89, 41)";
                  });
                  reader.readAsDataURL(file);
                  document.getElementById('close-profile').style.display = "block";
              } else {
                  profileText.innerHTML = "Samo su jpg i png formati dozvoljeni";
                  profileText.style.color = "red";
                  profileImage.src = 'img/add_photo.png';
                  this.value = null;
              }
          } else {
              profileText.innerHTML = "Maksimalna velicina slike je 2MB";
              profileText.style.color = "red";
              profileImage.src = 'img/add_photo.png';
              this.value = null;
          }
      }
  });


  // ======================   SKILLS   =============================


  $('#add-skills').click(() => {

      const numberOfSkills = $('.skill').length;

      const htmlSkills = `<div class="skill">
                            <input class="skill_name" type="text" name="skill-name" placeholder="Naziv vještine">
                            <input style="background: linear-gradient(90deg, #f1592a 0%, #f1592a 50%, #beb7b7 50%);" class="range"
                                type="range" min="0" max="10" value="5" step="1"
                                onmousemove="rangevalue${numberOfSkills}.value=this.value; updateRange(this)" />
                            <output id="rangevalue${numberOfSkills}">5</output>
                            <span onclick="removeSkill(this.parentNode)" class="fa fa-times remove-skill"></span>
                        </div>`;

      $('#skills-container').append(htmlSkills);

  });

  function removeSkill(skill) {
      skill.parentNode.removeChild(skill);
  }

  function updateRange(rangeElement) {

      const value = rangeElement.value;

      const background =
          `linear-gradient(90deg, #f1592a 0%, #f1592a ${value}0%, #beb7b7 ${value}0%)`;

      $(rangeElement).css('background', background);
  }


  // ======================  INPUTS  =============================


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

  $(function () {
      $("#preffered-city").select2({
          maximumSelectionLength: 3,
          "language": {
              "noResults": function (e) {
                  return `Unesite najviše 3 grada`;
              },
              "maximumSelected": function (e) {
                  return `Moguće je izabrati najviše 3 grada!`;
              }
          },
      });
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

  //reset selection on reset form
  $("select").closest("form").on("reset", function (ev) {
      var targetJQForm = $(ev.target);
      setTimeout((function () {
          this.find("select").trigger("change");
      }).bind(targetJQForm), 0);
  });




  // =========================== FORMS ================================

  const form = document.getElementById('new_user_form');
  const name = document.getElementById('name');
  const surname = document.getElementById('surname');
  const zip = document.getElementById('zip');
  const phone = document.getElementById('phone');
  const experience = document.getElementById('experience');
  const noForeignLanguage = document.getElementById('no-foreign-language');
  const email = document.getElementById('email');
  const pw = document.getElementById('pw');
  const repeatPw = document.getElementById('repeat-pw');
  const acceptTerms = document.getElementById('accept-terms')
  const noExperience = document.getElementById('no-experience');
  const isEducation = document.getElementById('dodaj-iskustvo');
  const isSkills = document.getElementById('add-skills');



  const formExperience = document.getElementById('form-work-experience');
  const experiencePosition = document.getElementById('experience-position');
  const employer = document.getElementById('employer');
  const aboutJob = document.getElementById('experience-about-job');
  const currentlyWorking = document.getElementById('currently-working');
  const hideMe = document.getElementById('hide-me');
  const newExperience = document.getElementById('iskustvo');
  const experienceCity = document.getElementById('')
  let iskustvoCounter = 0;
  let experiences = [];
  const editExperience = document.getElementById('edit-experience');

  const formSchool = document.getElementById('form-school');
  const schoolFax = document.getElementById('school-fax');
  const level = document.getElementById('level');
  const newEducation = document.getElementById('education');
  let educationCounter = 0;
  let educations = [];
  const editEducation = document.getElementById('edit-school');

  function validateAddedSkills(element) {
      console.log(educations.length)

      const numberOfSkills = document.getElementById("skills-container").childElementCount;

      if (numberOfSkills == 0) {
          showError(element, element.dataset.error);
          return false;
      } else {
          removeInvaild(element);
          return true;
      }
  }

  // =========================== form education ================================

  function checkDateGreaterEducation() {

      const monthStart = document.getElementById('month-start').selectedIndex;
      const yearStart = document.getElementById('year-start').selectedIndex;
      const monthEnd = document.getElementById('month-end').selectedIndex;
      const yearEnd = document.getElementById('year-end').selectedIndex;

      const showErrorElement = document.getElementById('year-end');

      if (yearEnd < yearStart || (yearEnd == yearStart && monthEnd < monthStart)) {
          showError(showErrorElement, "Datum završetka ne može biti manji od datuma početka");
          return false;
      } else {
          removeInvaild(showErrorElement);
          return true;
      }
  }

  function validateEducation() {
      //   school-fax validate
      if (!isEmpty(schoolFax, 'Unesite školu/fakultt', 3)) {
          return false;
      }
      //level validate
      if (!isEmpty(level, 'Unesite stepen obrazovanje', 1)) {
          return false;
      }

      //validate if selected 
      const checkboxes = formSchool.querySelectorAll('select');
      for (let item of checkboxes) {
          if (!validateSelect(item)) return false;
      }

      //greater date
      if (!checkDateGreaterEducation()) return false;

      return checkboxes;
  }


  formSchool.addEventListener('submit', (e) => {
      e.preventDefault();

      let checkboxes;
      if (!validateEducation()) {
          return;
      } else {
          checkboxes = validateEducation();
      }

      let monthYear = `${getOptionText(2, checkboxes)} ${getOptionText(3, checkboxes)} - ${getOptionText(4, checkboxes)} ${getOptionText(5, checkboxes)}`;

      let htmlEducation = `<div id="education${educationCounter}" class="iskustvo my-3">
                                <div class="experience-header">
                                    <div class="level">${level.value}</div>
                                    <div onclick="removeEducation(${educationCounter})" style="font-weight:900; font-size: 25px; margin-top: -10px;">&times;</div> 
                                </div>
                                <div class="pt-3 mjesec-godina">${monthYear}</div>
                                <div class="pt-3 schoolFax">${schoolFax.value}</div>
                                <div class="education-city-state">${getOptionText(1, checkboxes)}, ${getOptionText(0, checkboxes)}</div>
                                <div onclick="loadOnEdit(${educationCounter});" class="uredi-info pt-4">Uredi informacije</div>
                            </div>`;
      newEducation.innerHTML = newEducation.innerHTML + htmlEducation;

      const currentEducation = {
          "id": "education" + educationCounter,
          "school": schoolFax.value,
          "level": level.value,
          "city": getOptionText(1, checkboxes),
          "state": getOptionText(0, checkboxes),
          "monthStart": getOptionText(2, checkboxes),
          "yearStart": getOptionText(3, checkboxes),
          "monthEnd": getOptionText(4, checkboxes),
          "yearEnd": getOptionText(5, checkboxes)
      }
      educations.push(currentEducation);
      educationCounter++;

      $('.modal-obrazovanje').modal('hide');

      formSchool.reset();



  });


  function loadOnEdit(id) {

      let el = 'education' + id;
      let [education] = educations.filter(element => element.id == el);

      $('.modal-obrazovanje').find('#school-fax').val(education.school);
      $('.modal-obrazovanje').find('#level').val(education.level);
      $('.modal-obrazovanje').find('#state-school').val(education.state);
      $('.modal-obrazovanje').find('#city-school').val(education.city);
      $('.modal-obrazovanje').find('#month-start').val(education.monthStart);
      $('.modal-obrazovanje').find('#year-start').val(education.yearStart);
      $('.modal-obrazovanje').find('#month-end').val(education.monthEnd);
      $('.modal-obrazovanje').find('#year-end').val(education.yearEnd);
      //   $('#education').attr('id', education.id);
      document.getElementById('modal-education-body').setAttribute('data-id', education.id)

      document.getElementById('toggle-education-edit').classList.add('edit');
      $('.modal-obrazovanje').modal('show');
  };

  $('.modal').on('hidden.bs.modal', function (e) {
      document.getElementById('toggle-education-edit').classList.remove('edit');
  });

  editEducation.addEventListener('click', function () {
      const id = document.getElementById('modal-education-body').dataset.id;
      let [education] = educations.filter(element => element.id == id);

      if (!validateEducation()) return;


      education.school = $('.modal-obrazovanje').find('#school-fax').val();
      education.level = $('.modal-obrazovanje').find('#level').val();
      education.state = $('.modal-obrazovanje').find('#state-school').val();
      education.city = $('.modal-obrazovanje').find('#city-school').val();
      education.monthStart = $('.modal-obrazovanje').find('#month-start').val();
      education.yearStart = $('.modal-obrazovanje').find('#year-start').val();
      education.monthEnd = $('.modal-obrazovanje').find('#month-end').val();
      education.yearEnd = $('.modal-obrazovanje').find('#year-end').val();

      const modalId = "#" + document.getElementById('modal-education-body').dataset.id;

      $(modalId).find('.schoolFax').html(education.school);
      $(modalId).find('.mjesec-godina').html(`${education.monthStart} ${education.yearStart} - ${education.monthEnd} ${education.yearEnd} `);
      $(modalId).find('.education-city-state').html(`${education.city}, ${education.state}`);
      $(modalId).find('.level').html(education.level);
      $('.modal-obrazovanje').modal('hide');

  });

  function removeEducation(counter) {
      const id = 'education' + counter;
      const element = document.getElementById(id);
      element.parentNode.removeChild(element);

      let el = 'education' + counter;
      educations = educations.filter(element => element.id != el)
  }


  // =========================== form experience ================================

  function validateExperience() {
      //position validate
      if (!isEmpty(experiencePosition, 'Unesite poziciju', 2)) {
          return false;
      }
      //employer validate
      if (!isEmpty(employer, 'Unesite ime poslodavca', 2)) {
          return false;
      }

      //greater date
      if (!checkDateGreaterExperience()) return false;

      //validate if selected 
      const checkboxes = document.getElementsByClassName('select-experience');
      for (let item of checkboxes) {
          if (!validateSelect(item)) return false;
      }
      //job description validate
      if (!isEmpty(aboutJob, 'Unesite opis posla', 2)) {
          return false;
      }

      return checkboxes;
  }

  function checkDateGreaterExperience() {

      const monthStart = document.getElementById('month-experience-start').selectedIndex;
      //   monthExStart = document.getElementById('month-experience-start').options[monthExStart].dataset.id;
      const yearStart = document.getElementById('year-experience-start').selectedIndex;
      const monthEnd = document.getElementById('month-experience-end').selectedIndex;
      const yearEnd = document.getElementById('year-experience-end').selectedIndex;

      const showErrorElement = document.getElementById('year-experience-end');

      if (yearEnd < yearStart || (yearEnd == yearStart && monthEnd < monthStart)) {
          showError(showErrorElement, "Datum završetka ne može biti manji od datuma početka");
          return false;
      } else {
          removeInvaild(showErrorElement);
          return true;
      }

  }


  formExperience.addEventListener('submit', (e) => {
      e.preventDefault();

      let checkboxes;

      if (!validateExperience()) {
          return;
      } else {
          checkboxes = validateExperience();
      }

      let monthYear = '';

      let monthStart = getOptionText(2, checkboxes);
      let yearStart = getOptionText(3, checkboxes);
      let monthEnd = yearEnd = "x";


      if (currentlyWorking.checked) {
          monthYear = monthStart + ', ' + yearStart;
      } else {
          monthEnd = getOptionText(4, checkboxes);
          yearEnd = getOptionText(5, checkboxes);
          monthYear = monthStart + ', ' + yearStart + ' - ' + monthEnd + ', ' + yearEnd;
      }

      let htmlExperience = `<div id="iskustvo${iskustvoCounter}" class="iskustvo my-3">
                                <div class="experience-header">
                                    <div class="position">${experiencePosition.value}</div>
                                    <div onclick="removeExperience(${iskustvoCounter})" style="font-weight:900; font-size: 25px; margin-top: -10px;">&times;</div> 
                                </div>
                                <div class="pt-3 mjesec-godina mjesec-i-godina">${monthYear}</div>
                                <div class="pt-3 employer">${employer.value}</div>
                                <div class="city-state">${getOptionText(1, checkboxes)}, ${getOptionText(0, checkboxes)}</div>
                                <div class="d-flex justify-content-between pt-3 pb-4">
                                    <div class="mjesec-godina opis-posla">Opis posla:</div>
                                    <div onclick="hideAbout()"><img id="change-arrow" src="img/arrow1.png"></div>
                                </div>
                                <div id="hide-about" class="about-job-section">
                                    <div class="about-job pt-3" style="word-break: break-word;">${aboutJob.value}</div>
                                    <div onclick="loadExperienceOnEdit(${iskustvoCounter});" class="uredi-info">Uredi informacije</div>
                                </div>
                            </div>`;
      newExperience.innerHTML = newExperience.innerHTML + htmlExperience;

      const currentExperience = {
          "id": "iskustvo" + iskustvoCounter,
          "position": experiencePosition.value,
          "employer": employer.value,
          "city": getOptionText(1, checkboxes),
          "state": getOptionText(0, checkboxes),
          "monthStart": monthStart,
          "yearStart": yearStart,
          "monthEnd": monthEnd,
          "yearEnd": yearEnd,
          "aboutJob": aboutJob.value
      }
      experiences.push(currentExperience);

      iskustvoCounter++;

      document.getElementById('hide-no-experience').classList.add('hide-no-experience');

      formExperience.reset();
      currentlyWorking.checked = true;

      for (let item of checkboxes) {
          item.selectedIndex = 0;
      }

      $('.modal-radno-iskustvo').modal('hide')

  });




  function loadExperienceOnEdit(id) {

      let el = 'iskustvo' + id;
      let [experience] = experiences.filter(element => element.id == el);

      $('.modal-radno-iskustvo').find('#experience-position').val(experience.position);
      $('.modal-radno-iskustvo').find('#employer').val(experience.employer);
      $('.modal-radno-iskustvo').find('#state-experience').val(experience.state);
      $('.modal-radno-iskustvo').find('#city-experience').val(experience.city);
      $('.modal-radno-iskustvo').find('#month-experience-start').val(experience.monthStart);
      $('.modal-radno-iskustvo').find('#year-experience-start').val(experience.yearStart);
      $('.modal-radno-iskustvo').find('#month-experience-end').val(experience.monthEnd);
      $('.modal-radno-iskustvo').find('#year-experience-end').val(experience.yearEnd);
      $('.modal-radno-iskustvo').find('#experience-about-job').val(experience.aboutJob);

      //   $('#education').attr('id', education.id);
      document.getElementById('modal-experience-body').setAttribute('data-id', experience.id)

      document.getElementById('toggle-experience-edit').classList.add('edit');
      $('.modal-radno-iskustvo').modal('show');
  };

  $('.modal').on('hidden.bs.modal', function (e) {
      document.getElementById('toggle-experience-edit').classList.remove('edit');
  });

  editExperience.addEventListener('click', function () {
      const elId = document.getElementById('modal-experience-body').dataset.id;
      let [experience] = experiences.filter(element => element.id == elId);

      if (!validateExperience()) return;

      experience.position = $('.modal-radno-iskustvo').find('#experience-position').val();
      experience.employer = $('.modal-radno-iskustvo').find('#employer').val();
      experience.state = $('.modal-radno-iskustvo').find('#state-experience').val();
      experience.city = $('.modal-radno-iskustvo').find('#city-experience').val();
      experience.monthStart = $('.modal-radno-iskustvo').find('#month-experience-start').val();
      experience.yearStart = $('.modal-radno-iskustvo').find('#year-experience-start').val();
      experience.monthEnd = $('.modal-radno-iskustvo').find('#month-experience-end').val();
      experience.yearEnd = $('.modal-radno-iskustvo').find('#year-experience-end').val();
      experience.aboutJob = $('.modal-radno-iskustvo').find('#experience-about-job').val();

      const modalId = "#" + document.getElementById('modal-experience-body').dataset.id;

      let dateFormat = "";
      if (experience.monthEnd == "x") {
          dateFormat = experience.monthStart + " " + experience.yearStart;
      } else {
          dateFormat = experience.monthStart + " " + experience.yearStart + " - " + experience.monthEnd + " " + experience.yearEnd;
      }

      $(modalId).find('.position').html(experience.position);
      $(modalId).find('.mjesec-i-godina').html(dateFormat);
      $(modalId).find('.employer').html(experience.employer);
      $(modalId).find('.city-state').html(`${experience.city}, ${experience.state}`);
      $(modalId).find('.about-job').html(experience.aboutJob);
      $('.modal-radno-iskustvo').modal('hide');
  });


  function removeExperience(counter) {
      const id = 'iskustvo' + counter;
      const element = document.getElementById(id);
      element.parentNode.removeChild(element);

      experiences = experiences.filter(element => element.id != id);
      if (experiences.length == 0) {
          document.getElementById('hide-no-experience').classList.remove('hide-no-experience');
      }
  }


  function hideAbout() {
      const hideAbout = document.getElementById('hide-about');
      hideAbout.classList.toggle('about-job-section-inactive');
      if ($("#change-arrow").attr("src") == 'img/arrow1.png') {
          $("#change-arrow").attr("src", "img/arrow2.png");
      } else {
          $("#change-arrow").attr("src", "img/arrow1.png");
      }
  }

  function getOptionText(number, checkboxes) {
      return checkboxes[number].options[checkboxes[number].selectedIndex].text;
  }

  currentlyWorking.addEventListener('change', () => {
      hideMe.classList.toggle('hide-me');
      document.getElementById('currently-working-space').classList.toggle('hide-me');
      let validatedOnCheck = hideMe.querySelectorAll('select');
      for (let item of validatedOnCheck) {
          if (currentlyWorking.checked) {
              let newOption = document.createElement('option');
              newOption.value = "x";
              item.add(newOption);
              item.value = 'x';
          } else {
              item.remove(item.length - 1);
              item.selectedIndex = '0';
          }
      }
  });


  // =========================== main form ================================

  form.addEventListener('submit', (e) => {
      e.preventDefault();

      //cv validate
      if (!validateAddedCV(cvFile)) return;

      //name validate
      if (!isEmpty(name, "Unesite vaše ime", 2)) return;

      //surname validate
      if (!isEmpty(surname, "Unesite vaše prezime", 2)) return;

      //validate if selected 
      const checkboxes = document.getElementsByClassName('select-main');
      for (let item of checkboxes) {
          if (!validateSelect(item)) return;
      }

      //   zip validate
      if (!validateNumbers(zip, 4, 12)) return;

      //experience validate
      if (!validateYearExperience(experience, 0, 40)) return;

      //   validate multiselect
      const multiCheckboxes = document.getElementsByClassName('multi-select');
      for (let item of multiCheckboxes) {
          if (!validateMultiSelect(item)) return;
      }

      //phone validate
      if (!validatePhone(phone)) return;

      //email validate
      if (!validateEmail(email)) return;

      //password validate
      if (!validateNumbers(pw, 6, 30)) return;

      //password repeat validate
      if (!validateRepeatPw(repeatPw)) return;

      //accept terms validate
      if (!validateAcceptTerms(acceptTerms)) return;

      //   no experience added validate
      if (!validateAddedExperience(noExperience)) return;

      //   no education added validate
      if (!validateAddedEducation(isEducation)) return;

      //   no skills added validate
      if (!validateAddedSkills(isSkills)) return;

      //   validate if skills are empty
      const skills = document.getElementsByClassName('skill_name');
      for (let skill of skills) {
          if (!isEmpty(skill, "Unesite ime vještine", 2)) return;
      }

      showData();
      clearInputs();
  });

  function clearInputs() {
      form.reset();
      currentlyWorking.checked = true;
      for (let item of checkboxes) {
          item.selectedIndex = 0;
      }
      noForeignLanguage.checked = false;
      noExperience.checked = false;
      document.getElementById('skills-container').textContent = '';

      closeCV();
      closeProfile();
  }


  noExperience.addEventListener("change", function () {
      document.getElementById('radno-iskustvo-dodaj').classList.toggle('toggle-experience')
  })


  function showData() {
      document.getElementById('show-photo').src = document.getElementById('profile-photo').src;
      document.getElementById('show-cv-image').src = document.getElementById('cv-photo').src;
      document.getElementById('show-cv-upload-date').innerHTML = ', ' + document.getElementById('cv-upload-time').innerHTML;
      document.getElementById('show-cv-name').innerHTML = document.getElementById('cv-name').innerHTML;

      document.getElementById('show_name_surname').innerHTML = name.value + " " + surname.value;
      document.getElementById('show_rank').innerHTML = $('#zvanje').select2("val").join(', ');
      document.getElementById('show_phone').innerHTML = phone.value;
      document.getElementById('show_email').innerHTML = email.value;
      document.getElementById('show_address').innerHTML = document.getElementById('city').value + " " + document.getElementById('state-main-form').value;
      document.getElementById('show_zip').innerHTML = '<b>Poštanski broj:</b> ' + zip.value;
      document.getElementById('show_born_date').innerHTML = '<b>Datum rodjenja:</b> ' + document.getElementById('date').value + ". " + document.getElementById('month').value + " - " + document.getElementById('year').value + ".";
      document.getElementById('show_gender').innerHTML = '<b>Pol:</b> ' + document.getElementById('gender').value;
      const foreignLanguages = (noForeignLanguage.checked) ? '<b>Bez znanja stranih jezika</b>' : '<b>Strani jezici:</b> ' + $('#foreign-language').select2("val").join(', ');
      document.getElementById('show_foreign_languages').innerHTML = foreignLanguages;
      document.getElementById('show_catogory_job').innerHTML = '<b>Kategorija poslova:</b> ' + $('#job-category').select2("val").join(', ');
      document.getElementById('show_preffered_city').innerHTML = '<b>Preferirani gradovi:</b> ' + $('#preffered-city').select2("val").join(', ');

      let skills = "";
      document.querySelectorAll('.skill_name').forEach(function (skillNameElement) {
          let skillName = skillNameElement.value;
          let skillValue = skillNameElement.nextElementSibling.value;
          skills += `<div class="d-flex">
                    <div id="show_skill_name" class="mr-3 w-50">${skillName}</div>
                        <div class="w-100 h-100">
                            <div id="show_skill_percent" class="show-skills-percent d-flex">
                                <div class="h-100"
                                    style = "background-color: #f1592a; width: ${skillValue}0%; border-radius: 15px 0 0 15px;" >
                                </div>
                                <div class="h-100"
                                    style = "background-color: #beb7b7; width: ${10-skillValue}0%; border-radius: 0 15px 15px 0;" >
                                </div>
                            </div>
                        </div>
                    </div>`
      });
      document.getElementById("show_skill_output").innerHTML = skills;

      console.log(experiences);


      let experienceHTML = ""
      for (const experience of experiences) {
          const {
              position,
              employer,
              city,
              state,
              aboutJob,
              monthStart,
              yearStart,
              monthEnd,
              yearEnd
          } = experience;

          let date = "";
          if (experience.monthEnd == "x") {
              date = `${monthStart} ${yearStart}`;
          } else {
              date = `${monthStart} ${yearStart} - ${monthEnd} ${yearEnd}`;
          }

          let oneExperience = `<div class="d-flex experience_output mt-3">
                                    <div id="show_experience_date" class="pr-4" style="width:37%">${date}</div>
                                    <div style="width:63%">
                                        <span id="show_position">${position}</span><span>, </span>
                                        <span id="show_employer">${employer}</span>
                                        <div class="show_experience_location" id="show_experience_location">${city}, ${state}</div>
                                        <span id="show_about_job" style="word-break: break-word;">${aboutJob}</span>
                                    </div>
                                </div>`
          experienceHTML += oneExperience;
      }
      if (experiences.length == 0) {

      }
      document.getElementById('show_experience_show').innerHTML = experienceHTML;



      let educationHTML = ""
      for (const education of educations) {
          const date = `${education.monthStart} ${education.yearStart} - ${education.monthEnd} ${education.yearEnd}`;

          let oneEducation = `<div class="d-flex mt-3">
                                <div id="education_date" class="pr-4" style="width:35%">${date}</div>
                                    <div style="width:70%">
                                        <span id="show_level">${education.level}</span>
                                        <span id="show_school">${education.school}</span>
                                        <div class="show-education-location" id="show_education_location">${education.city}, ${education.state}</div>
                                    </div>
                                </div>`;
          educationHTML += oneEducation;
      }
      document.getElementById('show_education_show').innerHTML = educationHTML;

      $('.modal-output').modal('show');
  }


  // =========== validation functions start =================

  function validateAddedExperience(element) {
      if (experiences.length == 0 && (element.checked === false)) {
          showError(element, element.dataset.error);
          return false;
      } else {
          removeInvaild(element);
          return true;
      }
  }

  function validateAddedEducation(element) {
      if (educations.length == 0) {
          showError(element, element.dataset.error);
          return false;
      } else {
          removeInvaild(element);
          return true;
      }
  }

  function validateAddedCV(element) {
      if (element.files.length == 0) {
          showError(element, "Odaberite CV");
          return false;
      } else {
          removeInvaild(element);
          return true;
      }
  }





  function validate(evt) {
      var theEvent = evt || window.event;

      // Handle paste
      if (theEvent.type === 'paste') {
          key = event.clipboardData.getData('text/plain');
      } else {
          // Handle key press
          var key = theEvent.keyCode || theEvent.which;
          key = String.fromCharCode(key);
      }
      var regex = /[0-9]|\./;
      if (!regex.test(key)) {
          theEvent.returnValue = false;
          if (theEvent.preventDefault) theEvent.preventDefault();
      }
  }

  //

  function validateAcceptTerms(element) {
      if (element.checked) {
          removeInvaild(element);
          return true;
      } else {
          showError(element, element.dataset.error);
          return false;
      }
  }

  function validateRepeatPw(element) {
      if (pw.value == element.value) {
          removeInvaild(element);
          return true;
      } else {
          showError(element, element.dataset.error);
          return false;
      }
  }

  function validateEmail(element) {
      const emailRe = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      isValid = emailRe.test(element.value);

      if (isValid) {
          removeInvaild(element);
          return true;
      } else {
          showError(element, element.dataset.error);
          return false;
      }
  }

  function validatePhone(element) {
      if (element.value.match(/[+][0-9]{1,4}[ ]*[0-9]{2,4}[ ]*[/]*[-]*[0-9]{2,4}[ ]*[/]*[-]*[0-9]{2,4}$/)) {
          removeInvaild(element);
          return true;
      } else {
          showError(element, element.dataset.error);
          return false;
      }
  }

  function validateNumbers(element, minLength, maxLength) {
      if (element.value.length >= minLength && element.value.length <= maxLength) {
          removeInvaild(element);
          return true;
      } else {
          showError(element, element.dataset.error);
          return false;
      }
  }

  function validateYearExperience(element, minNumber, maxNumber) {
      if (element.value.match(/^-{0,1}\d+$/) && element.value >= minNumber && element.value < maxNumber) {
          removeInvaild(element);
          return true;
      } else {
          showError(element, element.dataset.error);
          return false;
      }
  }


  function isEmpty(element, message, letters) {
      if (element.value.length < letters) {
          showError(element, message);
          return false;
      } else {
          removeInvaild(element);
          return true;
      }
  }

  function removeInvaild(element) {
      element.classList.remove('invalid-input');
      $(element).attr('data-original-title', '');
      $(element).tooltip('hide');

  }

  function validateMultiSelect(item) {

      if (item.id == 'foreign-language' && noForeignLanguage.checked) {
          removeInvaild(item.nextSibling);
          return true;
      }

      if (item.nextSibling.querySelectorAll('li').length >= 2) {
          removeInvaild(item.nextSibling);
          return true;
      } else {
          showError(item.nextSibling, item.dataset.error);
          return false;
      }
  }


  function validateSelect(item) {
      if (item.value == 0) {
          showError(item.nextSibling, item.dataset.error);
          return false;
      } else {
          removeInvaild(item.nextSibling);
          return true;
      }
  }

  function selectCities(state, element) {
      //select cities by state-back
      cities = `<option value="0" disabled selected hidden>Odaberi</option>
                <option value="Bar">Bar</option>
                <option value="Podgorica">Podgorica</option>
                <option value="Herceg Novi">Herceg Novi</option>
                <option value="Kotor">Kotor</option>
                <option value="Rozaje">Rozaje</option>`;
      if (element == 1) {
          city.disabled = false;
          city.innerHTML = cities;
      } else if (element == 2) {
          const city = document.getElementById('city-experience')
          city.disabled = false;
          city.innerHTML = cities;
      } else {
          const city = document.getElementById('city-school');
          city.disabled = false;
          city.innerHTML = cities;
      }
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

  const showPassword = document.getElementById('show-password');
  const showRepeatPassword = document.getElementById('show-repeat-password');

  showPassword.addEventListener('click', function () {
      pwVisibility(pw, this);
  })

  showRepeatPassword.addEventListener('click', function () {
      pwVisibility(repeatPw, this);
  })

  function pwVisibility(password, pwImage) {
      if (password.type === "password") {
          password.type = "text";
          pwImage.src = "img/eye-green.png"
      } else {
          password.type = "password";
          pwImage.src = "img/eye.png"
      }
  }

  function phonePreventError(event) {
      var regex = new RegExp("^[0-9-+/-]");
      var key = String.fromCharCode(event.charCode ? event.which : event.charCode);
      if (!regex.test(key)) {
          event.preventDefault();
          return false;
      }
  }