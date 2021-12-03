<template>
  <swiper
    class="swiper"
    :loop="true"
    :autoplay="{
      delay: 4000,
      disableOnInteraction: false,
    }"
  >
    <swiper-slide v-for="img in imgs" :key="img">
      <img :src="img" alt="img-sponsor" />
    </swiper-slide>
  </swiper>
</template>

<script>
import { defineComponent } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";

// import Swiper core and required modules
import SwiperCore, { Autoplay } from "swiper";
import "swiper/swiper-bundle.min.css";

SwiperCore.use([Autoplay]);

export default defineComponent({
  name: "SponsorSlide",
  components: {
    Swiper,
    SwiperSlide,
  },

  data() {
    return {
      imgs: [],
    };
  },

  async mounted() {
    const files = await this.$store.dispatch("getFilesUrlsOfSponsors");
    this.imgs = files.imgs;
  },
});
</script>

<style lang="scss" scoped>
.swiper-container {
  height: 30%;

  img {
    width: 100%;
    height: 100%;
    object-fit: fill;
  }
}
</style>