<template>
  <div>
    <v-row>
      <v-col cols="12" md="6" v-for="station in workstationsList" v-bind:key="station.name">
        <work-station-card v-bind:station="station"></work-station-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import WorkStationCard from '../components/WorkStationCard.vue';
import { workstationsApi } from '../services/workstations.service'
import { enginesApi } from '../services/engines.service'
export default {
  name: "Dashboard",
  components: {
    WorkStationCard
  },
  data: function(){
    return {
      engines: [],
      workstations: []
    }
  },
  computed: {
    workstationsList: function(){
      let stations = [...this.workstations];
      stations.forEach(station => {
        if(station.currentProduct!==null){
          var matchingEngine = this.engines.filter(obj => {
            return obj.id === station.currentProduct.id
          });
          //TODO: depending on how much you trust the API to return correct results, we may need to handle the case
          // in which multiple engines with the same ID are returned
          let mergedObj = {...station.currentProduct, ...(matchingEngine === undefined) ? {} : matchingEngine[0] };
          station.currentProduct = mergedObj;
        }
      });
      return stations;
    }
  },
  created: async function(){

    let [r1, r2] = await Promise.all([workstationsApi.all(), enginesApi.all()]);
    if( !Object.prototype.hasOwnProperty.call(r1, "status") || 
       !Object.prototype.hasOwnProperty.call(r2, "status") ){
         //if either of the responses don't have a status code, something is seriously borked
         //TODO: Let's redirect to an error page. Probably a good idea to redirect a simple HTML page in case
         // the problem has to do with our current vue instance (i.e. classic windows.location change rather than Vue router navigation)
      }
      else{
        if( r1.status===200 && r2.status == 200 ){
          this.workstations = r1.data;
          this.engines = r2.data;
        }else{
          //TODO: lets provide a user friendly error popup

        }
      }

  }
};
</script>
