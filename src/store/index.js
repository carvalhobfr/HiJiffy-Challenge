import axios from 'axios'
import { createStore } from 'vuex'
import moment from 'moment'
export default createStore({
  state: {
    clients: [],
    showCalendarModal: false,
    datedEvents: [],
    searchTerm: '',
    selectedClients: [],
    clientLimit: 5,
    currentPage: 1,
    selectedCompany: 'All',
    darkMode: true,
  },
  // MUTATIONS
  mutations: {
    SET_CLIENTS(state, clients) {
      state.clients = clients
    },
    SET_DATED_MEETINGS(state, datedEvents) {
      state.datedEvents = datedEvents
    },
    SET_SEARCH_TERM(state, searchTerm) {
      state.searchTerm = searchTerm
    },
    SET_HIGHLIGHTED_CLIENTS(state, clients) {
      state.selectedClients = clients
    },
    SET_CLIENT_LIMIT(state, clientLimit) {
      state.clientLimit = clientLimit
    },
    SET_CURRENT_PAGE(state, direction) {
      (direction ? state.currentPage++ : state.currentPage--) 
    },
    SET_SELECTED_COMPANY(state, company) {
      state.selectedCompany = company
    },
    SET_CLIENTS_BY_COMPANY(state, clients){
      state.clients = clients
    },
    RESET_ALL_FILTERS(state) {
      state.searchTerm = ''
      state.selectedCompany = 'All'
    },
    SHOW_MODAL(state) {
      state.showCalendarModal = !state.showCalendarModal
    },
    SET_DARK_MODE(state) {
      state.darkMode = !state.darkMode
    }
  },
  // ACTIONS
  actions: {
    fetchClients({commit}, searchTerm = '') {
      // Goal: Build the querystring
      let filterCompany;
      if (this.state.selectedCompany === 'All') {
        filterCompany = ''
      } else {
        filterCompany = this.state.selectedCompany
      }
      const paginationLimit = this.state.clientLimit
      const paginationStart = this.state.currentPage === 1 ? 0 : (this.state.currentPage - 1) * paginationLimit
      const queryString = `http://localhost:3000/clients?name_contains=${searchTerm}&_limit=${paginationLimit}&_start=${paginationStart}`
      commit('SET_SEARCH_TERM', searchTerm)
      axios.get(queryString)
      .then((response) => {
        commit('SET_CLIENTS', response.data)
      })
      .catch((err) => console.log(err))
    },
    resetFilters({commit}) {
      commit('RESET_ALL_FILTERS')
    },
    paginateTo({commit , dispatch}, direction) {
      const checkIfLastPage = this.state.clients.length >= this.state.clientLimit
      if(direction === 'prev' && this.state.currentPage !== 1 ) { 
        commit('SET_CURRENT_PAGE', false)
        dispatch('fetchClients')
      }else if (direction === 'next' && checkIfLastPage) {
        commit('SET_CURRENT_PAGE', true)
        dispatch('fetchClients')
      }
    },
    fetchClientsByCompany({commit}, newCompany) {
      let filterCompany;
      if (newCompany === 'All') {
        filterCompany = ''
      } else {
        filterCompany = newCompany
      }
      axios.get(`http://localhost:3000/clients?_where[company_contains]=${filterCompany}`)
      .then((response) => {
        console.log("response", response)
        commit('SET_SELECTED_COMPANY', newCompany)
        commit('SET_CLIENTS_BY_COMPANY', response.data)
      }).catch((err)=> console.log(err))
    },

    openCalendar({commit}) {
      commit('SHOW_MODAL')
    },
    async setDatedEvents({commit}) {
      const eventsResponse = await axios.get(`http://localhost:3000/events?_sort=end_time`)
      .then((response) => {
        return response.data
      }).catch((err)=> console.log(err))

      let datedEvents = [];
      datedEvents.push({
        datetime: moment(Date.now()).format(),
        day: moment(Date.now()).format('ddd, Do MMM'),
        events: [],
        today: true,
      });
      eventsResponse.forEach((event) => {
        let lastDate =   moment(datedEvents.slice(-1)[0].events.slice(-1)[0]?.end_time).format('ddd, Do MMM, YY')
        let currentDate = moment(event.end_time).format('ddd, Do MMM, YY')
        if (currentDate !== lastDate) {
          datedEvents.push({
            datetime: moment(event.end_time).format(),    
            day: moment(event.end_time).format('ddd, Do MMM'),
            events: [event],
            today: false,
          });
        } else if (currentDate === lastDate) {
          let sameDay = datedEvents.find(( ele ) => {
            return ele.day === moment(event.end_time).format('ddd, Do MMM');
          });
          sameDay.events.push(event)
        }
      });
      //Sort the array by date with the TodayObj inside. 
      const sortedDays = datedEvents.sort((a,b) => {
        return  new Date(a.datetime) - new Date(b.datetime)
      })
      commit('SET_DATED_MEETINGS', sortedDays )
    },
paginateTo({commit , dispatch}, direction) {
      const checkIfLastPage = this.state.clients.length >= this.state.clientLimit
      if(direction === 'prev' && this.state.currentPage !== 1 ) { 
        commit('SET_CURRENT_PAGE', false)
        dispatch('fetchClients')
      }else if (direction === 'next' && checkIfLastPage) {
        commit('SET_CURRENT_PAGE', true)
        dispatch('fetchClients')
      }
    },
    fetchClientsByCompany({commit, dispatch}, newCompany) {
      let filterCompany;
      if (newCompany === 'All') {
        filterCompany = ''
      } else {
        filterCompany = newCompany
      }
      commit('SET_SELECTED_COMPANY', newCompany)
      dispatch('fetchClients')
    },
    openCalendar({commit}) {
      commit('SHOW_MODAL')
    },
    highlightClients({commit}, clickedClient) {
      let newSelected = [...this.state.selectedClients]
      if (this.state.selectedClients.includes(clickedClient)) {
        newSelected.splice(newSelected.indexOf(clickedClient), 1)
      } else {
        newSelected.push(clickedClient)
      }
      commit('SET_HIGHLIGHTED_CLIENTS', newSelected)
    },
    highlightAllClients({commit}, clients) {
      let newSelectedClients = [...this.state.selectedClients]
      if(newSelectedClients.length > 0) {
        newSelectedClients = []
      } else  {
        newSelectedClients = [...this.state.clients]
      }
      commit('SET_HIGHLIGHTED_CLIENTS', newSelectedClients )
    },
    selectAllClients({commit}, clients) {
      let newSelectedClients = [...this.state.selectedClients]
      if(newSelectedClients.length > 0) {
        newSelectedClients = []
      } else  {
        newSelectedClients = [...this.state.clients]
      }
      commit('SET_SELECTED_CLIENTS', newSelectedClients )
    },
    selectLimit({commit, dispatch}, newLimit) {
      commit('SET_CLIENT_LIMIT', newLimit)
      commit('RESET_ALL_FILTERS')
      dispatch('fetchClients')
    },
    toggleDarkMode({commit}) {
      commit('SET_DARK_MODE')
    }
  },
  // GETTERS
  getters: {
    getAllClients: (state) => {
      return state.clients
    },
    areAllClientsSelected: (state) => {
      return ( state.selectedClients.length === state.clients.length  && state.clients.length > 0);
    },
    isClientSelected: (state) => (client) => {
      return state.selectedClients.includes(client)
    },
	  isPaginationDisabled: (state) => (direction) => {
      // checks if it's the last page, in order to Disable the pagination button
      const checkIfLastPage = state.clients.length >= state.clientLimit ? true : false
      if(direction === 'prev' && state.currentPage !== 1 ) {
        return true
      }
      if (direction === 'next' && checkIfLastPage) {
        return  true
      }
      return false;
    },
	    getCompanies: (state) => {
      let uniqueCompanies = []
      if (state.clients.length > 0) {
        let getCompanies = state.clients.map((el)=> {
          return el.company
        })
        uniqueCompanies = [...new Set(getCompanies)];
      }
      return ['All', ...uniqueCompanies]
    },
    getLimit: (state)=> {
      return state.clientLimit
    },
    darkModeOn: (state) => {
      return state.darkMode
    }
  },
  modules: {
  }
})
