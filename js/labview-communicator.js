


var labview_communicator = {

    /**
     * Read the set flow rate for the flow controller
     */
    setFlowRate: function(id, flow)
    {

    },

    /**
     * Turn on the vac pump
     */
    setVacuumOn: function()
    {
        console.log("vac station on");
    },

    /**
     * Turn on the vac pump
     */
    setVacuumOff: function()
    {
        console.log("vac station off");
    },

    /**
     * Turn off the vac turbo pump
     */
    setTurboOff: function()
    {
        console.log("vac station turbo pump off");
    },

    /**
     * Turn on the vac turbo pump
     */
    setTurboOn: function()
    {
        console.log("vac station turbo pump on");
    },

    /**
     * Read the set pressure level
     */
    setPressure: function()
    {

    },

    /**
     * Read the valve configuration
     */
    setValveConfig: function(hash)
    {
        console.log(hash);
    },


    /**
     * Read the actual flow rate
     */
    flowRate: function()
    {

    },

    /**
     * Read the actual pressure level
     */
    vacuum: function()
    {

    },

    /**
     * Read the actual pressure level
     */
    pressure: function()
    {

    },

    /**
     * Read the turbo speed on the vacuum station
     */
    turboSpeed: function()
    {

    },

    /**
     * Read the valve configuration
     */
    valveConfig: function()
    {

    },

    submit: function()
    {
        //$.post( "http://127.0.0.1:8080/GasRig/set/valve_config", { valveHash: "0,0,0,0,0,0,0,0,0", csfr: "poiuytrewqadfghjklmnb" } );
        $.post( "http://127.0.0.1:8080/GasRig/set/valve_config", { valveHash: "0,58,1,0,0,0,0,0,0", csfr: "poiuytrewqadfghjklmnb" }).done(function( data ) { alert( "Data Loaded: " + data ); });
    }
}

