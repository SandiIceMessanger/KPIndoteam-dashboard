export default {
  async fetchIdentity({ commit }) {
  	try {
      await $.ajax({
        type: "GET",
        url: `/wp-json/indonews/v1/identity`,
        beforeSend: function(xhr){
          let decode = atob(localStorage.getItem('guest_'+window.location.host.split('.').[0]));
          xhr.setRequestHeader('Authorization', `Bearer ${decode}`);
        },
        success: function(response){
          commit('SET_IDENTITY', response)
        }
      });
    } catch (error) {
      throw error
    }
  },
};