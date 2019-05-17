<template>
  <div v-if="!loading">
    <!-- {{ FieldDataExample.data.image }}
		<vaff-media-field identifier="jackpot_test_bla" :field="FieldDataExample.field.image" v-model="FieldDataExample.data.image" default-value="/images/loose.png" type="image"/> -->
    {{ FieldDataExample.data.image }}
    <vaff-media-field
      identifier="jackpot_test_bla"
      :field="FieldDataExample.field.image"
      v-model="FieldDataExample.data.image"
      default-value="/images/loose.png"
      type="image"
    />
  </div>
</template>

<script>
import FieldDataExample from "./FieldDataExample";

export default {
  name: "vaffMediaFieldView",
  data() {
    return {
      FieldDataExample,
      loading: true
    };
  },
  async created() {
    try {
      // Fleet server test
      /*await this.$vaff.connect(
				"eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJIOHhYR25xeGpZS0dFdk9FUlFKbnQ0YVVCTllHMVpna3VPX2RJc0VzeDIwIn0.eyJqdGkiOiJhYzYxNGI3Zi1iYTcyLTRlMjgtODI4Yy0yODU0MmM0NzFkOTEiLCJleHAiOjE1NDM4NTE3NDAsIm5iZiI6MCwiaWF0IjoxNTQzNDE5NzQwLCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjQwODAvYXV0aC9yZWFsbXMvZmxlZXQiLCJhdWQiOiJmbGVldC1mcm9udGVuZCIsInN1YiI6IjdhNmRiYmNlLTNmOGUtNDI3Zi04YTgyLTBjZmYxNjE5YjU4YSIsInR5cCI6IkJlYXJlciIsImF6cCI6ImZsZWV0LWZyb250ZW5kIiwiYXV0aF90aW1lIjowLCJzZXNzaW9uX3N0YXRlIjoiMTY1YjJjNjItZjA4Yy00YTMzLThhNTUtNzJiYzYwY2NiZjA1IiwiYWNyIjoiMSIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwOi8vbG9jYWxob3N0OjQwMDMiXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbImxpc3Qtcm9ib3QiLCJyb2JvdCIsIm9mZmxpbmVfYWNjZXNzIiwiYWRtaW4iLCJkZXZlbG9wZXIiLCJkZXRhaWwtcm9ib3QiLCJ1c2VyIiwicm9ib3QtaGVhc3kiLCJoZWFzZSJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoicHJvZmlsZSBlbWFpbCBncm91cHMgb2ZmbGluZV9hY2Nlc3MiLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImdyb3VwcyI6WyJoZWFzZSIsInJvYm90LWhlYXN5Il0sInByZWZlcnJlZF91c2VybmFtZSI6ImhzeV9wcGt2eHRuYzgifQ.X4tRwNt63pzpikurf3k13l2ZxnNvOLUqjVbLVKN6tpCFgnUUKNfE_41ZzBn3WrMKqj4e16EBAELHwCrDw-A-8YnLP25s3i_F-ad6RSSZ-ct_E3z-mH1WY3XTTuZaZUJ3FI6ASDcUstHadiRMw5K4oGf1xZFlpKoxXyJZRIyMvjDzEVHLcWNbCu9loa8rIDhRhfr8E5bbgKsTz_czmy6H81H4RXUqijvC3KsOnr5zPcpEuWlxvL-BSMxpUFSbxJSSQpaaTjwLWzN2EVDIPBl1pt8dikMNnElG58oQI-GIfMm4UIkMau0mHzrH5BPNdVqzrYmI4NTgJSrkrK3Fb6kgiA",
				`http://localhost:4000/fleet-lab`
			);*/
      // Robot test
      await this.$vaff.connect(
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiV2ViVG9vbHMiLCJwZXJtaXNzaW9uIjo5MCwiaXNTaW5nbGV0b24iOmZhbHNlLCJkZXZlbG9wZXIiOnsiZmlyc3RuYW1lIjoiQWRyaWVuIiwibGFzdG5hbWUiOiIiLCJ1c2VybmFtZSI6IkFNb250YWd1IiwibGFzdE5hbWUiOiJNb250YWd1In0sImlhdCI6MTU0Mjg4Mjc4Nn0.Wv_AcpMn0978A2PBz8rQwrp3ffO2ZCJyv_szSbPF6rw",
        "localhost",
        3002,
        false
      );
      this.$vaffWebToolsOptions.vaffMediaOptions.socketInstance = this.$vaff.client;
      this.loading = false;
    } catch (e) {
      console.error("Could not connect to fleet server lab gateway: ", e);
    }
  }
};
</script>
