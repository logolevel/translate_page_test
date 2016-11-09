$(function() {

/*mini slider*/
  $('#cheking').owlCarousel({
      loop:true,
      nav:false,
      animateIn:'jello',
      animateOut:'jello',
      margin:0,
      responsive:{
          0:{
              items:1
          }
      },
      navText:''
  });

/*exchange elements for responsive design*/

exchangeElements();
window.onresize = function() {
    exchangeElements();
}

function exchangeElements() {

var  feather = document.querySelector('.services__link--feather'),
     mapU = document.querySelector('.services__map'),
     servicesContainer = document.querySelector('.services-blocks');

//min-width 960px
if (window.innerWidth < 960) {
    servicesContainer.insertBefore(mapU, feather);
}  else if (window.innerWidth > 960){
    servicesContainer.insertBefore(mapU, feather);
};

}

/*clients slider*/
  $('.sliders').owlCarousel({
      loop:true,
      nav:true,
      margin:0,
      responsive:{
          0:{
              items:1
          },
          580:{
              items:2
          },
          960:{
              items:3
          }
      },
      navText:''
  });
/*search nav*/
$('.owl-prev').addClass('icon-arrow-left');
$('.owl-next').addClass('icon-arrow-right');

});