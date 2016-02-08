



var method;
var method_settings;
var stage = 1;

var UI = {

    init: function()
    {
        // Loader
        setTimeout(function(){
            $('#loader-wrapper').addClass('loaded');
        }, 3000);

        // Check for when the user select there usage
        UI.selectedUsage();
    },

    selectedUsage: function()
    {
        // Attached click handler to select function buttons
        $(".method").click( function(){
            $.method = $( this ).attr('data-method');
            UI.enterMethod();
        });
    },

    selectedNext: function()
    {
        // Attached click handler to next stage buttons
        $(".next-stage").click( function(){
            if(!$(this).is(":disabled"))
                UI.nextStage(this);
        });
    },

    enterMethod: function()
    {
        // Set Stage
        $.stage = 1;

        // Get the method settings
        UI.getMethodSettings().done(function()
        {
            if($.method_settings.enabled)
            {
                $('#method-disabled').hide('slow');
                if($.method_settings.password == false)
                {
                    UI.enterMethodTransition();
                }else{
                    // Show password box
                    $('#password-wrapper').addClass('required');

                    // Enable on screen keyboard for password field
                    $('#password_textbox').keyboard({
                        layout: 'custom',
                        customLayout : {
                            'normal': [
                                '` 1 2 3 4 5 6 7 8 9 0 - = {bksp}',
                                'q w e r t y u i o p [ ] \\',
                                'a s d f g h j k l ; \' {accept}',
                                '{shift} z x c v b n m , . / {shift}',
                                '{accept} {space} {cancel}'
                            ],
                            'shift': [
                                '~ ! @ # $ % ^ & * ( ) _ + {bksp}',
                                'Q W E R T Y U I O P { } |',
                                'A S D F G H J K L : " {accept}',
                                '{shift} Z X C V B N M < > ? {shift}',
                                '{accept} {space} {cancel}'
                            ]
                        }
                    });

                    // Login
                    $('#password_textbox').keypress(function (e) {
                        var key = e.which;
                        if(key == 13)
                            UI.enterMethodLogin();
                    });
                    $("#login").click( function(){
                        UI.enterMethodLogin();
                    });

                    // Move stage
                    $("#cancel").click( function(){
                        // Hide login
                        $('#password-wrapper').removeClass('required');
                        $('#password-error').hide('slow');
                    });
                }
            }else{
                $('#method-disabled').show('slow');
            }
        });
    },

    enterMethodLogin: function()
    {
        // Auth password @todo For now check set value (un-secure); in the end check with lab view.
        if($('#password_textbox').val() == $.method_settings.password){
            // Show next stage
            $('#password-wrapper').removeClass('required');
            $('#password-error').hide('slow');
            UI.enterMethodTransition();
        }else{
            // Show Error
            $('#password-error').show('slow');
        }
    },

    enterMethodTransition: function()
    {
        // Include relevant file
        $( "#stages" ).load($.method + '.html', function()
        {
            // Transition stage
            $('section[data-stage="welcome"]').hide("slow");
            $('section[data-stage="'+ $.method+'-'+ $.stage+'"]').show( "slow" );

            // Check for when user selects next stage
            UI.selectedNext();

            // Draw the progress bar for the set method
            UI.redrawProgressBar();
        });
    },

    nextStage: function(thisPast)
    {
        // Close current stage
        $('section[data-stage="'+ $.method+'-'+ $.stage+'"]').hide( "slow" );

        // Find the stage to go to
        $.stage = $( thisPast ).attr('data-to');

        // Open new stage
        $('section[data-stage="'+ $.method+'-'+ $.stage+'"]').show( "slow" );

        // Set position on progress bar
        UI.setProgressBar();
    },

    redrawProgressBar: function()
    {
        // Temp cache
        var states = '';
        var classes = '';

        // Define the width of the steps
        var width = 100 / $.map($.method_settings.progressBar, function(n, i) { return i; }).length;

        // Loop through the JSON and generate li
        $.each($.method_settings.progressBar, function (i, v) {
            // Is active or has been active
            if(i - 1 == $.stage){
                classes += 'active';
            }else if(i - 1 < $.stage){
                classes += 'active';
            }

            // Generate li string
            states  += "<li class='"+classes+"' style='width: "+width+"%;' data-state='"+(i-1)+"'>"+$.method_settings.progressBar[i]+"</li>";

            // Reset classes cache
            classes = '';
        });

        // Assign li to the ul container
        $('#progressbar').html(states);
    },

    setProgressBar: function()
    {
        $('#progressbar li[data-state="'+ $.stage+'"]').addClass('active');
    },

    getMethodSettings: function()
    {
        return $.getJSON( "/settings/"+$.method+".json", function(data){
            $.method_settings = data;
        });
    },

    setErrorCondition: function()
    {

    }
}

$( document ).ready(function() {
    UI.init();

});

