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
                <h6 class="m-0 font-weight-bold text-primary">Semester</h6>
            </div>
            <div class="card-header">
              <div class="form-floating mb-3">
                <input class="form-control" v-model="post.semester" id="semester" name="semester" type="text" placeholder="entered your semester" />
                <label for="inputEmail">Semester</label>
              </div>
              <div class="form-floating mb-3">
                <input class="form-control" v-model="post.tahun_ajaran" id="tahun_ajaran" name="tahun_ajaran" type="text" placeholder="entered yout tahun ajaran" />
                <label for="inputEmail">Tahun Ajaran</label>
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
          semester: '',
          tahun_ajaran: ''
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
        await this.$axios.post('http://nameless-fjord-04255.herokuapp.com/api/v1/semesters', {

            //data yang dikirim ke server
            semester:   parseInt(this.post.semester),
            tahun_ajaran: this.post.tahun_ajaran
            
          })
          .then(() => {
            
            //redirect ke route "post"
            this.$router.push({
              name: 'semester'
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
