import Vue from 'vue'

Vue.mixin({

  data () {
    return {
      noImage: require(`~/assets/img/no_image.jpg`)
    }
  },
  async mounted() {
    
  },

  computed: {
    tokens() { 
      return localStorage.getItem("guest") 
    },
  },

  methods: {
    onImageError: function(e) {
      e.target.src = require('~/assets/img/no_image.jpg');
    },
    isEmpty(obj) {
      for(var key in obj) {
          if(obj.hasOwnProperty(key))
              return false;
      }
      return true;
    },
    openModalLogin(){
      this.$modal.show('loginForm')
    },
    stripHtml(html){
      var tmp = document.createElement("DIV");
      tmp.innerHTML = html;
      return tmp.textContent || tmp.innerText || "";
    },
    convertCharacters(html){
      return html.replace(/&amp;/g, "").replace(/&#8216;/g, "").replace(/&#8217;/g, "").replace(/'/g, "").replace(/"/g, "");
    },
    formatDate(date) {
      let arrbulan = ["Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"];
      let arrhari = ["Minggu","Senin","Selasa","Rabu","Kamis","Jumat","Sabtu"];
      let dates = new Date(date);
      let hari = dates.getDay();
      let tanggal = dates.getDate();
      let bulan = dates.getMonth();
      let tahun = dates.getFullYear();
      let datetimes = arrhari[hari]+", "+tanggal+" "+arrbulan[bulan]+" "+tahun;
      return datetimes;
    },
    formatDateList(date) {
      let arrbulan = ["Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"];
      let dates = new Date(date);
      let tanggal = dates.getDate();
      let bulan = dates.getMonth();
      let tahun = dates.getFullYear();
      let datetimes = tanggal+" "+arrbulan[bulan]+" "+tahun;
      return datetimes;
    },
    async copyLink (value) {
      var tempInput = document.createElement("input");
      tempInput.value = value;
      document.body.appendChild(tempInput);
      tempInput.select();
      document.execCommand("copy");
      document.body.removeChild(tempInput);
      this.$modal.show('linkCopied')
      await new Promise(resolve => setTimeout(resolve, 2000)); // 2 sec
      this.$modal.hide('linkCopied')
    },
    isNumber: function(evt) {
      evt = (evt) ? evt : window.event;
      var charCode = (evt.which) ? evt.which : evt.keyCode;
      if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
        evt.preventDefault();
      } else {
        return true;
      }
    },
    validEmail:function(email) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    },
    formatPrice(value) {
      let val = (value/1).toFixed(0).replace('.', ',')
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    },
    onShowNotifComment() {
      this.$bvToast.toast('Komentar Anda akan segera kami publish', {
        title: `Success`,
        variant: 'success',
        solid: true
      })
    },
    onShowNotifExpression() {
      this.$bvToast.toast('Terimakasih, survei Anda di artikel ini telah kami terima', {
        title: `Success`,
        variant: 'success',
        solid: true
      })
    },

    getData(url) {
      return new Promise(
        (resolve, reject) => {
          this.$axios.$get(url, {
            headers: {
              'Authorization': 'Bearer ' + this.tokens
            }
          }).then( (response) => {
            if (response !== undefined) {
              resolve(response)
            }
            reject(response.message)
          }, (error) => {
            reject(error.response.data.message);
          })
          .catch(function (error) {
            reject(error)
          })
        }
      )
    },

    postData(url,data) {
      return new Promise(
        (resolve, reject) => {
          this.$axios.$post(url,data).then( (response) => {
            if (response !== '') {
              resolve(response)
            }
            reject(response)
          }, (error) => {
            // console.log(error)
            reject(error)
          })
          .catch(function (error) {
            reject(error)
          })
        }
      )
    },

    postDataTest(url,data) {
      return new Promise(
        (resolve, reject) => {
          this.$axios.$post(url,data, {
            headers: {
              'Authorization': 'Bearer ' + this.tokens
            }
          }).then( (response) => {
            if (response !== '') {
              resolve(response)
            }
            reject(response)
          }, (error) => {
            console.log(error)
            reject(error)
          })
          .catch(function (error) {
            reject(error)
          })
        }
      )
    },

    postDataAuth(url,data) {
      return new Promise(
        (resolve, reject) => {
          this.$axios.$post(url,data, {
            headers: {
              'Authorization': 'Bearer ' + this.tokens
            }
          }).then( (response) => {
            if (response !== '') {
              resolve(response)
            }
            reject(response)
          }, (error) => {
            console.log(error)
            reject(error)
          })
          .catch(function (error) {
            reject(error)
          })
        }
      )
    },
    deleteDataAuth(url) {
      return new Promise(
        (resolve, reject) => {
          this.$axios.$delete(url, {
            headers: {
              'Authorization': 'Bearer ' + this.tokens
            }
          }).then( (response) => {
            if (response !== '') {
              resolve(response)
            }
            reject(response)
          }, (error) => {
            console.log(error)
            reject(error)
          })
          .catch(function (error) {
            reject(error)
          })
        }
      )
    },
    postMultipartData(url,data) {
      return new Promise(
        (resolve, reject) => {
          this.$axios.$post(url,data,{
            headers: {
              'content-type': 'multipart/form-data',
              'Authorization': 'Bearer ' + this.tokens
            }
          }).then( (response) => {
            if (response.status !== '') {
              resolve(response.data)
            }
            reject(response.message)
          }, (error) => {
            console.log(error.message)
            reject(error)
          })
          .catch(function (error) {
            reject(error)
          })
        }
      )
    },
    putData(url,data) {
      return new Promise(
        (resolve, reject) => {
          this.$axios.$put(url,data, {
            headers: {
              'Authorization': 'Bearer ' + this.tokens
            }
          }).then( (response) => {
            if (response !== undefined) {
              resolve(response)
            }
            reject(response.message)
          }, (error) => {
            console.log(error)
            reject(error)
          })
          .catch(function (error) {
            reject(error)
          })
        }
      )
    },
  }
})
