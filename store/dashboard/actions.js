export default {
  async fetchActivity({ commit }, idUser) {
    try {
      await $.ajax({
        type: "GET",
        url: `/wp-json/indonews/v1/activity-user/${idUser}`,
        beforeSend: function(xhr){
          xhr.setRequestHeader('Authorization', localStorage.getItem('auth._token.local'));
        },
        success: function(response){
          commit('SET_LIST_ACTIVITY', response)
        }
      });
    } catch (error) {
      throw error
    }
  },
};