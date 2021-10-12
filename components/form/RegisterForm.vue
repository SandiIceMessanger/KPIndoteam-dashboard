<template>
  <b-modal id="form-register" hide-header hide-footer>
    <!-- <b-form @submit="onSubmit"> -->
    <form>
      <b-form-group>
        <b-form-input
          v-model="form.username"
          type="text"
          placeholder="Username"
          required
        ></b-form-input>
      </b-form-group>
      <b-form-group>
        <b-form-input
          v-model="form.email"
          type="email"
          placeholder="Email"
          required
        ></b-form-input>
      </b-form-group>
      <b-form-group class="form-password">
        <b-form-input
          v-model="form.password"
          placeholder="Password"
          :type="passwordVisible ? 'text' : 'password'"
          required
        ></b-form-input>
        <div @click='togglePasswordVisibility' :arial-label='passwordVisible ? "Hide password" : "Show password"'>
          <span v-if="passwordVisible"><b-icon-eye></b-icon-eye></span>
          <span v-else><b-icon-eye-slash></b-icon-eye-slash></span>
        </div>
      </b-form-group>
      <b-form-group class="form-password">
        <b-form-input
          v-model="form.confirmPassword"
          placeholder="Confirm Password"
          :type="confirmPasswordVisible ? 'text' : 'password'"
          required
        ></b-form-input>
        <div @click='toggleConfirmPasswordVisibility' :arial-label='confirmPasswordVisible ? "Hide password" : "Show password"'>
          <span v-if="confirmPasswordVisible"><b-icon-eye></b-icon-eye></span>
          <span v-else><b-icon-eye-slash></b-icon-eye-slash></span>
        </div>
      </b-form-group>
      <b-form-group>
        <b-form-input
          v-model="form.name"
          type="text"
          placeholder="Nama Lengkap"
          required
        ></b-form-input>
      </b-form-group>
      <b-form-group>
        <b-form-datepicker v-model="form.born" :min="min" :max="max" locale="ID" placeholder="Tgl Lahir"></b-form-datepicker>
        <div class="iconCalendar">
          <b-icon-calendar></b-icon-calendar>
        </div>
      </b-form-group>
      <b-form-group>
        <b-form-input
          v-model="form.phone"
          type="text"
          placeholder="Telpon/HP"
          required
        ></b-form-input>
      </b-form-group>
      <b-form-group>
        <b-form-input
          v-model="form.gender"
          type="text"
          placeholder="Jenis Kelamin"
          required
        ></b-form-input>
      </b-form-group>
      <div @click="onSubmit" class="btn btn-block primary-button mt-4">REGISTER</div>
      <p class="text-center mt-2 mb-0">By signing up, you are agree with the <nuxt-link to="/#">Terms and Conditions</nuxt-link> applied.</p>
    </form>
  </b-modal>
</template>

<script>
  export default {
    data () {
      const now = new Date()
      const today = new Date(now.getFullYear() - 11, now.getMonth(), now.getDate())
      const minDate = new Date(today)
      minDate.setYear(minDate.getYear() - 50)
      const maxDate = new Date(today)
      return {
        form: {
          username : '',
          email : '',
          password : '',
          confirmPassword : '',
          name : '',
          born : '',
          phone : '',
          gender : '',
        },
        min: minDate,
        max: maxDate,
        passwordVisible: false,
        confirmPasswordVisible: false,
      }
    },
    computed: {
      
    },
    async mounted() {
      
    },
    methods: {
      togglePasswordVisibility () {
        this.passwordVisible = !this.passwordVisible
      },
      toggleConfirmPasswordVisibility () {
        this.confirmPasswordVisible = !this.confirmPasswordVisible
      },
      onSubmit() {
        
      },
    },
  }
</script>