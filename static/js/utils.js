window.addEventListener('load', () => activateCamera());
window.addEventListener('resize', () => activateCamera());

const container = document.getElementById('container3d_replace');
const submenu = document.getElementById('submenu');

let wasInit = false;

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

let { height: screenHeight, width } = container.getBoundingClientRect();
let isMobileScreen = width < 750;

let currentlyActiveAnnotations = ['Open', 'Extend handle', 'Wheel spinner on'];

const activateCamera = async () => {
  const { height, width: screenWidth } = container.getBoundingClientRect();
  screenHeight = height;
  width = screenWidth;

  isMobileScreen = width < 750;
  // For some reason switching it to 'Camera Mobile' makes it too small, even on mobile screens
  const cameraName = `Camera ${isMobileScreen ? 'Desktop' : 'Desktop'}`

  // Wait until app is initialized
  while (!wasInit) {
    await wait(10);
  }

  Unlimited3D.activateCamera({ name: cameraName });
}

const initializeApp = () => {
  Unlimited3D.init(options, {}, (error, status) => {
    if (error || !status) {
      console.error(error);

      // return;
  }
    // Commented out after getting scene info
    // getSceneInfo();

    // Visual indicator that the model is loading
    loadingContent.style.display = "none";
    wasInit = true;

    // Initially, hide all annotations (until click on 'animations')
    showOnly([])
  });
}

initializeApp();

/**
 * Gets scene info (annotations, modifiers, parts, materials,
 * animation sets, animation states etc.).
 */
const getSceneInfo = async () => {
  const getAvailableAnnotations = () =>
    new Promise((resolve, reject) => {
      Unlimited3D.getAvailableAnnotations((error, result) => {
      error ? reject(error) : resolve(result);
    })
  });

  const getAvailableModifiers = () =>
    new Promise((resolve, reject) =>
      Unlimited3D.getAvailableModifiers((error, result) => 
        error ? reject(error) : resolve(result)
    )
  );

  const getAvailableParts = () =>
    new Promise((resolve, reject) =>
      Unlimited3D.getAvailableParts((error, result) => 
        error ? reject(error) : resolve(result)
    )
  );

  const getAvailableMaterials = () =>
    new Promise((resolve, reject) =>
      Unlimited3D.getAvailableMaterials((error, result) => 
        error ? reject(error) : resolve(result)
    )
  );

  await Promise.all([
    getAvailableAnnotations(),
    getAvailableModifiers(),
    getAvailableParts(),
    getAvailableMaterials(),
  ]).then(([annotations, modifiers, parts, materials]) => {
    console.log('Annotations:', annotations);
    console.log('Modifiers:', modifiers);
    console.log('Parts:', parts);
    console.log('Materials:', materials);
    showOnly([])
  }).catch(error => {
    console.error('An error occurred:', error);
  });

  console.log('All operations have completed.');
}

const configurator = document.getElementById('configurator');
const animations = document.getElementById('animations');

configurator.addEventListener('click', () => {
  container.style.height = '100vh';
  configurator.style.borderBottomWidth = '1px';
  animations.style.borderBottomWidth = '0';
  submenu.classList.replace('hidden', 'flex');
  showOnly([])
})

animations.addEventListener('click', () => {
  container.style.height = '100vh';
  animations.style.borderBottomWidth = '1px';
  configurator.style.borderBottomWidth = '0';
  submenu.classList.replace('flex', 'hidden');
  show(currentlyActiveAnnotations);

  // Slightly change the position of 'Open' annotation on mobile screens
  if (isMobileScreen) {
    moveAnnotation('Open', [0.31430370547864517, 0.5130626724538137, 0.121941362633778196]);
  }
});

/**
 * @param {string[]} annotations
 * @param {() => void} callback
 */
const show = (annotations, callback) => {
  Unlimited3D.showAnnotations({
    annotationObjects:[{ annotations }]
  }, callback);
}

const showOnly = (annotations, callback) => {
  Unlimited3D.showOnlyAnnotations({
    annotationObjects:[{ annotations }]
  }, callback);
}

const hide = (annotations, callback) => {
  Unlimited3D.hideAnnotations({ annotations }, callback);
}

/**
 * @param {string} name
 * @param {number[]} position
 * @param {() => void} callback
 */
const moveAnnotation = (name, position, callback) => {
  Unlimited3D.setAnnotationTransformationProperties({
    name,
    position,
  }, callback);
}

/**
 * @param {string} modifier 
 * @param {() => void} callback 
 */
const playAnimation = (modifier, callback) => {
  Unlimited3D.activateModifier({ modifier }, callback)
}

/**
 * @param {number[]} coordinates - Array of X, Y, Z.
 * @param {() => void} callback - Optional callback
 */
const setCameraPosition = (coordinates, callback) => {
  Unlimited3D.setCameraPosition({ position: coordinates }, callback)
}
