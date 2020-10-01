export function controls_form () {
    function logSubmit(event) {
        event.preventDefault();
        let object_i = document.getElementById("object-id").value;
        let object_z = document.getElementById("object-z").value;
        let object_y = document.getElementById("object-y").value;
        let object_x = document.getElementById("object-x").value;
        let object_scale = document.getElementById("object-scale").value;

        window.cubes_obj[object_i].position.set(object_z, object_y, object_x);

        window.cubes_obj[object_i].scale.set(object_scale, object_scale, object_scale);

    }

    const form = document.getElementById('form');
    form.addEventListener('submit', logSubmit);
}