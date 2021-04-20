<template>
  <v-app>
    <v-app-bar app color="primary" dark>
           <div id="page-title">Work Stations</div>
    </v-app-bar>
    <v-main>
      <v-container>
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: "App",

  data: () => ({
    //
  }),
};
</script>
<style scoped>
#page-title{
text-align: center; 
font-weight: bold !important;
 font-size: 24pt !important;
 display: block;
 width: 100%
}
</style>