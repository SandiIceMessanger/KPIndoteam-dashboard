export default {
  async fetchTags({ commit }) {
    try {
      await $.ajax({
        type: "GET",
        url: `/wp-json/wp/v2/tags`,
        beforeSend: function(xhr){
          let decode = atob(localStorage.getItem('guest_'+window.location.host.split('.').[0]));
          xhr.setRequestHeader('Authorization', `Bearer ${decode}`);
        },
        success: function(response){
          commit('SET_TAGS', response)
        }
      });
    } catch (error) {
      throw error
    }
  },
  async fetchDetailTag({ commit }, slug) {
    try {
      await $.ajax({
        type: "GET",
        url: `/wp-json/wp/v2/tags/${slug}`,
        beforeSend: function(xhr){
          let decode = atob(localStorage.getItem('guest_'+window.location.host.split('.').[0]));
          xhr.setRequestHeader('Authorization', `Bearer ${decode}`);
        },
        success: function(response){
          commit('SET_DETAIL_TAG', response[0])
        }
      });
    } catch (error) {
      throw error
    }
  },
  async fetchListTag({ commit }, id) {
    try {
      await $.ajax({
        type: "GET",
        url: `/wp-json/wp/v2/tags?include=${id}`,
        beforeSend: function(xhr){
          let decode = atob(localStorage.getItem('guest_'+window.location.host.split('.').[0]));
          xhr.setRequestHeader('Authorization', `Bearer ${decode}`);
        },
        success: function(response){
          commit('SET_LIST_TAG', response)
        }
      });
    } catch (error) {
      throw error
    }
  },
  async fetchFilterTags({ commit }, params) {
    try {
      await $.ajax({
        type: "GET",
        url: `/wp-json/indonews/v1/posts-tag-slug/${params.slug}/${params.page}`,
        beforeSend: function(xhr){
          let decode = atob(localStorage.getItem('guest_'+window.location.host.split('.').[0]));
          xhr.setRequestHeader('Authorization', `Bearer ${decode}`);
        },
        success: function(response){
          commit('SET_FILTER_TAGS', response[0])
        }
      });
    } catch (error) {
      throw error
    }
  },
};