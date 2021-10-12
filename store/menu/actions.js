export default {
  async fetchMenus({ commit }) {
  	try {
      await $.ajax({
        type: "GET",
        url: `/wp-json/indonews/v1/menus`,
        beforeSend: function(xhr){
          let decode = atob(localStorage.getItem('guest_'+window.location.host.split('.').[0]));
          xhr.setRequestHeader('Authorization', `Bearer ${decode}`);
        },
        success: function(response){
          commit('SET_MENUS', response)
        }
      });
    } catch (error) {
      throw error
    }
  },

  async fetchTopTopic({ commit }) {
    try {
      await $.ajax({
        type: "GET",
        url: `/wp-json/indonews/v1/tags-menus`,
        beforeSend: function(xhr){
          let decode = atob(localStorage.getItem('guest_'+window.location.host.split('.').[0]));
          xhr.setRequestHeader('Authorization', `Bearer ${decode}`);
        },
        success: function(response){
          commit('SET_TOP_TOPIC', response)
        }
      });
    } catch (error) {
      throw error
    }
  },
};