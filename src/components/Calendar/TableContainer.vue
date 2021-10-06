<template>
  <section class="table-container">
    <TableHeader />
    <Table />
    <Pagination class="pagination-component" />
    <transition name="fade" appear>
      <div
        class="modal-overlay"
        v-if="$store.state.showCalendarModal"
        @click="$store.state.showCalendarModal = false"
      ></div>
    </transition>
    <CalendarContainer v-if="$store.state.showCalendarModal" />
  </section>

</template>

<script>
import { mapGetters } from "vuex";
import Table from "./Table";
import TableHeader from "./TableHeader";
import CalendarContainer from "./CalendarContainer";
import Pagination from "./Pagination";
export default {
  name: "TheCalendar",
  components: {
    Table,
    TableHeader,
    CalendarContainer,
    Pagination,
  },
  computed: {
    ...mapGetters(["isDisabled"]),
  },
};
</script>

<style lang="scss" scoped>
.table-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  .modal-overlay {
    position: absolute;
    background: rgba(35, 90, 148, 0.32);
    top:0;
    width: 100%;
    height: calc(100% + 60px);
    z-index: 90;
    transition: all 0.5s linear;
  }

  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }

  .fade-enter-active {
    animation: appear 0.5s;
  }
  @keyframes appear {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
    th,
    td,
    span,
    div {
      color: $dark-font-gray  ;
    }
}


</style>