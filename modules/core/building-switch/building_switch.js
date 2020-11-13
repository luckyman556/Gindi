import { add_cylinder_floor_numbers } from '../../core/cylinder-floor-numbers/add-cylinder-floor-numbers.js';
export var BuildingSwitch = {
    data : '',
    set_data : function (buildings_array) {
        BuildingSwitch.data = buildings_array;
    },
    add : function (container) {
        let buildings_array = BuildingSwitch.data;
        let buildings_list_html = '';
        buildings_array.forEach(function(building, i){
            buildings_list_html += `<div class="building-item" data-index="${i}">${building.name}</div>`;
        });
        container.insertAdjacentHTML('beforeend', `<div id="building-switcher" class="non-canvas">
            <div class="prev-btn new-ui-direction-btn">
                <img src="img/building-switcher/left.svg" alt="">
            </div>
            <div class="buildings-list">${buildings_list_html}</div>
            <div class="next-btn new-ui-direction-btn">
                <img src="img/building-switcher/right.svg" alt="">
            </div>
        </div>`);
        document.querySelector('#building-switcher .building-item').classList.add("active");
        let nav_btns = document.querySelectorAll('#building-switcher .new-ui-direction-btn');
        if (nav_btns) {
            nav_btns.forEach(function(btn){
                btn.addEventListener('click', function () {
                    let items_list = document.querySelectorAll('#building-switcher .building-item');
                    let active_item = document.querySelector('#building-switcher .building-item.active');
                    if (this.classList.contains('next-btn')) {
                        let target_index = Number(active_item.getAttribute('data-index') ) + 1;
                        if (items_list.length === target_index) {
                            target_index  = 0;
                        }
                        BuildingSwitch.change_building_to(target_index);

                    } else {
                        let target_index = Number(active_item.getAttribute('data-index')) - 1;
                        if (target_index < 0 ) {
                            target_index  = items_list.length - 1;
                        }

                        BuildingSwitch.change_building_to(target_index);
                    }

                });
            });
        }
        buildings_info.forEach(function(building){
            building.objects_to_opacity.forEach(function(item){
                item.userData.main_building_item = true;
            });
        });
    },
    change_building_to  : function (building_index  ) {
        let buildings_array = BuildingSwitch.data;
        if (document.getElementById('building-switcher')) {
            let items_list = document.querySelectorAll('#building-switcher .building-item');
            let active_item = document.querySelector('#building-switcher .building-item.active');
            object_to_opacity.forEach(function(item, i){
                if (item.userData.main_building_item !== undefined) {
                    object_to_opacity.splice(i);
                }
            });
            buildings_info.forEach(function(building, i){
                if (i !== building_index) {
                    building.objects_to_opacity.forEach(function(item){
                        item.material.transparent = true;
                        object_to_opacity.push(item);
                    });
                } else {
                    building.objects_to_opacity.forEach(function(item){
                        item.material.transparent = false;
                        item.material.opacity = 1;
                        item.visible = true;
                    });
                }
            });

            active_item.classList.remove('active');
            items_list[building_index].classList.add('active');
            camera_change_animation (building_index);

            switch (building_index) {
                case 0:
                    window.all_appartments = window.all_appartments_tower4;
                    objects_to_intersection = all_appartments.concat(flooring_obj);
                    instanced_floors = instanced_floors_switch[0];
                    window.floor_obj = window.floor_obj_tower4;
                    window.roof = scene.getObjectByName('Roof');
                    rebuildFloorSelectorNumber();
                    rebuildCylinderFloorNumber();
                    break;
                case 1:
                    objects_to_intersection = window.tower3Selection.concat(flooring_obj_2);
                    window.all_appartments = window.tower3Selection;
                    instanced_floors = instanced_floors_switch[1];
                    window.floor_obj = window.floor_obj_2;
                    window.roof = scene.getObjectByName('Roof-tower3');
                    rebuildFloorSelectorNumber();
                    rebuildCylinderFloorNumber();
                    break;
            }
        }
        function camera_change_animation (target_index) {
            add_tween_animation ({
                'animation_obj' :  tween_animations,
                'start' : {  x : window.camera_target.position.x,  z : window.camera_target.position.z },
                'target' : { x : buildings_array[target_index].camera_position.x,  z : buildings_array[target_index].camera_position.z },
                'duration' : 1000,
                'easing' : TWEEN.Easing.Cubic.In,
                'delay' : 0
            }, function (e) {
                if (window.text_groups) {
                    window.text_groups.forEach(function(item){
                        item.position.x = e.x;
                        item.position.z = e.z;
                    });
                }

                window.camera_target.position.z = e.z;
                window.camera_target.position.x = e.x;
            }, function (e) {

            });
        }
        
        function rebuildFloorSelectorNumber () {
            while (new_floor_selector_obj[0].firstChild) {
                new_floor_selector_obj[0].removeChild(new_floor_selector_obj[0].firstChild);
                }
                new_floor_selector_obj.floors_selector();
        }

        function rebuildCylinderFloorNumber () {
            while (scene.getObjectByName('text_group')){
                const obj = scene.getObjectByName('text_group');
                scene.remove(obj);
            }
            add_cylinder_floor_numbers();
        }
    }

}