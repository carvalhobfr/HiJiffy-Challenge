<template>
  <div class="main__calendar__container" >
    <div v-for="day in $store.state.datedEvents" :key="day.day">
      <div class="today__separator" v-if="day.today === true"></div>
      <div class="calendar__day" v-if="!day.today">{{ day.day }}</div>
      <SvgTodayMarker ref="day-ref" class="today__marker" v-if="day.today" />
      <div
        v-for="event in day.events"
        :key="event.id"
        class="event__container"
      >
        <div class="event">
          <p class="event-name" :event="event.name">
            {{ event.name }}
          </p>
          <p class="event-schedule">{{ getSchedule(event) }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SvgTodayMarker from "../../assets/svgs/SvgTodayMarker";
import moment from "moment";
import { mapGetters } from "vuex";
export default {
  name: "TheCalendar",
  components: {
    SvgTodayMarker,
  },
  methods: {
    getSchedule(event) {
      let startTime = moment(event.start_time).format("hh:mm A");
      let endTime = moment(event.end_time).format("hh:mm A");
      return `${startTime} - ${endTime}`;
    },
  },
  computed: {
    ...mapGetters(["darkModeOn"]),
  },
  async created() {
    await this.$store.dispatch("setDatedEvents");
  },
};
</script>

<style lang="scss" scoped>
.main__calendar__container {
  padding: 12px;
  max-height: 60vh;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 4px;
    height: 12px;
  }
  &::-webkit-scrollbar-thumb {
    background: $main-color;
    border-radius: 10px;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: $secundary-color;
  }
  &::-webkit-scrollbar-track {
    background: #ffffff;
    border-radius: 10px;
    box-shadow: inset 7px 10px 12px #f0f0f0;
  }
}

.calendar__day {
  color: #61656add;
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 10px;
}
.event__container {
  padding: 9px;
  background-color: $main-color;
  color: $light-background;
  font-size: 14px;
  font-weight: 500;
  border-radius: 5px;
  line-height: 1.4;
  margin-bottom: 8px;
  .event-schedule {
    margin-top: 4px;
    font-size: 12px;
  }
}
.today__separator {
  color: red;
}
</style>