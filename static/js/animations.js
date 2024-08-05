/**
 * Only handles annotation clicks.
 * 
 * Although reverse annotation are supposed to appear at the
 * end of animation (e.g. 'close' at end of 'open' animation),
 * they appear instantly, thus 'await' is used.
 * 
 * @param clickedObjects - Array of annotations.
 */
const handleClick = async (clickedObjects) => {
  Unlimited3D.changeAnnotationMaterial({ annotations: ['Open'], material : '03 CHROME SATIN BURNT ORANGE' });

  const getSelected = () =>
    new Promise((resolve, reject) => {
      Unlimited3D.getSelectedAnnotations((error, result) => {
        error ? reject(error) : resolve(result);
      })
  });

  // Annotation was not clicked
  if (!clickedObjects.length) {
    return;
  }

  const annotation = clickedObjects[0].name;

  const openSuitcase = () => {
    hide(['Open'], () => {
      playAnimation('open', async () => {
        await wait(2700);
        showOnly(['Close'], () => {
          currentlyActiveAnnotations = ['Close'];
          const newPosition = isMobileScreen ? [0.07486102275685, 0.37128010729711956, -0.2266806919447157] : [0.07486102275685, 0.37128010729711956, -0.3906806919447157];
          moveAnnotation('Close', newPosition);
        })
      });
    });
  }

  const closeSuitcase = () => {
    hide(['Close'], () => {
      playAnimation('close', async () => {
        await wait(1700);
        currentlyActiveAnnotations = ['Open', 'Extend handle', 'Wheel spinner on'];
        show(currentlyActiveAnnotations);
      });
    })
  }

  const extendHandle = () => {
    hide(['Extend handle'], () => {
      playAnimation('extend_handle', () => {
        showOnly(['Retract handle'], () => {
          currentlyActiveAnnotations = ['Retract handle'];
          if (isMobileScreen) {
            moveAnnotation('Retract Handle', [-0.2581984836892263, -2.055951720082301, -0.12713872357288025])
          }
        })
      });
    })
  }

  const retractHandle = () => {
    hide(['Retract handle'], () => {
      playAnimation('retract_handle', () => {
        currentlyActiveAnnotations = ['Open', 'Extend handle', 'Wheel spinner on'];
        show(currentlyActiveAnnotations, async () => {
          // Although it's correctly denoted as 'Retract handle',
          // its text says 'Extract handle'
          // const selected = await getSelected();
          // console.log(selected);
        })
      });
    })
  }

  const wheelSpinnerOn = () => {
    playAnimation('wheel_spinner_on', async () => {
      await wait(1900);
      playAnimation('default_camera_desktop');
    });
  }

  switch (annotation) {
    case 'Open': openSuitcase();
    break;
    case 'Close': closeSuitcase();
    break;
    case 'Extend handle': extendHandle();
    break;
    case 'Retract handle': retractHandle();
    break;
    case 'Wheel spinner on': wheelSpinnerOn();
  }
}
