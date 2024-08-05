let bodySelectedColor = 'gray';

let activeSubmenuElement = 'BODY';

const addColorChangers = async () => {
  // Wait until the app is initialized
  while (!wasInit) {
    await wait(10);
  }

  colorItems.forEach((colorItem, index) => {
    colorItem.addEventListener('click', () => {
      colorItem.style.borderWidth = '2px';
      const activeMenuElement = submenuElements[activeSubmenuElement].element;
      const selectedColor = colorItem.id.split('-').slice(-1)[0];
      const selectedColorElement = activeMenuElement.querySelector('#selected-color');
      let colorName = selectedColor.toUpperCase();
      if (colorName === 'GRAY') {
        colorName = 'ALUMINIUM'
      }

      selectedColorElement.innerText = colorName;
      const newColor = activeSubmenuElement === 'BODY'
        ? colorsBody[selectedColor]
        : colors[selectedColor];

      if (activeSubmenuElement === 'BODY') {
        handleBodyMenuColorChange(selectedColor);
      }

      Unlimited3D.changeMaterial({ parts: submenuElements[activeSubmenuElement].materials, material: newColor });

      colorItems.forEach((item, itemIndex) => {
        if (itemIndex !== index) {
          item.style.borderWidth = '0';
        }
      })
    })
  })
}

addColorChangers();

/**
 * Handles the change of color of the body menu element.
 * 
 * If it is different than the currently active body menu
 * color, revert all non body menu elements color to aluminium.
 * 
 * @param {string} newColor - selected color e.g. 'orange'
 */
const handleBodyMenuColorChange = (newColor) => {
  if (newColor !== bodySelectedColor) {
    bodySelectedColor = newColor;
    Unlimited3D.changeMaterial({ parts: nonBodyMaterials, material: colors['gray'] });
  }
}

/**
 * Whenever a non body submenu is selected, make its available
 * colors be dependant of active body color.
 * 
 * @param {HTMLElement} activeMenuElement
 */
const addColorsToNonBodySubmenu = (activeMenuElement) => {
  const colorItems = Array.from(activeMenuElement.getElementsByClassName('color-item'));
  colorItems.forEach((colorItem) => {
    const elementColor = colorItem.id.split('-').slice(-1)[0];

    if (colorDependencies[bodySelectedColor].includes(elementColor)) {
      colorItem.classList.add('block');
      colorItem.classList.remove('hidden');
    } else {
      colorItem.classList.add('hidden');
      colorItem.classList.remove('block');
    }
  })
}

const addSubmenuSelectionHandlers = () => {
  const submenuItems = Array.from(document.getElementsByClassName('submenu-item'));

  submenuItems.forEach((submenuItem, index) => {
    submenuItem.addEventListener('click', () => {
      submenu.classList.replace('flex', 'hidden');
      const radioInputs = Array.from(document.getElementById('submenu').querySelectorAll('input[type="radio"]'));
      radioInputs[index].checked = true;

      const text = submenuItem.getElementsByTagName('span')[0].innerText.toUpperCase();
      activeSubmenuElement = text;
      let activeElement = activeSubmenuElement.toLowerCase();
      if (activeElement === 'handles') {
        activeElement = activeElement.slice(0, activeElement.length - 1);
      }

      // For some reason using '_mobile' modifier doesn't work
      // so can't put '_mobile' when it is mobile screen
      const cameraName = `camera_${activeElement}${isMobileScreen ? '' : ''}`;
      playAnimation(cameraName);

      showActiveMenuElement();
      addConfigSteps();
  
      if (isMobileScreen) {
        setContainerHeight();
      }
    })
  })
}

addSubmenuSelectionHandlers();

/**
 * Shows the active menu element.
 * 
 * Hides non active menu elements.
 */
const showActiveMenuElement = () => {
  const activeMenuElement = submenuElements[activeSubmenuElement].element;

  menuElements.forEach((menuElement) => {
    if (menuElement === activeMenuElement) {
      menuElement.classList.replace('hidden', 'flex');

      if (menuElement !== bodyMenu) {
        addColorsToNonBodySubmenu(activeMenuElement);
      }
    } else {
      menuElement.classList.replace('flex', 'hidden');
    }
  })
}

/**
 * On mobile screens, sets the height of model container equal
 * to the available height - height of the body menu element.
 */
const setContainerHeight = () => {
  const { height: bodyMenuHeight } = submenuElements[activeSubmenuElement].element.getBoundingClientRect();
  const newContainerHeight = screenHeight - bodyMenuHeight + 20;
  container.style.height = `${newContainerHeight}px`;
}

/**
 * When user clicks 'X' on menu, use modifier.
 */
const addListenerForX = () => {
  const leaveMenuButtons = Array.from(document.getElementsByClassName('leave-menu'));

  leaveMenuButtons.forEach((button) => {
    button.addEventListener('click', () => {
      submenuElements[activeSubmenuElement].element.classList.replace('flex', 'hidden');
      submenu.classList.replace('hidden', 'flex');
      container.style.height = '100vh';
      const modifier = `default_camera_${isMobileScreen ? 'mobile' : 'desktop'}`;
      // 'default_camera_mobile' modifier doesn't work even on mobile screens
      playAnimation('default_camera_desktop');
    });
  })
}

addListenerForX();

/**
 * Loop through configuration steps when clicking on arrows.
 * 
 * Since buttons will be updated, it relies on recursion.
 */
const addConfigSteps = () => {
  const selectedMenuElement = submenuElements[activeSubmenuElement].element;
  const prevArrow = selectedMenuElement.querySelector('#prev-arrow');
  const nextArrow = selectedMenuElement.querySelector('#next-arrow');
  prevArrow.addEventListener('click', () => {
    const activeIndex = steps.indexOf(activeSubmenuElement);

    const prevIndex = activeIndex === 0 ? steps.length - 1 : activeIndex - 1;
    activeSubmenuElement = steps[prevIndex];

    showActiveMenuElement();

    addConfigSteps();

    // Also select corresponding radio input on submenu
    const radioInputs = Array.from(document.getElementById('submenu').querySelectorAll('input[type="radio"]'));
    radioInputs[prevIndex].checked = true;
  });

  nextArrow.addEventListener('click', () => {
    const activeIndex = steps.indexOf(activeSubmenuElement);

    const nextIndex = activeIndex === steps.length - 1 ? 0 : activeIndex + 1;
    activeSubmenuElement = steps[nextIndex];

    showActiveMenuElement();

    addConfigSteps();

    const radioInputs = Array.from(document.getElementById('submenu').querySelectorAll('input[type="radio"]'));
    radioInputs[nextIndex].checked = true;
  })
}

addConfigSteps();
