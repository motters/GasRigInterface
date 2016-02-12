


var testing_maintenance = {

    vent: false,

    init: function()
    {
        // Keep the UI up to date with real time information
        window.setInterval(function(){
            testing_maintenance.updateValve();
            testing_maintenance.updateVac();
            testing_maintenance.updateFlow();
            testing_maintenance.updatePressure();
            testing_maintenance.updateConnection();
        }, 500);

        // Send info to labview
        this.setValveConfig();
        this.setVac();
        this.setTurbo();
        this.setFlow();
    },

    checkVentToAir: function()
    {
        if($("#valve-1-checkbox").is(':checked') && $("#valve-4-checkbox").is(':checked') && ($("#valve-5-checkbox").is(':checked') || $("#valve-8-checkbox").is(':checked')) && $("#valve-9-checkbox").is(':checked')){
            testing_maintenance.vent = true;
        }else{
            testing_maintenance.vent = false;
        }
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

            // check there is not vent to air
            testing_maintenance.checkVentToAir();
            if($("#valve-vent-check").is('input:not(:checked)') && testing_maintenance.vent){
                $("#valve-message").text("With this configuration there is the possibility of venting to atmosphere. Please confirm this is acceptable to proceed.").removeClass("txt-success");
                return;
            }

            // Send to labview
            if(labview_communicator.setValveConfig(hash.slice(0, -1)) == true){
                // Change box message
                if(testing_maintenance.vent){ $("#vent-box-message").text("Possible vent to air").addClass("error-label"); }else{ $("#vent-box-message").text("No venting to air with current valve setup.").removeClass("error-label");}
                // success message
                $("#valve-message").text("Valves were successfully updated.").addClass("txt-success");
                $('#valve-vent-check').prop('checked', false);t
            }else{
                // failed message
                $("#valve-message").text("Valves could not be updated.").removeClass("txt-success");
            }

        });
    },


    /**
     * Turn on / off the vac on
     */
    setVac: function()
    {
        // On click
        $('#vac-pump').click(function(){
            if(!$(this).hasClass('danger')){
                if(labview_communicator.setVacuumOff()){
                    // success message
                    $("#vac-message").text("Vacuum was successfully turned off.").addClass("txt-success");
                    // Change text
                    $(this).text('Turn Vacuum Station ON');
                    // Toggle class
                    $(this).toggleClass('danger');
                }else{
                    // Error message
                    $("#vac-message").text("Vacuum could not be turned off.").removeClass("txt-success");
                }
            }else{
                if(labview_communicator.setVacuumOn()){
                    // success message
                    $("#vac-message").text("Vacuum was successfully turned on.").addClass("txt-success");
                    // Change text
                    $(this).text('Turn Vacuum Station OFF');
                    // Toggle class
                    $(this).toggleClass('danger');
                }else{
                    // Error message
                    $("#vac-message").text("Vacuum could not be turned on.").removeClass("txt-success");
                }
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
            if(!$(this).hasClass('danger')){
                if(labview_communicator.setTurboOff()){
                    // success message
                    $("#vac-message").text("Turbo pump was successfully disabled.").addClass("txt-success");
                    // Change text
                    $(this).text('Enable Turbo Pump');
                    // Toggle class
                    $(this).toggleClass('danger');
                }else{
                    // Error message
                    $("#vac-message").text("Turbo pump could not be disabled.").removeClass("txt-success");
                }
            }else{
                if(labview_communicator.setTurboOn()){
                    // success message
                    $("#vac-message").text("Turbo pump was successfully enabled.").addClass("txt-success");
                    // Change text
                    $(this).text('Disable Turbo Pump');
                    // Toggle class
                    $(this).toggleClass('danger');
                }else{
                    // Error message
                    $("#vac-message").text("Turbo pump could not be enabled.").removeClass("txt-success");
                }
            }
        });
    },

    /**
     * Set the flow rate for flow controller one and two
     */
    setFlow: function()
    {
        // On click of update flow (1) btn
        $('#flow-rate-1-btn').click(function(){
            // Stop form submission
            event.preventDefault();
            // Get the requested flow rate
            var rate = $("#flow_1_inp").val();
            // Validate
            var valid = $("#flow_1_container")
            valid.validate(
                validate_testing_maintenance.flow_controller_1
            );
            // If is valid then submit
            if(valid.valid()){
                // Send to labview
                if(labview_communicator.setFlowRate(1, rate) == true){
                    // success message
                    $("#flow_1_inp-error").text("Flow rate was successfully updated.").addClass("txt-success").show();
                }else{
                    // Error message
                    $("#flow_1_inp-error").text("Flow rate could not be updated.").removeClass("txt-success").show();
                }
            }else{
                $("#flow_1_inp-error").removeClass("txt-success");
            }

        });

        // On click of update flow (2) btn
        $('#flow-rate-2-btn').click(function(){
            // Stop form submission
            event.preventDefault();
            // Get the requested flow rate
            var rate = $("#flow_2_inp").val();
            // Validate
            var valid = $("#flow_2_container")
            valid.validate(
                validate_testing_maintenance.flow_controller_2
            );
            // If is valid then submit
            if(valid.valid()){
                // Send to labview
                if(labview_communicator.setFlowRate(2, rate) == true){
                    // success message
                    $("#flow_2_inp-error").text("Flow rate was successfully updated.").addClass("txt-success").show();
                }else{
                    // Error message
                    $("#flow_2_inp-error").text("Flow rate could not be updated.").removeClass("txt-success").show();
                }
            }else{
                $("#flow_2_inp-error").removeClass("txt-success");
            }
        });
    },

    /**
     * Update the parts of the page which display real time information about the valves
     */
    updateValve: function()
    {
        $.each(labview_communicator.valveConfig(), function (id, state) {
            var text;
            state == 1  ? text = "Open" : text = "Closed";
            $('.valve-states div[data-valveState="' + id + '"]').html("V" + id + ": " + text);
        });
    },

    /**
     * Update the parts of the page which display real time information about the vacuum
     */
    updateVac: function()
    {
        // Vacuum Sensor
        $('#turbo-pressure-message-box').html(labview_communicator.vacuum() + " bar");
        // Turbo Speed
        $('#turbo-speed-message-box').html(labview_communicator.turboSpeed() + " RPM");
    },

    /**
     * Update the parts of the page which display real time information about the pressure sensor
     */
    updatePressure: function()
    {
        // Vacuum Sensor
        $('#pressure-sensor-message-box').html(labview_communicator.pressure() + " bar");
    },

    /**
     * Update the parts of the page which display real time information about the connection issues
     */
    updateConnection: function()
    {
        var errors = labview_communicator.connectionErrors();

        switch(errors)
        {
            case 1:
                $('#connections-message-box').html("Connected successfully.");
                break;
            case 2:
                $('#connections-message-box').html("RS485 connection issue.");
                break;
            case 3:
                $('#connections-message-box').html("Labjack connection issue.");
                break;

        }
    },

    /**
     * Update the parts of the page which display real time information about the flow controllers
     */
    updateFlow: function()
    {
        // Flow sensors
        $('#flow-one-message-box').html(labview_communicator.flowRate(2) + " bar");
        $('#flow-two-message-box').html(labview_communicator.flowRate(1) + " bar");
    }
}
