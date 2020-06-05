import React, { useState } from 'react'
import { KEYMAP_R1, KEYMAP_R2, KEYMAP_R3, KEYMAP_R4 } from './vkeyboard-map'

export const VKeyboard = ({ keypressHandler, fixedToScreen }) => {
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
        // Caps lock usually stays selected
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
    <div className={`vk-vkeyboard-wrap ${fixedToScreen ? 'is-fixed' : ''}`}>
      <div className="vk-vkeyboard">
        {KEYMAP_R1.map((key, idx) => {
          const valToUse = keyValue(key)
          const keyIsActive = keyAction(key) ? 'is-active' : ''

          return (
            <div key={`${key.value}${idx}r1`} className="vk-vkeyboard__action" data-which={valToUse}>
              <button
                className={`vk-vkey-btn ${keyIsActive}`}
                onClick={internalKeypressHandler}
                data-key={valToUse}
              >
                  {valToUse}
                </button>
              </div>
            )
        })}
      </div>

      <div className="vk-vkeyboard">
        {KEYMAP_R2.map((key, idx) => {
          const valToUse = keyValue(key)
          const keyIsActive = keyAction(key) ? 'is-active' : ''

          return (
            <div key={`${key.value}${idx}r2`}  className="vk-vkeyboard__action" data-which={valToUse}>
              <button
                className={`vk-vkey-btn ${keyIsActive}`}
                onClick={internalKeypressHandler}
                data-key={valToUse}
              >
                  {valToUse}
                </button>
              </div>
            )
        })}
      </div>

      <div className="vk-vkeyboard">
        {KEYMAP_R3.map((key, idx) => {
          const valToUse = keyValue(key)
          const keyIsActive = keyAction(key) ? 'is-active' : ''

          return (
            <div key={`${key.value}${idx}r3`} className="vk-vkeyboard__action" data-which={valToUse}>
              <button
                className={`vk-vkey-btn ${keyIsActive}`}
                onClick={internalKeypressHandler}
                data-key={valToUse}
              >
                  {valToUse}
                </button>
              </div>
            )
        })}
      </div>

      <div className="vk-vkeyboard">
        {KEYMAP_R4.map((key, idx) => {
          const valToUse = keyValue(key)
          const keyIsActive = keyAction(key) ? 'is-active' : ''

          return (
            <div key={`${key.value}${idx}r4`} className="vk-vkeyboard__action" data-which={valToUse}>
              <button
                className={`vk-vkey-btn ${keyIsActive}`}
                onClick={internalKeypressHandler}
                data-key={valToUse}
              >
                  {valToUse}
                </button>
              </div>
            )
        })}
      </div>
    </div>
  )
}

export default VKeyboard
