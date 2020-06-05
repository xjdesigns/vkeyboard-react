import React, { useState } from 'react'
import VKeyboard from './vkeyboard'

// https://www.npmjs.com/package/helping_hand
// https://github.com/xjdesigns/HelpingHand/blob/master/src/valueHelper.ts
import { joinValues, removeLastChar } from 'helping_hand'

const USER_VALUE = 'userValue'
const PASS_VALUE = 'passValue'

// NOTE: This is an example of the container component
// This would track all values to save and send
export const VKeyboardContainer = () => {
  const [keyboardOpen, setKeyboardOpen] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [whichInput, setWhichInput] = useState(USER_VALUE)
  const [inputValues, setInputValues] = useState({
    [USER_VALUE]: '',
    [PASS_VALUE]: '',
  })

  const keypressHandler = val => {
    console.warn('val')
    if (val === 'delete') {
      const prev = inputValues[whichInput]
      const newValue = removeLastChar(prev)
      setInputValues({
        ...inputValues,
        [whichInput]: newValue
      })
    } else if (val === 'close') {
      setKeyboardOpen(false)
    } else if (val === 'enter') {
      const values = JSON.stringify(inputValues)
      window.alert(`You clicked enter with a saved value of ${values}`)
    } else {
      console.warn(' I am here')
      const prev = inputValues[whichInput]
      const newValue = joinValues(prev, val)
      setInputValues({
        ...inputValues,
        [whichInput]: newValue
      })
    }
  }

  const handleInput = which => {
    // Close keyboard if current input is clicked again
    if (which === whichInput) {
      setKeyboardOpen(!keyboardOpen)
    }

    setWhichInput(which)
  }

  const maskPassword = val => {
    if (showPassword) {
      return val
    }

    const masked = Array(val.length + 1).join('*')
    return masked
  }

  return (
    <div>
      <div className="vk-form">
        <div className="vk-label">Email</div>
        <div
          className={`vk-input ${whichInput === USER_VALUE ? 'is-active' : ''}`}
          onClick={() => handleInput(USER_VALUE)}
        >
          {inputValues[USER_VALUE]}
        </div>

        <div className="vk-label">Password</div>
        <div
          className={`vk-input ${whichInput === PASS_VALUE ? 'is-active' : ''}`}
          onClick={() => handleInput(PASS_VALUE)}
        >
          {maskPassword(inputValues[PASS_VALUE])}
        </div>
        <button onClick={() => setShowPassword(!showPassword)}>Show password</button>
      </div>

      {keyboardOpen && (
        <VKeyboard keypressHandler={keypressHandler} fixedToScreen />
      )}
    </div>
  )
}

export default VKeyboardContainer
