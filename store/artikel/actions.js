export default {

  async fetchViewPost({ commit }, data) {
    try {
      await $.ajax({
        type: "POST",
        url: `/wp-json/indonews/v1/viewspost/${data.idPost}`,
        data: { 
          id_user: data.id_user,
          web_push_token: data.web_push_token,
          web_push_token_update_time: data.web_push_token_update_time
        },
        beforeSend: function(xhr){
          if (data.isLogin == true) {
            xhr.setRequestHeader('Authorization', localStorage.getItem('auth._token.local'));
          }else{
            xhr.setRequestHeader('Authorization', 'Bearer ' + data.token);
          }
        },
        success: function(response){
          
        }
      });
    } catch (error) {
      throw error(error.statusText);
    }
  },

};