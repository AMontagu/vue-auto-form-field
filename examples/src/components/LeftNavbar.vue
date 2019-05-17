<template>
  <v-navigation-drawer
    :value="value"
    :mini-variant="miniVariant"
    :mobile-break-point="navbarMobileBreakpoint"
    :width="$vuetify.breakpoint.lgAndUp ? 190 : 160"
    :fixed="fixed"
    :absolute="!fixed"
    :app="app"
    clipped
    class="vaffLeftNavbar"
    flat
    dark
    style="z-index:11"
    @update:mini-variant="$emit('update:mini-variant', $event)"
    @input="$emit('input', $event)"
  >
    <v-subheader class="light-grey--text text--darken-1">Menu</v-subheader>
    <v-list dense>
      <div v-for="item in navbarItems" :key="item.text">
        <v-list-tile
          v-if="!item.subItems && item.permission"
          :to="item.path"
          :exact="true"
          router
          active-class="default-class active"
        >
          <div class="activeBar" />
          <v-icon small class="mr-2 ml-1">{{ item.icon }}</v-icon>
          <v-list-tile-content>
            <v-list-tile-title
              :class="{
                subheading: $vuetify.breakpoint.xlOnly,
                'body-1': $vuetify.breakpoint.lgAndDown
              }"
            >
              {{ item.text }}
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-group
          v-else-if="item.permission"
          no-action
          active-class="default-class activeSub"
        >
          <v-list-tile slot="activator">
            <v-icon small class="mr-2 ml-1">{{ item.icon }}</v-icon>
            <v-list-tile-content>
              <v-list-tile-title
                :class="{
                  subheading: $vuetify.breakpoint.xlOnly,
                  'body-1': $vuetify.breakpoint.lgAndDown
                }"
              >
                {{ item.text }}
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <div v-for="subItem in item.subItems" :key="subItem.text">
            <v-list-tile
              v-if="subItem.permission"
              :to="
                typeof subItem.path === 'object'
                  ? subItem.path
                  : item.path + subItem.path
              "
              router
              active-class="default-class active"
            >
              <div class="activeBar" />
              <v-list-tile-content>
                <v-list-tile-title class="body-1"
                  >{{ subItem.text }}
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </div>
        </v-list-group>
      </div>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: "LeftNavbar",
  props: {
    navbarItems: {
      type: Array,
      required: true
    },
    value: {
      type: Boolean,
      default: true
    },
    miniVariant: {
      type: Boolean,
      default: false
    },
    navbarMobileBreakpoint: {
      type: Number,
      default: 1264
    },
    fixed: {
      type: Boolean,
      default: true
    },
    app: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {};
  }
};
</script>

<style lang="scss">
.vaffLeftNavbar {
  background-color: #232860 !important;

  .v-list {
    background: #232860 !important;
  }

  .v-list__group:before,
  .v-list__group:after {
    height: 0 !important;
  }

  .v-list__group__items--no-action .v-list__tile {
    padding-left: 40px !important;
  }

  .v-list__tile {
    padding-right: 0px !important;
    padding-left: 10px !important;
  }

  .v-list__group__header__append-icon {
    padding: 0px 0px !important;
  }
  .v-list__group__header__append-icon {
    padding: 0px 5px 0px 0px !important;
  }

  &::-webkit-scrollbar {
    display: none;
  }

  .activeBar {
    position: absolute;
    top: 0;
    left: 0;
    background-color: #14a1f6;
    height: 100%;
    width: 5px;
    opacity: 0;
    transition: all 0.3s;
    box-shadow: 0 4px 8px 0 rgba(20, 161, 246, 0.5),
      0 6px 20px 0 rgba(20, 161, 246, 0.5);
  }

  .active {
    color: white !important;
    background-color: rgba(255, 255, 255, 0.1) !important;
    font-weight: 600 !important;

    .activeBar {
      opacity: 1;
    }
  }

  .activeSub {
    color: white !important;
    /*background-color:rgba(255,255,255,.1) !important;*/
    font-weight: 600 !important;

    .activeBar {
      opacity: 1;
    }
  }

  .v-list__group__items--no-action .v-list__tile {
    padding-left: 38px !important;
  }
}
</style>
