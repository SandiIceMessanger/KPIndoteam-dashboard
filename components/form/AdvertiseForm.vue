<template>
  <form>
    <div class="row">
      <b-col lg="12">
        <b-form-group label="Perihal:">
          <b-form-input type="text" required ></b-form-input>
        </b-form-group>
      </b-col>
      <b-col lg="6">
        <b-form-group label="Nama:">
          <b-form-input type="text" required ></b-form-input>
        </b-form-group>
      </b-col>
      <b-col lg="6">
        <b-form-group label="Alamat:">
          <b-form-input type="text" required ></b-form-input>
        </b-form-group>
      </b-col>
      <b-col lg="6">
        <b-form-group label="Perusahaan:">
          <b-form-input type="text" required ></b-form-input>
        </b-form-group>
      </b-col>
      <b-col lg="6">
        <b-form-group label="Telepon:">
          <b-form-input type="text" required ></b-form-input>
        </b-form-group>
      </b-col>
      <b-col lg="6">
        <b-form-group label="Email:">
          <b-form-input type="text" required ></b-form-input>
        </b-form-group>
      </b-col>
      <b-col lg="6">
        <b-form-group label="Website:">
          <b-form-input type="text" required ></b-form-input>
        </b-form-group>
      </b-col>
      <b-col lg="6">
        <b-form-group label="Berapa budet iklan Anda perbulan:" class="njnjn">
          <div class="select-budget">
            <b-form-select
              v-model="selected"
              :options="options"
              class="mb-3"
              value-field="item"
              text-field="name"
            ></b-form-select>
            <b-icon-chevron-down></b-icon-chevron-down>
          </div>
        </b-form-group>
      </b-col>
      <b-col lg="6">
        <b-form-group label="Goals Anda beriklan:">
          <b-form-input type="text" required ></b-form-input>
        </b-form-group>
      </b-col>
      <b-col lg="12">
        <b-form-group label="Isi Surat:">
          <b-form-textarea rows="7" ></b-form-textarea>
        </b-form-group>
      </b-col>
    </div>
    <b-button type="submit" class="primary-button w-25">Submit</b-button>
  </form>
</template>

<script>
  export default {
    data () {
      return {
        selected: 'A',
        options: [
          { item: 'A', name: 'Rp 5.000.000 - Rp 10.000.000' },
          { item: 'B', name: 'Rp 10.000.000 - Rp 15.000.000' },
          { item: 'C', name: 'Rp 15.000.000 - Rp 20.000.000' },
          { item: 'D', name: 'Rp 20.000.000 - Rp 25.000.000' },
          { item: 'E', name: 'Rp 25.000.000 - Rp 30.000.000' },
        ]
      }
    },
    computed: {
      
    },
    mounted() {
      
    },
    methods: {
      
    },
  }
</script>