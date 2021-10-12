export default {
  async fetchCountExpression({ commit }, id) {
    try {
      await $.ajax({
        type: "GET",
        url: `/wp-json/indonews/v1/get-survey-post/${id}`,
        beforeSend: function(xhr){
          let decode = atob(localStorage.getItem('guest_'+window.location.host.split('.').[0]));
          xhr.setRequestHeader('Authorization', `Bearer ${decode}`);
        },
        success: function(response){
          commit('SET_COUNT_EXPRESSIONS', response)
        }
      });
    } catch (error) {
      throw error(error.statusText);
    }
  },
  async fetchExpression({ commit }, payload) {
    let token = localStorage.getItem('auth._token.local')
    try {
      await $.ajax({
        type: "POST",
        url: `/wp-json/indonews/v1/survey-post/${payload.post}`,
        data: {
          response_status: payload.response_status,
          id_user: payload.id_user,
          web_push_token: payload.web_push_token,
          web_push_token_update_time: payload.web_push_token_update_time
        },
        beforeSend: function(xhr){
          xhr.setRequestHeader('Authorization', `${token}`);
        },
        success: function(response){
          
        }
      });
    } catch (error) {
      throw error(error.statusText);
    }
  },
};