<template>
  <header class="header" :class="darkModeOn ? '' : 'header__dark'">
    <div class="content">
      <router-link to="/" class="content__link"
        >
        <h1 class="content__link--logo">HiJiffy</h1>
      </router-link>
      <Search />
      <UserArea />
    </div>
  </header>
</template>

<script>

import { mapGetters } from "vuex";
import Search from "./Search";
import UserArea from "./UserArea";

export default {
  name: "Header",
  components: {
    Search,
    UserArea,
  },
  computed: {
    ...mapGetters(["darkModeOn"]),
  },
};
</script>

<style lang="scss" scoped>
.header {
  height: 60px;
  background-color: white;
  display: grid;
  place-items: center;
  border-bottom: 2px solid #ebeff2;

  .content {
    width: 90vw;
    display: grid;
    grid-template-columns: 1fr 4fr 1fr;
    align-items: center;

    &__link {
    text-decoration: none;
    
    &--logo {
      color: $main-color;
      font-size: 18px;
      line-height: 25px;
      font-weight: 700;
      font-family: "Open sans", sans-serif;
    }
    }
    &--user {
      display: flex;
    }
  }
&__dark {
  background-color: $dark-color  ;
  border-bottom: 2px solid black;
}
}
</style>