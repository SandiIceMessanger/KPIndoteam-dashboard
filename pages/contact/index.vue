<template>
  <div>
    <div class="contact pb-4 pt-5">
      <div class="heading-contact mb-4 mt-2">
        <h3>Contact us</h3>
      </div>
      <div class="row">
        <div class="col-12 col-sm-12 col-md-8 col-lg-8">
          <maps></maps>
        </div>
        <div class="col-12 col-sm-12 col-md-4 col-lg-4">
          <ContactUs></ContactUs>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Maps from '~/components/contact/Maps';
  import "@/assets/css/contact.css";
  import ContactUs from '~/components/contact/ContactUs';
  export default {
    data () {
      return {
        
      }
    },
    head() {
      return {
        titleTemplate: 'Hubungi Kami - %s',
      }
    },
    computed: {
      
    },
    mounted() {
      
    },
    methods: {
      
    }
  }
</script>