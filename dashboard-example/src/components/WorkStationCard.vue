<template>
    <div>
        <v-card class="rounded-lg" outlined tile elevation="3" min-height="270" >
            <div class="station-card-title"> 
                {{station.name}}
            </div>
            <div v-if="station.currentProduct!==null"  style="padding: 20px; display: flex; flex-wrap: wrap">
                <div class="image-container">
                    <v-img v-bind:src="station.currentProduct.image"></v-img>
                </div>
                <div class="info-container">
                    <div style="flex: 1 1 auto; display: flex; flex-wrap: wrap">
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
                        <div class="time-elapsed-container">
                            <div v-if="overdueMinutes<0" style="flex: 0 0 50%;" class="subtitle">Time Elapsed: {{minutesSinceEntry | timeElapsed}} min.</div>
                            <div v-else style="flex: 0 0 50%;" class="overdue subtitle" >Overdue: {{overdueMinutes | timeElapsed }} min.</div>
                            <div class="progress-container">
                                <div v-bind:style="{ width: precentageDone+'%'}" v-bind:class="{'overdue-progress': overdueMinutes > 0}"></div>
                                <div v-bind:style="{ width: percentageNotDone+'%'}" class="percent-not-done"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

           <div v-else class="no-product">
               No Product
           </div>
        </v-card>
    </div>
</template>
<script>
import { DateTime } from "luxon";
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
            now: DateTime.now()
        };
    },
    computed: {
        minutesSinceEntry: function(){
            return (-1)*(DateTime.fromMillis(this.station.currentProduct.entryTime).diff(this.now, 'minutes').values.minutes);
        },
        cycleTimeMinutes: function(){
            return this.station.cycleTimeHrs*60;
        },
        overdueMinutes: function(){
            return this.minutesSinceEntry - this.cycleTimeMinutes;
        },
        precentageDone: function(){
            var percentDone = (this.minutesSinceEntry/this.cycleTimeMinutes)*100;
            return percentDone <=100 ? percentDone : 100;
        },
        percentageNotDone: function(){
            return 100 - this.precentageDone;
        }
    },
    filters: {
        timeFormat: function(value){
            return DateTime.fromMillis(value).toLocaleString(DateTime.TIME_SIMPLE);
        },
        timeElapsed: function(value){
            return Math.trunc(value);
        }
    },
    mounted: function(){
        setInterval(() => { this.now = DateTime.now() }, 1000)
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
    flex: 0 0 50%;
    max-width: 50%;
}
.time-elapsed-container{
    flex: 0 0 100%;
    max-width: 100%;
    border-radius: 5px;
}
.progress-container{
    display: flex;
}
.progress-container > div{
    height: 6px;
    background-color: green;
}
.percent-not-done {
    opacity: .5;
    background-color: #515451 !important;
}
.subtitle{
    font-size: 10pt;
    opacity: .8;
}
.value{
    font-weight: bold;
}
.no-product{
    line-height: 14em;
    text-align: center;
    font-weight: bold;
}
.overdue-progress{
    background-color: red;
}
.image-container{
    flex: 0 0 40%;
    max-width: 40%;
}
.info-container{
    flex: 0 0 60%;
    max-width: 60%;
}
@media (max-width: 600px) {
   .image-container{
        flex: 0 0 100%;
        max-width: 100%;
    } 
    .info-container{
        flex: 0 0 100%;
        max-width: 100%;
    }
}
</style>