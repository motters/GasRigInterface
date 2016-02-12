


var labview_communicator = {

    /**
     * Read the set flow rate for the flow controller
     */
    setFlowRate: function(id, flow)
    {
        console.log("Flow rate on id " + id + " is set to " + flow);
        return true;
    },

    /**
     * Turn on the vac pump
     */
    setVacuumOn: function()
    {
        console.log("vac station on");
        return true;
    },

    /**
     * Turn on the vac pump
     */
    setVacuumOff: function()
    {
        console.log("vac station off");
        return true;
    },

    /**
     * Turn off the vac turbo pump
     */
    setTurboOff: function()
    {
        console.log("vac station turbo pump off");
        return true;
    },

    /**
     * Turn on the vac turbo pump
     */
    setTurboOn: function()
    {
        console.log("vac station turbo pump on");
        return true;
    },

    /**
     * Read the valve configuration
     */
    setValveConfig: function(hash)
    {
        console.log(hash);
        return true;
    },


    /**
     * Read the actual flow rate
     */
    flowRate: function(id)
    {
        return Math.floor(Math.random() * 6) + 1;
    },

    /**
     * Read the actual pressure level
     */
    vacuum: function()
    {
        return 0.99;
    },

    /**
     * Read the actual pressure level
     */
    pressure: function()
    {
        return 2.45;
    },

    /**
     * Read the turbo speed on the vacuum station
     */
    turboSpeed: function()
    {
        return 0;
    },

    /**
     * Read the valve configuration
     */
    valveConfig: function()
    {
        // temp set fake json as if from lab view
        var serial = '{ "1": 1, "2": 1, "3": 0, "4": 1, "5": 0, "6": 1, "7": 0, "8": 0, "9": 0 }';
        return $.parseJSON(serial);
    },

    /**
     * Read the turbo speed on the vacuum station
     */
    connectionErrors: function()
    {
        return 1;
    },

    submit: function()
    {
        //$.post( "http://127.0.0.1:8080/GasRig/set/valve_config", { valveHash: "0,0,0,0,0,0,0,0,0", csfr: "poiuytrewqadfghjklmnb" } );
        $.post( "http://127.0.0.1:8080/GasRig/set/valve_config", { valveHash: "0,58,1,0,0,0,0,0,0", csfr: "poiuytrewqadfghjklmnb" }).done(function( data ) { alert( "Data Loaded: " + data ); });
    }
}

