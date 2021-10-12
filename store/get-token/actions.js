export default {
  async fetchGuestToken({ commit }, payload) {
    try {
      await $.ajax({
        type: "POST",
        url: "/wp-json/jwt-auth/v1/token",
        data: payload,
        success: function(msg){
          let encode = btoa(msg.token);
          localStorage.setItem('guest_'+window.location.host.split('.').[0], `${encode}`);
          window.location.reload(true);
        }
      });
    } catch (error) {
      throw error
    }
  },
};