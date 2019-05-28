---
sidebar: auto
---

# Guide

## Introduction

Vue auto form field (Vaff) allow you to dynamically build form from json. The main advantage of Vaff is that it take complex json like array and object, even when nested.

Its goal is to allow high user customization without a lot of html. One of the best example of application is admin back office. An other one is if user can add customizable content.

Finally it add some form field out of the box as duration, date time, password ... To see the full list please [see fields](/fields/)

## Get Started

- First add vue-auto-form-field to your dependencies:
```bash
yarn add vue-auto-form-field # or npm i vue-auto-form-field
```

- Tell Vue to use it and Vuetify:
```js
// main.js
import Vaff from 'vue-auto-form-field';
import Vuetify from 'vuetify';

Vue.use(Vuetify);
Vue.use(Vaff);
```

- Add the Vaff store to your store:
```js
// store.js
import { vaffStore } from 'vue-auto-form-field';

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    vaffStore,
  }
});
```

- Enjoy your vaff components:
```vue
<template>
  <div>
    <vaff
      identifier="firstForm"
      :field="fields"
      v-model="data"
    />
  </div>
</template>

<script>

export default {
  name: "vaffView",
  data() {
    return {
      fields: {
	      field1: {
		      "@label": "Text input",
	      },
	      field2: {
		      "@label": "Text input",
	      },
      },
      data: {
        field1: "first",
        field2: "second"
      }
    };
  }
};
</script>
```

## Vaff global options

When you tell vue to use Vaff you can passe some options like this:
```
Vue.use(Vaff, {
    i18n,
    vaffMediaOptions,
    vaffUploadOptions
});
```

| options  |  description |
|---|---|
|  i18n |  Your vue-i18n instance to adapt text to the good context |
|  logLevel |  The debug level you want. 10 = debug, 20 = info, 30 = warning, 40 = error. Default is 30 |
|  vaffMediaOptions |  Options needed if you want to use VaffMedia and allow user to pick up image, sound, video or file in your dynamically generated form. [See VaffMedia options documentation](/components/#media-components)    |   |   |   |
|  vaffUploadOptions |  Options needed if you want to pass some security when you upload media with VaffMedia (deprecated will be pass in VaffMedia) |

## Field structure

A field structure is a json composed of sub json object or array of json object.

Each sub json object always has at least 1 key:

**@label:** The label of the input in the LAB

3 others fields exist but are optional:

**@hint:** This is an extra description of the variable displayed in the LAB. Use it if the label is not enough to understand the meaning.

**@options:** A JSON object to configure the input visualization in the LAB. [See fields](/fields/) for all the configuration possible.

**@default:** The default value of the variable when the sub json is in an array. Can be used to define initial value in database if you dynamically create table from field structure.

## Value structure

The value structure from the field structure. But when field structure need a sub json object data only need the value to map the structure to an actual value.

## Translation

In order to add a translation to your field structure, you have to transform the value to an object containing the different languages as keys.

```
field1: {
    "@label": "Text input",
}
```

become

```
field1: {
    "@label": {
        "fr": "Entrée texte",
        "en": "Text input"
    },
}
```

