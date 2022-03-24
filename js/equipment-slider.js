let equipmentSlider = document.querySelector('.equipment-items-slider'),
  equipmentSliderList = equipmentSlider.querySelector('.equipment-slider-list'),
  equipmentSliderTrack = equipmentSlider.querySelector('.equipment-slider-track'),
  equipmentSlides = equipmentSlider.querySelectorAll('.equipment-slide'),
  equipmentPagination = equipmentSlider.querySelectorAll('.equipment-slider-pag-item'),
  equipmentSlideWidth = equipmentSlides[0].offsetWidth,
  equipmentSlideIndex = 0,
  equipmentPosInit = 0,
  equipmentPosX1 = 0,
  equipmentPosX2 = 0,
  equipmentPosY1 = 0,
  equipmentPosY2 = 0,
  equipmentPosFinal = 0,
  equipmentIsSwipe = false,
  equipmentIsScroll = false,
  equipmentAllowSwipe = true,
  equipmentTransition = true,
  equipmentNextTrf = 0,
  equipmentPrevTrf = 0,
  equipmentLastTrf = --equipmentSlides.length * equipmentSlideWidth,
  equipmentPosThreshold = equipmentSlides[0].offsetWidth * 0.35,
  equipmentTrfRegExp = /([-0-9.]+(?=px))/,
  equipmentGetEvent = function() {
    return (event.type.search('touch') !== -1) ? event.touches[0] : event;
  },
  equipmentSlide = function() {
    if (equipmentTransition) {
      equipmentSliderTrack.style.transition = 'transform .5s';
    }
    equipmentSliderTrack.style.transform = `translate3d(-${equipmentSlideIndex * equipmentSlideWidth}px, 0px, 0px)`;

  },
  equipmentSwipeStart = function() {
    let evt = equipmentGetEvent();

    if (equipmentAllowSwipe) {

      equipmentTransition = true;

      equipmentNextTrf = (equipmentSlideIndex + 1) * -equipmentSlideWidth;
      equipmentPrevTrf = (equipmentSlideIndex - 1) * -equipmentSlideWidth;

      equipmentPosInit = equipmentPosX1 = evt.clientX;
      equipmentPosY1 = evt.clientY;

      equipmentSliderTrack.style.transition = '';

      document.addEventListener('touchmove', equipmentSwipeAction);
      document.addEventListener('mousemove', equipmentSwipeAction);
      document.addEventListener('touchend', equipmentSwipeEnd);
      document.addEventListener('mouseup', equipmentSwipeEnd);

      equipmentSliderList.classList.remove('grab');
      equipmentSliderList.classList.add('grabbing');
    }
  },
  equipmentSwipeAction = function() {

    let evt = equipmentGetEvent(),
      style = equipmentSliderTrack.style.transform,
      equipmentTransform = +style.match(equipmentTrfRegExp)[0];

    equipmentPosX2 = equipmentPosX1 - evt.clientX;
    equipmentPosX1 = evt.clientX;

    equipmentPosY2 = equipmentPosY1 - evt.clientY;
    equipmentPosY1 = evt.clientY;

    if (!equipmentIsSwipe && !equipmentIsScroll) {
      let equipmentPosY = Math.abs(equipmentPosY2);
      if (equipmentPosY > 7 || equipmentPosX2 === 0) {
        equipmentIsScroll = true;
        equipmentAllowSwipe = false;
      } else if (equipmentPosY < 7) {
        equipmentIsSwipe = true;
      }
    }

    if (equipmentIsSwipe) {
      if (equipmentSlideIndex === 0) {
        if (equipmentPosInit < equipmentPosX1) {
            equipmentSetTransform(equipmentTransform, 0);
          return;
        } else {
            equipmentAllowSwipe = true;
        }
      }

      if (equipmentSlideIndex === --equipmentSlides.length) {
        if (equipmentPosInit > equipmentPosX1) {
            equipmentSetTransform(equipmentTransform, equipmentLastTrf);
          return;
        } else {
            equipmentAllowSwipe = true;
        }
      }

      if (equipmentPosInit > equipmentPosX1 && equipmentTransform < equipmentNextTrf || equipmentPosInit < equipmentPosX1 && equipmentTransform > equipmentPrevTrf) {
        equipmentReachEdge();
        return;
      }

      equipmentSliderTrack.style.transform = `translate3d(${equipmentTransform - equipmentPosX2}px, 0px, 0px)`;
    }

  },
  equipmentSwipeEnd = function() {
    equipmentPosFinal = equipmentPosInit - equipmentPosX1;

    equipmentIsScroll = false;
    equipmentIsSwipe = false;

    document.removeEventListener('touchmove', equipmentSwipeAction);
    document.removeEventListener('mousemove', equipmentSwipeAction);
    document.removeEventListener('touchend', equipmentSwipeEnd);
    document.removeEventListener('mouseup', equipmentSwipeEnd);

    equipmentSliderList.classList.add('grab');
    equipmentSliderList.classList.remove('grabbing');

    if (equipmentAllowSwipe) {
      if (Math.abs(equipmentPosFinal) > equipmentPosThreshold) {
        if (equipmentPosInit < equipmentPosX1) {
            equipmentSlideIndex--;
          const equipmentSlideData = equipmentSlides[equipmentSlideIndex].dataset.equipment;
          equipmentPagination.forEach((item) => {
              if (equipmentSlideData === item.dataset.equipment) {
                  item.classList.add('equipment-slider-pag-item-active');
              } else {
                item.classList.remove('equipment-slider-pag-item-active');
              }
          })
          if(equipmentSlideIndex>=0){
            // slideNum.innerHTML = slideIndex+1;
          }
        } else if (equipmentPosInit > equipmentPosX1) {
            equipmentSlideIndex++;
          const equipmentSlideData = equipmentSlides[equipmentSlideIndex].dataset.equipment;
          equipmentPagination.forEach((item) => {
              if (equipmentSlideData === item.dataset.equipment) {
                  item.classList.add('equipment-slider-pag-item-active');
              } else {
                item.classList.remove('equipment-slider-pag-item-active');
              }
          })
          if(equipmentSlideIndex>=0){
            // slideNum.innerHTML = slideIndex+1;
        }
        }
      }

      if (equipmentPosInit !== equipmentPosX1) {
        equipmentAllowSwipe = false;
        equipmentSlide();
      } else {
        equipmentAllowSwipe = true;
      }

    } else {
      equipmentAllowSwipe = true;
    }

  },
  equipmentSetTransform = function(equipmentTransform, equipmentComapreTransform) {
    if (equipmentTransform >= equipmentComapreTransform) {
      if (equipmentTransform > equipmentComapreTransform) {
        equipmentSliderTrack.style.transform = `translate3d(${equipmentComapreTransform}px, 0px, 0px)`;
      }
    }
    equipmentAllowSwipe = false;
  },
  equipmentReachEdge = function() {
    equipmentTransition = false;
    equipmentSwipeEnd();
    equipmentAllowSwipe = true;
  };

equipmentSliderTrack.style.transform = 'translate3d(0px, 0px, 0px)';
equipmentSliderList.classList.add('grab');

equipmentSliderTrack.addEventListener('transitionend', () => allowSwipe = true);
equipmentSlider.addEventListener('touchstart', equipmentSwipeStart);
equipmentSlider.addEventListener('mousedown', equipmentSwipeStart);

equipmentPagination.forEach((item) => {
    item.addEventListener('click', function(e) {
        equipmentPagination.forEach((pag) => {
            pag.classList.remove('equipment-slider-pag-item-active');
        })
        e.target.classList.add('equipment-slider-pag-item-active');
        equipmentSlides.forEach((sl) => {
            if (e.target.dataset.equipment === sl.dataset.equipment) {
                equipmentSlideIndex = sl.dataset.equipment - 1;
                equipmentSlide();
            } 
        })
    })
})
