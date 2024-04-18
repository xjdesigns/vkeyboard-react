import { useState, Fragment } from 'react'
import PropTypes from 'prop-types';
import './style.scss'

export const VKeyboard = ({ keypressHandler, keyMappings = [], fixedToScreen }) => {
  const [isShiftKey, setShiftKey] = useState(false)
  const [isCapKey, setCapKey] = useState(false)

  // NOTE: To keep performance in mind use event delegation here,
  // as opposed to attaching a handler to every button
  const internalKeypressHandler = ev => {
    const key = ev.target.dataset.key

    if (key) {
      if (key === 'shift') {
        setShiftKey(!isShiftKey)
      } else if (key === 'cap') {
        // Caps lock stays selected
        setCapKey(!isCapKey)
      } else {
        // Shift key by nature is used for one key press then defaults back
        if (isShiftKey) {
          setShiftKey(false)
        }

        keypressHandler(key)
      }
    }
  }

  // this tracks what value to show on keys depending on state
  const keyValue = key => {
    if (key.icon) {
      return key.icon
    }

    if (isShiftKey && key.shiftValue) {
      return key.shiftValue
    }

    if (isCapKey && key.capValue) {
      return key.capValue
    }

    return key.value
  }

  // If you want to handle a key to display as active
  const keyAction = key => {
    if (key.value === 'cap' && isCapKey) {
      return true
    }
  }

  return (
    <div
      className={`vk-vkeyboard-wrap ${fixedToScreen ? 'is-fixed' : ''}`}
      onClick={internalKeypressHandler}
    >
      {keyMappings.map((km, idx) => {
        return (
          <div className="vk-vkeyboard" key={idx}>
            {km.map((key, idx) => {
              const valToUse = keyValue(key)
              const keyIsActive = keyAction(key) ? 'is-active' : ''

              return (
                <Fragment key={`${key.value}${idx}r1`}>
                  {key.blankSpace ? (
                    <div className="vk-vkeyboard__action" data-which="blank_space" data-size={key.size ?? 1} />
                  ) : (
                    <div className="vk-vkeyboard__action" data-which={valToUse} data-size={key.size ?? 0}>
                      <button
                        className={`vk-vkey-btn ${keyIsActive}`}
                        data-key={valToUse}
                      >
                        {valToUse}
                      </button>
                    </div>
                  )}
                </Fragment>
              )
            })}
          </div>
        )
      })}
    </div>
  )
}

VKeyboard.propTypes = {
  keypressHandler: PropTypes.func,
  keyMappings: PropTypes.array,
  fixedToScreen: PropTypes.bool,
}

export default VKeyboard
