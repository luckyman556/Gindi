export const modelsFunctions = {
    loadingCheck : class loadingCheck {
        constructor(checked_object, name, callback) {
            this.checked_object = checked_object;
            this.name = name;
            this.callback = callback;
        }
        start () {
            let class_this = this;
            if (this.checked_object) {
                let checked_item = this.checked_object[this.name];
                if (checked_item) {
                    if (checked_item.loaded) {
                        this.callback( checked_item);
                    } else {
                        setTimeout(function () {
                            class_this.start();
                        }, 50);
                    }
                }
            }
        }
    },
    loadingProgress : function (progress) {
        if (!loading_object[progress.currentTarget.responseURL]) {
            loading_object[progress.currentTarget.responseURL] = {
                'size' : progress.total
            }
        }
        loading_object[progress.currentTarget.responseURL].progress = progress.loaded;
        if (progress.total === progress.loaded) {
            loading_object[progress.currentTarget.responseURL].loaded = true;
        }
        modelsFunctions.setLoadingPercent();
    },
    writeImgLoadingProgress : function (url) {
        var xhr = new XMLHttpRequest();
        xhr.open('HEAD', url, true);
        xhr.onreadystatechange = function(){
            if ( xhr.readyState == 4 ) {
                if ( xhr.status == 200 ) {
                    if (!loading_object[url]) {
                        loading_object[url] = {
                            'size' : Number(xhr.getResponseHeader('Content-Length')),
                            'progress' : Number(xhr.getResponseHeader('Content-Length')),
                        }
                    }
                    loading_object[url].loaded = true;
                }
            }
        };
        xhr.send(null);
    },
    setLoadingPercent : function () {
        let currentSize = 0;
        Object.entries(loading_object).forEach(([key,value],index)=>{
            if (value.progress) {
                currentSize += value.progress;
            }
        });
        totalPercent = Math.floor(currentSize / allLoadingsSize * 100);
    },
    getSizeOfAllLoadings : function (type = '') {
        // console.log(type);
        let size = 0;
        Object.entries(loading_object).forEach(([key,value],index)=>{
            // console.log(value.type);
            if (type == '') {
                size += value.size;
            } else {
                if (value.type == type) {
                    size += value.size;
                }
            }
        })
        return size;
    },
    getObjectMaterialByName (object,name) {
        let globalMaterial;
        watchObject (object, name);
        if (globalMaterial) {
            return globalMaterial;
        }
        function watchObject (object, name) {
            let material;
            material = getMaterial(object, name);
            if (material) {
                globalMaterial = material;
            } else {
                let objectChildren = object.children;
                if (objectChildren) {
                    if (Array.isArray(objectChildren)) {
                        objectChildren.forEach(function(children){
                            material = watchObject (children, name);
                            if (material) {
                                return material;
                            }
                        })
                    }
                }
            }
        }

        function getMaterial(innerObject, name) {
            let objectMaterial = innerObject.material;
            if (objectMaterial) {
                if (Array.isArray(objectMaterial)) {
                    objectMaterial.forEach(function (material, index) {
                        if (material.name == name) {
                            return material;
                        }
                    });
                } else {
                    if (objectMaterial.name == name) {
                        return objectMaterial;
                    }
                }
            }
        }

    },
    replaceMaterialByName (object,name, material) {
        let objectMaterial = object.material;
        if (objectMaterial) {
            if (Array.isArray(objectMaterial)) {
                objectMaterial.forEach(function(material, index) {
                    if (material.name == name) {
                        object.material[index] = material;
                    }
                });
            } else {
                if (objectMaterial.name == name) {
                    object.material = material;
                }
            }
        }
    },
    doCallbackOnAllElements (object,callback) {
        callback(object);
        let objectChildren = object.children;
        if (objectChildren) {
            if (Array.isArray(objectChildren)) {
                objectChildren.forEach(function(children){
                    modelsFunctions.doCallbackOnAllElements (children,callback)
                })
            }
        }
    },
    getRemovedObjectsList () {
        let objectsArray = [];
        window.removed_objects.forEach(function(object){
            let name = object.child.name;
            if (name.length > 0) {
                objectsArray.push(name);
            }
        });
        console.log(JSON.stringify(objectsArray));
    },
    randomPositionsOnPlane (planeName, randomMesh = null, amount = 50, gap = 4 ,time = 5) {
        setTimeout(function(){
        if (window.randomObjects) {
            window.randomObjects.forEach(function(object){
                object.parent.remove(object);
            })
            window.randomObjects = [];
        }
        if (randomMesh === null) {
            let geometry = new global_three.BoxGeometry( 1, 5, 1 );
            let material = new global_three.MeshBasicMaterial( {color: 0x00ff00} );
            randomMesh = new global_three.Mesh( geometry, material );
        }
        let plane = scene.getObjectByName(planeName);
        let min_x = 9999999;
        let  max_x = -9999999;
        let  min_z = 9999999;
        let  max_z = -9999999;

        window.RandomBorders.forEach(function(object){
            let x = object.position.x;
            let z = object.position.z;
            if (x < min_x) {
                min_x = x;
            }
            if (x > max_x) {
                max_x = x;
            }
            if (z < min_z) {
                min_z = z;
            }
            if (z > max_z) {
                max_z = z;
            }
        });

        let objectsArray = [];
        const date = Date.now();
        let i = 0;
        let vector;

        function randomInt(min, max) {
            return min + Math.floor((max - min) * Math.random());
        }
        do {
            let notCross = true;
            let currentDate = Date.now();
            let x = randomInt(min_x, max_x);
            let z = randomInt(min_z, max_z);
            vector = new global_three.Vector3(x, 0, z);
            let intersection_point = new global_three.Vector3(0,0,0);
            if (objectsArray.length > 0) {
                objectsArray.forEach(item => {
                    let compareVector = new global_three.Vector3(item.x, 0, item.z);
                    if (vector.distanceTo(compareVector) < gap) {
                        notCross = false;
                    }
                });
            }
            if (notCross) {
                const origin = new global_three.Vector3(vector.x, 3000, vector.z);
                const direction = new global_three.Vector3(vector.x, -2000, vector.z);
                let ray = new global_three.Raycaster(origin, direction.sub(origin).normalize());
                let intersects = ray.intersectObjects([plane]);
                let crossPoint;
                if (intersects.length === 0) {
                    crossPoint = false;
                } else {
                    crossPoint = intersects[0].point;
                }
                if (crossPoint) {
                    objectsArray.push(crossPoint);
                    i++;
                }
            }
            if (currentDate - date > time * 1000) {
                break;
            }

        } while (i < amount);
        objectsArray.forEach(function(item){
            let objectClone = randomMesh.clone();
            objectClone.position.set(item.x, item.y, item.z);
            if (!window.randomObjects) {
                window.randomObjects = [];
            }
            randomObjects.push(objectClone);
            scene.add(objectClone);
        });

        console.log(objectsArray);
        objectsArray.forEach(function(item){
            item.scale =  1 + 0.5 * Math.random();
        });
            $.post( "write-file.php",
                {
                    json : JSON.stringify(objectsArray)
                } ,
                function(response){
                    console.log(response)
                }
            );
        }, 100)




    }
}