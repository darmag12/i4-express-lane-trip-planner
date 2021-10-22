import { eastWestBounds } from './data.js';
import MarkerWithLabel from '@googlemaps/markerwithlabel';
import { styles } from './mapstyles.js';
import './index.css';

// This is set to an environment variable
const apiKey = process.env.API_KEY;
// console.log(apiKey);

// Contains All the DOM elements
const domElements = {
  mapContainerStr: document.getElementById('map'),
  directionStr: document.querySelector('[data-direction]'),
  directionTextStr: document.querySelector('[data-direction-text]'),
  secondStepStr: document.querySelector('.form__select-direction-two'),
  entryPointStr: document.querySelector('[data-entry]'),
  exitPointStr: document.querySelector('[data-exit]'),
  viewRouteStr: document.querySelector('[data-view]'),
  popupContainerStr: document.querySelector('[data-instruction-popup]'),
  popupContentStr: document.querySelector('[data-instruction-popup-content]'),
  popupCloseStr: document.querySelector('[data-instruction-popup-close]'),
  popupMapInstructionsStr: document.querySelector(
    '[data-instruction-popup-info]'
  ),
};

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

  function populateInfoWindow(marker) {
    if (marker) {
      // display popup when a marker is clicked
      displayPopup();

      // display map instructions
      populatePopup(marker.id);
      console.log(marker.id);

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
          getExit();
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

    // reset exit dropdown if there's any value
    resetDropDown(domElements.exitPointStr);

    // hide view route button
    domElements.viewRouteStr.classList.add('hide');

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

    wbExclude = ['n', 'v', 'w'];
    ebExclude = ['c', 'h', 'm', 'a'];

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
      for (boundPointEntry of points) {
        domElements.entryPointStr.insertAdjacentHTML(
          'beforeend',
          `
        <option value="${boundPointEntry.id}">${boundPointEntry.title}</option>
        
        `
        );

        if (directionValue === 1) {
          allEntryCoords = boundPointEntry.coords.east;
          // hides, shows then displays markers by calling two different functions
          hideCreateShowMarkers(
            boundPointEntry.title,
            allEntryCoords,
            boundPointEntry.id
          );
          showPoints();
        } else {
          allEntryCoords = boundPointEntry.coords.west;
          hideCreateShowMarkers(
            boundPointEntry.title,
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
    // get the values of each entry point
    if (e) {
      selectedEntryPoint = e.target.value;
    }

    // reset previous routes
    directionsRenderer.setMap(null);

    // hide view route button
    domElements.viewRouteStr.classList.add('hide');

    // change label color
    changeColor();

    // variables accesible within this scope
    let boundPointsExits, boundPointExit, exitPointsArr;

    // displayRoutes(directionValue);

    // filter the values and return respective exits
    // if value === a,b,c or d display f,j,m,o,r,t,u,w
    // if value === e display j,m,o,r,t,u,w
    // if value === f,g,h,i,j,k,l display t,u,w
    // if value === m display r,t,u,w
    // if value === o,p display t,u,w
    // if value === q,r,s,t display no exit
    // if value === u display w
    if (directionValue === 2) {
      switch (selectedEntryPoint) {
        case 'a':
        case 'b':
        case 'c':
        case 'd':
          exitPointsArr = ['f', 'j', 'm', 'o', 'r', 't', 'u', 'w'];
          removeAllChildNodes(domElements.exitPointStr);
          exitIterator(exitPointsArr);
          toggleMarkersFromMap(exitPointsArr);
          break;

        case 'e':
          exitPointsArr = ['j', 'm', 'o', 'r', 't', 'u', 'w'];
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
          exitPointsArr = ['r', 't', 'u', 'w'];
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

    // show view route button after user selects an exit
    domElements.viewRouteStr.classList.remove('hide');

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
    // loop through the data
    // access the instruction object
    // loop the instruction object
    // output all the instuctions in html form
    mapInstructions = eastWestBounds.map(inst => {
      return inst.instructions;
    });

    for (instructionsData of mapInstructions) {
      // console.log(instructionsData.title);
      // output all the titles
      if (markerID === instructionsData.id) {
        removeAllChildren(domElements.popupMapInstructionsStr);
        domElements.popupMapInstructionsStr.insertAdjacentHTML(
          'beforeend',
          `<h5>${instructionsData.title} <br></h5>
          `
        );

        // loops all the entry info then outputs them as html elements
        instructionsData.entry.map(ent => {
          domElements.popupMapInstructionsStr.insertAdjacentHTML(
            'beforeend',
            `
          <p><strong>ENTRY: </strong>${ent}<br></p>`
          );
        });

        // loops all the exit info then outputs them as html elements
        instructionsData.exit.map(ext => {
          domElements.popupMapInstructionsStr.insertAdjacentHTML(
            'beforeend',
            `
          <p><br><strong>EXIT: </strong>${ext}</p>`
          );
        });
      }
    }
  }

  //===========REUSED FUNCTIONS==================//
  // removes all child nodes except the selected one
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
      fillOpacity: 0.8,
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
      labelClass: `${eastLabels} ${westLabels} ${labelExitColor}`, // the CSS class for the label
      labelStyle: { opacity: 1.0 },
      icon: svgMarker,
      id: id,
      animation: google.maps.Animation.DROP,
    });

    // Push each marker into the markers array
    // markers.push(marker);
    directionValue === 1 ? eastMarkers.push(marker) : westMarkers.push(marker);

    marker.addListener('click', function () {
      populateInfoWindow(this);
    });
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
    if (arr) {
      allMarkers = removeDuplicates(
        eastMarkers.concat(westMarkers),
        it => it.id
      );
      // let allMarkersFiltered = uniqChar(allMarkers, it => it.id);
      filteredMarkers = allMarkers.filter(mark => arr.includes(mark.id));
      // console.log(filteredMarkers);
      if (directionValue === 1) {
        // delete current markers
        deleteMarkers(eastMarkers);
        // show new markers
        showMarkers(filteredMarkers);
        // reset filtered markers
        filteredMarkers = [];
      } else {
        // delete current markers
        deleteMarkers(westMarkers);
        // show new markers
        showMarkers(filteredMarkers);
        // reset filtered markers
        filteredMarkers = [];
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
  }

  // function that removes duplicate objects from an array
  function removeDuplicates(data, key) {
    return [...new Map(data.map(x => [key(x), x])).values()];
  }

  // function that resets drop downs to default
  function resetDropDown(item) {
    item.selectedIndex = 0;
  }
};

// Appended the 'script' element to 'head'
document.head.appendChild(script);

//NOTES

// this method takes in 2 arguments:
// 1. Where to open the info window
// 2. Precise place we want the info window to display.
// infoWindow.open(map, marker);
