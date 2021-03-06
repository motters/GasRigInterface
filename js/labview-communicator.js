


var labview_communicator = {

    settings: {},

    /**
     * Init the labview communicator
     */
    init: function()
    {
        // Load the configuration file
        $.getJSON( "/settings/labview-communicator.json", function(data){
            labview_communicator.settings = data;
        });
    },

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
        return labview_communicator.submit('retrieve', 'flow', {"id": id});
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

    /**
     * Send data and retrieve data from labview
     *
     * @param direction retrieve|send
     * @param type data type (within the labview communicator config file)
     * @param data (data to send to labview)
     * @returns {*}
     */
    submit: function(direction, type, data)
    {
        // Set some vars
        var settings = labview_communicator.settings;
        data['csrf'] = 'A Value determined by lab view on page load';

        // If settings set a post request; get request will go unsupported for now
        if(settings["method"] == "POST")
        {
            return $.post( settings["url"] + settings[direction][type], data).done(function( dataReturn ) {
                console.log(dataReturn);
            });
        }
    }
}

