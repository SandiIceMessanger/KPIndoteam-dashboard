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
                <h6 class="m-0 font-weight-bold text-primary">DataTables Example</h6>
            </div>
            <div class="card-header">
                <h4 class="card-title">
                  	<!-- TOMBOL YANG KETIKA DIKLIK AKAN DIARAHKAN KE HALAMAN ADD USER -->
                    <nuxt-link class="btn btn-primary float-right btn-sm" :to="{name: 'users-add'}">Add New</nuxt-link>
                </h4>
            </div>
            <div class="card-body">
                <div class="table-responsive">
                    <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>semester</th>
                                <th>tahun ajaran</th>
                            </tr>
                        </thead>
                        <tfoot>
                            <tr>
                                <th>Id</th>
                                <th>semester</th>
                                <th>tahun ajaran</th>
                            </tr>
                        </tfoot>
                        <tbody>
                            <tr v-for="data in fetchedKanalCategoryImq.data" v-bind:key="data.id">
                                <td>{{data.ID}}</td>
                                <td>{{data.semester}}</td>
                                <td>{{data.tahun_ajaran}}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapGetters } from "vuex";
import "@/assets/css/category.css";
import ListMasterKanalImq from "~/components/categories/ListMasterKanalImq";
import SkeletonBoxHorizontal from "~/components/skeleton/SkeletonBoxHorizontal";
import SkeletonBoxVertikal from "~/components/skeleton/SkeletonBoxVertikal";
import Breadcrumb from "~/components/categories/Breadcrumb";
import Reccomended from "~/components/categories/Reccomended";
import ListArticleCategoriesImq from "~/components/categories/ListArticleCategoryImq";
import SidebarTerpopuler from "~/components/sidebar/SidebarTerpopuler";
import NoData from "~/components/error/NoData";
export default {
  head() {
    let titlePage = `Anatara Digital Media IMQ`;
    let metaDesc =
      this.$store.state.artikel.kanalArtikelCategoryImq.kanal_description;
    return {
      titleTemplate:
        "Berita Seputar " + titlePage + " terkini Bridging Newstainment - %s",
      meta: [{ hid: "description", name: "description", content: metaDesc }],
    };
  },
  data() {
    return {
      titlePage: "",
      showLoading: true,
      showLoadingRecomended: true,
    };
  },
  computed: {
    ...mapGetters({
      fetchedKanalCategoryImq: "artikel/testing",
    }),
  },
  async fetch({ params, store, error, req }) {
    let urlKanalWidgetImq = `https://nameless-fjord-04255.herokuapp.com/api/v1/semesters`;
    let dataKanalWidgetImq = await fetch(urlKanalWidgetImq, {
      headers: {
        Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjE1IiwidXNlcm5hbWUiOiJpbmRvY2hhdCIsImlhdCI6MTYzMzQ4NzcxOSwiZXhwIjoxNjMzNTA1NzE5fQ.mVCBgI7Dv37nWbrkENincQ2MisTt49cLPldOjFxVYj0`,
      },
    }).then((res) => res.json());
    if (dataKanalWidgetImq !== "") {
      store.commit("artikel/SET_TESTING", dataKanalWidgetImq);
    }
  },
  async mounted() {
    this.showLoading = false;
    console.log(this.fetchedKanalCategoryImq);
  },
  methods: {},
};
</script>