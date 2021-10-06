<template>
  <div class="search" :class="darkModeOn ? '' : 'search__dark'">
    <input
      class="search__field"
      type="search"
      placeholder="Global search"
      v-model="searching"
    />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data: () => ({
    debouce: null,
    typing: null,
  }),
  computed: {
    ...mapGetters(["darkModeOn"]),
    searching: {
      get() {
        return this.$store.state.searchTerm;
      },
      set(newValue) {
        clearTimeout(this.debounce);
        this.debounce = setTimeout(() => {
          this.$store.dispatch("fetchClients", newValue);
        }, 1000);
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.search {
  display: flex;
  align-items: center;
  background-image: url("../../assets/svgs/search_icon.svg");
  background-repeat: no-repeat;
  background-position: left center;
  margin: 0 10px;
  &__field {
    width: 100%;
    margin: 8px 20px;
    border: none;
    outline: none;
    font-family: "Poppins", sans-serif;
    font-weight: 400;
    font-size: 12px;
    line-height: 18px;
    background-color: transparent;
    color: #90a0b7;
    &::placeholder {
      color: #90a0b7;
    }
  }
  &__dark {
    .search__field {
      background-color: $dark-color;
    }
  }
}

</style>