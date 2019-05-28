# vue-auto-form-field

Vue-auto-form-field is a Vue library that allow you to create form dynamically from JSON.

## Documentation:

To see how to use it please read the [DOCUMENTATION](https://amontagu.github.io/vue-auto-form-field/)

## Example:

This json:

```json
{
    name: {
        "@label": "Name",
    },
    birthDate: {
        "@label": "Birth Date",
        "@options": {"displayAs": "datetime", "data": {"type": "date", "format": "DD-MM-YYYY", "dateFormat": "DD-MM-YYYY"}}
    },
    email: {
        "@label": "Email",
    },
    password: {
        "@label": "Password",
        "@options": {"displayAs": "password"}
    },
    confirmPassword: {
        "@label": "Confirm Password",
        "@options": {"displayAs": "password"}
    }
}
```

Become this form:

![](https://github.com/AMontagu/vue-auto-form-field/tree/master/docs/registerFormExample.png)


To see more examples please go the [documentation](https://amontagu.github.io/vue-auto-form-field/examples)
