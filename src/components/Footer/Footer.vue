<template>
  <footer class="footer" :class="darkModeOn ? '' : 'footer__dark'">
    <div class="footer__content">
      <div class="footer__nav">
        <router-link to="/" class="footer__link">Community</router-link>
        <router-link to="/" class="footer__link">Company</router-link>
        <router-link to="/" class="footer__link">
          <img
            class="footer__link--logo"
            src="../../assets/LogoHiJiffy.png"
            alt="HiJiffy Logo"
          />
        </router-link>
        <router-link to="/" class="footer__link">Help Desk</router-link>
        <router-link to="/" class="footer__link">Blog</router-link>
      </div>
      <FooterSocials />
      <p class="footer__copyright">© HiJiffy 2021. We love our users!</p>
    </div>
      <DarkModeToggler class="footer__toggler" />
  </footer>
</template>

<script>
import FooterSocials from "./FooterSocials";
import DarkModeToggler from "./DarkModeToggle";
import { mapGetters } from "vuex";
export default {
  name: "Footer",
  components: {
    FooterSocials,
    DarkModeToggler,
  },
  computed: {
    ...mapGetters(["darkModeOn"]),
  },
};
</script>

<style lang="scss" scoped>
.footer {
  position: relative;
  padding-bottom: 30px;
  &__nav {
    width: 90%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    padding: 30px;
    margin: 0 auto 42px;
    border-bottom: 1px solid black;

    @media (max-width: 600px) {
      justify-content: space-evenly;
      :nth-child(1) { order: 1; }
      :nth-child(2) { order: 3; }
      :nth-child(3) { order: 2; }
      :nth-child(4) { order: 5; }
      :nth-child(5) { order: 4; }
    }
  }
  &__link {
    text-decoration: none;
    color: $primary-color;
    font-family: Montserrat;
    font-style: normal;
    font-weight: bold;
    font-size: 15px;
    line-height: 24px;
    width: 100px;
    text-align: center;
      &--logo {
        width: 80px;
        height: 55px;
      }
  }
  &__copyright {
    margin-top: 44px;
    text-align: center;
    color: rgba(0, 0, 0, 0.8);
    font-size: 15px;
    line-height: 24px;
  }
  &__toggler {
    position: absolute;
    right: 5%;
    bottom: 20px;
   @media (max-width: 600px)
    {
      bottom:40px
    }
}

&__dark {
  background-color: $dark-background ;
  h1,
  h2,
  h3,
  a,
  h4,
  p {
    color: $dark-font-gray ;
  }
}
}

</style>