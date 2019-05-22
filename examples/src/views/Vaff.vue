<template>
  <div style="text-align:left">
    <!-- {{ FieldDataExample.data }} -->

    <vaff
      identifier="test"
      :field="FieldDataExample.field"
      v-model="FieldDataExample.data"
    />

    <!-- <vaff
			identifier="test"
			:field="fieldWithTabs"
			v-model="FieldDataExampleWithTab.data"
			:usetabs="true"
		/> -->

    <!-- <vaff
			identifier="test"
			:field="FieldDataExampleWithTab.tabs"
			v-model="FieldDataExampleWithTab.data"
			:usetabs="true"
		/> -->
    <!-- <vaff identifier="test" :field="FieldDataExample.field.image" v-model="FieldDataExample.data.image"/> -->
    <!-- <div v-for="(data, key) in FieldDataExample.data" :key="key">
			<vaff :identifier="`test_${key}`" :field="FieldDataExample.field[key]" v-model="FieldDataExample.data[key]"/>
		</div> -->
  </div>
</template>

<script>
import FieldDataExample from "./FieldDataExample";
import FieldDataExampleWithTab from "./FieldDataExampleWithTab";

export default {
  name: "vaffView",
  data() {
    return {
      FieldDataExample,
      FieldDataExampleWithTab
    };
  }
};
</script>
