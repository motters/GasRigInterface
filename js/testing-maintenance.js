


var testing_maintenance = {

    init: function()
    {
        this.setValveConfig();
        this.setVac();
        this.setTurbo();
    },

    /**
     * Set a valve configuration
     */
    setValveConfig: function()
    {
        // On click update valves
        $('#update-valves').click(function(){
            // Generate valve hash
            var hash = "";
            for (i = 1; i < 10; i++) {
                hash += $("#valve-"+i+"-checkbox").is(':checked') ? 1 + ',' : 0 + ',';
            }

            // Add some alters here if the valve is configued to vent to air

            // Send to labview
            labview_communicator.setValveConfig(hash.slice(0, -1));
        });
    },


    /**
     * Turn on / off the vac on
     */
    setVac: function()
    {
        // On click
        $('#vac-pump').click(function(){
            $(this).toggleClass('danger');
            if($(this).hasClass('danger')){
                // Change text
                $(this).text('Turn Vacuum Station ON');
                // Send to labview
                labview_communicator.setVacuumOff();
            }else{
                // Change text
                $(this).text('Turn Vacuum Station OFF');
                // Send to labview
                labview_communicator.setVacuumOn();
            }

        });
    },

    /**
     * Disable / enable the turbo pump on the vac station
     */
    setTurbo: function()
    {
        // On click
        $('#vac-pump-turbo').click(function(){
            $(this).toggleClass('danger');
            if($(this).hasClass('danger')){
                // Change text
                $(this).text('Enable Turbo Pump');
                // Send to labview
                labview_communicator.setTurboOff();
            }else{
                // Change text
                $(this).text('Disable Turbo Pump');
                // Send to labview
                labview_communicator.setTurboOn();
            }

        });
    },

    readFlowRate: function()
    {

    },

    readSetFlowRate: function()
    {

    }

}
