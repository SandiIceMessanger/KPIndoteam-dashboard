export default {

  async fetchSubscribe({ commit }, token) {
    try {
      await $.ajax({
        type: "POST",
        url: `/wp-json/indonews/v1/subcribetopic`,
        data: { request_token: token.request_token},
        beforeSend: function(xhr){
          xhr.setRequestHeader('Authorization', `Bearer ${token.token}`);
        },
        success: function(response){
          // var res = response.news[token.request_token];
          // if(res == 'OK'){
          //   commit('SET_TOKEN_SUBSCRIBE', token.request_token)
          // }
        }
      });
    } catch (error) {
      throw error
    }
  },

};