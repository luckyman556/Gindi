export function addComponentInstanceTrees (treeArray,positionsArray, scale) {
    treeArray.forEach(function(tree){
        add_instances_trees(tree,positionsArray, scale);
    });
}