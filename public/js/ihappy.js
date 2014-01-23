seajs.config({
  alias: {
    "jquery": "jquery/jquery.js"
  },
  paths:{
    "ihappy":"ihappy",
    "pluginsCss":"../../../css/plugins"
  }
})

seajs.use('ihappy/create')