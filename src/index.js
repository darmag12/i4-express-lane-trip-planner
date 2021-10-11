import { eastWestBounds } from './data.js';
import MarkerWithLabel from '@googlemaps/markerwithlabel';
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
};

let map;
let directionValue;
let allEntryCoords;
let marker;
let allMarkers;
let infoWindow;
let bounds;
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
  // Creates a styles array to use with the map.
  let styles = [
    {
      featureType: 'road.highway',
      elementType: 'geometry',
      stylers: [{ color: '#424242' }, { lightness: 20 }],
    },

    {
      featureType: 'road.highway.controlled_access',
      elementType: 'geometry',
      stylers: [{ color: '#FFAB40' }, { lightness: 20 }],
    },
  ];

  // JS API is loaded and available
  let options = {
    center: orlandoCod,
    zoom: 13,
    styles: styles,
    mapTypeControl: true,
    mapTypeControlOptions: {
      mapTypeIds: ['roadmap', 'terrain', 'hybrid', 'satellite'],
    },
    // mapId: '9ffa16729c1a3c66'
  };

  map = new google.maps.Map(domElements.mapContainerStr, options);
  map.setTilt();

  infoWindow = new google.maps.InfoWindow();

  domElements.directionStr.addEventListener('change', getDirection);
  domElements.entryPointStr.addEventListener('change', getExits);
  // domElements.showListingsStr.addEventListener('click', showRoutes);
  // domElements.hideListingsStr.addEventListener('click', hideListings);

  function populateInfoWindow(marker, infoWind) {
    if (infoWind.marker != marker) {
      // Clear the infowindow content to give the streetview time to load.
      // infoWind.setContent('');
      // infoWind.marker = marker;
      // infoWind.addListener('closeclick', function () {
      //   infoWind.marker = null;
      // });
      function getStreetView(data, status) {
        // if (true) {
        //   infoWind.setContent(
        //     `<div>${marker.title}</div><div id="pano"></div>`
        //   );
        // } else {
        //   infoWind.setContent(
        //     `<div>${marker.title}</div><div>No Steet View Found ):</div>`
        //   );
        // }
      }
      // Open the infowindow on the correct marker.
      // infoWind.open(map, marker);
    }
  }

  // Gets direction from user input East or West
  function getDirection(e) {
    directionValue = parseInt(e.target.value, 10);
    directionValue ? getRoutes(directionValue) : null;
  }

  // Gets routes corresponding to the direction selected
  function getRoutes(directionVal) {
    // display step number 2 by removing the class that's hiding it
    domElements.secondStepStr.classList.remove('hide');

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
    let wbExclude = ['n', 'v'];
    let ebExclude = ['c', 'h', 'm'];

    let boundPoints, boundPoint;
    // checking if user selected eastbound then displaying
    // all eastbound entry and exit points
    if (dirVal === 1) {
      boundPoints = eastWestBounds
        .filter(road => !ebExclude.includes(road.id))
        .reverse();
      removeAllChildNodes(domElements.entryPointStr);

      // loops through all the roads and outputs option elements
      boundsIterator(boundPoints);
    } else {
      // checking if user selected westbound then displaying
      // all westbound entry and exit points
      boundPoints = eastWestBounds.filter(road => !wbExclude.includes(road.id));
      removeAllChildNodes(domElements.entryPointStr);

      // loops through all the roads and outputs option elements
      boundsIterator(boundPoints);
    }

    // A function that contains a for..of loop
    function boundsIterator(points) {
      for (boundPoint of points) {
        domElements.entryPointStr.insertAdjacentHTML(
          'beforeend',
          `
        <option value="${boundPoint.id}">${boundPoint.title}</option>
        
        `
        );
        // eastWestCoords = {boundPoint.coords};
        // markerCreator(boundPoint.title, boundpoint)
        if (directionValue === 1) {
          allEntryCoords = boundPoint.coords.east;
          hideMarkers();
          markerCreator(boundPoint.title, allEntryCoords, boundPoint.id);
          showPoints();
        } else {
          allEntryCoords = boundPoint.coords.west;
          hideMarkers();
          markerCreator(boundPoint.title, allEntryCoords, boundPoint.id);
          showPoints();
        }

        // console.log(eastCoords);
      }
    }
  }

  // gets respective exits
  function getExits(e) {
    // westMarkers.forEach(mark => {
    //   mark.setMap(null);
    // });

    let boundPointsExits, boundPointExit, selectedPoint, exitPointsArr;
    // get the values of each entry point
    selectedPoint = e.target.value;
    // filter the values and return respective exits
    // if value === a,b,c or d display f,j,m,o,r,t,u,w
    // if value === e display j,m,o,r,t,u,w
    // if value === f,g,h,i,j,k,l display t,u,w
    // if value === m display r,t,u,w
    // if value === o,p display t,u,w
    // if value === q,r,s,t display no exit
    // if value === u display w
    if (directionValue === 2) {
      switch (selectedPoint) {
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
      switch (selectedPoint) {
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
        }
      } else {
        domElements.exitPointStr.insertAdjacentHTML(
          'beforeend',
          `
          <option>NO EXITS FOUND ):</option>
          
          `
        );
      }

      // console.log(boundPointsExits);
    }
  }

  //===========REUSED FUNCTIONS==================//
  // removes all child nodes except the selected one
  function removeAllChildNodes(parent) {
    while (!parent.lastChild.id) {
      parent.removeChild(parent.lastChild);
    }
  }

  // creates markers
  function markerCreator(title, position, id) {
    // Custom Marker
    const svgMarker = {
      path: 'M10.453 14.016l6.563-6.609-1.406-1.406-5.156 5.203-2.063-2.109-1.406 1.406zM12 2.016q2.906 0 4.945 2.039t2.039 4.945q0 1.453-0.727 3.328t-1.758 3.516-2.039 3.070-1.711 2.273l-0.75 0.797q-0.281-0.328-0.75-0.867t-1.688-2.156-2.133-3.141-1.664-3.445-0.75-3.375q0-2.906 2.039-4.945t4.945-2.039z',
      fillColor: '#0857c3',
      fillOpacity: 0.6,
      strokeWeight: 0,
      rotation: 0,
      scale: 1,
      anchor: new google.maps.Point(10, 20),
    };

    // new label instance
    // new MarkerWithLabel({
    //   position: position,
    //   clickable: true,
    //   map: map,
    //   labelContent: title, // can also be HTMLElement
    //   // labelAnchor: new google.maps.Point(-21, 3),
    //   labelClass: 'labels', // the CSS class for the label
    //   labelStyle: { opacity: 1.0 }
    // });
    // new marker instance
    marker = new MarkerWithLabel({
      position: position,
      clickable: true,
      title: title,
      labelContent: title, // can also be HTMLElement
      labelClass: 'labels', // the CSS class for the label
      labelStyle: { opacity: 1.0 },
      icon: svgMarker,
      id: id,
      animation: google.maps.Animation.DROP,
    });

    // Push each marker into the markers array
    directionValue === 1 ? eastMarkers.push(marker) : westMarkers.push(marker);

    // marker.addListener('click', function () {
    //   populateInfoWindow(this, infoWindow);
    // });
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

  // function that loops all the markers
  function toggleMarkersFromMap(arr) {
    let filteredMarkers;
    if (arr) {
      allMarkers = eastMarkers.concat(westMarkers);
      filteredMarkers = allMarkers.filter(mark => arr.includes(mark.id));
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
    // console.log(allMarkers);
  }
};

// Appended the 'script' element to 'head'
document.head.appendChild(script);

//NOTES

// this method takes in 2 arguments:
// 1. Where to open the info window
// 2. Precise place we want the info window to display.
// infoWindow.open(map, marker);
