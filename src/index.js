import { eastWestBounds } from './data.js';
import MarkerWithLabel from '@googlemaps/markerwithlabel';
import { styles } from './mapstyles.js';
import 'bootstrap';
import './index.css';

// This is set to an environment variable
const apiKey = process.env.API_KEY;
// console.log(apiKey);

// Contains All the DOM elements
const domElements = {
  mapContainerStr: document.getElementById('map'),
  mapSectionStr: document.querySelector('[data-map-key]'),
  stepNumberOneStr: document.querySelector('[data-step-one]'),
  stepNumberTwoStr: document.querySelector('[data-step-two]'),
  stepNumberThreeStr: document.querySelector('[data-step-three]'),
  directionStr: document.querySelector('[data-direction]'),
  directionTextStr: document.querySelector('[data-direction-text]'),
  secondStepStr: document.querySelector('.form__select-direction-two'),
  thirdStepStr: document.querySelector('.form__select-direction-three'),
  entryPointStr: document.querySelector('[data-entry]'),
  exitPointStr: document.querySelector('[data-exit]'),
  viewRouteStr: document.querySelector('[data-view]'),
  startOverStr: document.querySelector('[data-start-over]'),
  popupContainerStr: document.querySelector('[data-instruction-popup]'),
  popupContentStr: document.querySelector('[data-instruction-popup-content]'),
  popupCloseStr: document.querySelector('[data-instruction-popup-close]'),
  popupTxtImgContainerStr: document.querySelector(
    '[data-instruction-popup-txt-img-container]'
  ),
  popupMapInstructionsStr: document.querySelector(
    '[data-instruction-popup-info]'
  ),
  popupImageStr: document.querySelector('[data-instruction-popup-img]'),
  popupImageCarouselStr: document.querySelector(
    '[data-instruction-popup-carousel]'
  ),
};

// function created to specifiaclly loop all images
function importAll(r) {
  return r.keys().map(r);
}
const images = importAll(
  require.context('./assets/', true, /\.(png|jpe?g|svg)$/)
);

let map;
let directionValue;
let selectedEntryPoint;
let selectedExitPoint;
let selectedEntryExit;
let directionPoints;
let allEntryCoords;
let allExitCoords;
let marker;
let allMarkers;
let filteredMarkers;
let bounds;
let iconColor;
let labelExitColor;
let westLabels;
let eastLabels;
let directionsService;
let directionsRenderer;
let mapInstructions;
let instructionsData;
const orlandoCod = { lat: 28.5384, lng: -81.3789 };

// Created the script tag & set the appropriate attributes
let script = document.createElement('script');
script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=geometry&callback=initMap`;
script.async = true;

// Attached callback function to the `window` object
window.initMap = function () {
  let markers = [];
  let eastMarkers = [];
  let westMarkers = [];

  // Setting up the map options
  let options = {
    center: orlandoCod,
    zoom: 13,
    styles: styles, // comes from mapstyles.js
    mapTypeControl: true,
    mapTypeControlOptions: {
      mapTypeIds: ['roadmap', 'terrain', 'hybrid', 'satellite'],
    },
    // mapId: '9ffa16729c1a3c66'
  };

  // instanciate new map object
  map = new google.maps.Map(domElements.mapContainerStr, options);
  map.setTilt();

  // infoWindow = new google.maps.InfoWindow();
  // Instanciating Direction Service and Direction Renderer
  directionsService = new google.maps.DirectionsService();
  directionsRenderer = new google.maps.DirectionsRenderer();

  domElements.directionStr.addEventListener('change', getDirection);
  domElements.entryPointStr.addEventListener('change', getEntry);
  domElements.exitPointStr.addEventListener('change', getExit);
  domElements.viewRouteStr.addEventListener('click', viewRoute);
  domElements.startOverStr.addEventListener('click', startOver);

  function populateInfoWindow(marker) {
    if (marker) {
      // setting the entrypoints value to the respective ids then call
      // getEntry()
      function setEntryPointOnClick() {
        domElements.entryPointStr.value = marker.id;
        selectedEntryPoint = marker.id;
        getEntry();
      }

      // setting the exitpoints value to the respective ids then call
      // getExit()
      if (selectedEntryPoint) {
        function setExitPointOnClick() {
          domElements.exitPointStr.value = marker.id;
          selectedExitPoint = marker.id;
          // If the selected entry point does not match the marker's id, call getExit() else, call getEntry()
          selectedEntryPoint !== marker.id ? getExit() : getEntry();
        }

        // this function only runs the code inside it once
        function execOnceExit() {
          // check if selectedEntryPoint is NOT true then call setEntry
          if (!selectedExitPoint) setExitPointOnClick();
        }

        execOnceExit(); // only runs once
      }

      // this function only runs the code inside it once
      function execOnceEntry() {
        // check if selectedEntryPoint is NOT true then call setEntry
        if (!selectedEntryPoint) setEntryPointOnClick();
      }

      execOnceEntry(); // runs once

      // display popup when a marker is clicked
      displayPopup();

      // display map instructions
      populatePopup(marker.id);
    }
  }

  // Gets direction from user input East or West
  function getDirection(e) {
    directionValue = parseInt(e.target.value, 10);
    // call getroutes if direction is true else reload/clear everything
    directionValue ? getRoutes(directionValue) : location.reload();
  }

  // Gets routes corresponding to the direction selected
  function getRoutes(directionVal) {
    // display step number 2 by removing the class that's hiding it
    domElements.secondStepStr.classList.remove('hide');

    /* ==========FOR BETTER UX============== */
    // Remove 'heart' class from step number 1
    domElements.stepNumberOneStr.classList.remove('heart');

    // Add 'heart' class to the step number 2 for better UX
    domElements.stepNumberTwoStr.classList.add('heart');
    /* ==========FOR BETTER UX============== */

    // reset exit dropdown if there's any value
    resetDropDown(domElements.exitPointStr);

    // hide step number 3 by adding the class 'hide'
    domElements.thirdStepStr.classList.add('hide');

    // hide view route button
    domElements.viewRouteStr.classList.add('hide');
    // hide start over button
    domElements.startOverStr.classList.add('hide');

    let dirBound = '';
    if (directionVal === 1) {
      //make entry points dynamic
      if (dirBound === '' || dirBound === 'Westbound') {
        domElements.directionTextStr.textContent = 'Eastbound';
      } else {
        //reset to empty string
        domElements.directionTextStr.textContent = '';
      }
    } else {
      // entry point set to westbound
      domElements.directionTextStr.textContent = 'Westbound';
    }

    displayRoutes(directionVal);
  }

  // Display routes UI
  function displayRoutes(dirVal) {
    // reset previous routes
    directionsRenderer.setMap(null);

    // reset entry point
    selectedEntryPoint = null;
    // reset exit point
    selectedExitPoint = null;

    // clear the exit dropdown
    removeAllChildNodes(domElements.exitPointStr);

    // changes color, and position of the labels based on the directions
    changeColor();

    // variables only available in this scope
    let boundPointsEntries, boundPointEntry, wbExclude, ebExclude;

    wbExclude = ['n', 'v', 'w', 'q', 'r', 's', 't'];
    ebExclude = ['c', 'm', 'a', 'e', 'd', 'b'];

    // checking if user selected eastbound then displaying
    // all eastbound entry and exit points
    if (dirVal === 1) {
      boundPointsEntries = eastWestBounds
        .filter(road => !ebExclude.includes(road.id))
        .reverse();
      removeAllChildNodes(domElements.entryPointStr);

      // loops through all the entry roads and outputs option elements
      boundsIterator(boundPointsEntries);
    } else {
      // checking if user selected westbound then displaying
      // all westbound entry and exit points
      boundPointsEntries = eastWestBounds.filter(
        road => !wbExclude.includes(road.id)
      );
      removeAllChildNodes(domElements.entryPointStr);

      // loops through all the roads and outputs option elements
      boundsIterator(boundPointsEntries);
    }

    // A function that contains a for..of loop
    function boundsIterator(points) {
      let modifyTurnpikeTitle;
      for (boundPointEntry of points) {
        // Turnpike's title is already pre defined as 'Southbound' in 'data.js' so all we're doing is replacing 'Southbound' with 'Northbound'
        modifyTurnpikeTitle =
          directionValue === 1
            ? boundPointEntry.title.replace('Southbound', 'Northbound')
            : boundPointEntry.title;
        // Insert entrypoints in form of options tags in the DOM
        domElements.entryPointStr.insertAdjacentHTML(
          'beforeend',
          `
        <option value="${boundPointEntry.id}">${modifyTurnpikeTitle}</option>
        
        `
        );
        if (directionValue === 1) {
          allEntryCoords = boundPointEntry.coords.east;
          // hides, shows then displays markers by calling two different functions
          console.log(boundPointEntry.title);
          hideCreateShowMarkers(
            modifyTurnpikeTitle,
            allEntryCoords,
            boundPointEntry.id
          );
          showPoints();
        } else {
          allEntryCoords = boundPointEntry.coords.west;
          hideCreateShowMarkers(
            modifyTurnpikeTitle,
            allEntryCoords,
            boundPointEntry.id
          );
          showPoints();
        }

        // console.log(eastCoords);
      }
    }
  }

  // gets entry points and displays respective exits for the selected entry
  function getEntry(e) {
    // reset selected exit point
    selectedExitPoint = null;

    // get the values of each entry point
    if (e) {
      selectedEntryPoint = e.target.value;
    }

    // reset previous routes
    directionsRenderer.setMap(null);

    /* ==========FOR BETTER UX============== */
    // ADD 'heart' class from step number 2
    domElements.stepNumberTwoStr.classList.add('heart');

    /* ==========FOR BETTER UX============== */

    // hide step number 3 by adding the class 'hide'
    domElements.thirdStepStr.classList.add('hide');

    // hide view route button
    domElements.viewRouteStr.classList.add('hide');
    // hide start over button
    domElements.startOverStr.classList.add('hide');

    // change label color
    changeColor();

    // variables accesible within this scope
    let boundPointsExits, boundPointExit, exitPointsArr;

    // displayRoutes(directionValue);

    // filter the values and return respective exits for westbound
    if (directionValue === 2) {
      switch (selectedEntryPoint) {
        case 'a':
        case 'b':
        case 'c':
        case 'd':
          exitPointsArr = ['f', 'j', 'm', 'o', 's', 't', 'u', 'w'];
          removeAllChildNodes(domElements.exitPointStr);
          exitIterator(exitPointsArr);
          toggleMarkersFromMap(exitPointsArr);
          break;

        case 'e':
          exitPointsArr = ['j', 'm', 'o', 's', 't', 'u', 'w'];
          removeAllChildNodes(domElements.exitPointStr);
          exitIterator(exitPointsArr);
          toggleMarkersFromMap(exitPointsArr);
          break;

        case 'f':
        case 'g':
        case 'h':
        case 'i':
        case 'j':
        case 'k':
        case 'l':
        case 'o':
        case 'p':
          exitPointsArr = ['t', 'u', 'w'];
          removeAllChildNodes(domElements.exitPointStr);
          exitIterator(exitPointsArr);
          toggleMarkersFromMap(exitPointsArr);
          break;

        case 'm':
          exitPointsArr = ['s', 't', 'u', 'w'];
          removeAllChildNodes(domElements.exitPointStr);
          exitIterator(exitPointsArr);
          toggleMarkersFromMap(exitPointsArr);
          break;

        case 'q':
        case 'r':
        case 's':
        case 't':
          removeAllChildNodes(domElements.exitPointStr);
          exitIterator(exitPointsArr);
          toggleMarkersFromMap(exitPointsArr);
          break;

        case 'u':
          exitPointsArr = ['w'];
          removeAllChildNodes(domElements.exitPointStr);
          exitIterator(exitPointsArr);
          toggleMarkersFromMap(exitPointsArr);
          break;
      }
    } else {
      // filters for eastbound
      switch (selectedEntryPoint) {
        case 'w':
        case 'v':
        case 'u':
        case 't':
        case 's':
          exitPointsArr = ['p', 'o', 'm', 'e', 'd', 'c', 'a'];
          removeAllChildNodes(domElements.exitPointStr);
          exitIterator(exitPointsArr);
          toggleMarkersFromMap(exitPointsArr);
          break;

        case 'r':
        case 'q':
        case 'p':
        case 'o':
        case 'l':
        case 'k':
        case 'i':
        case 'g':
        case 'f':
        case 'h':
          exitPointsArr = ['d', 'c', 'a'];
          removeAllChildNodes(domElements.exitPointStr);
          exitIterator(exitPointsArr);
          toggleMarkersFromMap(exitPointsArr);
          break;

        case 'n':
        case 'j':
          exitPointsArr = ['e', 'd', 'c', 'a'];
          removeAllChildNodes(domElements.exitPointStr);
          exitIterator(exitPointsArr);
          toggleMarkersFromMap(exitPointsArr);
          break;

        case 'e':
        case 'd':
        case 'b':
          removeAllChildNodes(domElements.exitPointStr);
          exitIterator(exitPointsArr);
          toggleMarkersFromMap(exitPointsArr);
          break;
      }
    }

    // eastbound
    // if value === w,v,u,t,s display p,o,m,e,d,c,a
    // if value === r,q,p,o,l,k,i,g,f display d,c,a
    // if value === n,j display e,d,c,a
    // if value === e,d,b display no exit
    // display exit points in the UI

    // loops and filters exit points, returns matches then injects html code in the dom with the matching data
    function exitIterator(arr) {
      if (arr) {
        boundPointsExits = eastWestBounds.filter(exit => arr.includes(exit.id));

        // reorders the exits based on the direction the user selects i.e
        // Eastbound/Westbound
        directionValue === 1 ? boundPointsExits.reverse() : boundPointsExits;

        for (boundPointExit of boundPointsExits) {
          domElements.exitPointStr.insertAdjacentHTML(
            'beforeend',
            `
          <option value="${boundPointExit.id}">${boundPointExit.title}</option>
          
          `
          );

          if (directionValue === 1) {
            allExitCoords = boundPointExit.coords.east;
            // hides, creates and shows new markers by calling 3 different functions
            hideCreateShowMarkers(
              boundPointExit.title,
              allExitCoords,
              boundPointExit.id
            );
          } else {
            allExitCoords = boundPointExit.coords.west;
            // hides, creates and shows new markers by calling 3 different functions
            hideCreateShowMarkers(
              boundPointExit.title,
              allExitCoords,
              boundPointExit.id
            );
          }
        }
      } else {
        domElements.exitPointStr.insertAdjacentHTML(
          'beforeend',
          `
          <option>NO EXITS FOUND ):</option>
          
          `
        );
      }
    }
  }

  // this function gets exit points selected by the user
  function getExit(e) {
    if (e) {
      // set the value of the exit points if event is true
      selectedExitPoint = e.target.value;
    }
    // reset previous routes
    directionsRenderer.setMap(null);

    // display step number 3 by removing the class that's hiding it
    domElements.thirdStepStr.classList.remove('hide');

    // show view route button after user selects an exit
    domElements.viewRouteStr.classList.remove('hide');
    // show start over button after user selects an exit
    domElements.startOverStr.classList.remove('hide');

    /* ==========FOR BETTER UX============== */
    // Remove 'heart' class from step number 2
    domElements.stepNumberTwoStr.classList.remove('heart');

    // Add 'heart' class to the step number 3 for better UX
    domElements.stepNumberThreeStr.classList.add('heart');
    /* ==========FOR BETTER UX============== */

    // store the ids of the selected entry and exit point
    selectedEntryExit = [selectedEntryPoint, selectedExitPoint];

    // display only markers for the entry and exit point selected
    // loop all markers and filter
    directionPoints = allMarkers.filter(mark =>
      selectedEntryExit.includes(mark.id)
    );
    // hide current markers
    deleteMarkers(allMarkers);

    // only display entry and exit point markers
    showMarkers(directionPoints);
  }

  // this function gets draws a line on the map to view the route
  function viewRoute() {
    // set the start and end points
    let start = directionPoints[0].position;
    let end = directionPoints[1].position;
    // set our request object
    let request = {
      origin: start,
      destination: end,
      travelMode: 'DRIVING',
    };
    // get the route of our start and end points
    directionsService.route(request, function (result, status) {
      if (status == 'OK') {
        // set our direction render
        directionsRenderer.setOptions({
          map: map,
          directions: result,
          suppressMarkers: true,
          polylineOptions: {
            strokeColor: '#1E90FF',
            strokeOpacity: 1,
            strokeWeight: 3,
          },
        });
      } else {
        window.alert('Route request failed due to ' + status);
      }
    });
  }

  // function incharge of displaying modal
  function displayPopup() {
    // Get the modal
    let modal = domElements.popupContainerStr;

    // Get the <span> element that closes the modal
    let span = domElements.popupCloseStr;

    // When the user clicks on the button, open the modal
    modal.style.display = 'block';

    // When the user clicks on <span> (x), close the modal
    span.onclick = function () {
      modal.style.display = 'none';
    };

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
      if (event.target == modal) {
        modal.style.display = 'none';
      }
    };
  }

  // function for displaying map instructions inside the popup
  function populatePopup(markerID) {
    let eastBoundsEntInfo,
      westBoundsEntInfo,
      displayImg,
      activeImg,
      imgIcons,
      mapKeyPath,
      mapKeyImage,
      dynamicTitle;

    // filters all images that include 'number-'
    imgIcons = images.filter(img => img.includes('number-'));
    // console.log(imgIcons);
    // loop through the data
    // access the instruction object
    // loop the instruction object
    // output all the instuctions in html form
    mapInstructions = eastWestBounds.map(inst => {
      return inst.instructions;
    });

    for (instructionsData of mapInstructions) {
      // check if marker id matches the current item
      if (markerID === instructionsData.id) {
        // FOR EASTBOUND
        if (directionValue === 1) {
          for (eastBoundsEntInfo in instructionsData.entryEB) {
            // switch checking if the key match the case
            switch (eastBoundsEntInfo) {
              case 'images':
                instructionsData.entryEB[eastBoundsEntInfo].map(image => {
                  // checks if the selected entry point matches the id of the current
                  // element in the loop
                  if (selectedEntryPoint === instructionsData.id) {
                    // map key path for entry
                    mapKeyPath = 'trip-planner-popup-enter-key-legend.png';
                    // filter and get matching path
                    mapKeyImage = images.filter(img =>
                      img.includes(mapKeyPath)
                    );
                    // removes any present images first
                    removeAllChildren(domElements.popupImageCarouselStr);
                    // displays carousel images
                    displayCarouselImages(image.imgIn, displayImg, activeImg);
                    // Add map key to popup
                    addPopupMapKey(mapKeyImage);
                  }
                  // checks if the selected exit point matches the id of the current
                  // element in the loop
                  if (selectedExitPoint === instructionsData.id) {
                    // map key path for exit
                    mapKeyPath = 'trip-planner-popup-exit-key-legend.png';
                    // filter and get matching path
                    mapKeyImage = images.filter(img =>
                      img.includes(mapKeyPath)
                    );
                    // removes any present images first
                    removeAllChildren(domElements.popupImageCarouselStr);
                    // displays carousel images
                    displayCarouselImages(image.imgOut, displayImg, activeImg);
                    // Add map key to popup
                    addPopupMapKey(mapKeyImage);
                  }

                  // console.log(images);
                });

                break;
              case 'entry':
                // checks if the selected entry point matches the id of the current
                // element in the loop
                if (selectedEntryPoint === instructionsData.id) {
                  // check if title includes to then replace with from
                  if (instructionsData.title.includes('Princeton')) {
                    dynamicTitle = instructionsData.title;
                  } else {
                    dynamicTitle = instructionsData.title.replace('to', 'from');
                  }
                  // removes all elements then adds respective title
                  removeAddElementsForPopup(
                    dynamicTitle,
                    domElements.popupMapInstructionsStr
                  );

                  // loops all the entry info then outputs them as html elements
                  instructionsData.entryEB[eastBoundsEntInfo].map((ent, i) => {
                    domElements.popupMapInstructionsStr.insertAdjacentHTML(
                      'beforeend',
                      `<div data-direction-text class="direction-text">${
                        instructionsData.entryEB[eastBoundsEntInfo].length <= 1
                          ? ''
                          : `<img src="${imgIcons[i]}" alt="First slide" />`
                      }<p>${ent}</p></div>
                        ${
                          // CHECKS IF THERE IS MORE THAN ONE EXIT, IF SO ADD 'OR'
                          instructionsData.entryEB[eastBoundsEntInfo].length <=
                          1
                            ? ''
                            : `<p class="text-center">or</p>`
                        }
                        `
                    );
                  });

                  // Checks if the length of our array is less than 1, if so nothing happens
                  // Else removes the last element of the popup map instructions, which in this case is '<p>OR</p>'
                  instructionsData.entryEB[eastBoundsEntInfo].length <= 1
                    ? null
                    : domElements.popupMapInstructionsStr.removeChild(
                        domElements.popupMapInstructionsStr.lastElementChild
                      );
                }
                break;
              case 'exit':
                // checks if the selected exit point matches the id of the current
                // element in the loop
                if (selectedExitPoint === instructionsData.id) {
                  // check if title includes from then replace with to
                  dynamicTitle = instructionsData.title.replace('from', 'to');
                  // removes all elements then adds respective title
                  removeAddElementsForPopup(
                    dynamicTitle,
                    domElements.popupMapInstructionsStr
                  );

                  // loops all the exit info then outputs them as html elements
                  instructionsData.entryEB[eastBoundsEntInfo].map((ext, i) => {
                    domElements.popupMapInstructionsStr.insertAdjacentHTML(
                      'beforeend',
                      `
                      <div data-direction-text class="direction-text">${
                        instructionsData.entryEB[eastBoundsEntInfo].length <= 1
                          ? ''
                          : `<img src="${imgIcons[i]}" alt="First slide" />`
                      }<p>${ext}</p></div>
                      
                      ${
                        // CHECKS IF THERE IS MORE THAN ONE EXIT, IF SO ADD 'OR'
                        instructionsData.entryEB[eastBoundsEntInfo].length <= 1
                          ? ''
                          : `<p class="text-center">or</p>`
                      }`
                    );
                  });

                  // Checks if the length of our array is less than 1, if so nothing happens
                  // Else removes the last element of the popup map instructions, which in this case is '<p>OR</p>'
                  instructionsData.entryEB[eastBoundsEntInfo].length <= 1
                    ? null
                    : domElements.popupMapInstructionsStr.removeChild(
                        domElements.popupMapInstructionsStr.lastElementChild
                      );
                }
                break;
            } // end of switch statement
          } // end of for...in loop
        } // end of 'if' eastbound checker

        // FOR WESTBOUND
        if (directionValue === 2) {
          for (westBoundsEntInfo in instructionsData.entryWB) {
            // console.log(instructionsData.entryWB[westBoundsEntInfo]);
            switch (westBoundsEntInfo) {
              case 'images':
                instructionsData.entryWB[westBoundsEntInfo].map(image => {
                  // checks if the selected entry point matches the id of the current
                  // element in the loop
                  if (selectedEntryPoint === instructionsData.id) {
                    // map key path for entry
                    mapKeyPath = 'trip-planner-popup-enter-key-legend.png';
                    // filter and get matching path
                    mapKeyImage = images.filter(img =>
                      img.includes(mapKeyPath)
                    );
                    // removes any present images first
                    removeAllChildren(domElements.popupImageCarouselStr);
                    // displays carousel images
                    displayCarouselImages(image.imgIn, displayImg, activeImg);
                    // Add map key to popup
                    addPopupMapKey(mapKeyImage);
                  }
                  // checks if the selected exit point matches the id of the current
                  // element in the loop
                  if (selectedExitPoint === instructionsData.id) {
                    // map key path for exit
                    mapKeyPath = 'trip-planner-popup-exit-key-legend.png';
                    // filter and get matching path
                    mapKeyImage = images.filter(img =>
                      img.includes(mapKeyPath)
                    );
                    // removes any present images first
                    removeAllChildren(domElements.popupImageCarouselStr);
                    // displays carousel images
                    displayCarouselImages(image.imgOut, displayImg, activeImg);
                    // Add map key to popup
                    addPopupMapKey(mapKeyImage);
                  }
                });
                break;
              case 'entry':
                // checks if the selected entry point matches the id of the current
                // element in the loop
                if (selectedEntryPoint === instructionsData.id) {
                  // check if title includes to then replace with from (I WILL REVISIT THIS)
                  if (
                    instructionsData.title.includes('Princeton') ||
                    instructionsData.title.includes('Daytona')
                  ) {
                    dynamicTitle = instructionsData.title;
                  } else {
                    dynamicTitle = instructionsData.title.replace('to', 'from');
                  }
                  // removes all elements then adds respective title
                  removeAddElementsForPopup(
                    dynamicTitle,
                    domElements.popupMapInstructionsStr
                  );

                  instructionsData.entryWB[westBoundsEntInfo].map((ent, i) => {
                    // loops all the entry info then outputs them as html elements
                    domElements.popupMapInstructionsStr.insertAdjacentHTML(
                      'beforeend',
                      `<div data-direction-text class="direction-text">${
                        instructionsData.entryWB[westBoundsEntInfo].length <= 1
                          ? ''
                          : `<img src="${imgIcons[i]}" alt="First slide" />`
                      }<p>${ent}</p></div>
                      ${
                        // CHECKS IF THERE IS MORE THAN ONE ENRTY, IF SO ADD 'OR'
                        instructionsData.entryWB[westBoundsEntInfo].length <= 1
                          ? ''
                          : `<p class="text-center">or</p>`
                      }
                      `
                    );
                  });
                  // Checks if the length of our array is less than 1, if so nothing happens
                  // Else removes the last element of the popup map instructions, which in this case is '<p>or</p>'
                  instructionsData.entryWB[westBoundsEntInfo].length <= 1
                    ? null
                    : domElements.popupMapInstructionsStr.removeChild(
                        domElements.popupMapInstructionsStr.lastElementChild
                      );
                }
                break;
              case 'exit':
                // checks if the selected exit point matches the id of the current
                // element in the loop
                if (selectedExitPoint === instructionsData.id) {
                  // check if title includes from then replace with to
                  dynamicTitle = instructionsData.title.replace('from', 'to');
                  // removes all elements then adds respective title
                  removeAddElementsForPopup(
                    dynamicTitle,
                    domElements.popupMapInstructionsStr
                  );

                  // loops all the exit info then outputs them as html elements
                  instructionsData.entryWB[westBoundsEntInfo].map((ext, i) => {
                    domElements.popupMapInstructionsStr.insertAdjacentHTML(
                      'beforeend',
                      `<div data-direction-text class="direction-text">
                      ${
                        instructionsData.entryWB[westBoundsEntInfo].length <= 1
                          ? ''
                          : `<img src="${imgIcons[i]}" alt="First slide" />`
                      }<p>${ext}</p></div>
                      ${
                        // CHECKS IF THERE IS MORE THAN ONE EXIT, IF SO ADD 'OR'
                        instructionsData.entryWB[westBoundsEntInfo].length <= 1
                          ? ''
                          : `<p class="text-center">or</p>`
                      }
                      `
                    );
                  });

                  // Checks if the length of our array is less than 1, if so nothing happens
                  // Else removes the last element of the popup map instructions, which in this case is '<p>or</p>'
                  instructionsData.entryWB[westBoundsEntInfo].length <= 1
                    ? null
                    : domElements.popupMapInstructionsStr.removeChild(
                        domElements.popupMapInstructionsStr.lastElementChild
                      );
                }
                break;
            } // end of switch statement
          } // end of for...in loop
        } // end of 'if' westbound checker
      }
    } // end of for..of loop
  }

  // function tied to an onclick handler that resets/reloads page
  function startOver() {
    // location.reload doesn't work in firefox
    window.location.href = '';
  }

  // Function that creates the map logo
  function getMapLogoAndShield() {
    let logoPath, logoImg, mapShieldPath, mapShieldImg;
    // logo's path
    logoPath = 'i4express-flyingE-logo.png';
    // filter and get matching path
    logoImg = images.filter(pic => pic.includes(logoPath));

    // map shield logo path
    mapShieldPath = 'I4-Shield-with-Arrows-400.png';
    // filter and get matching path
    mapShieldImg = images.filter(pic => pic.includes(mapShieldPath));

    // create logo element
    const createLogo = `
    <div class="i4-express-map-logo">
      <a href="">
        <img src="${logoImg}" alt="" />
      </a>
    </div>

    <div class="i4-express-shield-logo">
      <a href="">
        <img src="${mapShieldImg}" alt="" />
      </a>
    </div>
    `;
    // insert the logo in the DOM
    domElements.mapContainerStr.insertAdjacentHTML(
      'beforeend',
      `
      ${createLogo}
      `
    );
  }
  getMapLogoAndShield();
  // ================= END OF ALL FUNCTIONS THAT AREN'T REUSED==================//

  //===========REUSED FUNCTIONS==================//
  // removes all children elements then adds the road name
  function removeAddElementsForPopup(title, parent) {
    //===***** SOMETHING TO NOTE *****===//
    // title comes in mutated so insted of having for instance
    // 'Daytona to/form' we have Daytona from/from or to/to
    let newTitle;

    // check if EASTBOUND
    if (directionValue === 1) {
      // if title has southbound replace it to northbound
      newTitle = title.replace('Southbound', 'Northbound');
      // check if title includes Tampa
      // titleChecker = title.includes('Tampa');
      // newTitle = titleChecker
      //   ? toggleNorthSouthBound.replace('from/from', 'from')
      //   : toggleNorthSouthBound.replace('to/to', 'to');
      // check if titles include from then replace with to
    } else {
      // if title has northbound replace it to southbound
      newTitle = title.replace('Northbound', 'Southbound');
      // check if title includes Daytona
      // titleChecker = title.includes('Daytona');
      // newTitle = titleChecker
      //   ? toggleNorthSouthBound.replace('from/from', 'from')
      //   : toggleNorthSouthBound.replace('to/to', 'to');
    }
    // remove all children elements
    removeAllChildren(parent);
    // get popup title through ID
    let titleID = document.getElementById('RouteTitle');
    // check if title exists
    if (titleID) {
      // remove popup title
      titleID.remove();
    }
    // add popup title
    domElements.popupTxtImgContainerStr.insertAdjacentHTML(
      'afterbegin',
      `<h5 id="RouteTitle">${newTitle} <br></h5>`
    );
  }

  // removes all child nodes except the selected one with an ID
  function removeAllChildNodes(parent) {
    while (!parent.lastChild.id) {
      parent.removeChild(parent.lastChild);
    }
  }

  // removes all child elements with no exceptions
  function removeAllChildren(parent) {
    while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
    }
  }

  // creates markers
  function markerCreator(title, position, id) {
    // Custom Marker
    const svgMarker = {
      path: 'M10.453 14.016l6.563-6.609-1.406-1.406-5.156 5.203-2.063-2.109-1.406 1.406zM12 2.016q2.906 0 4.945 2.039t2.039 4.945q0 1.453-0.727 3.328t-1.758 3.516-2.039 3.070-1.711 2.273l-0.75 0.797q-0.281-0.328-0.75-0.867t-1.688-2.156-2.133-3.141-1.664-3.445-0.75-3.375q0-2.906 2.039-4.945t4.945-2.039z',
      fillColor: iconColor,
      fillOpacity: 0,
      strokeWeight: 0,
      rotation: 0,
      scale: 1,
      anchor: new google.maps.Point(10, 20),
    };

    // new marker instance
    marker = new MarkerWithLabel({
      position: position,
      clickable: true,
      title: title,
      labelContent: title, // can also be HTMLElement
      labelClass: `${eastLabels} ${westLabels} ${labelExitColor} ${id}`, // the CSS class for the label
      labelStyle: { opacity: 1.0 },
      icon: svgMarker,
      id: id,
      animation: google.maps.Animation.DROP,
    });

    // Push each marker into the markers array
    // markers.push(marker);
    directionValue === 1 ? eastMarkers.push(marker) : westMarkers.push(marker);

    // triggers when marker gets clicked
    marker.addListener('click', function () {
      populateInfoWindow(this);
    });

    // tri
  }

  // clears then sets bounds of the markers
  function showPoints() {
    // checks for the direction selected then calls showmarkers function to display the respective markers
    if (directionValue === 1) {
      showMarkers(eastMarkers);
    } else {
      showMarkers(westMarkers);
    }
    // map.fitBounds(bounds);
  }

  // Loops and displays markers (created to practice DRY)
  function showMarkers(arr) {
    // created a new instance of the boundary object
    bounds = new google.maps.LatLngBounds();
    // Sets markers and extends the boundaries of the map for each marker
    arr.forEach(mark => {
      mark.setMap(map);
      bounds.extend(mark.position);
    });

    map.fitBounds(bounds);
  }

  // Hides the markers
  function hideMarkers() {
    if (directionValue === 2) {
      // takes in an array of markers then deletes them
      deleteMarkers(eastMarkers);
      eastMarkers = [];
    } else {
      // takes in an array of markers then deletes them
      deleteMarkers(westMarkers);
      westMarkers = [];
    }
  }

  // sets all markers to null/deletes markers
  function deleteMarkers(arr) {
    arr.forEach(mark => {
      mark.setMap(null);
    });
  }

  // function that loops all the markers and filters it's ids to match
  // the items in the array in the argument
  function toggleMarkersFromMap(arr) {
    let entryMarker, newFilteredMarkers;
    if (arr) {
      allMarkers = removeDuplicates(
        eastMarkers.concat(westMarkers),
        it => it.id
      );

      // display only the entry marker
      // loop all markers and filter
      entryMarker = allMarkers.filter(mark =>
        selectedEntryPoint.includes(mark.id)
      );
      // let allMarkersFiltered = uniqChar(allMarkers, it => it.id);
      filteredMarkers = allMarkers.filter(mark => arr.includes(mark.id));
      newFilteredMarkers = removeDuplicates(
        entryMarker.concat(filteredMarkers),
        it => it.id
      );

      if (directionValue === 1) {
        // delete current markers
        deleteMarkers(eastMarkers);
        // show new markers
        // showMarkers(entryMarker);
        showMarkers(newFilteredMarkers);
        // reset filtered markers
        newFilteredMarkers = [];
      } else {
        // delete current markers
        deleteMarkers(westMarkers);
        // show new markers
        // showMarkers(entryMarker);
        showMarkers(newFilteredMarkers);
        // reset filtered markers
        newFilteredMarkers = [];
      }
    } else {
      // don't display any markers
      deleteMarkers(eastMarkers);
      deleteMarkers(westMarkers);
    }
  }

  // responsible for removing creating and showing new markers
  function hideCreateShowMarkers(title, coords, id) {
    hideMarkers();
    markerCreator(title, coords, id);
  }

  // change label colors
  function changeColor() {
    // setting icon color variables
    let greenColor = '#36b76f';
    let blueColor = '#41bedf';

    // checks if any direction is selected then toggle icon colors
    // accordingly
    if (directionValue) {
      iconColor = '';
      selectedEntryPoint ? (iconColor = blueColor) : (iconColor = greenColor);
    }
    if (directionValue === 1) {
      // if eastbound is selected, remove westlabels styles,
      // set eastbound lable styles,
      // reset the exit label styles
      westLabels = '';
      eastLabels = 'eastlabels';
      labelExitColor = '';
      // ternary for checking if an entry point was selected
      // if so, in this case
      // set labelExitColor to eastbound exit labels styles
      selectedEntryPoint
        ? (labelExitColor = 'exiteast')
        : (labelExitColor = '');
    } else {
      // if westbound is selected, remove eastlabels styles,
      // set westbound lable styles,
      // reset the exit label styles
      eastLabels = '';
      westLabels = 'westlabels';
      labelExitColor = '';
      // ternary for checking if an entry point was selected
      // if so, in this case
      // set labelExitColor to westbound exit labels styles
      selectedEntryPoint
        ? (labelExitColor = 'exitwest')
        : (labelExitColor = '');
    }

    fixMarkerColorBug();
  }

  // function that removes duplicate objects from an array
  function removeDuplicates(data, key) {
    return [...new Map(data.map(x => [key(x), x])).values()];
  }

  // function that resets drop downs to default
  function resetDropDown(item) {
    item.selectedIndex = 0;
  }

  // function that takes in an array and a className
  function displayCarouselImages(arr, cName, imgSrc) {
    arr.map((img, i) => {
      imgSrc = images.filter(pic => pic.includes(img));
      // sets the first image of the carousel to active
      cName = i === 0 ? 'active' : '';
      domElements.popupImageCarouselStr.insertAdjacentHTML(
        'beforeend',
        `
        <div
      class="carousel-item ${cName}"
    >
      <img
        class="d-block w-100"
        src="${imgSrc}"
        alt="First slide"
      />
    </div>
    `
      );
    });

    // Add Share button
    shareMap(imgSrc);
  }

  // Adds Map key to the popup
  function addPopupMapKey(mapKeyImg) {
    // get popup title by ID
    let PopupMapKeyID = document.getElementById('PopupMapKey');
    // check if title exists
    if (PopupMapKeyID) {
      // remove popup title
      PopupMapKeyID.remove();
    }
    domElements.popupImageStr.insertAdjacentHTML(
      'beforeend',
      `
    <div id="PopupMapKey" class="popup-map-key">
        <img class="d-block" src="${mapKeyImg}"/>
    </div>
    `
    );
  }

  // *********************** TO BE REVISED *****************//
  // Adds the share feature
  function shareMap(mapUrl) {
    let arrImgStr = mapUrl.toString();
    // const blob = await fetch(arrImgStr).then(r => r.blob());
    // get shareBtn Container through ID
    let shareBtnID = document.getElementById('shareBtn');

    // check if shareBtn container exists
    if (shareBtnID) {
      // remove shareBtn container
      shareBtnID.remove();
    }

    // Share btn icon
    let shareBtnIconStr = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-share-fill" viewBox="0 0 16 16">
                              <path d="M11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.499 2.499 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5z"/>
                          </svg>`;

    // insert shareBtn container to the DOM
    domElements.popupTxtImgContainerStr.insertAdjacentHTML(
      'beforeend',
      `<div id="shareBtn" class="text-center">
        <button class="btn btn-outline-info share-map-button">${shareBtnIconStr} Share Map</button>
        <p class="alert share-map-result" role="alert"></p>
      </div>`
    );

    // const shareData = {
    //   url: arrImgStr,
    // };

    const btnShare = document.querySelector('.share-map-button');
    const resultPara = document.querySelector('.share-map-result');

    // Share must be triggered by "user activation"
    btnShare.addEventListener('click', () => {
      try {
        navigator.share({
          url: arrImgStr,
        });
        // toggle between classes
        resultPara.classList.toggle('alert-success');
        // add success message
        resultPara.textContent = 'Map shared successfully!';
      } catch (err) {
        // toggle between classes
        resultPara.classList.toggle('alert-danger');
        // add error message
        resultPara.textContent = 'Error: ' + err;
      }
    });

    // console.log(mapUrl);
  }
  // *********************** TO BE REVISED *****************//

  // patching up bug for entry markers
  // **** //
  // For some reason, some entry points retain their exitpoint styles even when selected as an entry.
  // This mainly affects points that are used both in entry and exit
  // WILL REVIST THIS MATTER!
  // **** //
  function fixMarkerColorBug() {
    let elementMarkerO,
      elementMarkerP,
      elementMarkerM,
      elementMarkerF,
      elementMarkerU,
      elementMarkerJ;
    // IF MARKER IS TRUE, GET MARKER ELEMENTS FROM THE DOM
    if (marker) {
      elementMarkerO = document.querySelector(`.o`);
      elementMarkerP = document.querySelector(`.p`);
      elementMarkerM = document.querySelector(`.m`);
      elementMarkerF = document.querySelector(`.f`);
      elementMarkerU = document.querySelector(`.u`);
      elementMarkerJ = document.querySelector(`.j`);
    }

    // S.R 408
    if (selectedEntryPoint && elementMarkerO) {
      elementMarkerO.classList.remove(labelExitColor);
    }
    // MICHIGAN
    if (selectedEntryPoint && elementMarkerP) {
      elementMarkerP.classList.remove(labelExitColor);
    }
    // SOUTH ST.
    if (selectedEntryPoint && elementMarkerM) {
      elementMarkerM.classList.remove(labelExitColor);
    }
    // LEE ROAD
    if (selectedEntryPoint && elementMarkerF) {
      elementMarkerF.classList.remove(labelExitColor);
    }
    // GRAND NATIONAL
    if (selectedEntryPoint && elementMarkerU) {
      elementMarkerU.classList.remove(labelExitColor);
    }
    // IVANHOE
    if (selectedEntryPoint && elementMarkerJ) {
      elementMarkerJ.classList.remove(labelExitColor);
    }
  }

  // gets the map of the current selected entry
  function getEntryMaps() {}

  // gets the map of the current selected exit
  function getExitMaps() {}
};

// Appended the 'script' element to 'head'
document.head.appendChild(script);

//NOTES

// this method takes in 2 arguments:
// 1. Where to open the info window
// 2. Precise place we want the info window to display.
// infoWindow.open(map, marker);
