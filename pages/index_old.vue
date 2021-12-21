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
    <div class="slide-category">
      <div>
        <div class="row">
          <div class="col-12 col-sm-8 col-md-8 col-lg-8">
            <div class="master-chanel">
              <!---->
              <div v-for="data in fetchedKanalCategoryImq.data" v-bind:key="data.id" class="vue-horizontal-list">
                <div class="vhl-navigation">
                  <!---->
                  <!---->
                </div>
                <div
                 
                  class="vhl-container"
                  style="margin-left: -8px; margin-right: -8px"
                >
                  <div class="vhl-list">
                    <div
                     
                      class="vhl-item"
                      style="
                        width: 733px;
                        padding-left: 8px;
                        padding-right: 8px;
                      "
                    >



                      <div class="item">
                        <div class="layer-image" style="border: 1px solid rgba(0,0,0,.125); border-radius: 8px;">
                          <div
                           
                            class="bg-image-artikel " 
                            :style="{ background: `url(${data.firstname == null ? noImage : data.lastname })`}"
                          >
                            <div class="box-main-artikel">
                              <div class="caption">
                                
                                <div class="caption-info">
                                  <div class="caption-date">
                                    <i
                                     
                                      aria-hidden="true"
                                      class="fa fa-calendar-o"
                                    ></i>
                                    <span>{{ data.firstname }}</span>
                                  </div>
                                  <div
                                   
                                    class="caption-seperator"
                                  >
                                    |
                                  </div>
                                  <div
                                   
                                    class="caption-comment"
                                  >
                                    <i
                                     
                                      aria-hidden="true"
                                      class="fa fa-comment-o"
                                    ></i>
                                    {{ data.lastname }}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>



                    </div>
                    <div></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-12 col-sm-4 col-md-4 col-lg-4">
            <div class="scroll-artikel">
              <div class="heading-article">
                <div class="heading-left">
                  <span class="baging"></span>
                  <h3>Trending</h3>
                </div>
              </div>
              <div class="card">
                <div class="card-header">
                  <h6 class="mb-0">
                    <a href="https://www.satukanegeri.com/" target="_blank">
                      <img
                        src="~/assets/img/logo_satukan_negeri.png"
                        width="115"
                        height="54"
                        style="width: 115px; position: relative; top: 2px"
                      />
                    </a>
                  </h6>
                </div>
                <div class="card-body">
                  <div class="list-kanal">
                    <div
                      class="media"
                      v-for="data in fetchedKanalCategoryImq.data"
                      v-bind:key="data.id"
                    >
                      <div class="media-body">
                        <div class="desc-artikel">
                          <a :href="data.url" target="_blank">
                            <h3 class="mt-0 mb-2">{{ data.firstname }}</h3>
                          </a>
                        </div>
                        <div class="box-user">
                          <div class="box-post-date">
                            <client-only>
                              <span>{{ data.lastname }}</span>
                            </client-only>
                          </div>
                        </div>
                      </div>
                      <div
                        class="media-aside media-aside-right align-self-start"
                      >
                        <div class="img-thumb">
                          <a :href="data.url" target="_blank">
                            <div>
                              
                            </div>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
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
                        {{data.firstname}}
                      </h5></a
                    >
                    <p>
                      {{data.lastname}}
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
                          ><i class="fas fa-circle"></i> {{data.firstname}}</span
                        >
                      </div>
                    </div>
                  </div>
                  <div class="img-thumb-cat">
                    <a :href="data.url" target="_blank"><div class="box-label">
                        <span class="label-categories"
                          >{{data.lastname}}</span
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
      <div class="col-12 col-sm-4 col-md-4 col-lg-4">
        <sidebar-terpopuler></sidebar-terpopuler>
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
    let urlKanalWidgetImq = `https://nameless-fjord-04255.herokuapp.com/api/v1/users`;
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