/**
 * Maps colors to their material values.
 * 
 * Default 'aluminium' is labeled as 'gray'.
 */
const colorsBody = {
  'gray': '06 CHROME SATIN ALUMINUM',
  'black': '05 CHROME SATIN MIDNIGHT BLACK',
  'red': '04 CHROME SATIN CHERRY RED',
  'blue': '01 CHROME SATIN ROYAL BLUE',
  'olive': '02 CHROME SATIN OLIVE GREEN',
  'orange': '03 CHROME SATIN BURNT ORANGE',
}

/**
 * Non body parts have slightly different colors.
 */
const colors = {
  'gray': 'Chrome ALUMINIUM',
  'black': 'Chrome MIDNIGHT BLACK',
  'red': 'Chrome CHERRY RED',
  'blue': 'Chrome ROYAL BLUE',
  'olive': 'Chrome SATIN OLIVE GREEN',
  'orange': 'Chrome SATIN BURNT ORANGE',
}

const colorItems = Array.from(document.getElementsByClassName('color-item'));
const bodyMenu = document.getElementById('body-menu');
const cornersMenu = document.getElementById('corners-menu');
const handlesMenu = document.getElementById('handles-menu');
const wheelsMenu = document.getElementById('wheels-menu');

const menuElements = [bodyMenu, cornersMenu, handlesMenu, wheelsMenu];

const mainMenu = document.getElementById('main-menu');

const submenuElements = {
  'BODY': {
    element: bodyMenu,
    materials: ['Body_metal_base', 'Body_metal_cover'],
  },
  'HANDLES': {
    element: handlesMenu,
    materials: ['Handle_base1', 'Handle_metal-1', 'Handle_telescope-1'],
  },
  'CORNERS': {
    element: cornersMenu,
    materials: ['Corners_base', 'Corners_cover'],
  },
  'WHEELS': {
    element: wheelsMenu,
    materials: ['Wheels_base', 'Wheels_base_cover', 'Wheels_front_right_base', 'Wheels_front_left_base', 'Wheels_back_right_base', 'Wheels_back_left_base',
      'Wheels_front_right_center', 'Wheels_front_left_center', 'Wheels_back_right_center', 'Wheels_back_left_centar'],
  }
}

const steps = ['BODY', 'HANDLES', 'CORNERS', 'WHEELS'];

const colorDependencies = {
  blue: ['blue', 'black', 'gray'],
  olive: ['olive', 'black', 'gray'],
  orange: ['orange', 'black', 'gray'],
  red: ['red', 'black', 'gray'],
  black: ['black', 'gray'],
  gray: ['black', 'gray']
};

/**
 * To revert non body parts to aluminium when the body menu element
 * color is changed (less computationally expensive than searching through 'colorDependencies' values)
 */
const nonBodyMaterials = [
  ...['Handle_base1', 'Handle_metal-1', 'Handle_telescope-1'],
  ...['Corners_base', 'Corners_cover'],
  ...['Wheels_base', 'Wheels_base_cover', 'Wheels_front_right_base', 'Wheels_front_left_base', 'Wheels_back_right_base', 'Wheels_back_left_base',
    'Wheels_front_right_center', 'Wheels_front_left_center', 'Wheels_back_right_center', 'Wheels_back_left_centar']
]

/**
 * Configuration options for the app initialization.
 */
const options = {
  distID: 'latest',
  solution3DName: 'suitcase-color',
  projectName: 'resources-for-videos-and-marketing-purposes',
  solution3DID: '62766',
  containerID: 'container3d_replace',
  onLoadingChanged: (loading) => {
    loadingBar.style.width = loading.progress + "%";
  },
  onPointerClick: (clickedObjects) => handleClick(clickedObjects)
};
