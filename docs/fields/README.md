---
sidebar: auto
---

# Fields

## Primitive

> Json

```json
"primitive": {
  "@label": "Primitive Visualization",
  "@hint": "optional",
  "@default": "string"
}
```
> Preview

<img :src="$withBase('/images//visualization/primitive.png')" alt="foo">

------------

## Array

> Json

```json
"array": {
  "@label": "Array Visualization",
  "@default": ["string1", "string2", "string3"]
}
```

> Preview

<img :src="$withBase('/images//visualization/array.png')" alt="foo">

------------

## Object

> Json

```json
"object": {
  "@label": "object",
  "@data": {
    "key1": {
      "@label": "key1 Visualization",
      "@default": "key1Value"
    },
    "key2": {
      "@label": "key2 Visualization",
      "@default": "key2Value"
    }
  }
}
```

::: tip
You can add a label on the object
:::
::: warning
When the field is in object, you need to wrap the object in "@data" object.
:::

> Preview

<img :src="$withBase('/images//visualization/object.png')" alt="foo">

------------

## Array of Object

> Json

```json
"arrayObject": {
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

```

::: tip
You can add a label on the array of object
:::
::: warning
When the field is an array of object, you need to wrap the array in "@data" object.
:::


> Preview

<img :src="$withBase('/images//visualization/arrayOfObject.png')" alt="foo">

------------

## Checkbox

> Json

```json
"checkbox": {
  "@label": "Chekbox Visualization",
  "@default": true,
  "@options": {"displayAs": "checkbox"}
}
```

**data:** Nothing

> Preview

<img :src="$withBase('/images//visualization/checkbox.png')" alt="foo">

------------

## Select

### Data as object

> Json

```json
"selectObject": {
  "@label": "Select Object Visualization",
  "@default": 1,
  "@options": {"displayAs": "select", "data": [
    {"label": "Choice 1", "value": 1},
    {"label": "Choice 2", "value": 2},
    {"label": "Choice 2", "value": 3}
  ]}
}
```

**data:** Array of choice or Array of object: {"label": "choice 1", "value": "1"}

> Preview

<img :src="$withBase('/images//visualization/selectObject.png')" alt="foo">

------------

### Data as array

> Json

```json
"selectArray": {
  "@label": "Select Array Visualization",
  "@default": 1,
  "@options": {"displayAs": "select", "data": [1,2,3]}
}
```

**data:** Array of choice [1,2,3]

> Preview

<img :src="$withBase('/images//visualization/selectArray.png')" alt="foo">

------------

## Specific or general media

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

```

**data:** Nothing

> Preview

<img :src="$withBase('/images//visualization/media.png')" alt="foo">

------------

## Multiple Checkbox

> Json

```json
"multipleCheckbox": {
  "@label": "Multiple Checkbox Visualization",
  "@default": ["check1", "check4"],
  "@options": {"displayAs": "multiplecheckbox", "data": ["check1", "check2", "check3", "check4"]}
}

```

**data:** Array of choice possible to enable and disable or Array of object: {"label": "choice 1", "value": "1"}

> Preview

<img :src="$withBase('/images//visualization/multiplecheckbox.png')" alt="foo">

------------

## Number

> Json

```json
"number": {
  "@label": "Number Visualization",
  "@default": 42,
  "@options": {"displayAs": "number"}
}
```

**data:** Object with 1 key: step. For allowing float number. Default is 60

> Preview

<img :src="$withBase('/images//visualization/number.png')" alt="foo">

------------

## DurationDays

> Json

```json
"durationDays": {
  "@label": "Duration Days Visualization",
  "@default": 25,
  "@options": {
    "displayAs": "duration",
    "data": {
      "periods" : ["years", "months", "days"],
      "min": 5,
      "max": 50
    }
}
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

<img :src="$withBase('/images//visualization/durationDays.png')" alt="foo">

------------

## DurationMinutes

> Json

```json
"durationMinutes": {
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

<img :src="$withBase('/images//visualization/durationMinutes.png')" alt="foo">

------------

## ReadOnly

> Json

```json
"readOnly": {
  "@label": "readOnly",
  "@hint": "",
  "@default": "foo",
  "@options": {"displayAs": "readonly"}
}
```

**data:** Nothing

> Preview

<img :src="$withBase('/images//visualization/readonly.png')" alt="foo">

------------

## Hidden

> Json

```json
"hidden": {
  "@label": "hidden",
  "@hint": "",
  "@default": "bar",
  "@options": {"displayAs": "hidden"}
}
```

**data:** Nothing

> Preview

**No Display**

------------

## Password

> Json

```json
"password": {
  "@label": "password",
  "@hint": "",
  "@default": "mySecretPassword",
  "@options": {"displayAs": "password"}
}
```

**data:** Nothing

> Preview

<img :src="$withBase('/images//visualization/password.png')" alt="foo">

------------

## Datetime, Date and Time

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

<img :src="$withBase('/images//visualization/datetime.png')" alt="foo">

<img :src="$withBase('/images//visualization/datepicker.png')" alt="foo">

------------

## Slider

> Json

```json
"slider": {
  "@label": "slider",
  "@hint": "",
  "@default": 300,
  "@options": {"displayAs": "slider", "data": {"min": 100, "max": 1000, "step": 5}}
}
```

**data:** Object with 3 keys helping to define to slider parameters: max, min and step. Default: max: 100, min: 0, step: 1

> Preview

<img :src="$withBase('/images//visualization/slider.png')" alt="foo">

------------

## Textarea

> Json

```json
"textarea": {
  "@label": "textarea",
  "@hint": "",
  "@default": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  "@options": {"displayAs": "textarea"}
}

```

**data:** Nothing

> Preview

<img :src="$withBase('/images//visualization/textarea.png')" alt="foo">

------------

## Color

> Json

```json
"color": {
  "@label": "color",
  "@hint": "",
  "@default": "#6A1BBD",
  "@options": {"displayAs": "color"}
}
```

**data:** Nothing

> Preview

<img :src="$withBase('/images//visualization/color.png')" alt="foo">

<img :src="$withBase('/images//visualization/colorPicker.png')" alt="foo">