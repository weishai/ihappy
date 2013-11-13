seajs.config({
  base: "./js/sea-modules",
  alias: {
    "jquery": "jquery/jquery.js"
  },
  paths:{
    "ihappy":"ihappy"
  }
})

seajs.use('ihappy/create')