

<script>
import { Bar } from 'vue-chartjs'



export default {
  extends: Bar,
  data: () => ({
    chartdata: {
      labels: ['January', 'February'],
      datasets: [
        {
          label: 'Data One',
          backgroundColor: '#f87979',
          data: [40, 80]
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false
    }
  }),
  mounted () {
    this.renderChart(this.chartdata, this.options)
  }
}




        
</script>

<style>
  /* .small {
    max-width: 600px;
    margin:  150px auto;
  } */
</style>