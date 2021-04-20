<template>
    <div>
        <v-card class="rounded-lg" outlined tile elevation="3" min-height="150" >
            <div class="station-card-title"> 
                {{station.name}}
            </div>
            <div v-if="station.currentProduct!==null"  style="padding: 20px">
                <div style="display: inline-block; width: 20%;">
                    <v-img v-bind:src="station.currentProduct.image" max-height="110" max-width="150"></v-img>
                </div>
                <div class="flex flex-wrap" style="display: inline-block; widthL 80%;">
                    <div class="data-container">
                        <p class="subtitle">Serial Number</p>
                        <p class="value">{{station.currentProduct.serialNumber}}</p>
                    </div>
                    <div class="data-container"> 
                        <p class="subtitle">Model</p>
                        <p class="value">{{station.currentProduct.model}}</p>
                    </div>
                    <div class="data-container">
                        <p class="subtitle">Entry Time</p>
                        <p class="value">{{station.currentProduct.entryTime | timeFormat}}</p>
                    </div>
                    <div class="data-container">
                        <p class="subtitle">Cycle Time</p>
                        <p class="value">{{station.cycleTimeHrs}} Hour(s)</p>
                    </div>
                </div>
                <div>
                    <p class="subtitle"></p>
                </div>
            </div>

           <div v-else class="no-product">
               <p style="text-align: center">No Product</p>
           </div>
        </v-card>
    </div>
</template>
<script>
export default {
    name: "WorkStationCard",
    props: {
        station: {
            type:Object,
            required: true,
            default: function(){
                return {
                    name: "",
                    cycleTimeHrs: 0,
                    currentProduct: null
                };
            }
        }
    },
    data: function(){
        return {

        };
    },
    filters: {
        timeFormat: function(value){
            return value;
        }
    }
}
</script>
<style scoped>
.station-card-title{
    text-align: center;
    background-color: #3d3d44;
    color: white;
    font-weight: bold;
    min-height: 35px;
    vertical-align: middle;
    font-size: 16pt;

}
.data-container{
    flex: 100px;
    margin: 5px;
    padding: 15px;
}
.subtitle{
    font-size: 10pt;
    opacity: .8;
}
.value{
    font-weight: bold;
}
</style>