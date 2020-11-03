export let guiPresets = {
    selectionBoxesColors : function () {
        let gui = globalGui;
        var selectionBoxesColors = gui.addFolder('Selection boxes colors');
        globalGuiParams.availableNormalColor = '#' + flat_statuses[1].color;
        globalGuiParams.availableActiveColor = '#' + flat_statuses[1].active;
        globalGuiParams.availableHoverColor = '#' + flat_statuses[1].hover;
        globalGuiParams.unavailableNormalColor = '#' + flat_statuses[0].color;
        globalGuiParams.unavailableActiveColor = '#' + flat_statuses[0].active;
        globalGuiParams.unavailableHoverColor = '#' + flat_statuses[0].hover;
        selectionBoxesColors.addColor(globalGuiParams, 'availableNormalColor').name('Available Normal').onChange(function () {
            let return_val = globalGuiParams.availableNormalColor.replace('#','');
            flat_statuses[1].color = return_val;
            set_floor_status_color([current_floor]);
        });
        selectionBoxesColors.addColor(globalGuiParams, 'availableActiveColor').name('Available Active').onChange(function () {
            let return_val = globalGuiParams.availableActiveColor.replace('#','');
            flat_statuses[1].active = return_val;
            set_floor_status_color([current_floor]);
        });
        selectionBoxesColors.addColor(globalGuiParams, 'availableHoverColor').name('Available Hover').onChange(function () {
            let return_val = globalGuiParams.availableHoverColor.replace('#','');
            flat_statuses[1].hover = return_val;
            set_floor_status_color([current_floor]);
        });
        selectionBoxesColors.addColor(globalGuiParams, 'unavailableNormalColor').name('Unavailable Normal').onChange(function () {
            let return_val = globalGuiParams.unavailableNormalColor.replace('#','');
            flat_statuses[0].color = return_val;
            set_floor_status_color([current_floor]);
        });
        selectionBoxesColors.addColor(globalGuiParams, 'unavailableActiveColor').name('Unavailable Active').onChange(function () {
            let return_val = globalGuiParams.unavailableActiveColor.replace('#','');
            flat_statuses[0].active = return_val;
            set_floor_status_color([current_floor]);
        });
        selectionBoxesColors.addColor(globalGuiParams, 'unavailableHoverColor').name('Unavailable Hover').onChange(function () {
            let return_val = globalGuiParams.unavailableHoverColor.replace('#','');
            flat_statuses[0].hover = return_val;
            set_floor_status_color([current_floor]);
        });
    },
}