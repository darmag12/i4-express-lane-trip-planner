// List of all the westbound roads
export const eastWestBounds = [
  {
    id: 'a',
    title: 'Daytona Beach/DeLand/Lake Mary',
    coords: {
      east: { lat: 28.71238, lng: -81.37876 },
      west: { lat: 28.712332, lng: -81.378978 },
    },
    instructions: {
      id: 'a',
      title: 'I-4 Express Access from Daytona Beach/DeLand/Lake Mary',
      // East
      entryEB: {
        images: [
          {
            imgIn: ['dummy-map.jpg'],
            imgOut: ['Express-Lanes-Daytona-E-OFF-1.png'],
          },
        ],
        entry: ['No Available Entries :( (this is impossible)'],
        exit: [
          'Eastbound I-4 Express ends east of S.R. 434. All traffic merges with the eastbound I-4 general use lanes.',
        ],
      },
      // West
      entryWB: {
        images: [
          {
            imgIn: ['Express-Lanes-Daytona-W-ON-1.png'],
            imgOut: ['dummy-map.jpg'],
          },
        ],
        entry: [
          'From westbound I-4, you can begin traveling west in I-4 Express.',
        ],
        exit: ['No Available Exits :( (this is impossible)'],
      },

      // entry: [
      //   'From westbound I-4, you can begin traveling west in I-4 Express.',
      // ],
      // exit: [
      //   'Eastbound I-4 Express ends. All traffic merges with eastbound I-4 general use lanes.',
      // ],
    },
  },
  {
    id: 'b',
    title: 'S.R. 434 (Mile 94)',
    coords: {
      east: { lat: 28.69082, lng: -81.38862 },
      west: { lat: 28.69063, lng: -81.38897 },
    },
    instructions: {
      id: 'b',
      title: 'I-4 Express Access from S.R. 434',
      // East
      entryEB: {
        images: [
          {
            imgIn: ['dummy-map.jpg'],
            imgOut: ['dummy-map.jpg'],
          },
        ],
        entry: ['No Available Entries :( (this is impossible)'],
        exit: ['No Available Exits :( (this is impossible)'],
      },
      // West
      entryWB: {
        images: [
          {
            imgIn: ['Express-Lanes-434-B-ON-1.png'],
            imgOut: ['dummy-map.jpg'],
          },
        ],
        entry: [
          'From S.R. 434 to westbound I-4, the nearest I-4 Express ramp is west of S.R. 436.',
          'Travel from S.R. 434 to southbound Douglas Ave. to access the I-4 Express Direct Connect from Central Pkwy.',
        ],
        exit: ['No Available Exits :( (this is impossible)'],
      },

      // entry: [
      //   'From S.R. 434 to westbound I-4, the nearest I-4 Express ramp is west of S.R. 436',
      //   'Or travel from S.R. 434 to southbound Douglas Ave. to access the I-4 Express Direct Connect from Central Pkwy.',
      // ],
      // exit: ['NO EXITS AVAILABLE :('],
    },
  },
  {
    id: 'c',
    title: 'Central Pkwy. (Mile 93)',
    coords: {
      east: { lat: 28.67294, lng: -81.38825 },
      west: { lat: 28.67253, lng: -81.38893 },
    },
    instructions: {
      id: 'c',
      title: 'I-4 Express Access from Central Pkwy.',
      // East
      entryEB: {
        images: [
          {
            imgIn: ['dummy-map.jpg'],
            imgOut: ['Express-Lanes-CENTRAL-E-OFF-1.png'],
          },
        ],
        entry: ['No Available Entries :( (this is impossible)'],
        exit: ['Use the eastbound I-4 Express Direct Connect to Central Pkwy.'],
      },
      // West
      entryWB: {
        images: [
          {
            imgIn: ['Express-Lanes-CENTRAL-W-ON-1.png'],
            imgOut: ['dummy-map.jpg'],
          },
        ],
        entry: [
          'Use the Central Pkwy. Direct Connect to westbound I-4 Express.',
        ],
        exit: ['No Available Exits :( (this is impossible)'],
      },

      // entry: [
      //   '• [COLOR 1] Use the Central Pkwy. Direct Connect to westbound I-4 Express.',
      // ],
      // exit: [
      //   '• [COLOR 4] Use the eastbound I-4 Express Direct Connect to Central Pkwy.',
      // ],
    },
  },
  {
    id: 'd',
    title: 'S.R. 436 (Mile 92)',
    coords: {
      east: { lat: 28.66228, lng: -81.38845 },
      west: { lat: 28.66207, lng: -81.38864 },
    },
    instructions: {
      id: 'd',
      title: 'I-4 Express Access from S.R. 436',
      // East
      entryEB: {
        images: [
          {
            imgIn: ['dummy-map.jpg'],
            imgOut: ['Express-Lanes-436-E-OFF.png'],
          },
        ],
        entry: ['No Available Entries :( (this is impossible)'],
        exit: [
          'From eastbound I-4 Express, use the ramp west of S.R. 436 to merge onto eastbound I-4, then proceed to S.R. 436 (Exit 92).',
          'Use the eastbound I-4 Express Direct Connect to Central Pkwy, then travel south on Douglas Ave. or Palm Springs Drive to S.R. 436.',
        ],
      },
      // West
      entryWB: {
        images: [
          {
            imgIn: ['Express-Lanes-436-W-ON.png'],
            imgOut: ['dummy-map.jpg'],
          },
        ],
        entry: [
          'From S.R. 436 to westbound I-4 , the nearest I-4 Express ramp is just past the S.R. 436 on-ramp to westbound I-4.',
          'Travel from S.R. 436 to N. Westmonte Dr. Travel from N. Westmonte Dr. to northbound Douglas Ave. to access the I-4 Express Direct Connect from Central Pkwy.',
        ],
        exit: ['No Available Exits :( (this is impossible)'],
      },

      // entry: [
      //   '• [COLOR 1] From S.R. 436 to westbound I-4 , the nearest I-4 Express ramp is just past the S.R. 436 on-ramp to westbound I-4.',
      //   'o [COLOR 1 variant] Or travel from S.R. 436 to northbound Douglas Ave. or Palm Springs Drive to access the I-4 Express Direct Connect from Central Pkwy.',
      // ],
      // exit: [
      //   '• [COLOR 4] Use the eastbound I-4 Express Direct Connect to Central Pkwy.',
      //   'o [COLOR 4 variant] Or travel to the I-4 Express Direct Connect to Central Pkwy. Travel southbound on Douglas Ave. or Palm Springs Drive to S.R. 436.',
      // ],
    },
  },
  {
    id: 'e',
    title: 'Maitland Blvd. (S.R. 414) (Mile 90)',
    coords: {
      east: { lat: 28.63129, lng: -81.38746 },
      west: { lat: 28.63176, lng: -81.38773 },
    },
    instructions: {
      id: 'e',
      title: 'I-4 Express Access from Maitland Boulevard (S.R. 414)',
      // East
      entryEB: {
        images: [
          {
            imgIn: ['Express-Lanes-414-E-ON-1.png'],
            imgOut: ['Express-Lanes-414-E-OFF-1.png'],
          },
        ],
        entry: ['No Available Entries :( (this is impossible)'],
        exit: [
          'From eastbound I-4 Express, use the ramp east of Lee Road (S.R. 423) to merge onto eastbound I-4, then proceed to Maitland Blvd. (Exit 90 A-B).',
        ],
      },
      // West
      entryWB: {
        images: [
          {
            imgIn: ['Express-Lanes-414-W-ON-1.png'],
            imgOut: ['Express-Lanes-414-W-OFF-1.png'],
          },
        ],
        entry: [
          'From Maitland Blvd. to westbound I-4, the nearest I-4 Express ramp is east of Lee Road (S.R. 423).',
        ],
        exit: ['No Available Exits :( (this is impossible)'],
      },

      // entry: [
      //   '• [COLOR 1] From Maitland Blvd. to westbound I-4, the nearest I-4 Express ramp is east of Lee Road (S.R. 423).',
      // ],
      // exit: [
      //   '• [COLOR 4] From eastbound I-4 Express, you can exit at the I-4 Express ramp east of Lee Road (S.R. 423) then proceed to Maitland Blvd. Exit 90 A-B.',
      // ],
    },
  },
  {
    id: 'f',
    title: 'Lee Road (S.R. 423) (Mile 88)',
    coords: {
      east: { lat: 28.60599, lng: -81.38628 },
      west: { lat: 28.60592, lng: -81.38669 },
    },
    instructions: {
      id: 'f',
      title: 'I-4 Express Access from Lee Road (S.R. 423)',
      // East
      entryEB: {
        images: [
          {
            imgIn: ['Express-Lanes-LeeRd-E-ON-1.png'],
            imgOut: ['dummy-map.jpg'],
          },
        ],
        entry: [
          'From Lee Road to eastbound I-4, the nearest I-4 Express ramp is west of Maitland Blvd. (S.R. 414).',
        ],
        exit: ['No Available Exits :( (this is impossible)'],
      },
      // West
      entryWB: {
        images: [
          {
            imgIn: ['Express-Lanes-LeeRd-W-ON.png'],
            imgOut: ['Express-Lanes-LeeRd-W-OFF-1.png'],
          },
        ],
        entry: [
          'From Lee Road to westbound I-4, the nearest I-4 Express ramp is west of Kaley Ave./Michigan St.',
          'Travel from Lee Road to northbound Wymore Road. Turn right onto Hope Road and then west on Maitland Blvd. (S.R. 414). Enter westbound I-4 and access the nearest I-4 Express ramp east of Lee Road.',
        ],
        exit: [
          'From westbound I-4 Express, use the ramp west of Maitland Blvd. (S.R. 414) to merge onto westbound I-4, then proceed to Lee Road (Exit 88).',
        ],
      },

      // entry: [
      //   '• [COLOR 1] From Lee Road to westbound I-4, the nearest I-4 Express ramp is west of Kaley St./Michigan St.',
      //   'o [COLOR 1 variant] Or travel from Lee Road to northbound Wymore Road. Turn right onto Hope Road and then west on Maitland Blvd. (S.R. 414). Enter westbound I-4 and access the nearest I-4 Express ramp east of Lee Road.',
      // ],
      // exit: [
      //   '• [COLOR 3] From westbound I-4 Express, you can exit at the I-4 Express ramp west of Maitland Blvd. and then proceed to Lee Road Exit 88.',
      // ],
    },
  },
  {
    id: 'g',
    title: 'Fairbanks Ave. (Mile 87)',
    coords: {
      east: { lat: 28.5932, lng: -81.38191 },
      west: { lat: 28.593, lng: -81.38237 },
    },
    instructions: {
      id: 'g',
      title: 'I-4 Express Access from Fairbanks Ave.',
      // East
      entryEB: {
        images: [
          {
            imgIn: ['Express-Lanes-Fairbanks-Ave-E-ON-1.png'],
            imgOut: ['dummy-map.jpg'],
          },
        ],
        entry: [
          'From Fairbanks Ave. to eastbound I-4, the nearest I-4 Express ramp is west of Maitland Blvd. (S.R. 414).',
        ],
        exit: ['No Available Exits :( (this is impossible)'],
      },
      // West
      entryWB: {
        images: [
          {
            imgIn: ['Express-Lanes-Fairbanks-Ave-W-ON.png'],
            imgOut: ['dummy-map.jpg'],
          },
        ],
        entry: [
          'From Fairbanks Ave. to westbound I-4, the nearest I-4 Express ramp is west of Kaley Ave./Michigan St.',
          'Or travel from Fairbanks Ave. to northbound Wymore Road. Turn right onto Hope Road and then west on Maitland Blvd. (S.R. 414). Enter westbound I-4 and access the nearest I-4 Express ramp east of Lee Road.',
        ],
        exit: ['No Available Exits :( (this is impossible)'],
      },

      // entry: [
      //   '• [COLOR 1] From Fairbanks Ave. to westbound I-4, the nearest I-4 Express ramp is west of Kaley St./Michigan St.',
      //   'o [COLOR 1 variant] Or travel from Fairbanks Ave. to northbound Wymore Road. Turn right onto Hope Road and then west on Maitland Blvd. (S.R. 414). Enter westbound I-4 and access the nearest I-4 Express ramp east of Lee Road.',
      //   '• [COLOR 2] From Fairbanks Ave. to eastbound I-4, the nearest I-4 Express ramp is west of Maitland Blvd. (S.R. 414).',
      // ],
      // exit: ['NO EXITS AVAILABLE :('],
    },
  },
  {
    id: 'h',
    title: 'Par St. (Mile 86)',
    coords: {
      east: { lat: 28.58241, lng: -81.37484 },
      west: { lat: 28.5821, lng: -81.37527 },
    },
    instructions: {
      id: 'h',
      title: 'I-4 Express Access from Par St.',
      // East
      entryEB: {
        images: [
          {
            imgIn: ['Express-Lanes-ParSt-E-ON-1.png'],
            imgOut: ['dummy-map.jpg'],
          },
        ],
        entry: [
          'Travel from Par St. to southbound Orange Ave. to access the I-4 Express Direct Connect from Ivanhoe Blvd.',
        ],
        exit: ['No Available Exits :( (this is impossible)'],
      },
      // West
      entryWB: {
        images: [
          {
            imgIn: ['Express-Lanes-ParSt-W-ON.png'],
            imgOut: ['dummy-map.jpg'],
          },
        ],
        entry: [
          'From Par St. to westbound I-4, the nearest I-4 Express ramp is west of Michigan St./Kaley Ave.',
        ],
        exit: ['No Available Exits :( (this is impossible)'],
      },

      // entry: [
      //   '• [COLOR 1] From Par St. to westbound I-4, the nearest I-4 Express ramp is west of Kaley St./Michigan St.',
      // ],
      // exit: ['NO EXITS AVAILABLE :('],
    },
  },
  {
    id: 'i',
    title: 'Princeton St. (Mile 85)',
    coords: {
      east: { lat: 28.57141, lng: -81.37566 },
      west: { lat: 28.57121, lng: -81.37587 },
    },
    instructions: {
      id: 'i',
      title: 'I-4 Express Access from Princeton St.',
      // East
      entryEB: {
        images: [
          {
            imgIn: ['Express-Lanes-PrincetonSt-E-ON-1.png'],
            imgOut: ['dummy-map.jpg'],
          },
        ],
        entry: [
          'From Princeton St. to eastbound I-4, the nearest I-4 Express ramp is west of Maitland Blvd. (S.R. 414).',
          'Travel from Princeton St. to southbound Orange Ave. to access the I-4 Express Direct Connect from Ivanhoe Blvd.',
        ],
        exit: ['No Available Exits :( (this is impossible)'],
      },
      // West
      entryWB: {
        images: [
          {
            imgIn: ['Express-Lanes-PrincetonSt-W-ON.png'],
            imgOut: ['dummy-map.jpg'],
          },
        ],
        entry: [
          'From Princeton St. to westbound I-4, the nearest I-4 Express ramp is west of Kaley Ave./Michigan St.',
        ],
        exit: ['No Available Exits :( (this is impossible)'],
      },

      // entry: [
      //   '• [COLOR 1] From Princeton St. to westbound I-4, the nearest I-4 Express ramp is west of Kaley St./Michigan St.',
      //   'o [COLOR 2 variant] Or travel from Princeton St. to southbound Orange Ave. to access the I-4 Express Direct Connect from Ivanhoe Blvd.',
      //   '• [COLOR 2] From Princeton St. to eastbound I-4, the nearest I-4 Express ramp is west of Maitland Blvd. (S.R. 414).',
      // ],
      // exit: ['NO EXITS AVAILABLE :('],
    },
  },
  {
    id: 'j',
    title: 'Ivanhoe Blvd. (Mile 84)',
    coords: {
      east: { lat: 28.56006, lng: -81.37982 },
      west: { lat: 28.55982, lng: -81.38056 },
    },
    instructions: {
      id: 'j',
      title: 'I-4 Express Access from Ivanhoe Blvd.',
      // East
      entryEB: {
        images: [
          {
            imgIn: ['Express-Lanes-Ivanhoe-E-ON-1.png'],
            imgOut: ['dummy-map.jpg'],
          },
        ],
        entry: [
          'Use the Ivanhoe Blvd. Direct Connect to eastbound I-4 Express.',
        ],
        exit: ['No Available Exits :( (this is impossible)'],
      },
      // West
      entryWB: {
        images: [
          {
            imgIn: ['Express-Lanes-Ivanhoe-W-ON.png'],
            imgOut: ['Express-Lanes-Ivanhoe-W-OFF.png'],
          },
        ],
        entry: [
          'From Ivanhoe Blvd. to westbound I-4, the nearest I-4 Express ramp is west of Michigan St./Kaley Ave.',
        ],
        exit: ['Use the westbound I-4 Express Direct Connect to Ivanhoe Blvd.'],
      },

      // entry: [
      //   '• [COLOR 1] From Ivanhoe Blvd. to westbound I-4, the nearest I-4 Express ramp is west of Kaley St./Michigan St.',
      //   '• [COLOR 2] Use the Ivanhoe Boulevard Direct Connect to eastbound I-4 Express.',
      // ],
      // exit: [
      //   '• [COLOR 3] Use the westbound I-4 Express Direct Connect to Ivanhoe Blvd.',
      // ],
    },
  },
  {
    id: 'k',
    title: 'Colonial Drive (S.R. 50) (Mile 84)',
    coords: {
      east: { lat: 28.55321, lng: -81.38207 },
      west: { lat: 28.55298, lng: -81.38254 },
    },
    instructions: {
      id: 'k',
      title: 'I-4 Express Access from Colonial Drive (S.R. 50)',
      // East
      entryEB: {
        images: [
          {
            imgIn: ['Express-Lanes-ColonialAve-E-ON-1.png'],
            imgOut: ['dummy-map.jpg'],
          },
        ],
        entry: [
          'From Colonial Drive to eastbound I-4, the nearest I-4 Express ramp is west of Maitland Blvd. (S.R. 414).',
          'Travel from Colonial Drive to northbound Magnolia Ave. to access the I-4 Express Direct Connect from Ivanhoe Blvd.',
        ],
        exit: ['No Available Exits :( (this is impossible)'],
      },
      // West
      entryWB: {
        images: [
          {
            imgIn: ['Express-Lanes-COLONIAL-W-ON.png'],
            imgOut: ['dummy-map.jpg'],
          },
        ],
        entry: [
          'From Colonial Drive to westbound I-4, the nearest I-4 Express ramp is west of Michigan St./Kaley Ave.',
          'Travel from Colonial Drive to southbound Hughey Ave. to access the I-4 Direct Connect from South St.',
        ],
        exit: ['No Available Exits :( (this is impossible)'],
      },

      // entry: [
      //   '• [COLOR 1] From westbound I-4, the nearest I-4 Express ramp is west of Kaley St./Michigan St.',
      //   'o [COLOR 1 variant] Or travel from Colonial Drive to southbound Hughey Avenue to access the I-4 Direct Connect from South St.',
      //   '• [COLOR 2] From Colonial Drive to eastbound I-4, the nearest I-4 Express ramp is west of Maitland Blvd. (S.R. 414).',
      //   'o [COLOR 2 variant] Or travel from Colonial Drive to northbound Magnolia Ave. to access the I-4 Express Direct Connect from Ivanhoe Blvd.',
      // ],
      // exit: ['NO EXITS AVAILABLE :('],
    },
  },
  {
    id: 'l',
    title: 'Amelia St. (Mile 83)',
    coords: {
      east: { lat: 28.5494, lng: -81.38235 },
      west: { lat: 28.54939, lng: -81.38271 },
    },
    instructions: {
      id: 'l',
      title: 'I-4 Express Access from Amelia St.',
      // East
      entryEB: {
        images: [
          {
            imgIn: ['Express-Lanes-Amelia-St-E-ON.png'],
            imgOut: ['dummy-map.jpg'],
          },
        ],
        entry: [
          'From Amelia St. to eastbound I-4, the nearest I-4 Express ramp is west of Maitland Blvd. (S.R. 414).',
          'Travel from Amelia St. to northbound Magnolia Ave. to access the I-4 Express Direct Connect from Ivanhoe Blvd.',
          'Travel from Amelia St. to southbound Hughey Avenue. Turn right onto Central Ave and then turn left onto Division Ave. to access the I-4 Direct Connect from Anderson St.',
        ],
        exit: ['No Available Exits :( (this is impossible)'],
      },
      // West
      entryWB: {
        images: [
          {
            imgIn: ['Express-Lanes-Amelia-W-ON.png'],
            imgOut: ['dummy-map.jpg'],
          },
        ],
        entry: [
          'From Amelia St. to westbound I-4, the nearest I-4 Express ramp is west of Michigan St./Kaley Ave.',
          'Travel from Amelia Street to southbound Hughey Ave. to access the I-4 Direct Connect from South St.',
        ],
        exit: ['No Available Exits :( (this is impossible)'],
      },

      // entry: [
      //   '• [COLOR 1] From westbound I-4, the nearest I-4 Express ramp is west of Kaley St./Michigan St.',
      //   'o [COLOR 1 variant] Or travel from Amelia Street to southbound Hughey Ave. to access the I-4 Direct Connect from South St.',
      //   '• [COLOR 2] From Amelia St. to eastbound I-4, the nearest I-4 Express ramp is west of Maitland Blvd. (S.R. 414).',
      //   'o [COLOR 2 variant] Or travel from Amelia St. to northbound Magnolia Ave. to access the I-4 Express Direct Connect from Ivanhoe Blvd.',
      //   'o [COLOR 2 variant of variant] Or travel from Amelia St. to southbound Hughey Avenue. Turn right onto Central Ave and then turn left onto Division Ave. to access the I-4 Direct Connect from Anderson St.',
      // ],
      // exit: ['NO EXITS AVAILABLE :('],
    },
  },
  {
    id: 'm',
    title: 'South St. (Mile 82)',
    coords: {
      east: { lat: 28.53847, lng: -81.38203 },
      west: { lat: 28.53842, lng: -81.38272 },
    },
    instructions: {
      id: 'm',
      title: 'I-4 Express Access from South St.',
      // East
      entryEB: {
        images: [
          {
            imgIn: ['dummy-map.jpg'],
            imgOut: ['Express-Lanes-SR408-SouthSt-E-OFF-1.png'],
          },
        ],
        entry: ['No Available Entries :( (this is impossible)'],
        exit: ['Use the eastbound I-4 Express Direct Connect to South St.'],
      },
      // West
      entryWB: {
        images: [
          {
            imgIn: ['Express-Lanes-SouthSt-W-ON-1.png'],
            imgOut: ['Express-Lanes-SouthSt-W-Off-1.png'],
          },
        ],
        entry: ['Use the South St. Direct Connect to westbound I-4 Express.'],
        exit: ['Use the westbound I-4 Express Direct Connect to South St.'],
      },

      // entry: [
      //   '• [COLOR 1] Use the South Street Direct Connect to westbound I-4 Express.',
      // ],
      // exit: [
      //   '• [COLOR 3] Use the westbound I-4 Express Direct Connect to South St.',
      //   '• [COLOR 4] Use the eastbound I-4 Express Direct Connect to South St.',
      // ],
    },
  },
  {
    id: 'n',
    title: 'Anderson St. (Mile 82)',
    coords: {
      east: { lat: 28.53627, lng: -81.38256 },
      west: { lat: 28.53625, lng: -81.3833 },
    },
    instructions: {
      id: 'n',
      title: 'I-4 Express Access at Anderson St.',
      // East
      entryEB: {
        images: [
          {
            imgIn: ['Express-Lanes-SR408-Andersonson-E-ON-1.png'],
            imgOut: ['dummy-map.jpg'],
          },
        ],
        entry: [
          'Use the Anderson St. Direct Connect to eastbound I-4 Express.',
        ],
        exit: ['No Available Exits :( (this is impossible)'],
      },
      // West
      entryWB: {
        images: [
          {
            imgIn: ['dummy-map.jpg'],
            imgOut: ['dummy-map.jpg'],
          },
        ],
        entry: ['No Available Entries :( (this is impossible)'],
        exit: ['No Available Exits :( (this is impossible)'],
      },

      // entry: [
      //   '• [COLOR 2] Use the Anderson St. Direct Connect to eastbound I-4 Express.',
      // ],
      // exit: ['NO EXITS AVAILABLE :('],
    },
  },
  {
    id: 'o',
    title: 'S.R. 408 (Mile 82)',
    coords: {
      east: { lat: 28.53551, lng: -81.38286 },
      west: { lat: 28.53546, lng: -81.38365 },
    },
    instructions: {
      id: 'o',
      title: 'I-4 Express Access from S.R. 408',
      // East
      entryEB: {
        images: [
          {
            imgIn: ['Express-Lanes-408-E-ON.p'],
            imgOut: ['Express-Lanes-Direct-connect-EW-SR408-E-OFF-1.png'],
          },
        ],
        entry: [
          'From S.R. 408 to eastbound I-4, the nearest I-4 Express ramp is west of Maitland Blvd. (S.R. 414).',
        ],
        exit: ['Use the eastbound I-4 Express Direct Connect to S.R. 408.'],
      },
      // West
      entryWB: {
        images: [
          {
            imgIn: ['Express-Lanes-SR408-W-ON-1.png'],
            imgOut: ['Express-Lanes-SR408-W-OFF-1.png'],
          },
        ],
        entry: [
          'From S.R. 408 to westbound I-4, the nearest I-4 Express ramp is west of Michigan St./Kaley Ave.',
        ],
        exit: ['Use the westbound I-4 Express Direct Connect to S.R. 408.'],
      },

      // entry: [
      //   '• [COLOR 1] From westbound I-4, the nearest I-4 Express ramp is west of Kaley St./Michigan St.',
      //   '•	[COLOR 2] From eastbound I-4, the nearest I-4 Express ramp is west of Maitland Blvd. (S.R. 414).',
      // ],
      // exit: [
      //   '• [COLOR 3] Use the westbound I-4 Express Direct Connect to S.R. 408.',
      //   '• [COLOR 4] Use the eastbound I-4 Express Direct Connect to S.R. 408.',
      // ],
    },
  },
  {
    id: 'p',
    title: 'Michigan St./Kaley Ave. (Mile 81)',
    coords: {
      east: { lat: 28.51697, lng: -81.38749 },
      west: { lat: 28.51675, lng: -81.38813 },
    },
    instructions: {
      id: 'p',
      title: 'I-4 Express Access from Michigan St./Kaley Ave.',
      // East
      entryEB: {
        images: [
          {
            imgIn: ['Express-Lanes-Kaley-Michigan-E-ON.png'],
            imgOut: ['Express-Lanes-Kaley-Michigan-E-OFF.png'],
          },
        ],
        entry: [
          'From Kaley Ave./Michigan St. to eastbound I-4, the nearest I-4 Express ramp is west of Maitland Blvd. (S.R. 414).',
        ],
        exit: [
          'From eastbound I-4 Express,use the ramp west of Kaley Ave./Michigan St. to merge onto eastbound I-4, then proceed to Kaley Ave./Michigan St. (Exit 81).',
        ],
      },
      // West
      entryWB: {
        images: [
          {
            imgIn: ['Express-Lanes-Kaley-Michigan-W-ON.png'],
            imgOut: ['dummy-map.jpg'],
          },
        ],
        entry: [
          'From Michigan St./Kaley Ave. to westbound I-4, the nearest I-4 Express ramp is west of Michigan St./Kaley Ave.',
        ],
        exit: ['No Available Exits :( (this is impossible)'],
      },

      // entry: [
      //   '• [COLOR 1] From westbound I-4, the nearest I-4 Express ramp is west of Kaley St./Michigan St.',
      //   '•	[COLOR 2] From eastbound I-4, the nearest I-4 Express ramp is west of Maitland Blvd. (S.R. 414).',
      // ],
      // exit: [
      //   '• [COLOR 4] From eastbound I-4 Express, you can exit at the I-4 Express ramp west of Michigan St./Kaley St. then proceed to Michigan St/Kaley St. Exit 80.',
      // ],
    },
  },
  {
    id: 'q',
    title: 'Orange Blossom Trail (U.S. 441/17-92) (Mile 80)',
    coords: {
      east: { lat: 28.50989, lng: -81.39773 },
      west: { lat: 28.51003, lng: -81.39879 },
    },
    instructions: {
      id: 'q',
      title: 'I-4 Express Access from Orange Blossom Trail (U.S. 441/17-92)',
      // East
      entryEB: {
        images: [
          {
            imgIn: ['Express-LanesOBT-E-ON.png'],
            imgOut: ['dummy-map.jpg'],
          },
        ],
        entry: [
          'From Orange Blossom Trail to eastbound I-4, the nearest I-4 Express ramp is west of Maitland Blvd. (S.R. 414).',
        ],
        exit: ['No Available Exits :( (this is impossible)'],
      },
      // West
      entryWB: {
        images: [
          {
            imgIn: ['dummy-map.jpg'],
            imgOut: ['dummy-map.jpg'],
          },
        ],
        entry: ['No Available Entries :( (this is impossible)'],
        exit: ['No Available Exits :( (this is impossible)'],
      },

      // entry: [
      //   '• [COLOR 2] From eastbound I-4, the nearest I-4 Express ramp is west of Maitland Blvd. (S.R. 414).',
      // ],
      // exit: ['NO EXITS AVAILABLE :('],
    },
  },
  {
    id: 'r',
    title: 'John Young Pkwy. (Mile 79)',
    coords: {
      east: { lat: 28.50846, lng: -81.4183 },
      west: { lat: 28.50905, lng: -81.41829 },
    },
    instructions: {
      id: 'r',
      title: 'I-4 Express Access from John Young Pkwy.',
      // East
      entryEB: {
        images: [
          {
            imgIn: ['Express-Lanes-JohnYoung--E-ON.png'],
            imgOut: ['dummy-map.jpg'],
          },
        ],
        entry: [
          'From John Young Pkwy. to eastbound I-4, the nearest I-4 Express ramp is west of Maitland Blvd. (S.R. 414).',
        ],
        exit: ['No Available Exits :( (this is impossible)'],
      },
      // West
      entryWB: {
        images: [
          {
            imgIn: ['dummy-map.jpg'],
            imgOut: ['dummy-map.jpg'],
          },
        ],
        entry: ['No Available Entries :( (this is impossible)'],
        exit: ['No Available Exits :( (this is impossible)'],
      },

      // entry: [
      //   '• [COLOR 2] From eastbound I-4, the nearest I-4 Express ramp is west of Maitland Blvd. (S.R. 414).',
      // ],
      // exit: ['NO EXITS AVAILABLE :('],
    },
  },
  {
    id: 's',
    title: 'Conroy Road (Mile 78)',
    coords: {
      east: { lat: 28.49338, lng: -81.43298 },
      west: { lat: 28.49361, lng: -81.43337 },
    },
    instructions: {
      id: 's',
      title: 'I-4 Express Access from Conroy Road',
      // East
      entryEB: {
        images: [
          {
            imgIn: ['Express-Lanes-Conroy-E-ON.png'],
            imgOut: ['dummy-map.jpg'],
          },
        ],
        entry: [
          'From Conroy Road to eastbound I-4, the nearest I-4 Express ramp is east of Conroy Road.',
        ],
        exit: ['No Available Exits :( (this is impossible)'],
      },
      // West
      entryWB: {
        images: [
          {
            imgIn: ['dummy-map.jpg'],
            imgOut: ['Express-Lanes-Conroy-W-OFF.png'],
          },
        ],
        entry: ['No Available Entries :( (this is impossible)'],
        exit: [
          'From westbound I-4 Express, use the ramp east of Conroy Road to merge onto westbound I-4, then proceed to Conroy Road (Exit 78).',
        ],
      },

      // entry: [
      //   '•	[COLOR 2] From eastbound I-4, the nearest I-4 Express ramp is east of Conroy Road.',
      // ],
      // exit: [
      //   '•	[COLOR 3] From westbound I-4 Express, you can exit at the I-4 Express ramp east of Conroy Road then proceed to Conroy Road Exit 78.',
      // ],
    },
  },
  {
    id: 't',
    title: "Florida's Turnpike (Mile 77)",
    coords: {
      east: { lat: 28.47882, lng: -81.44896 },
      west: { lat: 28.47919, lng: -81.44922 },
    },
    instructions: {
      id: 't',
      title: 'I-4 Express Access from Florida’s Turnpike (Northbound Only)',
      // East
      entryEB: {
        images: [
          {
            imgIn: ['Express-Lanes-Turnpike--E-ON.png'],
            imgOut: ['dummy-map.jpg'],
          },
        ],
        entry: [
          `From northbound Florida's Turnpike, use Florida’s Turnpike Direct Connect to eastbound I-4 Express.`,
        ],
        exit: ['No Available Exits :( (this is impossible)'],
      },
      // West
      entryWB: {
        images: [
          {
            imgIn: ['dummy-map.jpg'],
            imgOut: ['Express-Lanes-Turnpike--W-OFF.png'],
          },
        ],
        entry: ['No Available Entries :( (this is impossible)'],
        exit: [
          'Use the westbound I-4 Express Direct Connect to southbound Florida’s Turnpike.',
        ],
      },

      // entry: [
      //   '• [COLOR 2] Use Florida’s Turnpike Direct Connect to eastbound I-4 Express.',
      // ],
      // exit: [
      //   '•	[COLOR 3] Use the westbound I-4 Express Direct Connect to Florida’s Turnpike.',
      // ],
    },
  },
  {
    id: 'u',
    title: 'Grand National Drive (Mile 75)',
    coords: {
      east: { lat: 28.47341, lng: -81.45553 },
      west: { lat: 28.4737, lng: -81.45619 },
    },
    instructions: {
      id: 'u',
      title: 'I-4 Express Access from Grand National Drive',
      // East
      entryEB: {
        images: [
          {
            imgIn: ['Express-Lanes-Grand-National--E-ON.png'],
            imgOut: ['Express-Lanes-Grand-National--E-OFF.png'],
          },
        ],
        entry: [
          'Use the Grand National Drive Direct Connect to eastbound I-4 Express.',
        ],
        exit: [
          'Use the eastbound I-4 Express Direct Connect to Grand National Drive',
        ],
      },
      // West
      entryWB: {
        images: [
          {
            imgIn: ['Express-Lanes-Grand-National--W-ON.png'],
            imgOut: ['Express-Lanes-Grand-National--W-OFF.png'],
          },
        ],
        entry: [
          'Use the Grand National Drive Direct Connect to westbound I-4 Express.',
        ],
        exit: [
          'Use the westbound I-4 Express Direct Connect to Grand National Drive.',
        ],
      },

      // entry: [
      //   '• [COLOR 1] Use the Grand National Drive Direct Connect to westbound I-4 Express.',
      //   '• [COLOR 2] Use the Grand National Drive Direct Connect to eastbound I-4 Express.',
      // ],
      // exit: [
      //   '•	[COLOR 3] Use the westbound I-4 Express Direct Connect to Grand National Drive.',
      //   '• [COLOR 4] Use the eastbound I-4 Express Direct Connect to Grand National Drive.',
      // ],
    },
  },
  {
    id: 'v',
    title: 'Kirkman Road (S.R. 435) (Mile 75)',
    coords: {
      east: { lat: 28.47075, lng: -81.45874 },
      west: { lat: 28.47078, lng: -81.45961 },
    },
    instructions: {
      id: 'v',
      title: 'I-4 Express Access from Kirkman Road (S.R. 435)',
      // East
      entryEB: {
        images: [
          {
            imgIn: ['Express-Lanes-Kirkman-E-ON-1.png'],
            imgOut: ['dummy-map.jpg'],
          },
        ],
        entry: [
          'From Kirkman Road to eastbound I-4, the nearest I-4 Express ramp is east of Conroy Road.',
          'Travel from Kirkman Road to eastbound Major Blvd. to access the I-4 Express Direct Connect from Grand National Drive.',
        ],
        exit: ['No Available Exits :( (this is impossible)'],
      },
      // West
      entryWB: {
        images: [
          {
            imgIn: ['dummy-map.jpg'],
            imgOut: ['dummy-map.jpg'],
          },
        ],
        entry: ['No Available Entries :( (this is impossible)'],
        exit: ['No Available Exits :( (this is impossible)'],
      },

      // entry: [
      //   '• [COLOR 2] From eastbound I-4, the nearest I-4 Express ramp is east of Conroy Road.',
      // ],
      // exit: ['NO EXITS AVAILABLE :('],
    },
  },
  {
    id: 'w',
    title: 'Tampa/Lakeland/Kissimmee',
    coords: {
      east: { lat: 28.46394, lng: -81.46678 },
      west: { lat: 28.46577, lng: -81.46537 },
    },
    instructions: {
      id: 'w',
      title: 'I-4 Express Access from Tampa/Lakeland/Kissimmee',
      // East
      entryEB: {
        images: [
          {
            imgIn: ['Express-Lanes-Tampa-lakeland-Kissimmee--E-ON.png'],
            imgOut: ['dummy-map.jpg'],
          },
        ],
        entry: [
          'From eastbound I-4, you can enter I-4 Express east of Sand Lake Road (S.R. 482).',
        ],
        exit: ['No Available Exits :( (this is impossible)'],
      },
      // West
      entryWB: {
        images: [
          {
            imgIn: ['dummy-map.jpg'],
            imgOut: ['Express-Lanes-Tampa-lakeland-Kissimmee--W-OFF.png'],
          },
        ],
        entry: ['No Available Entries :( (this is impossible)'],
        exit: [
          'Westbound I-4 Express ends east of the Beachline Expressway (S.R. 528). All traffic merges with the westbound I-4 general use lanes.',
        ],
      },

      // entry: [
      //   '• [COLOR 2] From eastbound I-4, you can begin traveling east in I-4 Express.',
      // ],
      // exit: [
      //   '• [COLOR 3] Westbound I-4 Express ends. All traffic merges with westbound I-4 general use lanes.',
      // ],
    },
  },
];
