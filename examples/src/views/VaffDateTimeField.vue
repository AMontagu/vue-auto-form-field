<template>
  <div>
    <vaff-date-time-field
      v-model="date"
      date-format="MM/DD/YYYY"
      format="MM/DD/YYYY"
      type="date"
    />

    <vaff-date-time-field
      v-model="datetime"
      date-format="YYYY-MM-DD"
      format="YYYY-MM-DDTHH:mm:ss"
      type="datetime"
    />

    <vaff-date-time-field v-model="time" format="HH:mm:ss" type="time" />
  </div>
</template>

<script>
export default {
  name: "vaffDateTimeFieldView",
  data() {
    return {
      date: "01/01/2019",
      datetime: "1977-04-22T01:00:00",
      time: "01:00:00"
    };
  }
};
</script>
