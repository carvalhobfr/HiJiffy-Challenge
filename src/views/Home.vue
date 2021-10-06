<template>
  <main class="home" :class="darkModeOn ? '' : 'dark__home'">
  <TableContainer />
  <div class="mobile-main">
    <h1>Work in progress...</h1>
    <p>Please switch to a wider screen.</p>
  </div>
  </main>
</template>

<script>
import TableContainer from "../components/Calendar/TableContainer";
import { mapGetters } from "vuex";
export default {
  name: "Home",
  components: {
    TableContainer,
  },
  computed: {
    ...mapGetters(["darkModeOn"]),
  },
};
</script>

<style lang="scss" scoped>
main {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.home {
  min-height: calc(100vh - (60px + 250px));
}
.dark__home {
  background-color: $dark-background;
  th,
  td,
  option,
  span,
  div {
    color: $dark-font-gray  ;
  }
}
.mobile-main {
  display: none;
}

@media (max-width: 720px){
  .table-container  {
    display: none;
  }
  .mobile-main {
    display: flex;
    flex-direction: column;
    color: $main-color;
    margin: auto;
    line-height: 32px;
  }
}
</style>