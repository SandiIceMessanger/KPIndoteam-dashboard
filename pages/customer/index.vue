<template>
  <section id="categoryPage">
    <div>
      <div class="row mb-3">
        <div class="col-12 col-sm-8 col-md-8 col-lg-8">
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
              <li class="breadcrumb-item"><a href="/">Home</a></li>
              <li aria-current="page" class="breadcrumb-item active">
                <span>Satukan Negeri</span>
              </li>
            </ol>
          </nav>
        </div>
      </div>
    </div>
    
    <div class="card-body">
        <table id="datatablesSimple" border="1">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Position</th>
                    <th>Office</th>
                    <th>Age</th>
                    <th>Start date</th>
                    <th>Salary</th>
                </tr>
            </thead>
            <tfoot>
                <tr>
                    <th>Name</th>
                    <th>Position</th>
                    <th>Office</th>
                    <th>Age</th>
                    <th>Start date</th>
                    <th>Salary</th>
                </tr>
            </tfoot>
            <tbody>
                <tr>
                    <td>Tiger Nixon</td>
                    <td>System Architect</td>
                    <td>Edinburgh</td>
                    <td>61</td>
                    <td>2011/04/25</td>
                    <td>$320,800</td>
                </tr>
            </tbody>
        </table>
    </div>
    <div class="row">
      <div class="col-12 col-sm-8 col-md-8 col-lg-8">
        <div class="new-article no-border">
          <div class="heading-article">
            <div class="heading-left float-left">
              <span class="baging"></span>
              <h3>
                Terbaru di
                <em style="font-style: inherit">Antara Digital Media</em>
              </h3>
            </div>
          </div>
          <!---->
          <div>
            <div class="list-article">
              <ul class="list-unstyled">
                
                <li class="media py-3" v-for="data in fetchedKanalCategoryImq.data" v-bind:key="data.id">
                  <div class="media-body">
                    <a :href="data.url" target="_blank">
                      <h5 class="mt-0">
                        {{data.customerName}}
                      </h5></a
                    >
                    <p>
                      {{data.customerPhoneNumber}}
                    </p>
                    <div class="box-user">
                      <div class="box-avatar-creator">
                        <a href="/#" class=""
                          ><img
                            src="https://secure.gravatar.com/avatar/038fa12f0c96c112ad3cb3ff4d2c43ff?s=96&amp;d=mm&amp;r=g"
                            alt="Avatar"
                          /><span>Antara Digital Media</span></a
                        >
                      </div>
                      <div class="box-post-date">
                        <span
                          ><i class="fas fa-circle"></i> {{data.CustomerPoint}}</span
                        >
                      </div>
                    </div>
                  </div>
                  <div class="img-thumb-cat">
                    <a :href="data.url" target="_blank"><div class="box-label">
                        <span class="label-categories"
                          >{{data.ID}}</span
                        >
                      </div>
                      <div class="box-image-post">
                        </div
                    ></a>
                  </div>
                </li>
                
                <!---->
              </ul>
            </div>
          </div>


        </div>
      </div>
      
    </div>
  </section>
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
    let urlKanalWidgetImq = `https://nameless-fjord-04255.herokuapp.com/api/v1/customers`;
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