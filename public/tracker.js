// KEYPOINT TRACKING SPHERES

// specify colour to create 17 trackers for each of the posenet keypoints, return these objects in an array and in a three.js group
export function createTrackers(colour) {
  
    const group = new THREE.Group(); // create three.js group
    let trackers = []; // create empty array to store trackers
  
    // if no colour is passed as an argument, default the colour to white and throw a warning
    if (colour === undefined) {
      colour = 0xffffff;
      console.warn("Please specify a colour. It has been defaulted to white.");
    }
  
    for (let i = 0; i < 17; i++) {
      let tracker = new Tracker(group, colour); // create a tracker object  and add it to the three.js group
      tracker.initialise();
      tracker.display();
      trackers.push(tracker); // push the tracker object to the trackers array
    }
  
    return { trackers, group };
  }
  
  // create a spherical tracker object and add to a specified three.js group
  function Tracker(group, colour) {
    
    // if no colour is passed as an argument, default the colour to white and throw a warning
    if (colour === undefined) {
      colour = 0xffffff;
      console.warn("Please specify a colour. It has been defaulted to white.");
    }
  
    // if no three.js group is passed as an argument, throw an error
    if (group === undefined) {
      console.error(
        "You are missing an argument. You must specify a group to add these trackers to"
      );
    }
  
    this.position = new THREE.Vector3();
    const geometry = new THREE.SphereBufferGeometry(30, 16, 16);
    const material = new THREE.MeshLambertMaterial({
      color: colour
    });
    const sphere = new THREE.Mesh(geometry, material);
    group.add(sphere);
  
    this.initialise = function() {
      this.position.x = -1000;
      this.position.y = -1000;
      this.position.z = 0;
    };
  
    this.update = function(x, y, z) {
      this.position.x = x;
      this.position.y = y;
      this.position.z = z;
    };
  
    this.display = function() {
      sphere.position.x = this.position.x;
      sphere.position.y = this.position.y;
      sphere.position.z = this.position.z;
    };
  }