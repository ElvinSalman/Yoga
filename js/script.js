window.addEventListener('DOMContentLoaded', function(){

    'use strict';

    let tab = document.querySelectorAll('.info-header-tab'),
        info = document.querySelector('.info-header'),
        tabContent = document.querySelectorAll('.info-tabcontent');

        
    function hideTabContent(a) {
        for (let i=a;i < tabContent.length;i++) {
            tabContent[i].classList.remove('show');
            tabContent[i].classList.add('hide');

        }
    }

    hideTabContent(1);

    function showTabContent(b) {
        if (tabContent[b].classList.contains('hide')) {
            tabContent[b].classList.remove('hide');
            tabContent[b].classList.add('show');
        }
    }


    info.addEventListener('click', function(event){
        let target=event.target;

        if(target && target.classList.contains('info-header-tab')) {
            for (let i=0;i < tab.length;i++) {
                if(target ==tab[i]) {
                hideTabContent(0);
                showTabContent(i); 
                break;
                }
            }
        }
    })



//Timer

    let deadline = '2020-05-10';

    function getTimeRemaining(endtime) {
        let t = Date.parse(endtime) - Date.parse(new Date()),
        seconds = Math.floor((t/1000) % 60),
        minutes = Math.floor((t/1000/60) % 60),
        hours = Math.floor((t/(1000*60*60)));


        return {
            'total' : t,
            'hours' : hours,
            'minutes' : minutes,
            'seconds' : seconds
        };
    }

    function setClock(id, endtime) {
       let timer = document.getElementById(id),
           hours = timer.querySelector('.hours'),
           minutes = timer.querySelector('.minutes'),
           seconds = timer.querySelector('.seconds'),
           timeInterval=setInterval(updateClock, 1000);
           
        function updateClock() {
            let t = getTimeRemaining(endtime);
            hours.textContent = t.hours;
            minutes.textContent = t.minutes;
            seconds.textContent = t.seconds;

            if(t.total <= 0){
                clearInterval(timeInterval);
            }
        }   
    }

    setClock('timer', deadline);



    //Modal


    let more = document.querySelector('.more'),
        overlay = document.querySelector('.overlay'),
        close = document.querySelector('.popup-close');


  more.addEventListener('click', function() {
      overlay.style.display = 'block';
      this.classList.add('more-splash');
      //otmena scroll
      document.body.style.overflow = 'hidden';
  });

  close.addEventListener('click', function() {
      overlay.style.display = 'none';
      more.classList.remove('more-splash');
      //dobavit-scroll
      document.body.style.overflow = '';
  })





  //Form


  let message = {
      loading: 'Загрузка...',
      success: 'Спасибо! Скоро мы с вами свяжемся!',
      failure: 'Что-то пошло не так...'
  };

  let form = document.querySelector('.main-form'),
      input = form.getElementsByTagName('input'),
      statusMessage = document.createElement('div');

      statusMessage.classList.add('status');


      form.addEventListener('submit', function(event) {
        event.preventDefault();
        form.appendChild(statusMessage);

        let request = new XMLHttpRequest();
        request.open('POST', 'server.php');
        request.setRequestHeader('Content-Type', 'application/json; charset=utf-8');

        
        let formData = new FormData(form);
        
        let obj={};
        formData.forEach(function(value,key) {
            obj[key] = value;
        });

        let json=JSON.stringify(obj);
        
        request.send(json);




        request.addEventListener('readystatechange', function() {
            if (request.readyState < 4) {
                statusMessage.innerHTML = message.loading;
            } else if (request.readyState ===4 && request.status ==200) {
                statusMessage.innerHTML = message.success;
            } else{
                statusMessage.innerHTML = message.failure;
            }
        });


        for (let i=0; i < input.length; i++) {
            input[i].value = '';
        }
      })




      //Slider


let slideIndex = 1,
    slides = document.querySelectorAll('.slider-item'),
    prev = document.querySelector('.prev'),
    next = document.querySelector('.next'),
    dotsWrap = document.querySelector('.slider-dots'),
    dots = document.querySelectorAll('.dot');

        
showSlides(slideIndex);

function showSlides(n) {

    if (n > slides.length) {
        slideIndex=1;
    }
    if (n < 1) {
        slideIndex =slides.length;
    }

    slides.forEach((item)=>item.style.display = 'none');
    // for( let i=0;i<slides.length;i++){
    //     slides[i].style.display="none";
    // }
    dots.forEach((item)=>item.classList.remove('dot-active'));


    slides[n-1].style.display = 'block';
    dots[n-1].classList.add('dot-active');
}    


function plusSlides(n) {
    showSlides(slideIndex+=n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

prev.addEventListener('click', function() {
    plusSlides(-1);
});

next.addEventListener('click', function() {
    plusSlides(1);
});

dotsWrap.addEventListener('click', function(event) {
    for(let i = 0; i < dots.length+1;i++) {
        if (event.target.classList.contains('dot') && event.target == dots[i-1]) {
            currentSlide(i);
        }
    }
});







});


