# React Virtual Keyboard

A React component for a virtual keyboard with several options.

## Install
Install the package from npm and use inside your application.

``` javascript
npm i vkeyboard-react
```

Then add to your application.
``` javascript
import { VKeyboard, DEFAULT_KEY_MAP } from 'js-virtual-keyboard'
import 'js-virtual-keyboard/core.css'

<div>
  <VKeyboard
    keyMappings={DEFAULT_KEY_MAP}
    keypressHandler={val => console.warn(val)}
    fixedToScreen
  />
</div>
```

> NOTE: The package comes with a default keyboard layout but you can provide your own values to manage.

## Props
Rewact component props for virtual keyboard.

| Prop | Type |
| ---- | ---- |
| keyMappings | Array |
| keypressHandler | Function |
| fixedToScreen | Boolean |

## Key Mappings
You can either use the provided DEFAULT_KEY_MAP or create your own.

Key mappings have 5 values you can define. Value is required, shiftValue and capValue depend on if you provide a shift and/or a cap key. If `blackSpace` is set to true then all other values are ignored and will use a black space instead.

``` javascript
const KEY_MAP_SET = [{
  value: 'q', // required
  shiftValue: '1',
  capValue: 'Q',
  icon: '',
  blankSpace: true,
  size: 1 // Supported values are 1 - 4
}]
```
 The prop value passed is an array of array/objects like so. Each inner array is a new row for the virtual keyboard component.

 ``` javascript
const FULL_MAP = [
  [{ ... }],
  [{ ... }],
  [{ ... }]
]
 ```

## Callback Function
The virtual keyboard provides a callback function of the value being clicked. You are able to consume this value and handle for the applications needs. If you provide shift or cap values inside your key mappings these values will be returned.

``` javascript
const cbFunc = val => {
  ... Do something with value
}

<VKeyboard
  ...
  keypressHandler={cbFunc}
/>
```

## Styling
You can customize the virtual keyboard using CSS custom variables.

``` css
:root {
  --vk-bg: #555;
  --vk-x-padding: 6px;
  --vk-y-padding: 6px;
  --vbtn-radius: 6px;
  --vbtn-bg: #fff;
  --vbtn-color: #000;
  --vbtn-bg-active: #33339b;
  --vbtn-color-active: var(--vbtn-bg);
  --vbtn-x-padding: 12px;
  --vbtn-y-padding: 12px;
  --vbtn-shadow: 0px 1px 1px rgba(0, 0, 0, 0.4);
}
```

The virtual keyboard uses a global css style and classes. If you would like to further customize or write your own look at the stylesheet provided with the package or inspect the DOM.
