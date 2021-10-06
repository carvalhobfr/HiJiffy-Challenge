<template>
  <div class="select-container" v-if="type === 'company'">
    <p class="select-container__label">{{ $store.state.selectedCompany }}</p>
    <select
      :class="darkModeOn ? '' : 'select__dark'"
      class="selector"
      v-model="getCompaniesComputed"
    >
      <option
        class="select__item"
        v-for="(option, index) in getCompanies"
        :value="option"
        :key="index"
      >
        {{ option }}
      </option>
    </select>
  </div>

  <div class="select-container" v-else>
    <p class="select-container__show-label select-container__label " :class="darkModeOn ? '' : 'select-container__show-dark'">Show:</p>
    <select
      class="selector"
      :class="darkModeOn ? '' : 'select__dark'"
      v-model="getLimitedClients"
    >
      <option
        class="select__item"
        v-for="(option, index) in getLimits"
        :value="option"
        :key="index + 1"
        :selected="option"
      >
        {{ option }} per page
      </option>
    </select>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import DropdownIcon from "../../assets/svgs/DropdownIcon.vue";
export default {
  components: {
    DropdownIcon,
  },
  props: {
    type: String,
  },
  computed: {
    ...mapGetters(["getCompanies", "getLimit", "darkModeOn"]),
    getLimits() {
      let limits = [5, 8, 10, 15, 20];
      return limits;
    },
    getCompaniesComputed: {
      get() {
        return this.getCompanies;
      },
      set(event) {
        this.$store.dispatch("fetchClientsByCompany", event);
      },
    },
    getLimitedClients: {
      get() {
        return this.getLimit;
      },
      set(event) {
        this.$store.dispatch("selectLimit", event);
      },
    },
  },
};
</script>


<style lang="scss" scoped>
.select-container {
  display: flex;
  align-items: center;

  &__label {
    margin-left: 6px;
    font-size: 12px;
    color: $main-color;
  }

  &__show-label {
    color: #000;
  }
  &__show-dark {
    color: white;
  }

.select__dark {
  background: $dark-background;
}
.selector {
  font-size: 12px;
  background: transparent;
  box-shadow: none  ;
  border: none;
  outline: none;
  font-family: "Poppins", sans-serif;
  box-shadow: none;
  color: $main-color;
}
}
.filter__element .selector{
  min-width: 20px ;
  width: 10% ;
  }
</style>