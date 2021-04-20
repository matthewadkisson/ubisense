<template>
  <v-app>
    <v-app-bar app color="primary" dark>
           <v-toolbar-title class="title">Work Stations</v-toolbar-title>
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
.title{
text-align: center; 
font-weight: bold;
 font-size: 24pt;
 display: block;
}
</style>