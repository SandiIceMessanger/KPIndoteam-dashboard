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
                <h6 class="m-0 font-weight-bold text-primary">Category</h6>
            </div>
            <div class="card-header">
              <div class="form-floating mb-3">
                <input class="form-control" v-model="category.name" id="name" name="name" type="text" placeholder="entered your name" />
                <label for="inputEmail">Name</label>
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
        category: {
          name: ''
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
        await this.$axios.post('http://localhost:9595/api/v1/category/add', {
            name: this.category.name
          }, 
          {
            headers: {
              'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxZmI1NWZhZDRlNzExMTBiNjkzZTAyYiIsIm5hbWUiOiJ1bWFyIEtoYXRiYmFiIiwiZXhwIjoxNjQ0MzA4MjgwfQ.QlHg4Q3QFmLWwVvwRC_D83MY7sUOCsrbOJsS4C7qT48`,
            }
          })
         

          .then(() => {
            
            //redirect ke route "post"
            this.$router.push({
              name: 'category'
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
