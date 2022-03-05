filterSelection("all")
function filterSelection(c) {
  var x, i;
  x = document.getElementsByClassName("column");
  if (c == "all") c = "";
  for (i = 0; i < x.length; i++) {
    w3RemoveClass(x[i], "show");
    if (x[i].className.indexOf(c) > -1) w3AddClass(x[i], "show");
  }
}

function w3AddClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    if (arr1.indexOf(arr2[i]) == -1) {element.className += " " + arr2[i];}
  }
}

function w3RemoveClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    while (arr1.indexOf(arr2[i]) > -1) {
      arr1.splice(arr1.indexOf(arr2[i]), 1);     
    }
  }
  element.className = arr1.join(" ");
}


// Add active class to the current button (highlight it)
var btnContainer = document.getElementById("myBtnContainer");
var btns = btnContainer.getElementsByClassName("btn");
for (var i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function(){
    var current = document.getElementsByClassName("active");
    current[0].className = current[0].className.replace(" active", "");
    this.className += " active";
  });
}

//-----------------------------//
//-------Accordion Js----------//
//-----------------------------//

(function() {
  // Multi-Level Accordion Menu - by CodyHouse.co
  var accordionsMenu = document.getElementsByClassName('cd-accordion--animated');

  if (accordionsMenu.length > 0 && window.requestAnimationFrame) {
      for (var i = 0; i < accordionsMenu.length; i++) {
          (function(i) {
              accordionsMenu[i].addEventListener('change', function(event) {
                  animateAccordion(event.target);
              });
          })(i);
      }

      function animateAccordion(input) {
          var bool = input.checked,
              dropdown = input.parentNode.getElementsByClassName('cd-accordion__sub')[0];

          Util.addClass(dropdown, 'cd-accordion__sub--is-visible'); // make sure subnav is visible while animating height

          var initHeight = !bool ? dropdown.offsetHeight : 0,
              finalHeight = !bool ? 0 : dropdown.offsetHeight;

          Util.setHeight(initHeight, finalHeight, dropdown, 200, function() {
              Util.removeClass(dropdown, 'cd-accordion__sub--is-visible');
              dropdown.removeAttribute('style');
          });
      }
  }
}());


// Utility function
function Util() {};

/* 
class manipulation functions
*/
Util.hasClass = function(el, className) {
  if (el.classList) return el.classList.contains(className);
  else return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));
};

Util.addClass = function(el, className) {
  var classList = className.split(' ');
  if (el.classList) el.classList.add(classList[0]);
  else if (!Util.hasClass(el, classList[0])) el.className += " " + classList[0];
  if (classList.length > 1) Util.addClass(el, classList.slice(1).join(' '));
};

Util.removeClass = function(el, className) {
  var classList = className.split(' ');
  if (el.classList) el.classList.remove(classList[0]);
  else if (Util.hasClass(el, classList[0])) {
      var reg = new RegExp('(\\s|^)' + classList[0] + '(\\s|$)');
      el.className = el.className.replace(reg, ' ');
  }
  if (classList.length > 1) Util.removeClass(el, classList.slice(1).join(' '));
};



/* 
Animate height of an element
*/
Util.setHeight = function(start, to, element, duration, cb) {
  var change = to - start,
      currentTime = null;

  var animateHeight = function(timestamp) {
      if (!currentTime) currentTime = timestamp;
      var progress = timestamp - currentTime;
      var val = parseInt((progress / duration) * change + start);
      element.setAttribute("style", "height:" + val + "px;");
      if (progress < duration) {
          window.requestAnimationFrame(animateHeight);
      } else {
          cb();
      }
  };

  //set the height of the element before starting animation -> fix bug on Safari
  element.setAttribute("style", "height:" + start + "px;");
  window.requestAnimationFrame(animateHeight);
};
