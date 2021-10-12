export default {
  async fetchTrendingTopik({ commit }) {
    try {
      await $.ajax({
        type: "GET",
        url: `/wp-json/indonews/v1/trending-topics`,
        beforeSend: function(xhr){
          let decode = atob(localStorage.getItem('guest_'+window.location.host.split('.').[0]));
          xhr.setRequestHeader('Authorization', `Bearer ${decode}`);
        },
        success: function(response){
          commit('SET_TRENDING_TOPIK', response)
        }
      });
    } catch (error) {
      throw error
    }
  },
};