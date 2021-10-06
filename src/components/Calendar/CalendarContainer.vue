<template>
  <transition name="pop" appear>
    <div class="calendar" :class="darkModeOn ? '' : 'calendar__dark'">
      <div class="calendar__header">
        <div class="calendar__header--left">
          <h3>CALENDAR</h3>
          <div class="select-date">
            {{ getDate }}
            <DropdownIcon class="svg-date" fill="#109cf1" />
          </div>
        </div>
        <div class="calendar__header--right">
          <SvgFullScreen class="calendar__header--svg" id="fullscreen__svg" />
          <SvgClose
            @click="$store.state.showCalendarModal = false"
            class="calendar__header--svg"
          />
        </div>
      </div>
      <div class="calendar__subheader">
        <div class="today__btn" ref="today-btn">Today</div>
        <SvgMenu class="subheader__svg" />
      </div>
      <div class="calendar__body">
        <TheCalendar />
      </div>
    </div>
  </transition>
</template>

<script>
import DropdownIcon from "../../assets/svgs/DropdownIcon.vue";
import SvgFullScreen from "../../assets/svgs/SvgFullScreen";
import SvgClose from "../../assets/svgs/SvgClose";
import SvgMenu from "../../assets/svgs/SvgMenu";
import TheCalendar from "./TheCalendar";
import moment from "moment";
import { mapGetters } from "vuex";

export default {
  name: "Calendar Container",
  components: {
    DropdownIcon,
    SvgFullScreen,
    SvgClose,
    SvgMenu,
    TheCalendar,
  },
  computed: {
    getDate: () => {
      return moment().format("ddd, MMM Do ");
    },
     ...mapGetters(["darkModeOn"])
  },
};
</script>

<style lang="scss" scoped>
.calendar {
  position: fixed;
  height: fit-content;
  top: 60px;
  left: 0;
  bottom: 60px;
  right: 0;
  margin: 0 auto;
  z-index: 99;
  display: block;
  width: 340px;
  background: #f6f7f8;
  box-shadow: 0px 25px 65px rgba(4, 111, 226, 0.5);
  border-radius: 8px;
  transition: all 0.5s linear;


&__header {
  padding: 12px;
  display: flex;
  justify-content: space-between;
  padding-bottom: 15px;
  border-bottom: 1px solid rgba(60, 60, 60, 0.09);
  &--left {
    h3 {
      font-size: 10px;
      font-family: "Poppins", sans-serif;
      color: $secundary-color;
    }
    .select-date {
      color: $main-color;
      margin-top: 10px;
      font-size: 15px;
      font-weight: 500;
      display: flex;
      align-items: center;
      .svg-date {
        margin-left: 4px;
        width: 12px;
        height: auto;
        stroke-opacity: 0;
      }
    }
  }
  &--right {
    display: flex;
    align-items: center;
    #fullscreen__svg {
      margin-right: 25px;
    }
    }
  &--svg {
  width: 15px;
  height: auto;
  fill: $secundary-color;
  transition: all 0.5s ease;
    &:hover {
    cursor: pointer;
    transform: scale(1.1);
    }
  }
  }

&__subheader {
  padding: 12px;
  display: flex;
  margin-top: 5px;

  justify-content: space-between;
  border-bottom: 1px solid rgba(14, 14, 14, 0.194);
  .today__btn {
    font-size: 13px;
    color: $main-color;
    font-weight: 500;
  }
}
}

//Pop-animation
.pop-enter,
.pop-leave-to {
  opacity: 0;
}
.pop-enter-active {
  animation: popping 0.5s;
}

@keyframes popping {
  from {
    opacity: 0;
    transform: translateX(-100px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
</style>