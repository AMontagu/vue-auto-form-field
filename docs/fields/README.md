---
sidebar: auto
---

# Fields

## With no options

### Simple input
> Json

```json
field:
{
  "@label": "Primitive Visualization",
  "@hint": "optional",
}
value: "first"
```
> Preview

<VaffFieldsExample identifier="1" type="primitive"/>

------------

### Array

> Json

```json
field:
{
  "@label": "Array Visualization",
  "@default": ["stringAdded"]
}
value: ["string1", "string2", "string3"]
```

> Preview

<VaffFieldsExample identifier="2" type="array"/>

------------

### Object

> Json

```json
field:
{
  "@label": "object",
  "@data": {
    "key1": {
      "@label": "key1 Visualization"
    },
    "key2": {
      "@label": "key2 Visualization"
    }
  }
}
value:
{
    "key1": "key1Value",
    "key2": "key2Value"
}
```

::: tip
You can add a label on the object
:::
::: warning
When the field is in object, you need to wrap the object in "@data" object.
:::

> Preview

<VaffFieldsExample identifier="3" type="object"/>

------------

### Array of Object

> Json

```json
field:
{
  "@label": "Array of Object",
  "@data": [
    {
      "key1Item": {
        "@label": "key1 of item",
        "@default": "string"
      },
      "key2Item": {
        "@label": "key2 of item",
        "@default": "string"
      }
    }
  ]
}
value:
[
    {
        key1Item: "string",
        key2Item: "string"
    },
    {
        key1Item: "string",
        key2Item: "string"
    }
]

```

::: tip
You can add a label on the array of object
:::
::: warning
When the field is an array of object, you need to wrap the array in "@data" object.
:::


> Preview

<VaffFieldsExample identifier="4" type="arrayObject"/>

------------

## With options

### Checkbox

> Json

```json
field:
{
  "@label": "Chekbox Visualization",
  "@options": {"displayAs": "checkbox"}
}
value: true
```

**data:** Nothing

> Preview

<VaffFieldsExample identifier="5" type="checkbox"/>

------------

### Select

#### Data as object

> Json

```json
field
{
  "@label": "Select Object Visualization",
  "@options": {"displayAs": "select", "data": [
    {"label": "Choice 1", "value": 1},
    {"label": "Choice 2", "value": 2},
    {"label": "Choice 2", "value": 3}
  ]}
}
value: 2
```

**data:** Array of choice or Array of object: {"label": "choice 1", "value": "1"}

> Preview

<VaffFieldsExample identifier="6" type="selectObject"/>

------------

#### Data as array

> Json

```json
field:
{
  "@label": "Select Array Visualization",
  "@options": {"displayAs": "select", "data": [1,2,3]}
}
value: 3
```

**data:** Array of choice [1,2,3]

> Preview

<VaffFieldsExample identifier="6" type="selectArray"/>

------------

### Specific or general media

> Json

```json
"image": {
  "@label": "image",
  "@hint": "",
  "@default": "images/loose.png",
  "@options": {"displayAs": "image"}
},
"sound": {
  "@label": "sound",
  "@hint": "",
  "@default": "sounds/loop.wav",
  "@options": {"displayAs": "sound"}
},
"video": {
  "@label": "video",
  "@hint": "",
  "@default": "videos/finalSonAmeliorer.mp4",
  "@options": {"displayAs": "video"}
},
"file": {
  "@label": "file",
  "@hint": "",
  "@default": "files/manifest.json",
  "@options": {"displayAs": "file"}
},
"media": {
  "@label": "media",
  "@hint": "",
  "@default": "images/loose.png",
  "@options": {"displayAs": "media"}
}
value: {
    "image": "images/picture.png",
    "sound": "sounds/sound.mp3",
    "video": "videos/video.mp4",
    "file": "files/data.json",
    "media": "images/anything.png"
}
```

**data:** Nothing

> Preview

Preview is unavailable because media visualisation need configuration and a backend server.
[See Media components documentation for more informations](/components/#media-components)

------------

### Multiple Checkbox

> Json

```json
field:
{
  "@label": "Multiple Checkbox Visualization",
  "@options": {"displayAs": "multiplecheckbox", "data": ["check1", "check2", "check3", "check4"]}
}
value: ["check1", "check4"],
```

**data:** Array of choice possible to enable and disable or Array of object: {"label": "choice 1", "value": "1"}

> Preview

<VaffFieldsExample identifier="7" type="multipleCheckbox"/>

------------

### Number

> Json

```json
field:
{
  "@label": "Number Visualization",
  "@default": 42,
  "@options": {"displayAs": "number"}
}
value: 42
```

**data:** Object with 1 key: step. For allowing float number. Default is 60

> Preview

<VaffFieldsExample identifier="8" type="number"/>

------------
### Duration

#### Days

> Json

```json
field:
{
  "@label": "Duration Days Visualization",
  "@options": {
    "displayAs": "duration",
    "data": {
      "periods" : ["years", "months", "days"],
      "min": 5,
      "max": 800
    }
}
value: 455
```

**data:** Object with 3 possible keys: "periods", "min" and "max":

- periods: Array of time units to display: ["years", "months", "days", "hours", "minutes", "seconds"]<br>
       The unit of the value depend of the smaller time unit in the array.
       Ex: ["years", "months", "days"] returns a number of days
       And ["hours", "minutes"] returns a number of minutes

- min: Integer representing the value of minimum duration value representing as the smaller time unit precised in periods key.<br>
        Ex: if min equal 90 for periods ["hours", "minutes"] this mean a minimal value equal to 1 hour and 30 minutes

- max: Integer representing the value of maximum duration value representing as the smaller time unit precised in periods key.<br>
        Ex: if min equal 730 for periods ["years", "months", "days"] this mean a maximal value equal to 2 years


> Preview

<VaffFieldsExample identifier="9" type="durationDays"/>

------------

#### Minutes

> Json

```json
field:
{
  "@label": "Duration Minutes Visualization",
  "@default": 25,
  "@options": {
        "displayAs": "duration",
        "data": {
            "periods" : ["hours", "minutes"],
            "min": 5,
            "max": 50,
        }
    }
}
value: 90
```

**data:** Object with 3 possible keys: "periods", "min" and "max":

- periods: Array of time units to display: ["years", "months", "days", "hours", "minutes", "seconds"]<br>
       The unit of the value depend of the smaller time unit in the array.
       Ex: ["years", "months", "days"] returns a number of days
       And ["hours", "minutes"] returns a number of minutes

- min: Integer representing the value of minimum duration value representing as the smaller time unit precised in periods key.<br>
        Ex: if min equal 90 for periods ["hours", "minutes"] this mean a minimal value equal to 1 hour and 30 minutes

- max: Integer representing the value of maximum duration value representing as the smaller time unit precised in periods key.<br>
        Ex: if min equal 730 for periods ["years", "months", "days"] this mean a maximal value equal to 2 years

> Preview

<VaffFieldsExample identifier="10" type="durationMinutes"/>

------------

### ReadOnly

> Json

```json
field:
{
  "@label": "readOnly",
  "@hint": "",
  "@default": "foo",
  "@options": {"displayAs": "readonly"}
}
value: "foo"
```

**data:** Nothing

> Preview

<VaffFieldsExample identifier="11" type="readOnly"/>

------------

### Hidden

> Json

```json
field: {
  "@label": "hidden",
  "@options": {"displayAs": "hidden"}
}
value: "bar"
```

**data:** Nothing

> Preview

**No Preview**

<VaffFieldsExample identifier="12" type="hidden"/>

------------

### Password

> Json

```json
field:
{
  "@label": "password",
  "@options": {"displayAs": "password"}
}
value: "mySecretPassword",
```

**data:** Nothing

> Preview

<VaffFieldsExample identifier="13" type="password"/>

------------

### Datetime, Date and Time

> Json

```json
"date": {
  "@label": "date",
  "@hint": "",
  "@default": "01-07-2016",
  "@options": {"displayAs": "datetime", "data": {"type": "date", "format": "DD-MM-YYYY", "dateFormat": "YYYY-MM-DD"}}
}
```
**data:** Object with three keys: type, format and dateFormat. Type can be date, datetime ot time depend of the element you want to see on the picker. Format is the date format you want when we update the value with the date picker. DateFormat is the format used to display the date on the label (please use only format like YYYY-MM-DD and not like YYYY-MM-DDTHH:mm:ssZ for this one).

Ex: {"type": "date", "format": "DD-MM-YYYY", "dateFormat": "YYYY-MM-DD"}
     {"type": "datetime", "format: "DD-MM-YYYYTHH:mm:ss", "dateFormat": "YYYY-MM-DD"}
     {"type": "time", "format: "HH:mm:ss"}

> Preview

<VaffFieldsExample identifier="14" type="date"/>

------------

### Slider

> Json

```json
field:
{
  "@label": "slider",
  "@options": {"displayAs": "slider", "data": {"min": 100, "max": 1000, "step": 5}}
}
value: 300
```

**data:** Object with 3 keys helping to define to slider parameters: max, min and step. Default: max: 100, min: 0, step: 1

> Preview

<VaffFieldsExample identifier="15" type="slider"/>

------------

### Textarea

> Json

```json
field: {
  "@label": "textarea",
  "@options": {"displayAs": "textarea"}
}
value: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
```

**data:** Nothing

> Preview

<VaffFieldsExample identifier="16" type="textarea"/>

------------

### Color

> Json

```json
field:
{
  "@label": "color",
  "@hint": "",
  "@default": "#6A1BBD",
  "@options": {"displayAs": "color"}
}
value: "#6A1BBD"
```

**data:** Nothing

> Preview

<VaffFieldsExample identifier="17" type="color"/>