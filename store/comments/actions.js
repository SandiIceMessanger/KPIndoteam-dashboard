export default {
  async fetchSubmitComment({ commit, store }, payload) {
    let token = localStorage.getItem('auth._token.local')
    let timeStamp = Date.now()
    try {
      await $.ajax({
        type: "POST",
        url: `/wp-json/indonews/v1/comments?post=${payload.slug}&code=${timeStamp}`,
        dataType: 'json',
        contentType: "application/json",
        data: JSON.stringify({ 
          content: payload.content,
          post: payload.post,
          id_user: payload.id_user,
          _csrf: payload._csrf,
          web_push_token: payload.web_push_token,
          web_push_token_update_time: payload.web_push_token_update_time 
        }),
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

  async fetchGetComment({ commit }, payload) {
    try {
      await $.ajax({
        type: "GET",
        url: `/wp-json/wp/v2/comments?post=${payload.idPost}&code=${Math.random().toString(36).substring(7)}`,
        beforeSend: function(xhr){
          xhr.setRequestHeader('Authorization', `Bearer ${payload.tokenGlobal}`);
        },
        success: function(response){
          commit('SET_LIST_COMMENTS', response)
        }
      });
    } catch (error) {
      throw error(error.statusText);
    }
  },

  async fetchCheckAgreement({ commit }, payload) {
    let token = localStorage.getItem('auth._token.local')
    try {
      await $.ajax({
        type: "GET",
        url: `/wp-json/indonews/v1/comment-user-agree/${payload.id_user}?code=${payload.code}`,
        beforeSend: function(xhr){
          xhr.setRequestHeader('Authorization', `${token}`);
        },
        success: function(response){
          localStorage.setItem('statusAgreement', response.status)
          commit('SET_CHECK_AGREE', response.status)
        }
      });
    } catch (error) {
      throw error(error.statusText);
    }
  },

  async fetchSubmitAgreement({ commit }, payload) {
    let token = localStorage.getItem('auth._token.local')
    try {
      await $.ajax({
        type: "POST",
        url: `/wp-json/indonews/v1/comment-user-agree/${payload.id_user}`,
        beforeSend: function(xhr){
          xhr.setRequestHeader('Authorization', `${token}`);
        },
        success: function(response){
          commit('SET_CHECK_AGREE', response.status)
        }
      });
    } catch (error) {
      throw error(error.statusText);
    }
  },

};