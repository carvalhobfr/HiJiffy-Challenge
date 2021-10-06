<template>
  <table :class="darkModeOn ? '' : 'dark__table'">
    <thead>
      <tr>
        <th class="column column__check">
          <CheckIcon
            :selected="areAllClientsSelected"
            @click="$store.dispatch('highlightAllClients', getAllClients)"
          />
        </th>
        <th class="column column__name">Name</th>
        <th class="column column__email">Email</th>
        <th class="column column__company">Company name</th>
        <th class="column column__role">Role</th>
        <th class="column column__recent">Recent Activity</th>
      </tr>
    </thead>

    <tbody v-if="$store.state.clients.length === 0">
      <tr class="no_data">
        <p>No clients found</p>
      </tr>
    </tbody>

    <tbody v-else>
      <tr v-for="(client, index) in $store.state.clients" :key="client.id">
        <td class="column column__check">
          <CheckIcon
            :selected="isClientSelected(client)"
            @click="$store.dispatch('highlightClients', client)"
          />
        </td>
        <td
          @click="$store.dispatch('openCalendar', client.id)"
          class="column column__name"
        >
          <div class="circle">
            <svg class="circle__svg">
              <circle
                class="circle_bg"
                cx="11"
                cy="11"
                r="11"
                :fill="colors(index)"
              />
              <text
                class="circle__letter"
                :class="index%2 ? 'dark__character' : ''"
                x="50%"
                y="50%"
                dominant-baseline="middle"
                text-anchor="middle"
              >
                {{ client.name[0].toUpperCase() }}
              </text>
            </svg>
          </div>
          <div class="name__container">
            {{ client.name }}
          </div>
        </td>
        <td
          @click="$store.dispatch('openCalendar', client.id)"
          class="column column__email"
        >
          {{ client.email }}
        </td>
        <td
          @click="$store.dispatch('openCalendar', client.id)"
          class="column column__company"
        >
          {{ client.company }}
        </td>
        <td
          @click="$store.dispatch('openCalendar', client.id)"
          class="column column__role"
        >
          {{ client.role }}
        </td>
        <td
          @click="$store.dispatch('openCalendar', client.id)"
          class="column column__recent"
        >
          {{ recentDate(client) }}
        </td>
      </tr>
    </tbody>
  </table>
</template>


<script>
import CheckIcon from "./../../assets/svgs/CheckIcon.vue";
import moment from "moment";
import { mapGetters } from "vuex";
export default {
  name: "Table",
  components: {
    CheckIcon,
  },
  methods: {
    recentDate(client) {
      let date = moment(client.recent_activity).format("MMM, YYYY");
      return date;
    },
    colors(index) {
      const colors = [
        "#A2A2A2",
        "#A607F0",
        "#FECA11",
        "#F5FA14",
        "#10CE51",
        "#F40000",
        "#2878B7",
        "#C2CFE0",
        ...colors,
        ...colors,
      ];
      return colors[index];
    },
  },
  computed: {
    ...mapGetters([
      "isClientSelected",
      "areAllClientsSelected",
      "getAllClients",
      "darkModeOn",
    ]),
    selectedClient(client) {
      return this.isClientSelected(client);
    },
  },

  async created() {
    await this.$store.dispatch("fetchClients");
  },
  
};

</script>

<style lang="scss" scoped>
table {
  border-collapse: collapse;
  border: 0px solid white;
  table-layout: fixed;
  width: 90%;
  background-color: white;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 35px;
  tbody {
    tr {
      border-top: 2px solid rgba(211, 211, 211, 0.312);
      height: 48px;
    }
    td {
      font-weight: 400;
      color: $secundary-color;
    }
  }
  .no_data {
    position: absolute;
    font-family: "Poppins", sans-serif;
    color: $secundary-color;
    margin-left: 32px;
    padding-top: 15px;
  }

  .column {
    border-radius: none;
    cursor: pointer;
    text-align: left;
    border-radius: 4px;
    font-size: 13px;
    vertical-align: middle;
    font-family: "Poppins", sans-serif;
    &__check {
      width: 60px;
    }
    &__name {
      width: 25%;
      right: 0;
      .name__container {
        margin-left: 30px;
        font-weight: 500;
        font-size: 15px;
        color: #323c47;
      }
      .circle {
        width: 20px;
        position: relative;
        &__letter {
          font-weight: bold;
          z-index: 90;
          fill: white;
        }
        &__svg {
          position: absolute;
          height: 22px;
          width: 22px;
          top: -3px;
        }
      }
    }
    &__email {
      width: 30%;
    }
    &__company {
      width: 15%;
    }
    &__role {
      width: 12%;
    }
    &__recent {
      width: 12%;
    }
  }

  thead {
    th {
      text-align: left;
      border-bottom: 1px solid lightgrey;
      border-radius: 4px;
      height: 48px;
      vertical-align: middle;
      font-family: "Poppins", sans-serif;
      font-weight: 500;
      opacity: 0.5;
      color: #334d6e;
    }
  }
}
.dark{
  &__table {
  background-color: $dark-color;
    th {
      opacity: 0.8;
    }
    th,
    td,
    span,
    div {
      color: $dark-font-gray !important ;
    }
  }
  &__character {
    fill: black !important ;
  }
}
</style>