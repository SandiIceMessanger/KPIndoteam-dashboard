<template>
    <div class="container-fluid">
        <!-- Page Heading -->
        <h1 class="h3 mb-2 text-gray-800">Tables</h1>
        <p class="mb-4">DataTables is a third party plugin that is used to generate the demo table below.
            For more information about DataTables, please visit the <a target="_blank"
                href="https://datatables.net">official DataTables documentation</a>.</p>

        <!-- DataTales Example -->
        
          <div class="card shadow mb-4">
            <div class="card-header py-3">
                <h6 class="m-0 font-weight-bold text-primary">Mudir</h6>
            </div>
            <div class="card-header">
              <div class="form-floating mb-3">
                <input class="form-control" v-model="post.nama" id="nama" name="nama" type="text" placeholder="entered your nama" />
                <label for="inputEmail">Nama</label>
              </div>
              <div class="form-floating mb-3">
                <input class="form-control" v-model="post.tempat_tanggal_lahir_tempat" id="tempat_tanggal_lahir_tempat" name="tempat_tanggal_lahir_tempat" type="text" placeholder="entered yout Tempat Tanggal Lahir Tempat" />
                <label for="inputEmail">Tempat Tanggal Lahir Tempat</label>
              </div>
              <div class="form-floating mb-3">
                <input class="form-control" v-model="post.tempat_tanggal_lahir_tempat" id="tempat_tanggal_lahir_tgl" name="tempat_tanggal_lahir_tgl" type="text" placeholder="entered yout Tempat Tanggal Lahir Tgl" />
                <label for="inputEmail">Tempat Tanggal Lahir Tgl</label>
              </div>
              <div class="form-floating mb-3">
                <input class="form-control" v-model="post.tempat_tanggal_lahir_bln" id="tempat_tanggal_lahir_bln" name="tempat_tanggal_lahir_bln" type="text" placeholder="entered yout Tempat Tanggal Lahir Bln" />
                <label for="inputEmail">Tempat Tanggal Lahir Bln</label>
              </div>
              <div class="form-floating mb-3">
                <input class="form-control" v-model="post.tempat_tanggal_lahir_tahun" id="tempat_tanggal_lahir_tahun" name="tempat_tanggal_lahir_tahun" type="text" placeholder="entered yout Tempat Tanggal Lahir Tahun" />
                <label for="inputEmail">Tempat Tanggal Lahir Tahun</label>
              </div>
              <div class="form-floating mb-3">
                <input class="form-control" v-model="post.keluar" id="keluar" name="keluar" type="text" placeholder="entered yout keluar" />
                <label for="keluar">Keluar</label>
              </div>
            </div>
            <div class="card-body">
              <div class="mt-4 mb-0">
                  <div class="d-grid"><button class="btn btn-primary btn-block" @click="store">Simpan</button></div>
              </div>
            </div>
        </div>
        
    </div>
</template>



<script>
  export default {

    data() {
      return {
        //state post
        post: {
          nama: '',
          tempat_tanggal_lahir_tempat: '',
          tempat_tanggal_lahir_tgl: '',
          tempat_tanggal_lahir_bln: '',
          tempat_tanggal_lahir_tahun: '',
          keluar: ''
         
        },
        //state validation
        validation: []
      }
    },

    methods: {
      
      //method "store"
      async store(e) {
        e.preventDefault()

        //send data ke Rest API
        await this.$axios.post('http://nameless-fjord-04255.herokuapp.com/api/v1/mudirs', {

            //data yang dikirim ke server
            nama:   this.post.nama,
            tempat_tanggal_lahir_tempat: this.post.tempat_tanggal_lahir_tempat,
            tempat_tanggal_lahir_tgl: this.post.tempat_tanggal_lahir_tgl,
            tempat_tanggal_lahir_bln: this.post.tempat_tanggal_lahir_bln,
            tempat_tanggal_lahir_tahun: this.post.tempat_tanggal_lahir_tahun,
            keluar: this.post.keluar
            
          })
          .then(() => {
            
            //redirect ke route "post"
            this.$router.push({
              name: 'mudir'
            })

          })
          .catch(error => {
            //assign validation  
            this.validation = error.response.data
            console.log(error)
          })
      }
    }

  }
</script>
